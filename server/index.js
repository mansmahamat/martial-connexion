const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cors = require("cors")
const session = require("express-session")
var MemoryStore = require("memorystore")(session)
//Import Route
const authRoute = require("./routes/auth")
const subsRoute = require("./routes/subs")
const postRoute = require("./routes/post")
const fighter = require("./routes/fighter")
const team = require("./routes/club")
const { protect } = require("./middleware/auth")
const { getPrivateRoute } = require("./controllers/private")
const bodyParser = require("body-parser")
const CreateFighterRoute = require("./routes/createFighterRoute")
const User = require("./models/User")
const checkAuth = require("./routes/checkAuth")
const Team = require("./models/Team")

dotenv.config()

app.use(
  session({
    saveUninitialized: false,
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
    resave: false,
    secret: "keyboard cat",
  })
)

//Connect Db
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
  },
  () => console.log("DB connected ")
)

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json())
app.use("/uploads", express.static("uploads"))
app.use(cors())

// Route middlewware
app.use("/api/user", authRoute)
app.use("/api/", subsRoute)
app.use("/private", protect, getPrivateRoute)
app.use("/api/posts", postRoute)
app.use("/api", fighter)
app.use("/api", team)

app.get("/", (req, res) => {
  res.send("Hello from Express!")
})

const stripe = require("stripe")(
  "sk_test_51KEwIMLXQl0DCJw6d0bLud77pQXePWgdms4nsY9BxszujE3ZTXCtvua7NzlOy0CcdnsBhHQrYDWgjAepP6Pr2Y6Z00vkDwTP76"
)

const YOUR_DOMAIN = "http://localhost:3000"
const endpointSecret =
  "whsec_c97489f47f7559faad2df4a224626a0cecffbfa2bf50be67ade0ebb23a31fc78"

const payload = {
  id: "stripe-signature",
  object: "event",
}

const payloadString = JSON.stringify(payload, null, 2)

