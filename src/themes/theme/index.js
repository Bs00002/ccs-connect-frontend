// ==============================|| PRESET THEME - CCS GREEN ||============================== //

export default function Default(colors) {
  const { red, gold, cyan, green, grey } = colors;
  const greyColors = {
    0: grey[0],
    50: grey[1],
    100: grey[2],
    200: grey[3],
    300: grey[4],
    400: grey[5],
    500: grey[6],
    600: grey[7],
    700: grey[8],
    800: grey[9],
    900: grey[10],
    A50: grey[15],
    A100: grey[11],
    A200: grey[12],
    A400: grey[13],
    A700: grey[14],
    A800: grey[16]
  };
  const contrastText = '#fff';

  return {
    primary: {
      lighter: '#d1fae5',
      100: '#a7f3d0',
      200: '#6ee7b7',
      light: '#34d399',
      400: '#10B981', // Vivid Emerald Green
      main: '#059669',
      dark: '#047857',
      700: '#065f46',
      darker: '#064e3b',
      900: '#0F291E', // Deep Forest
      contrastText: '#fff'
    },
    secondary: {
      lighter: '#e0e7ff',
      light: '#c7d2fe',
      main: '#6366F1', // Royal Indigo
      dark: '#4f46e5',
      darker: '#4338ca',
      contrastText: '#fff'
    },
    error: {
      lighter: '#ffe4e6',
      light: '#fecdd3',
      main: '#F43F5E', // Rose
      dark: '#e11d48',
      darker: '#be123c',
      contrastText: '#fff'
    },
    warning: {
      lighter: '#fef3c7',
      light: '#fde68a',
      main: '#F59E0B', // Electric Amber
      dark: '#d97706',
      darker: '#b45309',
      contrastText: greyColors[100]
    },
    info: {
      lighter: '#cffafe',
      light: '#a5f3fc',
      main: '#06B6D4', // Soft Cyan
      dark: '#0891b2',
      darker: '#0e7490',
      contrastText: '#fff'
    },
    success: {
      lighter: '#d1fae5',
      light: '#6ee7b7',
      main: '#10B981', // Emerald Green
      dark: '#047857',
      darker: '#064e3b',
      contrastText: '#fff'
    },
    grey: greyColors
  };
}
