const router = require("express").Router()
const { subscriptions } = require("../controllers/subs")
const requireSignin = require("../middleware")
const { protect } = require("../middleware/auth")
const User = require("../models/User")
const stripe = require("stripe")(
  "sk_test_51KEwIMLXQl0DCJw6d0bLud77pQXePWgdms4nsY9BxszujE3ZTXCtvua7NzlOy0CcdnsBhHQrYDWgjAepP6Pr2Y6Z00vkDwTP76"
)

router.get("/prices", async (req, res) => {
  const prices = await stripe.prices.list()
  //   console.log("prices", prices);
  res.json(prices.data.reverse())
})

router.post("/create-subscription", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })

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
    console.log("checkout session", session)
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
    console.log(updated)
  } catch (err) {
    console.log(err)
  }
})

router.get("/subscriptions", subscriptions)

module.exports = router
