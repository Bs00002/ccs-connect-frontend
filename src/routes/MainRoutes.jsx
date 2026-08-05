import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// Partner Management
const RegistrationApproval = Loadable(lazy(() => import('pages/management/registration-approval')));
const UserManagement = Loadable(lazy(() => import('pages/management/users')));
const EmployeesAdmin = Loadable(lazy(() => import('pages/management/employees')));
const DistributorsAdmin = Loadable(lazy(() => import('pages/management/distributors')));
const DistributorDetails = Loadable(lazy(() => import('pages/management/distributor-detail')));
const DealersAdmin = Loadable(lazy(() => import('pages/management/dealers')));
const FieldDealers = Loadable(lazy(() => import('pages/management/field-dealers')));
const DealerDetails = Loadable(lazy(() => import('pages/management/dealer-detail')));
const DistributorDealers = Loadable(lazy(() => import('pages/management/distributor-dealers')));


// Operations (Field Sales)
const FieldDealerVisits = Loadable(lazy(() => import('pages/operations/dealer-visits-field')));
const FieldCollections = Loadable(lazy(() => import('pages/operations/field-collections')));
const FieldExpenses = Loadable(lazy(() => import('pages/operations/field-expenses')));
const DailyReport = Loadable(lazy(() => import('pages/operations/daily-report')));

// Products & Inventory
const ProductsAdmin = Loadable(lazy(() => import('pages/products/products')));
const ProductDetails = Loadable(lazy(() => import('pages/products/product-detail')));
const CategoriesPage = Loadable(lazy(() => import('pages/products/categories')));
const WarehouseAdmin = Loadable(lazy(() => import('pages/products/warehouse')));

// Operations
const OrdersAdmin = Loadable(lazy(() => import('pages/orders/list')));
const OrderCreate = Loadable(lazy(() => import('pages/orders/create')));
const OrderDetails = Loadable(lazy(() => import('pages/orders/detail')));
const DispatchAdmin = Loadable(lazy(() => import('pages/operations/dispatch')));
const InvoicesAdmin = Loadable(lazy(() => import('pages/operations/invoices')));
const PendingPayments = Loadable(lazy(() => import('pages/operations/pending-payments')));

// Wallet & Ledger
const CollectionsAdmin = Loadable(lazy(() => import('pages/wallet/collections')));
const LedgerAdmin = Loadable(lazy(() => import('pages/wallet/ledger')));

// HR
const AttendanceAdmin = Loadable(lazy(() => import('pages/hr/attendance')));
const DailyWorkingAdmin = Loadable(lazy(() => import('pages/hr/daily-working-admin')));
const DealerVisitsAdmin = Loadable(lazy(() => import('pages/hr/dealer-visits')));
const ExpensesAdmin = Loadable(lazy(() => import('pages/hr/expenses')));
const TargetsAdmin = Loadable(lazy(() => import('pages/hr/targets')));
const TourPlansAdmin = Loadable(lazy(() => import('pages/hr/tour-plans')));

// Other
const ReportsAdmin = Loadable(lazy(() => import('pages/other/reports')));
const NotificationsAdmin = Loadable(lazy(() => import('pages/other/notifications')));
const SupportAdmin = Loadable(lazy(() => import('pages/other/support')));
const SettingsAdmin = Loadable(lazy(() => import('pages/other/settings')));
const ProfilePage = Loadable(lazy(() => import('pages/other/profile')));
const FarmersDirectory = Loadable(lazy(() => import('pages/farmers/directory')));

// Dealer specific
const DealerProducts = Loadable(lazy(() => import('pages/products/DealerProducts')));
const DealerOrders = Loadable(lazy(() => import('pages/orders/DealerOrders')));
const DealerSupport = Loadable(lazy(() => import('pages/other/DealerSupport')));
const DealerInvoices = Loadable(lazy(() => import('pages/operations/DealerInvoices')));
const DealerPayments = Loadable(lazy(() => import('pages/operations/DealerPayments')));
const DealerNotifications = Loadable(lazy(() => import('pages/other/DealerNotifications')));

const MainRoutes = {
  path: '/',
  children: [
    {
      path: 'admin',
      element: <DashboardLayout />,
      children: [
        { index: true, element: <DashboardDefault /> },
        { path: 'dashboard', element: <DashboardDefault /> },
        { path: 'products', element: <ProductsAdmin /> },
        { path: 'dealers', element: <DealersAdmin /> },
        { path: 'employees', element: <EmployeesAdmin /> },
        { path: 'orders', element: <OrdersAdmin /> },
        { path: 'dispatch', element: <DispatchAdmin /> },
        { path: 'invoices', element: <InvoicesAdmin /> },
        { path: 'collections', element: <CollectionsAdmin /> },
        { path: 'payments', element: <PendingPayments /> },
        { path: 'reports', element: <ReportsAdmin /> },
        { path: 'farmers', element: <FarmersDirectory /> },
        { path: 'settings', element: <SettingsAdmin /> }
      ]
    },
    {
      path: 'field',
      element: <DashboardLayout />,
      children: [
        { index: true, element: <DashboardDefault /> },
        { path: 'dashboard', element: <DashboardDefault /> },
        { path: 'daily-working', element: <DailyWorkingAdmin /> },
        { path: 'visits', element: <FieldDealerVisits /> },
        { path: 'dealers', element: <FieldDealers /> },
        { path: 'orders/create', element: <OrderCreate /> },
        { path: 'orders', element: <OrdersAdmin /> },
        { path: 'collections', element: <FieldCollections /> },
        { path: 'expenses', element: <FieldExpenses /> },
        { path: 'daily-report', element: <DailyReport /> },
        { path: 'profile', element: <ProfilePage /> }
      ]
    },
    {
      path: 'dealer',
      element: <DashboardLayout />,
      children: [
        { index: true, element: <DashboardDefault /> },
        { path: 'dashboard', element: <DashboardDefault /> },
        { path: 'products', element: <DealerProducts /> },
        { path: 'orders', element: <DealerOrders /> },
        { path: 'invoices', element: <DealerInvoices /> },
        { path: 'payments', element: <DealerPayments /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'support', element: <DealerSupport /> },
        { path: 'notifications', element: <DealerNotifications /> }
      ]
    }
  ]
};

export default MainRoutes;