app.post("/create-checkout-session", async (req, res) => {
  const { email } = req.body
  const { customerId } = req.body

  const prices = await stripe.prices.list({
    lookup_keys: [req.body.lookup_key],
    expand: ["data.product"],
  })
  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    customer: customerId,
    locale: "fr",

    line_items: [
      {
        price: prices.data[0].id,
        // For metered billing, do not pass quantity
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${YOUR_DOMAIN}/success/?success=true&session_id={session_id}`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  })

  // const subscriptions = await stripe.subscriptions.list({
  //   customer: customerId,
  //   status: "all",
  //   expand: ["data.default_payment_method"],
  // });

  // const data = {
  //   billingId: session.livemode,
  // };

  user = await User.findOneAndUpdate(
    { email: email },
    { session: session.id },
    {
      useFindAndModify: false,
    }
  )

  res.redirect(303, session.url)
})

app.post("/create-portal-session", async (req, res) => {
  // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
  // Typically this is stored alongside the authenticated user in your database.
  const { session_id } = req.body
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)

  // This is the url to which the customer will be redirected when they are done
  // managing their billing with the portal.
  const returnUrl = YOUR_DOMAIN

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkoutSession.customer,
    return_url: returnUrl,
  })
  res.redirect(303, portalSession.url)
})

app.post("/api/complete-profile", async (req, res) => {
  const accountId = req.body.accountId

  const accountLink = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: "https://example.com/reauth",
    return_url: "http://localhost:3000/pro",
    type: "account_onboarding",
  })
  res.send(accountLink?.url)
})

app.post("/api/login_links", async (req, res) => {
  const accountId = req.body.accountId

  const loginLink = await stripe.accounts.createLoginLink(`${accountId}`)
  res.send(loginLink?.url)
})

app.get("/api/account/:id", async (req, res) => {
  const accountId = req.params.id

  const account = await stripe.accounts.retrieve(accountId)

  res.send(account)
})

app.get("/api/customers/:id", async (req, res) => {
  const customerId = req.params.id

  user = await User.findOne({ email: customerId })

  res.send(user)
})

app.post("/customer-portal", async (req, res) => {
  const { customer } = req.body

  // const checkoutSession = await stripe.checkout.sessions.retrieve(customer);

  const returnUrl = YOUR_DOMAIN

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customer,
    return_url: returnUrl,
  })

  res.redirect(303, portalSession.url)
})

app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    // const sig = req.headers["stripe-signature"]

    // let event

    // try {
    //   event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
    // } catch (err) {
    //   res.status(400).send(`Webhook Error: ${err.message}`)
    //   return
    // }

    const event = req.body

    // Handle the event
    switch (event.type) {
      case "subscription_schedule.canceled":
        const subscriptionSchedule = event.data.object
        // Then define and call a function to handle the event subscription_schedule.canceled
        break
      case "invoice.paid":
        const invoicePaid = event.data.object

        user = await User.findOneAndUpdate(
          { billingID: invoicePaid.customer },
          {
            $push: {
              invoicesPaid: {
                invoicePaid,
              },
            },
          },
          { new: true, useFindAndModify: false }
        )
        break
      case "invoice.payment_failed":
        const invoiceFailed = event.data.object

        user = await User.findOneAndUpdate(
          { billingID: invoiceFailed.customer },
          {
            $push: {
              invoicesFailed: {
                invoiceFailed,
              },
            },
          },
          { new: true, useFindAndModify: false }
        )
        break
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object
        user = await User.findOneAndUpdate(
          { accountId: paymentIntent.transfer_data.destination },
          {
            $push: {
              paymentReceived: {
                paymentIntent,
              },
            },
          },
          { new: true, useFindAndModify: false }
        )

      //   user = await User.findOneAndUpdate(
      //     { email: paymentIntent.receipt_email },
      //     {
      //       $push: {
      //         paymentStatus: {
      //           paymentIntent,
      //         },
      //       },
      //     },
      //     { new: true }
      //   )

      //   user = await User.findOneAndUpdate(
      //     { accountId: paymentIntent.transfer_data.destination },
      //     {
      //       $push: {
      //         paymentReceived: {
      //           paymentIntent,
      //         },
      //       },
      //     },
      //     { new: true }
      //   )

      //   // const customer = await stripe.customers.create({
      //   //   email: userEmail,
      //   //   description: userEmail,
      //   // })

      //   // user = await User.findOneAndUpdate(
      //   //   { email: paymentIntent.receipt_email },
      //   //   { billingID: paymentIntent },
      //   //   {
      //   //     useFindAndModify: false,
      //   //   }
      //   // )

      //   break
      case "payment_intent.failed":
        const paymentIntentFailed = event.data.object

        // user = await User.findOneAndUpdate(
        //   { email: paymentIntent.receipt_email },
        //   {
        //     $push: {
        //       paymentStatus: {
        //         paymentIntentFailed,
        //       },
        //     },
        //   },
        //   { new: true }
        // )

        break
      case "checkout.session.completed":
        const checkoutcompleted = event.data.object

        user = await User.findOneAndUpdate(
          { billingID: checkoutcompleted.customer },
          {
            $push: {
              paymentStatus: {
                checkoutcompleted,
              },
            },
          },
          { new: true, useFindAndModify: false }
        )

        // user = await User.findOneAndUpdate(
        //   { email: paymentIntent.customer_details.email },
        //   {
        //     $push: {
        //       paymentStatus: {
        //         checkoutcompleted,
        //       },
        //     },
        //   },
        //   { new: true }
        // )

        //   user = await User.findOneAndUpdate(
        //     { accountId: paymentIntent.transfer_data.destination },
        //     {
        //       $push: {
        //         paymentReceived: {
        //           paymentIntent,
        //         },
        //       },
        //     },
        //     { new: true }
        //   )

        //   // const customer = await stripe.customers.create({
        //   //   email: userEmail,
        //   //   description: userEmail,
        //   // })

        //   // user = await User.findOneAndUpdate(
        //   //   { email: paymentIntent.receipt_email },
        //   //   { billingID: paymentIntent },
        //   //   {
        //   //     useFindAndModify: false,
        //   //   }
        //   // )

        break
      case "checkout.session.async_payment_succeeded":
        const checkoutSuccess = event.data.object
        break
      case "checkout.session.async_payment_failed":
        const checkoutFailed = event.data.object

        break
      // ... handle other event types
      default:
      //   console.log(`Unhandled event type ${event.type}`)
    }

    // Return a 200 response to acknowledge receipt of the event
    res.json({ received: true })
  }
)

app.post("/api/create-product", async (req, res) => {
  const { disciplinePrices } = req.body
  const { teamId } = req.body

  const product = await stripe.products.create({
    name: disciplinePrices.discipline,
  })

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: disciplinePrices.price * 100,
    currency: "eur",
  })

  const data = { disciplinePrices }

  user = await Team.findOneAndUpdate(
    { _id: teamId },
    {
      $push: {
        disciplinePrices: {
          ...disciplinePrices,
          productId: product?.id,
          pricesId: price?.id,
        },
      },
    },
    { new: true, useFindAndModify: false }
  )

  res.send(data)
})

app.post("/create-payment-products", async (req, res) => {
  const { accountId } = req.body
  const { pricesId } = req.body
  const { price } = req.body
  const { userEmail } = req.body
  const { customerId } = req.body
  const { userName } = req.body

  const fees = (price * 30) / 10

  // const customer = await stripe.customers.create({
  //   email: userEmail,
  //   description: userEmail,
  // })

  // const token = await stripe.tokens.create(
  //   {
  //     customer: customerId,
  //   },
  //   {
  //     stripeAccount: accountId,
  //   }
  // )

  // const customer = await stripe.customers.create(
  //   {
  //     source: token.id,
  //   },
  //   {
  //     stripeAccount: accountId,
  //   }
  // )

  // const customer = await stripe.customers.retrieve(customerId)

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: pricesId,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000",
    cancel_url: "http://localhost:3000/teams",
    // customer_email: userEmail,
    customer: customerId,
    client_reference_id: customerId,
    payment_intent_data: {
      application_fee_amount: fees,
      transfer_data: {
        destination: accountId,
      },
    },
  })

  res.redirect(303, session.url)
})

app.get("/api/customer/balance/:id", async (req, res) => {
  const customerId = req.params.id

  const balanceTransactions = await stripe.customers.listBalanceTransactions(
    customerId
  )

  res.send(balanceTransactions)
})

app.get("/api/gym/balance/:id", async (req, res) => {
  const accountID = req.params.id

  let stripeReq = await stripe.balance.retrieve({
    stripeAccount: accountID,
  })

  res.send(stripeReq)
})

app.listen("https://martial-connexion.herokuapp.com/", () =>
  console.log("App is here")
)
