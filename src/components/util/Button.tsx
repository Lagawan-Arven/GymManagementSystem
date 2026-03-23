import React from "react";

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
  const DivStyle = "text-center py-2";
  const BtnStyle =
    " px-2 py-1 font-semibold rounded-xl border border-neutral-500 hover:border-red-500 hover:text-red-500 ";
  return (
    <div className={divStyle ? divStyle + DivStyle : DivStyle}>
      <button
        type={typeSubmit ? "submit" : undefined}
        onClick={onClick}
        className={btnStyle ? btnStyle + BtnStyle : BtnStyle}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
