import React, { createContext, useContext, useState } from "react";

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

  if (!ctx) {
    throw new Error("Select components must be used inside Select");
  }

  return ctx;
}

// ---------- Trigger ----------
type TriggerProps = React.HTMLAttributes<HTMLDivElement>;

export function SelectTrigger({
  className = "",
  children,
  ...props
}: TriggerProps) {
  const { open, setOpen, disabled } = useSelect();

  return (
    <div
      {...props}
      onClick={() => {
        if (disabled) return;
        setOpen(!open);
      }}
      className={`
        flex h-10 w-full items-center justify-between
        rounded-md border px-3 text-sm transition
        ${
          disabled
            ? "bg-gray-100 cursor-not-allowed opacity-60"
            : "bg-white cursor-pointer hover:border-gray-400"
        }
        ${className}
      `}
    >
      {children}
      <span className="ml-2 text-xs">▼</span>
    </div>
  );
}

// ---------- Value ----------
export function SelectValue({
  placeholder = "Select...",
}: {
  placeholder?: string;
}) {
  const { value } = useSelect();

  return <span className="truncate">{value || placeholder}</span>;
}

// ---------- Content ----------
type ContentProps = {
  children: React.ReactNode;
};

export function SelectContent({ children }: ContentProps) {
  const { open } = useSelect();

  if (!open) return null;

  return (
    <div
      className="
        absolute left-0 top-full z-[9999]
        mt-1 w-full overflow-hidden
        rounded-md border bg-white shadow-lg
      "
    >
      {children}
    </div>
  );
}

// ---------- Item ----------
type ItemProps = {
  value: string;
  children: React.ReactNode;
};

export function SelectItem({ value, children }: ItemProps) {
  const { setValue, setOpen, disabled } = useSelect();

  return (
    <div
      onClick={() => {
        if (disabled) return;

        setValue(value);
        setOpen(false);
      }}
      className={`
        px-3 py-2 text-sm transition
        ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:bg-gray-100"
        }
      `}
    >
      {children}
    </div>
  );
}
