export const dealerMetrics = [
  { label: 'Current Orders', value: '16', accent: 'from-emerald-500 to-cyan-400' },
  { label: 'Outstanding', value: '₹2.1L', accent: 'from-amber-500 to-orange-500' },
  { label: 'Invoices', value: '8', accent: 'from-sky-500 to-indigo-500' },
  { label: 'Products', value: '54', accent: 'from-violet-500 to-fuchsia-500' },
  { label: 'Recent Purchases', value: '12', accent: 'from-lime-500 to-emerald-500' },
]

export const dealerCategories = [
  { name: 'Crop Protection', count: '22 SKUs' },
  { name: 'Seed Treatment', count: '10 SKUs' },
  { name: 'Soil Health', count: '8 SKUs' },
  { name: 'Growth Enhancers', count: '14 SKUs' },
]

export const dealerProducts = [
  {
    name: 'CropShield Max',
    category: 'Crop Protection',
    packSizes: ['250 ml', '500 ml', '1 L'],
    price: '₹420',
    stock: 78,
    benefits: 'Protects crops from fungal infections and leaf spots.',
    composition: 'Difenoconazole 25% SC',
    usage: 'Apply as foliar spray every 14 days during active disease periods.',
    downloads: ['Brochure', 'MSDS'],
  },
  {
    name: 'WeedGuard Select',
    category: 'Crop Protection',
    packSizes: ['500 ml', '1 L'],
    price: '₹520',
    stock: 46,
    benefits: 'Selective herbicide for broadleaf weeds without crop damage.',
    composition: 'Glyphosate 41% SL',
    usage: 'Mix and spray uniformly during early weed growth.',
    downloads: ['Usage guide'],
  },
  {
    name: 'SoilBoost Pro',
    category: 'Soil Health',
    packSizes: ['1 kg', '5 kg'],
    price: '₹980',
    stock: 35,
    benefits: 'Improves nutrient uptake and microbial balance.',
    composition: 'Humic acid 10% + Fulvic acid 5%',
    usage: 'Apply at planting and repeat after 30 days.',
    downloads: ['Product sheet'],
  },
]

export const dealerOrderHistory = [
  {
    id: 'ORD-5521',
    status: 'Delivered',
    amount: '₹1.12L',
    transport: 'Ruby Freight',
    invoice: 'INV-9221',
    date: '21 Jul 2026',
  },
  {
    id: 'ORD-5489',
    status: 'Dispatched',
    amount: '₹78K',
    transport: 'Swan Logistics',
    invoice: 'INV-9184',
    date: '18 Jul 2026',
  },
  {
    id: 'ORD-5463',
    status: 'Packing',
    amount: '₹94K',
    transport: 'AgriMove',
    invoice: 'INV-9150',
    date: '16 Jul 2026',
  },
]

export const dealerInvoices = [
  { invoice: 'INV-9221', amount: '₹1.12L', status: 'Paid', due: 'Paid on 22 Jul' },
  { invoice: 'INV-9184', amount: '₹78K', status: 'Outstanding', due: 'Due 28 Jul' },
  { invoice: 'INV-9150', amount: '₹94K', status: 'Pending', due: 'Due 31 Jul' },
]

export const dealerDeliveryTracking = [
  {
    step: 'Packing',
    status: 'In progress',
    expected: '24 Jul 2026',
    lr: 'LR-5542',
    transport: 'AgriMove',
  },
  {
    step: 'Dispatched',
    status: 'Scheduled',
    expected: '25 Jul 2026',
    lr: 'LR-5542',
    transport: 'AgriMove',
  },
  {
    step: 'Delivered',
    status: 'Pending',
    expected: '26 Jul 2026',
    lr: 'LR-5542',
    transport: 'AgriMove',
  },
]

export const dealerSupportTickets = [
  { id: 'TCK-2104', issue: 'Replacement request', status: 'Open', created: '19 Jul 2026', images: 2 },
  { id: 'TCK-2098', issue: 'Invoice discrepancy', status: 'Resolved', created: '15 Jul 2026', images: 0 },
  { id: 'TCK-2091', issue: 'Return request', status: 'Pending', created: '13 Jul 2026', images: 1 },
]

