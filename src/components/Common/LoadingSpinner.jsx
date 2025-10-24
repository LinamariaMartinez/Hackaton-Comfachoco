const LoadingSpinner = ({ size = "default", text = "", className = "" }) => {
  const sizes = {
    small: "w-4 h-4 border-2",
    default: "w-8 h-8 border-3",
    large: "w-12 h-12 border-4",
  };

  const spinnerSize = sizes[size] || sizes.default;

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div
        className={`
          ${spinnerSize}
          border-primary-green border-t-transparent
          rounded-full animate-spin
        `}
        style={{
          borderTopColor: 'transparent',
        }}
      />
      {text && (
        <p className="font-roboto text-gray-medium text-sm animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
