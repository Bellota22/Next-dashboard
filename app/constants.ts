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

  const ASSETS = [
    {
      src: '/image4.png',
      title: "Welcome to PettoCare",
      text: "Start managing your business smarter and more efficiently.",
      sunText: "Empower your business with our comprehensive scrapping solutions.",
      id: 4,
    },
    {
      src: '/image1.png',
      title: "Maximize Your Savings",
      text: "Our scrapping tool helps you save money by finding the best prices and offers.",
      sunText: "Save more, spend less with our advanced scrapping technology.",
      id: 1,
    },
    {
      src: '/image2.png',
      title: "Boost Your Sales",
      text: "Increase your sales by understanding market trends and competitor pricing.",
      sunText: "Stay ahead of the competition and maximize your revenue.",
      id: 2,
    },
    {
      src: '/image3.png',
      title: "Make Informed Decisions",
      text: "Gain insights into market dynamics and make data-driven decisions.",
      sunText: "Leverage our tools to make strategic and informed business choices.",
      id: 3,
    },
    
];

const FAQS = [
  {
    question: 'How can I reset my password?',
    answer: 'To reset your password, go to the login page and click on "Forgot Password". Follow the instructions to reset your password via email.',
  },
  {
    question: 'Can I create more than one account?',
    answer: 'Yes, you can create multiple accounts using different email addresses. However, each account must have a unique email address.',
  },
  {
    question: 'How can I subscribe to the monthly newsletter?',
    answer: 'To subscribe to our monthly newsletter, go to the subscription page and enter your email address. You will start receiving our newsletters from the next month.',
  },
  {
    question: 'Do you store credit card information securely?',
    answer: 'Yes, we store credit card information securely using industry-standard encryption methods to protect your data.',
  },
  {
    question: 'What payment systems do you work with?',
    answer: 'We work with various payment systems including PayPal, Stripe, and major credit cards to ensure a smooth and secure payment experience.',
  },
];

const CREATE_CUSTOMER_BREADCRUMB = [
  { label: 'Clientes', href: '/dashboard/customers' },
  {
    label: 'Crear cliente',
    href: '/dashboard/customers/create',
    active: true,
  },
]

const EDIT_CUSTOMER_BREADCRUMB = (id: string) => [
  { label: 'Clientes', href: '/dashboard/customers' },
  { label: 'Editar cliente', href: `/dashboard/customers/${id}/edit`, active: true },
  { label: 'Mis Mascotas', href: `/dashboard/customers/${id}/pets` },
];

const PETS_CUSTOMER_BREADCRUMB = (id: string) => [
  { label: 'Clientes', href: '/dashboard/customers' },
  { label: 'Editar cliente', href: `/dashboard/customers/${id}/edit`},
  { label: 'Mis Mascotas', href: `/dashboard/customers/${id}/pets`, active: true  },
];

const CREATE_PET_BREADCRUMB = [
  { label: 'Mascotas', href: '/dashboard/mascotas' },
  {
    label: 'Crear mascota',
    href: '/dashboard/mascotas/create',
    active: true,
  },

]

const EDIT_PET_BREADCRUMB = (id: string) => [
  { label: 'Mascotas', href: '/dashboard/mascotas' },
  { label: 'Editar Mascota', href: `/dashboard/mascotas/${id}/edit`, active: true },
  { label: 'Ficha médica', href: `/dashboard/mascotas/${id}/medical-history` },
];

const MEDICAL_HISTORY_PET_BREADCRUMB = (id: string) => [
  { label: 'Mascotas', href: '/dashboard/mascotas' },
  { label: 'Editar Mascota', href: `/dashboard/mascotas/${id}/edit`},
  { label: 'Ficha médica', href: `/dashboard/mascotas/${id}/medical-history`, active: true  },
];

const CREATE_PRODUCTS_BREADCRUMB = [
  { label: 'Productos', href: '/dashboard/products' },
  {
    label: 'Crear Producto',
    href: '/dashboard/products/create',
    active: true,
  },
]

const EDIT_PRODUCTS_BREADCRUMB = (id: string) => [
  { label: 'Products', href: '/dashboard/products' },
  {
    label: 'Editar Producto',
    href: `/dashboard/products/${id}/edit`,
    active: true,
  },
]


const CREATE_VET_BREADCRUMB = [
  { label: 'Veterinarios', href: '/dashboard/vets' },
  {
    label: 'Crear veterinario',
    href: '/dashboard/vets/create',
    active: true,
  },
]
const SPECIALTIES = [
  { id: '1', name: 'Cirugía de animales pequeños' },
  { id: '2', name: 'Dermatología' },
  { id: '3', name: 'Medicina interna' },
  { id: '4', name: 'Oftalmología' },
  { id: '5', name: 'Odontología' },
  { id: '6', name: 'Cardiología' },
  { id: '7', name: 'Neurología' },
  { id: '8', name: 'Oncología' },
  { id: '9', name: 'Ortopedia' },
  { id: '10', name: 'Medicina conductual' },
  { id: '11', name: 'Radiología' },
  { id: '12', name: 'Rehabilitación' },
  { id: '13', name: 'Emergencias y cuidados críticos' },
  { id: '14', name: 'Medicina de animales exóticos' },
  { id: '15', name: 'Medicina aviar' },
];

const EDIT_VETS_BREADCRUMB = (id: string) => [
  { label: 'Veterinarios', href: '/dashboard/vets' },
  { label: 'Editar Veterinario', href: `/dashboard/vets/${id}/edit`, active: true }
];

export {
    FEATURES,
    COMMENTS,
    PRICING,
    ASSETS,
    FAQS,
    CREATE_CUSTOMER_BREADCRUMB,
    EDIT_CUSTOMER_BREADCRUMB,
    CREATE_PET_BREADCRUMB,
    EDIT_PET_BREADCRUMB,
    CREATE_PRODUCTS_BREADCRUMB,
    EDIT_PRODUCTS_BREADCRUMB,
    PETS_CUSTOMER_BREADCRUMB,
    MEDICAL_HISTORY_PET_BREADCRUMB,
    CREATE_VET_BREADCRUMB,
    SPECIALTIES,
    EDIT_VETS_BREADCRUMB
}
