const stripe = require("stripe")(
  "sk_test_51KEwIMLXQl0DCJw6d0bLud77pQXePWgdms4nsY9BxszujE3ZTXCtvua7NzlOy0CcdnsBhHQrYDWgjAepP6Pr2Y6Z00vkDwTP76"
)

const addNewCustomer = async (email) => {
  const customer = await stripe.customers.create({
    email,
    description: email,
    source: "tok_mastercard",
  })
  return customer
}

const getCustomerByID = async (id) => {
  const customer = await stripe.customers.retrieve(id)
  return customer
}

const createBillingSession = async (customer) => {
  const session = await stripe.billingPortal.sessions.create({
    customer,
    return_url: "https://confident-visvesvaraya-394dab.netlify.app/",
  })
  return session
}

module.exports = {
  createBillingSession,
  addNewCustomer,
  getCustomerByID,
}
