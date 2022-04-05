const User = require("../models/User")

const stripe = require("stripe")(
  "sk_test_51KEwIMLXQl0DCJw6d0bLud77pQXePWgdms4nsY9BxszujE3ZTXCtvua7NzlOy0CcdnsBhHQrYDWgjAepP6Pr2Y6Z00vkDwTP76"
)

module.exports.subscriptions = async (req, res) => {
  try {
    const subscriptions = await stripe.subscriptions.list({
      status: "all",
      expand: ["data.default_payment_method"],
    })

    res.json(subscriptions)
  } catch (err) {
    console.log(err)
  }
}

module.exports.customerPortal = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.user.email })
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.billingID,
      return_url: process.env.STRIPE_SUCCESS_URL,
    })
    res.json(portalSession.url)
  } catch (err) {
    console.log(err)
  }
}
