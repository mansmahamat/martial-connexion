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
const { protect } = require("./middleware/auth")
const { getPrivateRoute } = require("./controllers/private")
const bodyParser = require("body-parser")
const CreateFighterRoute = require("./routes/createFighterRoute")
const User = require("./models/User")
const checkAuth = require("./routes/checkAuth")

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

app.get("/", (req, res) => {
  res.send("Hello from Express!")
})

app.use("/webhook", bodyParser.raw({ type: "application/json" }))

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

  console.log(session)
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

// app.post("/billing", setCurrentUser, async (req, res) => {
//   const { customer } = req.body;
//   console.log("customer", customer);

//   const session = await Stripe.createBillingSession(customer);
//   console.log("session", session);

//   res.json({ url: session.url });
// });

app.post("/customer-portal", async (req, res) => {
  const { customer } = req.body
  console.log("customer", customer)

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
  (req, res) => {
    const sig = req.headers["stripe-signature"]

    let event

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`)
      return
    }

    // Handle the event
    switch (event.type) {
      case "subscription_schedule.canceled":
        const subscriptionSchedule = event.data.object
        // Then define and call a function to handle the event subscription_schedule.canceled
        break
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    console.log("✅ Success:", event.id)

    // Return a 200 response to acknowledge receipt of the event
    response.send()
  }
)

app.listen(process.env.PORT || 8080, () => console.log("App is here"))
