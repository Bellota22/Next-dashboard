'use client'


import React, { useRef, useState } from 'react';

import 'aos/dist/aos.css';
import Faqs from './ui/landing/faqs';
import PricingCard from './ui/PricingCard/PricingCard';
import Hero from './ui/landing/hero';
import Features from './ui/landing/features';
import Comments from './ui/landing/comments';
import Pricing from './ui/landing/pricing';
import Navbar from './ui/landing/navbar';


export default function Page() {

  return (
    <main className="flex min-h-screen flex-col">
        <Navbar />
        <Hero />
        <Features />
        <Comments />
        <Pricing />
        <Faqs />
    </main>
  );
}
