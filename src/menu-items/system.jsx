// assets
import {
  CustomerServiceOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  SafetyCertificateOutlined,
  ApiOutlined
} from '@ant-design/icons';

// icons
const icons = {
  CustomerServiceOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  SafetyCertificateOutlined,
  ApiOutlined
};

// ==============================|| MENU ITEMS - SYSTEM ||============================== //

const system = {
  id: 'system',
  title: 'System',
  type: 'group',
  children: [
    {
      id: 'support-tickets',
      title: 'Support Tickets',
      type: 'item',
      url: '/app/support',
      icon: icons.CustomerServiceOutlined
    },
    {
      id: 'settings',
      title: 'Settings',
      type: 'item',
      url: '/app/settings',
      icon: icons.SettingOutlined
    },
    {
      id: 'users',
      title: 'User Management',
      type: 'item',
      url: '/app/users',
      icon: icons.UserOutlined
    },
    {
      id: 'permissions',
      title: 'Permissions',
      type: 'item',
      url: '/app/settings',
      icon: icons.SafetyCertificateOutlined
    },
    {
      id: 'api-config',
      title: 'API & Integrations',
      type: 'item',
      url: '/app/settings',
      icon: icons.ApiOutlined
    },
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/app/profile',
      icon: icons.UserOutlined
    },
    {
      id: 'logout',
      title: 'Logout',
      type: 'item',
      url: '/login',
      icon: icons.LogoutOutlined,
      chip: {
        label: 'Exit',
        color: 'error',
        size: 'small',
        variant: 'outlined'
      }
    }
  ]
};

export default system;
