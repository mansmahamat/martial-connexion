export default interface PricesTypes {
  features: [
    'Pariatur quod similique',
    'Sapiente libero doloribus modi nostrum',
    'Vel ipsa esse repudiandae excepturi',
    'Itaque cupiditate adipisci quibusdam',
  ],
  active: boolean,
  billing_scheme: string
  created: number
  currency: string
  id: string
  livemode: false
  lookup_key: string
  metadata: object
  nickname: string
  object: string
  product: string
  recurring: {aggregate_usage: null, interval: 'month', interval_count: 1, trial_period_days: null, usage_type: 'licensed'}
  tax_behavior: "inclusive"
  tiers_mode: null
  transform_quantity: null
  type: "recurring"
  unit_amount: 0
  unit_amount_decimal: "0",
  
}

