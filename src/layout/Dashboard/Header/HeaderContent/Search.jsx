// material-ui
import Box from '@mui/material/Box';
import { Search as SearchIcon } from 'lucide-react';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

export default function Search() {
  return (
    <Box sx={{ width: '100%', ml: { xs: 0, md: 2 } }}>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon size={16} className="text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
        </div>
        <input 
          type="text" 
          placeholder="Ctrl + K" 
          className="block w-full sm:w-64 pl-9 pr-3 py-1.5 text-sm bg-slate-100/50 border border-transparent rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
        />
      </div>
    </Box>
  );
}
