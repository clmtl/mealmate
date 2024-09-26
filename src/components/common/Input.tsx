import React from "react";
import { type UseFormRegister } from "react-hook-form";

interface IInputProps {
  spanValue: string;
  placeholder: string;
  register: UseFormRegister<any>;
  name: string;
  type?: string;
  required?: boolean;
}

const Input: React.FC<IInputProps> = (IInputProps) => {
  const { spanValue, placeholder, register, name, type, required } =
    IInputProps;

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{placeholder}</span>
      </label>
      <label className="input-group">
        <span>{spanValue}</span>
        <input
          required={required}
          type={type}
          placeholder={placeholder}
          className="input-bordered input"
          {...register(name)}
        />
      </label>
    </div>
  );
};

export default Input;
