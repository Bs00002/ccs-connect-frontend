// assets
import {
  DashboardOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  PlusCircleOutlined,
  ShoppingCartOutlined,
  MoneyCollectOutlined,
  DollarOutlined,
  FileDoneOutlined,
  UserOutlined
} from '@ant-design/icons';

const icons = {
  DashboardOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  PlusCircleOutlined,
  ShoppingCartOutlined,
  MoneyCollectOutlined,
  DollarOutlined,
  FileDoneOutlined,
  UserOutlined
};

const distributorMenu = {
  items: [
    {
      id: 'group-field',
      title: 'Field Application',
      type: 'group',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          url: '/field/dashboard',
          icon: icons.DashboardOutlined
        },
        {
          id: 'daily-working',
          title: 'Daily Working',
          type: 'item',
          url: '/field/daily-working',
          icon: icons.CalendarOutlined
        },
        {
          id: 'dealer-visits',
          title: 'Dealer Visits',
          type: 'item',
          url: '/field/visits',
          icon: icons.EnvironmentOutlined
        },
        {
          id: 'dealers',
          title: 'Dealers',
          type: 'item',
          url: '/field/dealers',
          icon: icons.TeamOutlined
        },
        {
          id: 'create-order',
          title: 'Create Order',
          type: 'item',
          url: '/field/orders/create',
          icon: icons.PlusCircleOutlined
        },
        {
          id: 'orders',
          title: 'Orders',
          type: 'item',
          url: '/field/orders',
          icon: icons.ShoppingCartOutlined
        },
        {
          id: 'collections',
          title: 'Collections',
          type: 'item',
          url: '/field/collections',
          icon: icons.MoneyCollectOutlined
        },
        {
          id: 'expenses',
          title: 'Expenses',
          type: 'item',
          url: '/field/expenses',
          icon: icons.DollarOutlined
        },
        {
          id: 'daily-report',
          title: 'Daily Report',
          type: 'item',
          url: '/field/daily-report',
          icon: icons.FileDoneOutlined
        },
        {
          id: 'profile',
          title: 'Profile',
          type: 'item',
          url: '/field/profile',
          icon: icons.UserOutlined
        }
      ]
    }
  ]
};

export default distributorMenu;
