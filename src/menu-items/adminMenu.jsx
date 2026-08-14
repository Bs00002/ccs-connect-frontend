// assets
import {
  DashboardOutlined,
  AppstoreOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  WalletOutlined,
  BarChartOutlined,
  SettingOutlined,
  FundOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  BellOutlined,
  LinkOutlined,
  UserOutlined
} from '@ant-design/icons';

const icons = {
  DashboardOutlined,
  AppstoreOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  WalletOutlined,
  BarChartOutlined,
  SettingOutlined,
  FundOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  BellOutlined,
  LinkOutlined,
  UserOutlined
};

const adminMenu = {
  items: [
    {
      id: 'group-admin',
      title: 'Admin Operations',
      type: 'group',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          url: '/admin/dashboard',
          icon: icons.DashboardOutlined
        },
        {
          id: 'dealers',
          title: 'Dealers',
          type: 'item',
          url: '/admin/dealers',
          icon: icons.TeamOutlined
        },
        {
          id: 'employees',
          title: 'Distributor / Employee',
          type: 'item',
          url: '/admin/employees',
          icon: icons.UsergroupAddOutlined
        },
        {
          id: 'assignments',
          title: 'Assignments',
          type: 'item',
          url: '/admin/assignments',
          icon: icons.LinkOutlined
        },
        {
          id: 'products',
          title: 'Products',
          type: 'item',
          url: '/admin/products',
          icon: icons.AppstoreOutlined
        },
        {
          id: 'orders',
          title: 'Orders',
          type: 'item',
          url: '/admin/orders',
          icon: icons.ShoppingCartOutlined
        },
        {
          id: 'invoices',
          title: 'Invoices',
          type: 'item',
          url: '/admin/invoices',
          icon: icons.FileTextOutlined
        },
        {
          id: 'payments',
          title: 'Payments',
          type: 'item',
          url: '/admin/payments',
          icon: icons.WalletOutlined
        },
        {
          id: 'expenses',
          title: 'Expenses',
          type: 'item',
          url: '/admin/expenses',
          icon: icons.FundOutlined
        },
        {
          id: 'attendance',
          title: 'Attendance',
          type: 'item',
          url: '/admin/attendance',
          icon: icons.CalendarOutlined
        },
        {
          id: 'tracking',
          title: 'Live Tracking',
          type: 'item',
          url: '/admin/tracking',
          icon: icons.EnvironmentOutlined
        },
        {
          id: 'notifications',
          title: 'Notifications',
          type: 'item',
          url: '/admin/notifications',
          icon: icons.BellOutlined
        },
        {
          id: 'reports',
          title: 'Reports',
          type: 'item',
          url: '/admin/reports',
          icon: icons.BarChartOutlined
        },
        {
          id: 'settings',
          title: 'Settings',
          type: 'item',
          url: '/admin/settings',
          icon: icons.SettingOutlined
        },
        {
          id: 'profile',
          title: 'Profile',
          type: 'item',
          url: '/admin/profile',
          icon: icons.UserOutlined
        }
      ]
    }
  ]
};

export default adminMenu;
