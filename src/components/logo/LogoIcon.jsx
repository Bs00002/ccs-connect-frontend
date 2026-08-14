// ==============================|| CHITRA CROP SCIENCE LOGO ICON ||============================== //

export default function LogoIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="chitraGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#43A047" />
          <stop offset="100%" stopColor="#1B5E20" />
        </linearGradient>
        <linearGradient id="chitraNavy" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#283593" />
          <stop offset="100%" stopColor="#1A237E" />
        </linearGradient>
      </defs>

      {/* Hexagonal Outer Aperture Facets */}
      <path d="M50 5 L85 25 L85 40 L50 20 Z" fill="url(#chitraNavy)" />
      <path d="M85 25 L85 65 L70 65 L70 30 Z" fill="url(#chitraGreen)" />
      <path d="M85 65 L50 85 L50 70 L75 55 Z" fill="url(#chitraNavy)" />
      <path d="M50 85 L15 65 L30 65 L40 75 Z" fill="url(#chitraGreen)" />
      <path d="M15 65 L15 25 L30 35 L30 60 Z" fill="url(#chitraNavy)" />
      <path d="M15 25 L50 5 L45 20 L25 30 Z" fill="url(#chitraGreen)" />

      {/* Central Emblem Base */}
      <circle cx="50" cy="45" r="24" fill="#FFFFFF" stroke="#E8F5E9" strokeWidth="2" />
      
      {/* Inner C & Leaf */}
      <path
        d="M58 35 C48 33 40 39 40 47 C40 55 48 60 58 57 C53 59 44 56 44 47 C44 39 52 35 58 35 Z"
        fill="url(#chitraNavy)"
      />
      <path
        d="M50 36 C57 37 62 43 60 51 C58 59 48 57 48 57 C48 57 55 53 55 46 C55 41 51 38 50 36 Z"
        fill="url(#chitraGreen)"
      />
      <path
        d="M52 42 Q57 47 51 52 Q53 47 52 42 Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

