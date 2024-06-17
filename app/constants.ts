const FEATURES = [
    {
      title: 'Ultra-Fast Data Extraction',
      description:
        "ScrappingCat excels in speed, outperforming most other scrapers on the market. It efficiently manages numerous simultaneous requests, ensuring rapid data retrieval.",
      src: '/fast-clock.png',
    },
    {
      title: 'Access to 40 Million IPs',
      description: 'Each request is routed through a unique IP, significantly enhancing success rates and avoiding blocks. Our IP pool covers all major countries.',
      src: 'ip-worldwide.png',
    },
    {
      title: 'Exceptional Success Rate',
      description:
        'ScrapingCat ensures a smooth data pipeline from any website. Our robust infrastructure includes millions of rotating proxies and headless Chrome.',
      src: '/high-rate.png',
    }
  ];

const COMMENTS = [
    {
      text: 'This service saved me thousands of dollars in scraping costs!',
      author: 'John Doe',
    },
    {
      text: 'An absolute game changer for our data collection needs.',
      author: 'Jane Smith',
    },
    {
      text: 'Efficient, reliable, and extremely user-friendly!',
      author: 'Michael Brown',
    },
    {
      text: 'The best scraping tool we have ever used. Highly recommended!',
      author: 'Emily Johnson',
    },
    {
      text: 'Our go-to solution for all our data extraction needs.',
      author: 'Chris Lee',
    },
  ];

  const PRICING = [
    {
      tier: 'basic',
      price: {
        month: 0,
        year: 0,
      },
      features: ['Rich landing pages', '100+ components'],
      preferred: false,
      actionText: 'start for free',
      description: 'All the basics for starting a new business',
    },
    {
      tier: 'standard',
      price: {
        month: 25,
        year: 45,
      },
      features: [
        'Rich landing pages',
        '100+ components',
        'Flexible licensing',
        'Speedy build tooling',
        '6 months free support',
      ],
      preferred: true,
      actionText: 'start with standard',
      description: 'Everything you need for a growing business',
    },
    {
      tier: 'premium',
      price: {
        month: 40,
        year: 70,
      },
      features: [
        'Rich landing pages',
        '100+ components',
        'Flexible licensing',
        'Speedy build tooling',
        '6 months free support',
        '256-bit encryption',
        'Guaranteed 100% uptime',
        'Unlimited users',
      ],
      preferred: false,
      actionText: 'start with premium',
      description: 'Advanced features for scaling your business',
    },
  ];

  
export {
    FEATURES,
    COMMENTS,
    PRICING
}
