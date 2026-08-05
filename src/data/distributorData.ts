export const distributorMetrics = [
  { label: "Today's Orders", value: '24', accent: 'from-emerald-500 to-cyan-400' },
  { label: 'Pending Orders', value: '12', accent: 'from-amber-500 to-orange-500' },
  { label: 'Delivered', value: '72', accent: 'from-sky-500 to-indigo-500' },
  { label: 'Outstanding', value: '₹3.4L', accent: 'from-violet-500 to-fuchsia-500' },
  { label: 'Credit Limit', value: '₹15L', accent: 'from-lime-500 to-emerald-500' },
  { label: 'Dealer Count', value: '18', accent: 'from-slate-500 to-slate-700' },
  { label: 'Sales', value: '₹8.6Cr', accent: 'from-cyan-500 to-blue-500' },
  { label: 'Revenue', value: '₹1.8Cr', accent: 'from-emerald-500 to-green-600' },
]

export const recentOrders = [
  { id: 'ORD-4523', dealer: 'Patel Agro Centre', amount: '₹1.28L', status: 'Approved', date: '23 Jul 2026' },
  { id: 'ORD-4518', dealer: 'FieldPoint Retail', amount: '₹98K', status: 'Pending', date: '22 Jul 2026' },
  { id: 'ORD-4504', dealer: 'Shree Crop Care', amount: '₹2.02L', status: 'Delivered', date: '21 Jul 2026' },
]

export const assignedDealers = [
  { name: 'Patel Agro Centre', outstanding: '₹1.2L', purchases: '₹6.8L', creditStatus: 'Healthy', lastVisit: '20 Jul 2026', region: 'North Gujarat' },
  { name: 'FieldPoint Retail', outstanding: '₹98K', purchases: '₹4.4L', creditStatus: 'Review', lastVisit: '18 Jul 2026', region: 'Karnataka' },
  { name: 'Shree Crop Care', outstanding: '₹1.4L', purchases: '₹5.2L', creditStatus: 'Pending', lastVisit: '16 Jul 2026', region: 'Madhya Pradesh' },
]

export const productCategories = [
  { category: 'Crop Protection', count: '48 SKUs' },
  { category: 'Seed Care', count: '22 SKUs' },
  { category: 'Soil Health', count: '16 SKUs' },
  { category: 'Fertilizers', count: '31 SKUs' },
]

export const products = [
  { name: 'CropShield Max', category: 'Fungicide', packSize: ['250 ml', '500 ml', '1 L'], price: '₹420', stock: 980, benefits: 'Protects against rust, blight, and mildew', composition: 'Difenoconazole 25% SC', downloads: ['Product brochure'] },
  { name: 'FungiClear Pro', category: 'Fungicide', packSize: ['100 g', '250 g', '500 g'], price: '₹360', stock: 128, benefits: 'Controls early blight and leaf spots', composition: 'Carbendazim 50% WP', downloads: ['Safety datasheet'] },
  { name: 'WeedGuard Select', category: 'Herbicide', packSize: ['500 ml', '1 L'], price: '₹520', stock: 620, benefits: 'Selective weed control for broadleaf weeds', composition: 'Glyphosate 41% SL', downloads: ['Usage guide'] },
]

export const placeOrderDealers = [
  { id: 'DLR-101', name: 'Patel Agro Centre' },
  { id: 'DLR-102', name: 'FieldPoint Retail' },
  { id: 'DLR-103', name: 'Shree Crop Care' },
]

export const orderTimeline = [
  { step: 'Pending', label: 'Order placed', detail: 'Waiting for distributor approval', date: '23 Jul 2026' },
  { step: 'Approved', label: 'Order confirmed', detail: 'Credit review completed', date: '24 Jul 2026' },
  { step: 'Packing', label: 'Warehouse packing', detail: 'Packing scheduled for dispatch', date: '24 Jul 2026' },
  { step: 'Ready', label: 'Ready for dispatch', detail: 'LR documents prepared', date: '25 Jul 2026' },
  { step: 'Dispatched', label: 'Shipment on route', detail: 'Transport partner assigned', date: '25 Jul 2026' },
  { step: 'Delivered', label: 'Order completed', detail: 'Delivered to dealer location', date: '26 Jul 2026' },
]

export const invoices = [
  { invoice: 'INV-9102', dealer: 'Patel Agro Centre', amount: '₹1.28L', status: 'Outstanding', due: '28 Jul 2026' },
  { invoice: 'INV-9074', dealer: 'FieldPoint Retail', amount: '₹98K', status: 'Paid', due: '22 Jul 2026' },
  { invoice: 'INV-9058', dealer: 'Shree Crop Care', amount: '₹1.4L', status: 'Outstanding', due: '30 Jul 2026' },
]

export const reportTiles = [
  'Dealer Wise',
  'Monthly',
  'Product Wise',
  'Outstanding',
  'Order History',
  'Growth',
]

export const notifications = [
  { type: 'Offer', title: 'Seasonal bundling available', detail: 'Enable extra margin on CropShield Max by bundling with WeedGuard Select.', tag: 'New offer' },
  { type: 'Product Update', title: 'New packaging for FungiClear Pro', detail: '100 g and 500 g packs now available with better storage stability.', tag: 'Product update' },
  { type: 'Order Status', title: 'Order ORD-4518 moved to pending approval', detail: 'Distributor approval pending for credit check.', tag: 'Status update' },
  { type: 'Payment Reminder', title: 'Invoice INV-9102 due soon', detail: 'Outstanding invoice is due in 5 days.', tag: 'Payment reminder' },
]
