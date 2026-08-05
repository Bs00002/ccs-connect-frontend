export const employeeMetrics = [
  { label: 'Today\'s Visits', value: '8', accent: 'from-emerald-500 to-cyan-400' },
  { label: 'Orders Created', value: '5', accent: 'from-sky-500 to-indigo-500' },
  { label: 'Payments Collected', value: '₹1.2L', accent: 'from-amber-500 to-orange-500' },
  { label: 'Expense Entries', value: '3', accent: 'from-violet-500 to-fuchsia-500' },
  { label: 'Attendance', value: 'Checked in', accent: 'from-lime-500 to-emerald-500' },
]

export const employeeDailyTasks = [
  { label: 'Morning login', detail: 'Check in and record start time with GPS.' },
  { label: 'Dealer visits', detail: 'Follow the sales route and record meetings.' },
  { label: 'Create orders', detail: 'Capture dealer orders and request approvals.' },
  { label: 'Collect payments', detail: 'Log payments and outstanding balances.' },
  { label: 'Expense entry', detail: 'Submit travel and fuel expenses.' },
  { label: 'Evening checkout', detail: 'Complete daily summary and GPS checkout.' },
]

export const dealerVisitLog = [
  { dealer: 'Patel Agro Centre', purpose: 'Order review', result: 'Order placed', nextVisit: '26 Jul 2026' },
  { dealer: 'FieldPoint Retail', purpose: 'Stock replenishment', result: 'Pending approval', nextVisit: '27 Jul 2026' },
  { dealer: 'Shree Crop Care', purpose: 'Invoice follow-up', result: 'Payment committed', nextVisit: '28 Jul 2026' },
]

export const employeeOrders = [
  { id: 'ORD-5525', dealer: 'Patel Agro Centre', status: 'Draft', amount: '₹68K', date: '24 Jul 2026' },
  { id: 'ORD-5510', dealer: 'FieldPoint Retail', status: 'Submitted', amount: '₹52K', date: '24 Jul 2026' },
  { id: 'ORD-5498', dealer: 'Shree Crop Care', status: 'Approved', amount: '₹84K', date: '23 Jul 2026' },
]

export const employeeNotifications = [
  { title: 'Order ORD-5510 requires approval', detail: 'Awaiting distributor confirmation.', tag: 'Order' },
  { title: 'New product offer available', detail: 'Get extra margin on CropShield Max bundles.', tag: 'Offer' },
  { title: 'Attendance missing checkout', detail: 'Complete evening checkout to close the day.', tag: 'Attendance' },
]
