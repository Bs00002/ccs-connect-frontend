// assets
import { AppstoreOutlined, TagsOutlined, StockOutlined, OrderedListOutlined } from '@ant-design/icons';

// icons
const icons = {
  AppstoreOutlined,
  TagsOutlined,
  StockOutlined,
  OrderedListOutlined
};

// ==============================|| MENU ITEMS - PRODUCTS & INVENTORY ||============================== //

const products = {
  id: 'products-inventory',
  title: 'Products & Inventory',
  type: 'group',
  children: [
    {
      id: 'products',
      title: 'Products',
      type: 'item',
      url: '/app/products',
      icon: icons.AppstoreOutlined
    },
    {
      id: 'categories',
      title: 'Categories',
      type: 'item',
      url: '/app/categories',
      icon: icons.TagsOutlined
    },
    {
      id: 'warehouse',
      title: 'Warehouse',
      type: 'item',
      url: '/app/warehouse',
      icon: icons.StockOutlined
    },
    {
      id: 'stock-ledger',
      title: 'Stock Ledger',
      type: 'item',
      url: '/app/warehouse',
      icon: icons.OrderedListOutlined
    }
  ]
};

export default products;
