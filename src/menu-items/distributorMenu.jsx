// assets
import {
  DashboardOutlined,
  CalendarOutlined,
  DollarOutlined,
  PlusCircleOutlined,
  ShoppingCartOutlined,
  CustomerServiceOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';

const icons = {
  DashboardOutlined,
  CalendarOutlined,
  DollarOutlined,
  PlusCircleOutlined,
  ShoppingCartOutlined,
  CustomerServiceOutlined,
  UserOutlined,
  LogoutOutlined
};

const distributorMenu = {
  items: [
    {
      id: 'group-field',
      title: 'Field Operations',
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
          id: 'attendance',
          title: 'Attendance',
          type: 'item',
          url: '/field/attendance',
          icon: icons.CalendarOutlined
        },
        {
          id: 'expenses',
          title: 'Expenses',
          type: 'item',
          url: '/field/expenses',
          icon: icons.DollarOutlined
        },
        {
          id: 'create-order',
          title: 'Create Orders',
          type: 'item',
          url: '/field/orders/create',
          icon: icons.PlusCircleOutlined
        },
        {
          id: 'my-orders',
          title: 'My Created Orders',
          type: 'item',
          url: '/field/orders',
          icon: icons.ShoppingCartOutlined
        },
        {
          id: 'support',
          title: 'Support',
          type: 'item',
          url: '/field/support',
          icon: icons.CustomerServiceOutlined
        },
        {
          id: 'profile',
          title: 'My Profile',
          type: 'item',
          url: '/field/profile',
          icon: icons.UserOutlined
        },
        {
          id: 'logout',
          title: 'Logout',
          type: 'item',
          url: '/logout',
          icon: icons.LogoutOutlined
        }
      ]
    }
  ]
};

export default distributorMenu;
