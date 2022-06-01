/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { SVGProps, useContext, useEffect, useState } from 'react';
import { CheckIcon } from '@heroicons/react/outline';
import { UserContext } from '../../context';
import PricesTypes from '../../types/PricesTypes';
import axios from 'axios';
import PricingTable from '../../components/UI/Princing';

const pricing = {
  tiers: [
    {
      title: 'Starter',
      price: 15,
      frequency: '/month',
      description: 'The essentials to provide your best work for clients.',
      features: [
        '5 products',
        'Up to 1,000 subscribers',
        'Basic analytics',
        '48-hour support response time'
      ],
      cta: 'Monthly billing',
      mostPopular: false
    },
    {
      title: 'Pro',
      price: 75,
      frequency: '/month',
      description: 'A plan that scales with your rapidly growing business.',
      features: [
        '25 products',
        'Up to 10,000 subscribers',
        'Advanced analytics',
        '24-hour support response time',
        'Marketing automations',
        'Something else'
      ],
      cta: 'Monthly billing',
      mostPopular: true
    }
  ]
};
const faqs = [
  {
    id: 1,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat."
  },
  {
    id: 2,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat."
  },
  {
    id: 3,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat."
  }
  // More questions...
];

type Props = {
  User: {
    avatar: string;
    city: string;
    date: string;
    discipline: string;
    email: string;
    firstName: string;
    lastName: string;
    billingID: string;
    password: string;
    postalCode: string;
    _id: string;
  };
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Pricing({ User }: Props) {
  const [prices, setPrices] = useState<PricesTypes[]>([]);
  const [tablePrices, setTablePrices] = useState([]);
  const [state] = useContext(UserContext);
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  const proPriceID = 'price_1KTRrDLXQl0DCJw65Yg1XV5R';
  const freePriceID = 'price_1KTRqULXQl0DCJw61tfhAiOv';

  console.log(tablePrices);

  useEffect(() => {
    fetchProPrices();
    fetchFreePrices();
  }, []);

  const fetchPrices = async () => {
    const { data } = await axios.get(`https://martial-connexion.herokuapp.com/api/api/prices`);
    setPrices(data);
  };

  const fetchProPrices = async () => {
    const { data } = await axios.get(
      `https://martial-connexion.herokuapp.com/api/api/price/${proPriceID}`
    );
    //@ts-ignore
    setTablePrices((tablePrices) => [...tablePrices, data]);
  };

  const fetchFreePrices = async () => {
    const { data } = await axios.get(
      `https://martial-connexion.herokuapp.com/api/api/price/${freePriceID}`
    );
    //@ts-ignore
    setTablePrices((tablePrices) => [...tablePrices, data]);
  };

  useEffect(() => {
    //@ts-ignore
    const result = [];
    const check = () =>
      state &&
      state.subscriptions &&
      //@ts-ignore
      state.subscriptions.map((sub) => {
        result.push(sub.plan.id);
      });
    check();
    //@ts-ignore
    setUserSubscriptions(result);
  }, [state]);

  return (
    <div className="bg-white">
      {/* Header and Page Header */}
      <div className="relative">
        {/* Header */}

        {/* Page Header */}
        <div className="relative max-w-2xl mx-auto py-24 px-4 sm:px-6 lg:max-w-7xl lg:py-32 lg:px-8">
          <div className="relative">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">
              Pricing plans for teams of all sizes
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-gray-500">
              Choose an affordable plan thats packed with the best features for engaging your
              audience, creating customer loyalty, and driving sales.
            </p>
          </div>
        </div>
      </div>

      <PricingTable User={User} prices={tablePrices} />

      <main>
        {/* Pricing Section */}
        <section className="relative" aria-labelledby="pricing-heading">
          <h2 id="pricing-heading" className="sr-only">
            Pricing
          </h2>

          {/* Tiers */}
          <div className="max-w-2xl mx-auto px-4 space-y-12 sm:px-6 lg:max-w-7xl lg:space-y-0 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
            {pricing.tiers.map((tier) => (
              <div
                key={tier.title}
                className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm  flex flex-col">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{tier.title}</h3>
                  {tier.mostPopular ? (
                    <p className="absolute top-0 py-1.5 px-4 bg-red-600 rounded-full text-xs font-semibold uppercase tracking-wide text-white transform -translate-y-1/2">
                      Most popular
                    </p>
                  ) : null}
                  <p className="mt-4 flex items-baseline text-gray-900">
                    <span className="text-5xl font-extrabold tracking-tight">${tier.price}</span>
                    <span className="ml-1 text-xl font-semibold">{tier.frequency}</span>
                  </p>
                  <p className="mt-6 text-gray-500">{tier.description}</p>

                  {/* Feature list */}
                  <ul role="list" className="mt-6 space-y-6">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex">
                        <CheckIcon
                          className="flex-shrink-0 w-6 h-6 text-red-600"
                          aria-hidden="true"
                        />
                        <span className="ml-3 text-gray-500">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#"
                  className={classNames(
                    tier.mostPopular
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-red-50 text-red-700 hover:bg-red-100',
                    'mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium'
                  )}>
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Logo Cloud */}
        <section
          aria-labelledby="customer-heading"
          className="max-w-2xl mx-auto py-24 px-4 sm:px-6 lg:max-w-7xl lg:py-32 lg:px-8">
          <h2 id="customer-heading" className="sr-only">
            Our customers
          </h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <img
                className="h-12"
                src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg"
                alt="Tuple"
              />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <img
                className="h-12"
                src="https://tailwindui.com/img/logos/mirage-logo-gray-400.svg"
                alt="Mirage"
              />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <img
                className="h-12"
                src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg"
                alt="StaticKit"
              />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-3 lg:col-span-1">
              <img
                className="h-12"
                src="https://tailwindui.com/img/logos/transistor-logo-gray-400.svg"
                alt="Transistor"
              />
            </div>
            <div className="col-span-2 flex justify-center md:col-span-3 lg:col-span-1">
              <img
                className="h-12"
                src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg"
                alt="Workcation"
              />
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <div className="relative">
          {/* Decorative background */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-white to-gray-50"
          />

          <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="relative py-24 px-8 bg-red-500 rounded-xl shadow-2xl overflow-hidden lg:px-16 lg:grid lg:grid-cols-2 lg:gap-x-8">
              <div className="absolute inset-0 opacity-70 filter saturate-0 mix-blend-multiply">
                <img
                  src="https://images.unsplash.com/photo-1602827114685-efbb2717da9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative lg:col-span-1">
                {/* <img
                  className="h-12 w-auto"
                  src="https://tailwindui.com/img/logos/workcation-logo-white.svg"
                  alt=""
                /> */}
                <blockquote className="mt-6 text-white">
                  <p className="text-xl font-medium sm:text-2xl">
                    Celui qui combat peut perdre, mais celui qui ne combat pas a déjà perdu.
                  </p>
                  <footer className="mt-6">
                    <p className="flex flex-col font-medium">
                      <span>Bertolt Brecht</span>
                      <span>
                        Artiste, Dramaturge, écrivain, Metteur en scène, Poète (1898 - 1956)
                      </span>
                    </p>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <section
          aria-labelledby="faq-heading"
          className="max-w-2xl mx-auto py-24 px-4 divide-y divide-gray-200 sm:px-6 lg:max-w-7xl lg:py-32 lg:px-8">
          <h2 id="faq-heading" className="text-3xl font-extrabold text-gray-900">
            Frequently asked questions
          </h2>
          <div className="mt-8">
            <dl className="divide-y divide-gray-200">
              {faqs.map((faq) => (
                <div key={faq.id} className="pt-6 pb-8 md:grid md:grid-cols-12 md:gap-8">
                  <dt className="text-base font-medium text-gray-900 md:col-span-5">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 md:mt-0 md:col-span-7">
                    <p className="text-base text-gray-500">{faq.answer}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <form action="/create-checkout-session" method="POST">
          <input
            type="hidden"
            name="priceId"
            value="prod_L9lN7Twv3DhqvW
"
          />
          <input type="hidden" id="email" name="email" value={User?.email} />
          <input type="hidden" id="customerId" name="customerId" value={User?.billingID} />
          <button className="bg-red-700" id="checkout-and-portal-button" type="submit">
            Checkout 75€
          </button>
        </form>
      </main>
    </div>
  );
}
