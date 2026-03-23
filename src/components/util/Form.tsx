import type React from "react";
import Button from "./Button";

interface FormProp {
  inputStyle?: string;
  labelStyle?: string;
  inputId?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  value: any;
  isRequired?: boolean;
}

type InputProp = FormProp & {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({
  inputStyle,
  type = "text",
  placeholder,
  value,
  onChange,
  isRequired,
}: InputProp) => {
  const InputStyle = " rounded-xl px-2 py-1 border border-neutral-500 ";
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={inputStyle ? inputStyle + InputStyle : InputStyle}
      required={isRequired ? true : false}
    />
  );
};

export const LabelInput = ({ inputStyle }: InputProp) => {
  const LabelInputStyle = " rounded-xl px-2 py-1 border border-neutral-500 ";
  return (
    <label htmlFor="">
      <input
        type="text"
        className={inputStyle ? inputStyle + LabelInputStyle : LabelInputStyle}
      />
      ;
    </label>
  );
};

type SelectProp = FormProp & {
  options: { label: string; value: any }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Select = ({
  options,
  inputStyle,
  labelStyle,
  inputId,
  label,
  value,
  onChange,
}: SelectProp) => {
  const SelectStyle = " text-center rounded-[10px] border border-neutral-500 ";
  const LabelStyle = "";
  return (
    <label
      htmlFor={inputId}
      className={labelStyle ? labelStyle + LabelStyle : LabelStyle}
    >
      {label}
      {"  "}
      <select
        name=""
        id={inputId}
        value={value}
        onChange={onChange}
        className={inputStyle ? inputStyle + SelectStyle : SelectStyle}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export const Form = ({
  children,
  formStyle,
  onSubmit,
  btnLabel = "Submit",
}: {
  children: React.ReactNode;
  formStyle?: string;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  btnLabel?: string;
}) => {
  const FormStyle = " space-y-5 md:space-y-10 ";
  return (
    <form
      action=""
      onSubmit={onSubmit}
      className={formStyle ? formStyle + FormStyle : FormStyle}
    >
      {children}
      <Button label={btnLabel} typeSubmit />
    </form>
  );
};
