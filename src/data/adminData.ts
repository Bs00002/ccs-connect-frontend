import {
  Briefcase,
  Droplet,
  MapPin,
  Package,
  ShieldCheck,
  Users,
} from 'lucide-react'

export const adminStats = [
  { label: 'Total Sales', value: '₹12.4Cr', detail: '+18% this month', accent: 'from-emerald-500 to-cyan-400' },
  { label: 'Monthly Revenue', value: '₹2.8Cr', detail: 'Forecast on track', accent: 'from-sky-500 to-indigo-500' },
  { label: 'Orders', value: '6,580', detail: '56 active today', accent: 'from-amber-500 to-orange-500' },
  { label: 'Pending Orders', value: '124', detail: '8% pending approval', accent: 'from-violet-500 to-fuchsia-500' },
  { label: 'Dispatch Today', value: '78', detail: '37 on route', accent: 'from-lime-500 to-emerald-500' },
  { label: 'Delivered Today', value: '192', detail: '96% on-time', accent: 'from-sky-500 to-cyan-400' },
  { label: 'Pending Payments', value: '₹64L', detail: '12 invoices overdue', accent: 'from-amber-500 to-orange-500' },
  { label: 'Outstanding', value: '₹1.1Cr', detail: 'Review collections', accent: 'from-rose-500 to-fuchsia-500' },
]

export const adminMetrics = [
  { label: 'Dealers', value: '1,420', icon: Users },
  { label: 'Distributors', value: '236', icon: MapPin },
  { label: 'Employees', value: '624', icon: Briefcase },
  { label: 'Products', value: '3,850', icon: Package },
  { label: 'Warehouse Stock', value: '42,180', icon: Droplet },
  { label: 'Low Stock Alerts', value: '64', icon: ShieldCheck },
]

export const salesTrend = [
  { month: 'Jan', value: 48 },
  { month: 'Feb', value: 56 },
  { month: 'Mar', value: 72 },
  { month: 'Apr', value: 84 },
  { month: 'May', value: 90 },
  { month: 'Jun', value: 104 },
  { month: 'Jul', value: 118 },
]

export const orderTrend = [
  { month: 'Jan', value: 28 },
  { month: 'Feb', value: 42 },
  { month: 'Mar', value: 58 },
  { month: 'Apr', value: 66 },
  { month: 'May', value: 72 },
  { month: 'Jun', value: 86 },
  { month: 'Jul', value: 97 },
]

export const revenueTrend = [
  { month: 'Jan', value: 38 },
  { month: 'Feb', value: 46 },
  { month: 'Mar', value: 60 },
  { month: 'Apr', value: 74 },
  { month: 'May', value: 83 },
  { month: 'Jun', value: 93 },
  { month: 'Jul', value: 108 },
]

export const orderStages = [
  'Draft',
  'Submitted',
  'Pending Approval',
  'Approved',
  'Packing',
  'Ready Dispatch',
  'Dispatched',
  'Delivered',
]

export const employees = [
  {
    code: 'CCS-001',
    name: 'Asha Shah',
    role: 'Regional Manager',
    email: 'asha.shah@ccsconnect.io',
    mobile: '+91 98765 43210',
    status: 'Active',
    territory: 'Gujarat',
  },
  {
    code: 'CCS-012',
    name: 'Rohan Mehta',
    role: 'Sales Officer',
    email: 'rohan.mehta@ccsconnect.io',
    mobile: '+91 98123 45678',
    status: 'Active',
    territory: 'Punjab',
  },
  {
    code: 'CCS-025',
    name: 'Leena Patel',
    role: 'Inventory Lead',
    email: 'leena.patel@ccsconnect.io',
    mobile: '+91 99012 34567',
    status: 'On Leave',
    territory: 'Maharashtra',
  },
  {
    code: 'CCS-034',
    name: 'Vikram Joshi',
    role: 'Field Executive',
    email: 'vikram.joshi@ccsconnect.io',
    mobile: '+91 99321 87654',
    status: 'Active',
    territory: 'Karnataka',
  },
  {
    code: 'CCS-047',
    name: 'Priya Nair',
    role: 'Credit Manager',
    email: 'priya.nair@ccsconnect.io',
    mobile: '+91 97654 32109',
    status: 'Pending',
    territory: 'Tamil Nadu',
  },
]

