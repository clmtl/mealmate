import React from "react";
import { type UseFormRegister } from "react-hook-form";
import { type UserInfosENUM, type UserInfosType } from "~/types/userInfos.type";

interface ISelectProps {
  register: UseFormRegister<UserInfosType>;
  selectName?: string;
  options: string[];
  name: UserInfosENUM;
  required: boolean;
}
const Select: React.FC<ISelectProps> = (ISelectProps) => {
  const { register, options, name, selectName, required } = ISelectProps;

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Your Objective</span>
      </label>
      <select
        defaultValue={selectName}
        {...register(name)}
        className="select-bordered select w-full max-w-xs"
        required={required}
      >
        <option disabled>{selectName}</option>
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
