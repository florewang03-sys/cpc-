const ChurchLogo = ({
  className = "",
  size = "md",
  showText = true,
  variant = "light"
}) => {
  const sizeMap = {
    sm: { box: "w-9 h-9", icon: "w-7 h-7", textTitle: "text-sm", textSub: "text-[9px]" },
    md: { box: "w-12 h-12", icon: "w-10 h-10", textTitle: "text-base", textSub: "text-[10px]" },
    lg: { box: "w-16 h-16", icon: "w-14 h-14", textTitle: "text-xl", textSub: "text-xs" },
    xl: { box: "w-24 h-24", icon: "w-20 h-20", textTitle: "text-2xl", textSub: "text-sm" }
  };
  const currentSize = sizeMap[size];
  return <div className={`flex items-center gap-3 select-none ${className}`}>
      {
    /* Authentic Circular Church Logo Emblem as provided */
  }
      <div className={`relative ${currentSize.box} shrink-0 rounded-full flex items-center justify-center`}>
        <svg
    viewBox="0 0 160 160"
    className="w-full h-full drop-shadow-md transition-transform hover:scale-105 duration-300"
  >
          <defs>
            {
    /* Arched paths for circular text */
  }
            <path
    id="textPathUpper"
    d="M 18,80 A 62,62 0 1,1 142,80"
    fill="none"
  />
            <path
    id="textPathLower"
    d="M 142,80 A 62,62 0 1,1 18,80"
    fill="none"
  />
            {
    /* Rich gold gradient adapted to the logo */
  }
            <linearGradient id="goldSealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="25%" stopColor="#eab308" />
              <stop offset="60%" stopColor="#ca8a04" />
              <stop offset="90%" stopColor="#a16207" />
              <stop offset="100%" stopColor="#713f12" />
            </linearGradient>
            <linearGradient id="innerRimGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#854d0e" />
            </linearGradient>
            {
    /* Sanctuary Clip Path */
  }
            <clipPath id="churchInnerClip">
              <circle cx="80" cy="80" r="49" />
            </clipPath>
          </defs>

          {
    /* Outer Ring */
  }
          <circle
    cx="80"
    cy="80"
    r="77"
    fill="#fcfbf7"
    stroke="url(#goldSealGradient)"
    strokeWidth="4"
  />

          {
    /* Inner Ring */
  }
          <circle
    cx="80"
    cy="80"
    r="53"
    fill="none"
    stroke="url(#innerRimGradient)"
    strokeWidth="2.5"
  />

          {
    /* Circular Text: COMMUNAUTÉ POUR CHRIST DE NGANGUE */
  }
          <text
    fontSize="8.6"
    fontWeight="900"
    letterSpacing="2.8"
    fill="#854d0e"
    className="font-serif uppercase"
  >
            <textPath href="#textPathUpper" startOffset="50%" textAnchor="middle">
              COMMUNAUTÉ POUR CHRIST
            </textPath>
          </text>
          <text
    fontSize="9"
    fontWeight="900"
    letterSpacing="3.6"
    fill="#854d0e"
    className="font-serif uppercase"
  >
            <textPath href="#textPathLower" startOffset="50%" textAnchor="middle">
              DE NGANGUE
            </textPath>
          </text>

          {
    /* Sanctuary interior photo in the central circle */
  }
          <g clipPath="url(#churchInnerClip)">
            <image
    href="https://images.unsplash.com/photo-1548625361-195fe5749f7e?w=400&auto=format&fit=crop&q=80"
    x="28"
    y="28"
    width="104"
    height="104"
    preserveAspectRatio="xMidYMid slice"
  />
            {
    /* Warm spiritual overlay */
  }
            <circle cx="80" cy="80" r="49" fill="rgba(40, 25, 10, 0.4)" />

            {
    /* Glowing Golden Cross in Sanctuary Altar */
  }
            <g transform="translate(80, 75)">
              <rect x="-2.5" y="-24" width="5" height="38" fill="#fef08a" opacity="0.95" rx="1" />
              <rect x="-13" y="-15" width="26" height="5" fill="#fef08a" opacity="0.95" rx="1" />
              <circle cx="0" cy="-12.5" r="7" fill="none" stroke="#fef08a" strokeWidth="1.8" opacity="0.85" />
            </g>
          </g>

          {
    /* Fine gold border over the image */
  }
          <circle
    cx="80"
    cy="80"
    r="49"
    fill="none"
    stroke="url(#goldSealGradient)"
    strokeWidth="2"
  />
        </svg>
      </div>

      {
    /* Brand Text */
  }
      {showText && <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-tight">
            <span
    className={`font-display font-extrabold tracking-wide ${currentSize.textTitle} ${variant === "dark" ? "text-white" : "text-stone-900"}`}
  >
              CPC <span className="text-amber-500 font-bold">CONNECT</span>
            </span>
          </div>
          <span
    className={`font-serif tracking-normal leading-tight font-medium ${currentSize.textSub} ${variant === "dark" ? "text-amber-300/90" : "text-amber-800"}`}
  >
            Communauté pour Christ • Amour, Espérance et Foi
          </span>
        </div>}
    </div>;
};
export {
  ChurchLogo
};
