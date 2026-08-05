// assets
import {
  ShoppingCartOutlined,
  SendOutlined,
  FileTextOutlined,
  FundViewOutlined,
  MoneyCollectOutlined,
  BankOutlined
} from '@ant-design/icons';

// icons
const icons = {
  ShoppingCartOutlined,
  SendOutlined,
  FileTextOutlined,
  FundViewOutlined,
  MoneyCollectOutlined,
  BankOutlined
};

// ==============================|| MENU ITEMS - OPERATIONS ||============================== //

const operations = {
  id: 'operations',
  title: 'Operations',
  type: 'group',
  children: [
    {
      id: 'orders',
      title: 'Orders',
      type: 'item',
      url: '/app/orders',
      icon: icons.ShoppingCartOutlined
    },
    {
      id: 'dispatch',
      title: 'Dispatch',
      type: 'item',
      url: '/app/dispatch',
      icon: icons.SendOutlined
    },
    {
      id: 'invoices',
      title: 'Invoices',
      type: 'item',
      url: '/app/invoices',
      icon: icons.FileTextOutlined
    },
    {
      id: 'collections',
      title: 'Collections',
      type: 'item',
      url: '/app/collections',
      icon: icons.MoneyCollectOutlined
    },
    {
      id: 'ledger',
      title: 'My Ledger',
      type: 'item',
      url: '/app/ledger',
      icon: icons.FundViewOutlined
    }
  ]
};

export default operations;
