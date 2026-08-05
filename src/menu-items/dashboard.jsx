// assets
import { DashboardOutlined, AlertOutlined, ThunderboltOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  AlertOutlined,
  ThunderboltOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Overview',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/app/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'notifications',
      title: 'Notifications',
      type: 'item',
      url: '/app/notifications',
      icon: icons.AlertOutlined,
      badge: true,
      badgeTitle: '8'
    },
    {
      id: 'quick-actions',
      title: 'Quick Actions',
      type: 'item',
      url: '/app/dashboard/default',
      icon: icons.ThunderboltOutlined,
      breadcrumbs: false,
      chip: {
        label: 'ERP',
        color: 'primary',
        size: 'small',
        variant: 'outlined'
      }
    }
  ]
};

export default dashboard;
