// assets
import {
  TeamOutlined,
  CalendarOutlined,
  CarOutlined,
  AuditOutlined,
  DollarOutlined,
  AimOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

// icons
const icons = {
  TeamOutlined,
  CalendarOutlined,
  CarOutlined,
  AuditOutlined,
  DollarOutlined,
  AimOutlined,
  CheckCircleOutlined
};

// ==============================|| MENU ITEMS - HUMAN RESOURCES ||============================== //

const humanResources = {
  id: 'human-resources',
  title: 'Human Resources',
  type: 'group',
  children: [
    {
      id: 'employees',
      title: 'Employee Management',
      type: 'item',
      url: '/app/employees',
      icon: icons.TeamOutlined
    },
    {
      id: 'attendance',
      title: 'Attendance',
      type: 'item',
      url: '/app/attendance',
      icon: icons.CalendarOutlined
    },
    {
      id: 'dealer-visits',
      title: 'Dealer Visits',
      type: 'item',
      url: '/app/dealer-visits',
      icon: icons.CheckCircleOutlined
    },
    {
      id: 'expenses',
      title: 'Expenses',
      type: 'item',
      url: '/app/expenses',
      icon: icons.DollarOutlined
    },
    {
      id: 'targets',
      title: 'Targets',
      type: 'item',
      url: '/app/targets',
      icon: icons.AimOutlined
    },
    {
      id: 'travel',
      title: 'TA / DA & Travel',
      type: 'item',
      url: '/app/expenses',
      icon: icons.CarOutlined
    },
    {
      id: 'hr-audit',
      title: 'HR Audit',
      type: 'item',
      url: '/app/employees',
      icon: icons.AuditOutlined
    }
  ]
};

export default humanResources;
