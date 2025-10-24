const Logo = ({ className = "", size = "default", showText = true }) => {
  const logoUrl =
    "https://comfachoco.com.co/wp-content/uploads/2020/05/logo-comfachoco-no-lema.svg";

  const sizes = {
    small: "h-8",
    default: "h-10",
    large: "h-14",
  };

  const logoSize = sizes[size] || sizes.default;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={logoUrl}
        alt="Comfachocó"
        className={`${logoSize} w-auto object-contain`}
      />
      {showText && (
        <div className="flex flex-col">
          <span className="font-raleway font-bold text-primary-dark text-base leading-tight">
            Comfachocó Gestión
          </span>
          <span className="font-roboto text-gray-medium text-xs">
            Gestión de talento
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
