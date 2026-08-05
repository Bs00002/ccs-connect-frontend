// assets
import {
  DashboardOutlined,
  AppstoreOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  ShoppingCartOutlined,
  CarOutlined,
  FileTextOutlined,
  MoneyCollectOutlined,
  WalletOutlined,
  BarChartOutlined,
  SettingOutlined,
  ExperimentOutlined
} from '@ant-design/icons';

const icons = {
  DashboardOutlined,
  AppstoreOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  ShoppingCartOutlined,
  CarOutlined,
  FileTextOutlined,
  MoneyCollectOutlined,
  WalletOutlined,
  BarChartOutlined,
  SettingOutlined,
  ExperimentOutlined
};

const adminMenu = {
  items: [
    {
      id: 'group-admin',
      title: 'Admin Operating Panel',
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
          id: 'products',
          title: 'Products',
          type: 'item',
          url: '/admin/products',
          icon: icons.AppstoreOutlined
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
          id: 'orders',
          title: 'Orders',
          type: 'item',
          url: '/admin/orders',
          icon: icons.ShoppingCartOutlined
        },
        {
          id: 'dispatch',
          title: 'Dispatch',
          type: 'item',
          url: '/admin/dispatch',
          icon: icons.CarOutlined
        },
        {
          id: 'invoices',
          title: 'Invoices',
          type: 'item',
          url: '/admin/invoices',
          icon: icons.FileTextOutlined
        },
        {
          id: 'collections',
          title: 'Collections',
          type: 'item',
          url: '/admin/collections',
          icon: icons.MoneyCollectOutlined
        },
        {
          id: 'payments',
          title: 'Payments',
          type: 'item',
          url: '/admin/payments',
          icon: icons.WalletOutlined
        },
        {
          id: 'reports',
          title: 'Reports',
          type: 'item',
          url: '/admin/reports',
          icon: icons.BarChartOutlined
        },
        {
          id: 'farmers',
          title: 'Farmers CRM',
          type: 'item',
          url: '/admin/farmers',
          icon: icons.TeamOutlined
        },
        {
          id: 'settings',
          title: 'Settings',
          type: 'item',
          url: '/admin/settings',
          icon: icons.SettingOutlined
        }
      ]
    }
  ]
};

export default adminMenu;
