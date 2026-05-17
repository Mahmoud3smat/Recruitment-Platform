import { ChevronDown } from "lucide-react";
import React, {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

type Option = {
  value: string;
  label: string;
};

type SelectContextType = {
  value?: string;
  setValue: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  options: Option[];
  disabled?: boolean;
  selectedLabel: string;
  setSelectedLabel: (label: string) => void;
  listboxId: string;
};

const SelectContext = createContext<SelectContextType | null>(null);

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
  const [selectedLabel, setSelectedLabel] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <SelectContext.Provider
      value={{
        value,
        setValue: (nextValue) => onValueChange?.(nextValue),
        open,
        setOpen,
        options,
        disabled,
        selectedLabel,
        setSelectedLabel,
        listboxId,
      }}
    >
      <div ref={rootRef} className="relative w-full">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

function useSelect() {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error("Select components must be used inside Select");
  }

  return context;
}

type TriggerProps = React.HTMLAttributes<HTMLDivElement>;

export function SelectTrigger({
  className = "",
  children,
  ...props
}: TriggerProps) {
  const { open, setOpen, disabled, listboxId } = useSelect();

  return (
    <div
      {...props}
      role="combobox"
      aria-controls={listboxId}
      aria-disabled={disabled}
      aria-expanded={open}
      tabIndex={disabled ? -1 : 0}
      onClick={() => {
        if (!disabled) {
          setOpen(!open);
        }
      }}
      onKeyDown={(event) => {
        if (disabled) return;

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setOpen(!open);
        }
      }}
      className={`
        group flex h-11 w-full items-center justify-between gap-2 rounded-lg
        border px-3.5 text-sm font-medium shadow-sm outline-none
        transition-all duration-200
        ${
          disabled
            ? "cursor-not-allowed bg-muted/60 text-muted-foreground opacity-60"
            : "cursor-pointer border-input bg-card text-foreground hover:border-primary/50 hover:bg-secondary/40 focus:border-primary focus:ring-4 focus:ring-primary/10"
        }
        ${className}
      `}
    >
      <span className="min-w-0 flex-1 text-left">{children}</span>
      <ChevronDown
        className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
          open ? "rotate-180 text-primary" : "group-hover:text-foreground"
        }`}
      />
    </div>
  );
}

export function SelectValue({
  placeholder = "Select...",
}: {
  placeholder?: string;
}) {
  const { value, selectedLabel, options } = useSelect();
  const optionLabel = options.find((option) => option.value === value)?.label;

  return (
    <span
      className={`block truncate ${
        value ? "text-foreground" : "text-muted-foreground"
      }`}
    >
      {optionLabel || selectedLabel || value || placeholder}
    </span>
  );
}

type ContentProps = {
  children: React.ReactNode;
};

export function SelectContent({ children }: ContentProps) {
  const { open, listboxId } = useSelect();

  if (!open) return null;

  return (
    <div
      id={listboxId}
      role="listbox"
      className="
        absolute left-0 top-full z-[9999] mt-2 max-h-72 w-full origin-top
        overflow-y-auto rounded-lg border border-border bg-popover p-1.5
        text-popover-foreground shadow-xl shadow-foreground/10
        animate-in fade-in-0 zoom-in-95 slide-in-from-top-1
      "
    >
      {children}
    </div>
  );
}

type ItemProps = {
  value: string;
  children: React.ReactNode;
};

export function SelectItem({ value, children }: ItemProps) {
  const {
    value: selectedValue,
    setValue,
    setOpen,
    disabled,
    setSelectedLabel,
  } = useSelect();
  const selected = selectedValue === value;

  return (
    <div
      role="option"
      aria-selected={selected}
      onClick={() => {
        if (disabled) return;

        setValue(value);
        setSelectedLabel(typeof children === "string" ? children : value);
        setOpen(false);
      }}
      className={`
        relative flex select-none items-center gap-3 rounded-md px-3 py-2.5
        text-sm outline-none transition-colors
        ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:bg-secondary hover:text-foreground"
        }
        ${selected ? "bg-secondary text-foreground" : "text-muted-foreground"}
      `}
    >
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
          selected
            ? "border-primary bg-primary/10"
            : "border-border bg-background"
        }`}
      >
        {selected && <span className="h-2 w-2 rounded-full bg-primary" />}
      </span>
      <span className="truncate">{children}</span>
    </div>
  );
}
