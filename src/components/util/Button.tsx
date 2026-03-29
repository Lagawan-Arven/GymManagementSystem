const Button = ({
  label,
  divStyle,
  btnStyle,
  onClick,
  typeSubmit,
}: {
  label: string;
  divStyle?: string;
  btnStyle?: string;
  onClick?: () => void;
  typeSubmit?: boolean;
}) => {
  return (
    <div className={`${divStyle} text-center py-1 md:py-2`}>
      <button
        type={typeSubmit ? "submit" : undefined}
        onClick={onClick}
        className={`${btnStyle} px-2 py-1 font-bold rounded-xl border border-neutral-500 hover:border-red-500 hover:text-red-500`}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