export const distributors = [
  { name: 'Green Link Distributors', credit: '₹22L', outstanding: '₹4.8L', status: 'Verified', orders: 184 },
  { name: 'AgriFlow Supplies', credit: '₹17L', outstanding: '₹2.3L', status: 'Review', orders: 138 },
  { name: 'CropCare Logistics', credit: '₹34L', outstanding: '₹8.1L', status: 'Approved', orders: 212 },
]

export const dealers = [
  { name: 'Patel Agro Centre', distributor: 'Green Link', area: 'North Gujarat', orders: 42, outstanding: '₹1.2L' },
  { name: 'Shree Crop Care', distributor: 'AgriFlow', area: 'Madhya Pradesh', orders: 35, outstanding: '₹98K' },
  { name: 'FieldPoint Retail', distributor: 'CropCare', area: 'Karnataka', orders: 51, outstanding: '₹1.9L' },
]

export const products = [
  { name: 'CropShield Max', category: 'Fungicide', pack: '500 ml', price: '₹420', stock: 980 },
  { name: 'FungiClear Pro', category: 'Fungicide', pack: '250 g', price: '₹360', stock: 128 },
  { name: 'WeedGuard Select', category: 'Herbicide', pack: '1 L', price: '₹520', stock: 620 },
]

export const orders = [
  { id: 'ORD-3401', stage: 'Approved', dealer: 'Patel Agro Centre', amount: '₹2.84L', date: '18 Jul 2026' },
  { id: 'ORD-3396', stage: 'Packing', dealer: 'Shree Crop Care', amount: '₹1.96L', date: '17 Jul 2026' },
  { id: 'ORD-3388', stage: 'Pending Approval', dealer: 'FieldPoint Retail', amount: '₹3.42L', date: '16 Jul 2026' },
]

export const warehouse = [
  { name: 'CropShield Max', available: 980, reserved: 140, damaged: 8, expiry: 'Dec 2026' },
  { name: 'FungiClear Pro', available: 128, reserved: 34, damaged: 2, expiry: 'Nov 2026' },
  { name: 'WeedGuard Select', available: 620, reserved: 48, damaged: 6, expiry: 'Jan 2027' },
]

export const dispatches = [
  { vehicle: 'TR-5012', driver: 'Karan Singh', lr: 'LR-1218', transport: 'Swan Logistics', dispatch: '22 Jul 2026', delivery: '24 Jul 2026', status: 'En route' },
  { vehicle: 'TR-4938', driver: 'Rahul Desai', lr: 'LR-1203', transport: 'AgriMove', dispatch: '21 Jul 2026', delivery: '23 Jul 2026', status: 'Delivered' },
]

export const invoices = [
  { invoice: 'INV-8831', dealer: 'Patel Agro Centre', amount: '₹2.84L', status: 'Outstanding' },
  { invoice: 'INV-8770', dealer: 'Shree Crop Care', amount: '₹1.96L', status: 'Paid' },
  { invoice: 'INV-8734', dealer: 'FieldPoint Retail', amount: '₹3.42L', status: 'Due' },
]

export const reportTiles = [
  'Sales',
  'Employees',
  'Products',
  'Dealers',
  'Distributors',
  'Warehouse',
  'Dispatch',
  'Payments',
  'Inventory',
]

export const settingsItems = [
  'Roles',
  'Permissions',
  'Users',
  'Theme',
  'Company',
  'Notifications',
  'Audit Logs',
  'Backups',
]
