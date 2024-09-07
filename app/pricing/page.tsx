"use client";
import { useState } from "react";
import styles from './pricing.module.css';
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import NavbarDemo from "@/components/Header";
import Footer from "@/components/Footer";

export interface PricingTierFrequency {
  id: string;
  value: string;
  label: string;
  priceSuffix: string;
}

export interface PricingTier {
  name: string;
  id: string;
  href: string;
  price: string | Record<string, string>;
  description: string | React.ReactNode;
  features: string[];
  cta: string;
}

const frequencies: PricingTierFrequency[] = [
  { id: '1', value: '1', label: 'Monthly', priceSuffix: '/month' },
  { id: '2', value: '2', label: 'Annually', priceSuffix: '/year' },
];

const tiers: PricingTier[] = [
  {
    name: 'Free',
    id: '0',
    href: '/dashboard',
    price: { '1': '$0', '2': '$0' },
    description: `Get started with AI copywriting at no cost.`,
    features: [
      `Access to basic writing tools`,
      `5 content templates`,
      `Community support`,
    ],
    cta: `Go to Playground`,
  },
  {
    name: 'Basic',
    id: '1',
    href: '/dashboard',
    price: { '1': '$3.99', '2': '$49.99' },
    description: `Ideal for small businesses looking to level up their content.`,
    features: [
      `Access to all basic writing tools`,
      `10 content templates`,
      `Standard support`,
    ],
    cta: `Sign Up`,
  },
  {
    name: 'Custom',
    id: '2',
    href: '/contact-us',
    price: { '1': '$14.99', '2': '$179.88' },
    description: `Tailored solutions for enterprises with specific needs. `,
    features: [
      `Custom tools and integrations`,
      `24/7 dedicated support`,
      `Onboarding and training sessions`,
      `Custom security and compliance features`,
    ],
    cta: `Get started`,
  },
];

const CheckIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="blue"
      className={cn('w-6 h-6', className)}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}; 

const cn = (...args: Array<string | boolean | undefined | null>) =>
  args.filter(Boolean).join(' '); 

export default function Pricing() {
  const [frequency, setFrequency] = useState(frequencies[0]);

  return (
    <main className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* Background Effects */}
      <StarsBackground />
      <ShootingStars />
      <div className="z-10 w-full max-w-7xl text-center p-3 md:p-12 mt-16">
        <NavbarDemo />
        <div className="w-full lg:w-auto mx-auto max-w-4xl lg:text-center mt-10">
          <h1 className="text-black dark:text-white text-4xl font-semibold max-w-xs sm:max-w-none md:text-4xl !leading-tight">
            Unlock the Power of AI-Driven Copywriting with Flexible Plans to Suit Every Need
          </h1>
        </div>

        {frequencies.length > 1 ? (
          <div className="mt-10 flex justify-center">
            <div
              role="radiogroup"
              className="grid gap-x-1 rounded-full p-1 text-center text-sm font-semibold leading-5 bg-white dark:bg-slate-900 ring-2 ring-inset ring-gray-200/30 dark:ring-gray-500"
              style={{
                gridTemplateColumns: `repeat(${frequencies.length}, minmax(0, 1fr))`,
              }}
            >
              <p className="sr-only">Payment frequency</p>
              {frequencies.map((option) => (
                <label
                  className={cn(
                    frequency.value === option.value
                      ? 'bg-slate-700/90 text-white dark:bg-fuchsia-600 dark:text-white/90'
                      : 'text-gray-400 hover:bg-fuchsia-300',
                    'cursor-pointer rounded-full px-3 py-2 transition-all',
                  )}
                  key={option.value}
                  htmlFor={option.value}
                >
                  {option.label}
                  <button
                    value={option.value}
                    id={option.value}
                    className="hidden"
                    role="radio"
                    aria-checked={frequency.value === option.value}
                    onClick={() => {
                      setFrequency(
                        frequencies.find(
                          (f) => f.value === option.value,
                        ) as PricingTierFrequency,
                      );
                    }}
                  >
                    {option.label}
                  </button>
                </label>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-12" aria-hidden="true"></div>
        )}

        <div
          className={cn(
            'isolate mx-auto mt-6 mb-28 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none select-none',
            tiers.length === 2 ? 'lg:grid-cols-2' : '',
            tiers.length === 3 ? 'lg:grid-cols-3' : '',
          )}
        >
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className='bg-white dark:bg-gray-900/40 ring-gray-800/70 dark:ring-gray-500 max-w-lg ring-1 rounded-3xl p-8 xl:p-10 hover:bg-slate-700'>
              <h3
                id={tier.id}
                className='text-3xl font-bold tracking-tight'
              >
                {tier.name}
              </h3>
              <p
                className='text-gray-700 dark:text-gray-300 mt-6 text-base leading-6 text-center' 
              >
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-2">
                <span
                  className='text-black dark:text-white text-4xl font-bold tracking-tight'
                >
                  {typeof tier.price === 'string'
                    ? tier.price
                    : tier.price[frequency.value]}
                </span>
                {typeof tier.price !== 'string' ? (
                  <span className='text-sm font-semibold leading-6'>
                    {frequency.priceSuffix}
                  </span>
                ) : null}
              </p>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className='flex mt-10 shadow-sm' >
                <button
                  className='w-full inline-flex items-center justify-center font-medium ring-offset-background 
                    dark:md:hover:bg-fuchsia-800 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                    disabled:pointer-events-none disabled:opacity-50 text-black dark:text-white h-12 rounded-md px-6 sm:px-10 text-md
                   dark:bg-gray-900 border border border-white/16 rounded-xl'
                >
                  {tier.cta}
                </button>
              </a>
              <ul
                className='mt-8 space-y-3 text-base leading-6 xl:mt-10 text-gray-700 dark:text-gray-400'
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-2 text-left">
                    <CheckIcon
                      className='text-slate-500 h-6 w-5 flex-none'
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
