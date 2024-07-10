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
  'Cirugía de animales pequeños' ,
  'Dermatología' ,
  'Medicina interna' ,
  'Oftalmología' ,
  'Odontología' ,
  'Cardiología' ,
  'Neurología' ,
  'Oncología' ,
  'Ortopedia' ,
  'Medicina conductual' ,
  'Radiología' ,
  'Rehabilitación' ,
  'Emergencias y cuidados críticos' ,
  'Medicina de animales exóticos' ,
  'Medicina aviar' ,
];

const EDIT_VETS_BREADCRUMB = (id: string) => [
  { label: 'Veterinarios', href: '/dashboard/vets' },
  { label: 'Editar Veterinario', href: `/dashboard/vets/${id}/edit`, active: true }
];
interface Provinces {
  [key: string]: string[];
}
const DEPARTMENTS = [
  'Amazonas', 'Áncash', 'Apurímac', 'Arequipa', 'Ayacucho', 'Cajamarca', 
  'Callao', 'Cusco', 'Huancavelica', 'Huánuco', 'Ica', 'Junín', 'La Libertad', 
  'Lambayeque', 'Lima', 'Loreto', 'Madre de Dios', 'Moquegua', 'Pasco', 'Piura', 
  'Puno', 'San Martín', 'Tacna', 'Tumbes', 'Ucayali'
];

const PROVINCES: Provinces = {
  'Amazonas': ['Chachapoyas', 'Bagua', 'Bongará', 'Condorcanqui', 'Luya', 'Rodríguez de Mendoza', 'Utcubamba'],
  'Áncash': ['Huaraz', 'Aija', 'Antonio Raymondi', 'Asunción', 'Bolognesi', 'Carhuaz', 'Carlos Fermín Fitzcarrald', 'Casma', 'Corongo', 'Huari', 'Huarmey', 'Huaylas', 'Mariscal Luzuriaga', 'Ocros', 'Pallasca', 'Pomabamba', 'Recuay', 'Santa', 'Sihuas', 'Yungay'],
  'Apurímac': ['Abancay', 'Andahuaylas', 'Antabamba', 'Aymaraes', 'Cotabambas', 'Chincheros', 'Grau'],
  'Arequipa': ['Arequipa', 'Camaná', 'Caravelí', 'Castilla', 'Caylloma', 'Condesuyos', 'Islay', 'La Unión'],
  'Ayacucho': ['Huamanga', 'Cangallo', 'Huanca Sancos', 'Huanta', 'La Mar', 'Lucanas', 'Parinacochas', 'Páucar del Sara Sara', 'Sucre', 'Víctor Fajardo', 'Vilcas Huamán'],
  'Cajamarca': ['Cajamarca', 'Cajabamba', 'Celendín', 'Chota', 'Contumazá', 'Cutervo', 'Hualgayoc', 'Jaén', 'San Ignacio', 'San Marcos', 'San Miguel', 'San Pablo', 'Santa Cruz'],
  'Callao': ['Prov. Const. del Callao'],
  'Cusco': ['Cusco', 'Acomayo', 'Anta', 'Calca', 'Canas', 'Canchis', 'Chumbivilcas', 'Espinar', 'La Convención', 'Paruro', 'Paucartambo', 'Quispicanchi', 'Urubamba'],
  'Huancavelica': ['Huancavelica', 'Acobamba', 'Angaraes', 'Castrovirreyna', 'Churcampa', 'Huaytará', 'Tayacaja'],
  'Huánuco': ['Huánuco', 'Ambo', 'Dos de Mayo', 'Huacaybamba', 'Huamalíes', 'Leoncio Prado', 'Marañón', 'Pachitea', 'Puerto Inca', 'Lauricocha', 'Yarowilca'],
  'Ica': ['Ica', 'Chincha', 'Nazca', 'Palpa', 'Pisco'],
  'Junín': ['Huancayo', 'Concepción', 'Chanchamayo', 'Jauja', 'Junín', 'Satipo', 'Tarma', 'Yauli', 'Chupaca'],
  'La Libertad': ['Trujillo', 'Ascope', 'Bolívar', 'Chepén', 'Julcán', 'Otuzco', 'Pacasmayo', 'Pataz', 'Sánchez Carrión', 'Santiago de Chuco', 'Gran Chimú', 'Virú'],
  'Lambayeque': ['Chiclayo', 'Ferreñafe', 'Lambayeque'],
  'Lima': ['Lima', 'Barranca', 'Cajatambo', 'Canta', 'Cañete', 'Huaral', 'Huarochirí', 'Huaura', 'Oyón', 'Yauyos'],
  'Loreto': ['Maynas', 'Alto Amazonas', 'Loreto', 'Mariscal Ramón Castilla', 'Requena', 'Ucayali', 'Datem del Marañón', 'Putumayo'],
  'Madre de Dios': ['Tambopata', 'Manu', 'Tahuamanu'],
  'Moquegua': ['Mariscal Nieto', 'General Sánchez Cerro', 'Ilo'],
  'Pasco': ['Pasco', 'Daniel Alcides Carrión', 'Oxapampa'],
  'Piura': ['Piura', 'Ayabaca', 'Huancabamba', 'Morropón', 'Paita', 'Sullana', 'Talara', 'Sechura'],
  'Puno': ['Puno', 'Azángaro', 'Carabaya', 'Chucuito', 'El Collao', 'Huancané', 'Lampa', 'Melgar', 'Moho', 'San Antonio de Putina', 'San Román', 'Sandia', 'Yunguyo'],
  'San Martín': ['Moyobamba', 'Bellavista', 'El Dorado', 'Huallaga', 'Lamas', 'Mariscal Cáceres', 'Picota', 'Rioja', 'San Martín', 'Tocache'],
  'Tacna': ['Tacna', 'Candarave', 'Jorge Basadre', 'Tarata'],
  'Tumbes': ['Tumbes', 'Contralmirante Villar', 'Zarumilla'],
  'Ucayali': ['Coronel Portillo', 'Atalaya', 'Padre Abad', 'Purús']
};


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
    EDIT_VETS_BREADCRUMB,
    DEPARTMENTS,
    PROVINCES
}
