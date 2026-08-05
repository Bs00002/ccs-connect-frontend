import {
  Activity,
  BarChart3,
  Briefcase,
  ClipboardList,
  Droplet,
  FileText,
  Globe2,
  MapPin,
  Package,
  ShieldCheck,
  Truck,
  Users,
  Zap,
  Bell,
} from 'lucide-react'

export const whyCards = [
  {
    title: 'Faster Order Processing',
    description: 'Accelerate approvals, automate invoices, and close more deals with built-in order orchestration.',
    icon: Zap,
  },
  {
    title: 'Dealer Management',
    description: 'Connect dealers, manage credit, and monitor last-mile distribution from one intelligent hub.',
    icon: Users,
  },
  {
    title: 'Inventory Tracking',
    description: 'Keep stock balanced with real-time visibility, low-stock alerts, and replenishment actions.',
    icon: Package,
  },
  {
    title: 'Dispatch Automation',
    description: 'Streamline warehouse handoffs, route dispatch orders, and reduce delays across field operations.',
    icon: Truck,
  },
  {
    title: 'Analytics',
    description: 'Surface performance, credit exposure, and fulfillment metrics in executive-ready dashboards.',
    icon: BarChart3,
  },
  {
    title: 'Mobile Ready',
    description: 'Field teams and distributors stay aligned with responsive workflows built for tablets and phones.',
    icon: Globe2,
  },
]

export const modules = [
  {
    title: 'Dashboard',
    description: 'Unified command center with KPI snapshots and team alerts.',
    icon: Activity,
  },
  {
    title: 'Products',
    description: 'Manage SKUs, compositions, pricing, and batch tracking.',
    icon: Package,
  },
  {
    title: 'Dealers',
    description: 'Centralize dealer profiles, credit limits, and order history.',
    icon: Users,
  },
  {
    title: 'Distributors',
    description: 'Manage distribution partners and route inventory with precision.',
    icon: MapPin,
  },
  {
    title: 'Employees',
    description: 'Track team performance, approvals, and territory assignments.',
    icon: Briefcase,
  },
  {
    title: 'Orders',
    description: 'End-to-end order lifecycle tracking with priority workflows.',
    icon: ClipboardList,
  },
  {
    title: 'Warehouse',
    description: 'Monitor stock movements, shelf locations, and dispatch readiness.',
    icon: Droplet,
  },
  {
    title: 'Dispatch',
    description: 'Schedule dispatch, track shipments, and optimize routes.',
    icon: Truck,
  },
  {
    title: 'Invoice',
    description: 'Generate compliance-ready invoices and payment reminders.',
    icon: FileText,
  },
  {
    title: 'Reports',
    description: 'Build and export executive reports for sales and inventory.',
    icon: BarChart3,
  },
  {
    title: 'Notifications',
    description: 'Stay updated with alerts for approvals, stock, and dispatch exceptions.',
    icon: Bell,
  },
  {
    title: 'Settings',
    description: 'Configure roles, access, and operational workflows securely.',
    icon: ShieldCheck,
  },
]

export const workflowSteps = [
  'Employee / Distributor',
  'Create Order',
  'Approval',
  'Warehouse',
  'Dispatch',
  'Invoice',
  'Delivered',
  'Reports',
]

export const previewCards = [
  {
    title: 'Sales Dashboard',
    description: 'Revenue, order velocity, and territory performance in one view.',
    accent: 'from-emerald-500 to-cyan-400',
  },
  {
    title: 'Inventory Dashboard',
    description: 'Stock health, low‑stock alerts, and SKU performance.',
    accent: 'from-sky-500 to-violet-500',
  },
  {
    title: 'Orders Dashboard',
    description: 'Order funnel, pending approvals, and dispatch readiness.',
    accent: 'from-amber-500 to-orange-500',
  },
  {
    title: 'Reports Dashboard',
    description: 'Custom reports, export-ready charts, and audit trails.',
    accent: 'from-fuchsia-500 to-pink-500',
  },
]

export const featureGrid = [
  'Global Search',
  'Advanced Filters',
  'Credit Limit Check',
  'Stock Availability',
  'Audit Timeline',
  'Notifications',
  'Export PDF',
  'Export Excel',
  'QR Support',
  'Mobile Responsive',
  'Role Based Access',
  'Secure Authentication',
]

export const stats = [
  { value: 7540, label: 'Products' },
  { value: 1860, label: 'Dealers' },
  { value: 780, label: 'Distributors' },
  { value: 1320, label: 'Employees' },
  { value: 3420, label: 'Orders' },
  { value: 128, label: 'Revenue (Cr)' },
]

export const testimonials = [
  {
    quote: 'CCS Connect transformed the way our field team coordinates dispatch and inventory. Approvals are faster and visibility is instant.',
    name: 'Rohit Sharma',
    role: 'Operations Head, Chitra Agro',
  },
  {
    quote: 'The platform is intuitive and powerful. Our distributors now operate with real-time stock data and order tracking.',
    name: 'Sneha Patel',
    role: 'Supply Chain Lead, Crop Solutions',
  },
  {
    quote: 'The analytics dashboards helped us spot credit exposure early and keep dealer service levels high.',
    name: 'Vikram Joshi',
    role: 'Finance Director, Agritech Partners',
  },
]

export const faqs = [
  {
    question: 'Can CCS Connect support multiple dealer and distributor workflows?',
    answer: 'Yes. The platform is built to manage tiered workflows with configurable roles, credit checks, and approval routing for dealers, distributors, and employees.',
  },
  {
    question: 'Does it offer export and reporting capabilities?',
    answer: 'Absolutely. CCS Connect includes export to PDF/Excel, audit timeline reports, daily dispatch summaries, and executive dashboards for revenue and inventory.',
  },
  {
    question: 'Is the solution mobile friendly for field teams?',
    answer: 'Yes. The interface is optimized for mobile and tablet devices so sales and distribution teams can operate from the field.',
  },
]
