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
};

const SelectContext = createContext<SelectContextType | null>(null);

export function Select({
  children,
  value,
  onValueChange,
  options = [],
}: {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  options?: Option[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <SelectContext.Provider
      value={{
        value,
        setValue: (v) => onValueChange?.(v),
        open,
        setOpen,
        options,
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

export function SelectTrigger({
  className = "",
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open, setOpen } = useSelect();

  return (
    <div
      onClick={() => setOpen(!open)}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 text-sm cursor-pointer focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      {children}
      <span>▼</span>
    </div>
  );
}

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

<<<<<<< HEAD
export function SelectContent({ children }: { children: React.ReactNode }) {
=======
export function SelectContent({
  children,
}: {
  children: React.ReactNode;
}) {
>>>>>>> 8d61079345fdb1500974bd971b6ea510e7a833c3
  const { open } = useSelect();

  if (!open) return null;

  return (
    <div className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-lg">
      {children}
    </div>
  );
}

export function SelectItem({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const { setValue, setOpen } = useSelect();

  return (
    <div
      onClick={() => {
        setValue(value);
        setOpen(false);
      }}
      className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100"
    >
      {children}
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 8d61079345fdb1500974bd971b6ea510e7a833c3
