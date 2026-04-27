import { forwardRef, InputHTMLAttributes } from "react";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  onCheckedChange?: (checked: boolean) => void;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", onCheckedChange, ...props }, ref) => {
    return (
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          ref={ref}
          className="peer hidden"
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          {...props}
        />

        <span
          className={`h-4 w-4 flex items-center justify-center rounded-sm border border-gray-400 bg-white 
          peer-checked:bg-blue-600 peer-checked:border-blue-600 
          peer-disabled:opacity-50 ${className}`}
        >
          <svg
            className="hidden peer-checked:block h-3 w-3 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </span>
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
