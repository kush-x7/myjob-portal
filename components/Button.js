import clsx from "clsx";

const Button = ({ children, loading, type, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "customLineClamp customTextRows1 h-[46px] w-[148px] whitespace-nowrap rounded bg-primary-light_blue px-9 text-white transition-all hover:bg-primary-light_blue/90 disabled:cursor-not-allowed disabled:opacity-75",
        className
      )}
      disabled={loading}
      type={type}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  loading: false,
  onClick: () => {},
  type: "button",
  children: <></>
};

export default Button;
