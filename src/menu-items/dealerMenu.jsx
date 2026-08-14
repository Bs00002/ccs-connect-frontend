// assets
import {
  DashboardOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  WalletOutlined,
  UserOutlined,
  CustomerServiceOutlined
} from '@ant-design/icons';

const icons = {
  DashboardOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  WalletOutlined,
  UserOutlined,
  CustomerServiceOutlined
};

const dealerMenu = {
  items: [
    {
      id: 'group-dealer',
      title: 'Dealer Portal',
      type: 'group',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          url: '/dealer/dashboard',
          icon: icons.DashboardOutlined
        },
        {
          id: 'products',
          title: 'Products',
          type: 'item',
          url: '/dealer/products',
          icon: icons.AppstoreOutlined
        },
        {
          id: 'orders',
          title: 'My Orders',
          type: 'item',
          url: '/dealer/orders',
          icon: icons.ShoppingCartOutlined
        },
        {
          id: 'payments',
          title: 'Payments',
          type: 'item',
          url: '/dealer/payments',
          icon: icons.WalletOutlined
        },
        {
          id: 'invoices',
          title: 'Invoices',
          type: 'item',
          url: '/dealer/invoices',
          icon: icons.FileTextOutlined
        },
        {
          id: 'support',
          title: 'Support',
          type: 'item',
          url: '/dealer/support',
          icon: icons.CustomerServiceOutlined
        },
        {
          id: 'profile',
          title: 'My Profile',
          type: 'item',
          url: '/dealer/profile',
          icon: icons.UserOutlined
        }
      ]
    }
  ]
};

export default dealerMenu;
