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
