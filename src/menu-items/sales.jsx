// assets
import {
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  DotChartOutlined,
  RiseOutlined,
  FileExcelOutlined,
  FilePdfOutlined
} from '@ant-design/icons';

// icons
const icons = {
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  DotChartOutlined,
  RiseOutlined,
  FileExcelOutlined,
  FilePdfOutlined
};

// ==============================|| MENU ITEMS - SALES ANALYTICS ||============================== //

const sales = {
  id: 'sales-analytics',
  title: 'Sales Analytics',
  type: 'group',
  children: [
    {
      id: 'sales-overview',
      title: 'Sales Overview',
      type: 'collapse',
      icon: icons.RiseOutlined,
      children: [
        {
          id: 'monthly-sales',
          title: 'Monthly Sales',
          type: 'item',
          url: '/app/reports'
        },
        {
          id: 'top-products',
          title: 'Top Products',
          type: 'item',
          url: '/app/reports'
        },
        {
          id: 'top-employees',
          title: 'Top Employees',
          type: 'item',
          url: '/app/reports'
        }
      ]
    },
    {
      id: 'performance',
      title: 'Performance',
      type: 'collapse',
      icon: icons.BarChartOutlined,
      children: [
        {
          id: 'dealer-performance',
          title: 'Dealer Performance',
          type: 'item',
          url: '/app/reports'
        },
        {
          id: 'distributor-performance',
          title: 'Distributor Performance',
          type: 'item',
          url: '/app/reports'
        },
        {
          id: 'territory-performance',
          title: 'Territory Performance',
          type: 'item',
          url: '/app/reports'
        }
      ]
    },
    {
      id: 'trends',
      title: 'Trends',
      type: 'collapse',
      icon: icons.LineChartOutlined,
      children: [
        {
          id: 'revenue-trends',
          title: 'Revenue Trends',
          type: 'item',
          url: '/app/reports'
        },
        {
          id: 'collection-trends',
          title: 'Collection Trends',
          type: 'item',
          url: '/app/reports'
        }
      ]
    },
    {
      id: 'dashboards',
      title: 'Dashboards',
      type: 'collapse',
      icon: icons.DotChartOutlined,
      children: [
        {
          id: 'sales-dashboard',
          title: 'Sales Dashboard',
          type: 'item',
          url: '/app/reports'
        },
        {
          id: 'inventory-dashboard',
          title: 'Inventory Dashboard',
          type: 'item',
          url: '/app/reports'
        }
      ]
    }
  ]
};

export default sales;
