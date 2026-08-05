import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import { Plus } from 'lucide-react';

// project imports
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <>
      {!downLG && <Search />}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}
      
      <Box sx={{ flexGrow: 1 }} />
      
      {/* Agritech Gradient Badge */}
      {!downLG && (
        <div className="hidden md:flex items-center mx-4">
          <span className="bg-gradient-to-r from-emerald-600 to-teal-500 text-transparent bg-clip-text font-bold text-sm tracking-wide">
            CCS Connect
          </span>
          <span className="mx-2 text-slate-300">|</span>
          <span className="text-slate-500 text-xs font-medium uppercase tracking-widest">
            Enterprise Partner ERP
          </span>
        </div>
      )}

      {/* Quick Action Button */}
      <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 mr-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-lg transition-colors border border-emerald-200">
        <Plus size={16} />
        New
      </button>

      <Notification />
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
}
