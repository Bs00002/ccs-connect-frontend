// assets
import { ShopOutlined, UserOutlined, CrownOutlined, ApartmentOutlined } from '@ant-design/icons';

// icons
const icons = {
  ShopOutlined,
  UserOutlined,
  CrownOutlined,
  ApartmentOutlined
};

// ==============================|| MENU ITEMS - MANAGEMENT ||============================== //

const management = {
  id: 'management',
  title: 'Partner Management',
  type: 'group',
  children: [
    {
      id: 'approvals',
      title: 'Approvals',
      type: 'item',
      url: '/app/approvals',
      icon: icons.UserOutlined
    },
    {
      id: 'distributors',
      title: 'Distributors',
      type: 'item',
      url: '/app/distributors',
      icon: icons.CrownOutlined
    },
    {
      id: 'dealers',
      title: 'Dealers',
      type: 'item',
      url: '/app/dealers',
      icon: icons.ShopOutlined
    },
    {
      id: 'territories',
      title: 'Territories',
      type: 'item',
      url: '/app/distributors',
      icon: icons.ApartmentOutlined
    },
    {
      id: 'contacts',
      title: 'Contacts',
      type: 'item',
      url: '/app/dealers',
      icon: icons.UserOutlined
    }
  ]
};

export default management;
