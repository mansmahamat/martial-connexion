const router = require("express").Router()
const { subscriptions, customerPortal } = require("../controllers/subs")
const requireSignin = require("../middleware")
const { protect } = require("../middleware/auth")
const User = require("../models/User")
const stripe = require("stripe")(
  "sk_test_51KEwIMLXQl0DCJw6d0bLud77pQXePWgdms4nsY9BxszujE3ZTXCtvua7NzlOy0CcdnsBhHQrYDWgjAepP6Pr2Y6Z00vkDwTP76"
)

router.get("/prices", async (req, res) => {
  const price = await stripe.prices.search({
    query: "product:'prod_L9lNd1b5i2ajBb ' AND product:'prod_L9lN7Twv3DhqvW'",
  })
  res.json(prices)
})

router.get("/price/:id", async (req, res) => {
  const priceId = req.params.id

  const price = await stripe.prices.retrieve(priceId)
  res.json(price)
})

router.post("/create-subscription", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    console.log(user)

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: req.body.priceId,
          quantity: 1,
        },
      ],
      customer: user.billingID,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    })
    res.json(session.url)
  } catch (err) {
    console.log(err)
  }
})

router.post("/subscription-status", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.user.email })

    const subscriptions = await stripe.subscriptions.list({
      customer: user.billingID,
      status: "all",
      expand: ["data.default_payment_method"],
    })

    const updated = await User.findByIdAndUpdate(
      user._id,
      {
        subscriptions: subscriptions.data,
      },
      { new: true }
    )

    res.json(updated)
  } catch (err) {
    console.log(err)
  }
})

router.get("/subscriptions", subscriptions)

router.post("/customer-portal", customerPortal)

module.exports = router
