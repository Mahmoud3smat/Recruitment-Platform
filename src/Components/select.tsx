import { createContext, useContext, useState } from "react";

type Option = {
  value: string;
  label: string;
};

type SelectContextType = {
  value?: string;
  setValue: (v: string) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  options: Option[];
  disabled?: boolean;
};

const SelectContext = createContext<SelectContextType | null>(null);

// ---------- Root ----------
type SelectProps = {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  options?: Option[];
  disabled?: boolean;
};

export function Select({
  children,
  value,
  onValueChange,
  options = [],
  disabled = false,
}: SelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <SelectContext.Provider
      value={{
        value,
        setValue: (v) => onValueChange?.(v),
        open,
        setOpen,
        options,
        disabled,
      }}
    >
      <div className="relative w-full">{children}</div>
    </SelectContext.Provider>
  );
}

function useSelect() {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error("Select must be used inside Select");
  return ctx;
}

// ---------- Trigger ----------
export function SelectTrigger({
  className = "",
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open, setOpen, disabled } = useSelect();

  return (
    <div
      onClick={() => {
        if (disabled) return;
        setOpen(!open);
      }}
      className={`flex h-10 w-full items-center justify-between rounded-md border px-3 text-sm transition
        ${
          disabled
            ? "bg-gray-100 cursor-not-allowed opacity-60"
            : "bg-white cursor-pointer hover:border-gray-400"
        }
        ${className}`}
    >
      {children}
      <span className="ml-2">▼</span>
    </div>
  );
}

// ---------- Value ----------
export function SelectValue({
  placeholder = "Select...",
}: {
  placeholder?: string;
}) {
  const { value, options } = useSelect();

  return (
    <span className="truncate">
      {options.find((o) => o.value === value)?.label || placeholder}
    </span>
  );
}

// ---------- Content ----------
export function SelectContent({ children }: { children: React.ReactNode }) {
  const { open } = useSelect();

  if (!open) return null;

  return (
    <div className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-lg">
      {children}
    </div>
  );
}

// ---------- Item ----------
export function SelectItem({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const { setValue, setOpen, disabled } = useSelect();

  return (
    <div
      onClick={() => {
        if (disabled) return;
        setValue(value);
        setOpen(false);
      }}
      className={`px-3 py-2 text-sm transition
        ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:bg-gray-100"
        }`}
    >
      {children}
    </div>
  );
}