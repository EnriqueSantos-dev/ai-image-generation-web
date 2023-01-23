import React, { InputHTMLAttributes } from "react";
import cn from "clsx";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  name: string;
  isSurpriseMe?: boolean;
  handleSurpriseMe?: () => void;
  errorMessage?: string;
  hiddenInput?: boolean;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      labelText,
      name,
      isSurpriseMe,
      handleSurpriseMe,
      hiddenInput,
      errorMessage,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn("", {
          hidden: hiddenInput,
        })}
      >
        <div className="flex items-center gap-2 mb-2">
          {labelText && <label htmlFor={name}>{labelText}</label>}
          {isSurpriseMe && (
            <button
              type="button"
              title="generate random prompt"
              onClick={handleSurpriseMe}
              className="font-semibold text-xs bg-[#ececf1] py-1 px-2 rounded-[5px] text-black"
            >
              Surprise me
            </button>
          )}
        </div>
        <input
          {...props}
          id={name}
          name={name}
          ref={ref}
          className={cn(
            "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 hover:ring-1 focus:ring-[#4649ff] focus:border-[#4649ff] hover:ring-[#4649ff] hover:border-[#4649ff] outline-none block w-full p-3 transition-colors",
            {
              "ring-1 ring-red-500 border-red-500 focus:ring-red-500 focus:border-red-500 hover:ring-red-500 hover:border-red-500":
                errorMessage,
            }
          )}
        />
        {errorMessage && (
          <p className="text-xs text-red-500 mt-2">{errorMessage}</p>
        )}
      </div>
    );
  }
);

export default FormField;
