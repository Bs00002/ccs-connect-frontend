// assets
import {
  FileDoneOutlined,
  TeamOutlined,
  CrownOutlined,
  ShopOutlined,
  CalendarOutlined,
  DollarOutlined,
  StockOutlined,
  FundOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  CloudDownloadOutlined
} from '@ant-design/icons';

// icons
const icons = {
  FileDoneOutlined,
  TeamOutlined,
  CrownOutlined,
  ShopOutlined,
  CalendarOutlined,
  DollarOutlined,
  StockOutlined,
  FundOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  CloudDownloadOutlined
};

// ==============================|| MENU ITEMS - REPORTS ||============================== //

const reports = {
  id: 'reports',
  title: 'Reports & Exports',
  type: 'group',
  children: [
    {
      id: 'all-reports',
      title: 'Reports Center',
      type: 'item',
      url: '/app/reports',
      icon: icons.FileDoneOutlined
    },
    {
      id: 'sales-reports',
      title: 'Sales Reports',
      type: 'item',
      url: '/app/reports',
      icon: icons.FundOutlined
    },
    {
      id: 'employee-reports',
      title: 'Employee Reports',
      type: 'item',
      url: '/app/reports',
      icon: icons.TeamOutlined
    },
    {
      id: 'distributor-reports',
      title: 'Distributor Reports',
      type: 'item',
      url: '/app/reports',
      icon: icons.CrownOutlined
    },
    {
      id: 'dealer-reports',
      title: 'Dealer Reports',
      type: 'item',
      url: '/app/reports',
      icon: icons.ShopOutlined
    },
    {
      id: 'attendance-reports',
      title: 'Attendance Reports',
      type: 'item',
      url: '/app/reports',
      icon: icons.CalendarOutlined
    },
    {
      id: 'expense-reports',
      title: 'Expense Reports',
      type: 'item',
      url: '/app/reports',
      icon: icons.DollarOutlined
    },
    {
      id: 'warehouse-reports',
      title: 'Warehouse Reports',
      type: 'item',
      url: '/app/reports',
      icon: icons.StockOutlined
    },
    {
      id: 'invoice-reports',
      title: 'Invoice Reports',
      type: 'item',
      url: '/app/reports',
      icon: icons.FileTextOutlined
    },
    {
      id: 'exports',
      title: 'Data Exports',
      type: 'collapse',
      icon: icons.CloudDownloadOutlined,
      children: [
        {
          id: 'export-pdf',
          title: 'Export to PDF',
          type: 'item',
          url: '/app/reports',
          icon: icons.FilePdfOutlined
        },
        {
          id: 'export-excel',
          title: 'Export to Excel',
          type: 'item',
          url: '/app/reports',
          icon: icons.FileExcelOutlined
        }
      ]
    }
  ]
};

export default reports;
