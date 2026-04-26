import React, {
  createContext,
  useContext,
  useState,
  cloneElement,
  isValidElement,
  ReactNode,
  MouseEvent,
} from "react";

// ================= CONTEXT =================
type DialogContextType = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const DialogContext = createContext<DialogContextType | null>(null);

function useDialog() {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("Dialog must be used inside Dialog");
  return ctx;
}

// ================= ROOT =================
type DialogProps = {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function Dialog({
  children,
  open: controlledOpen,
  onOpenChange,
}: DialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;

  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = (v: boolean) => {
    if (!isControlled) {
      setInternalOpen(v);
    }
    onOpenChange?.(v);
  };

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

// ================= TRIGGER =================
type TriggerChildProps = {
  onClick?: (e: MouseEvent) => void;
};

type DialogTriggerProps = {
  children: ReactNode;
  asChild?: boolean;
};

export function DialogTrigger({ children, asChild }: DialogTriggerProps) {
  const { setOpen } = useDialog();

  if (asChild && isValidElement(children)) {
    const child = children as React.ReactElement<TriggerChildProps>;

    return cloneElement(child, {
      onClick: (e: MouseEvent) => {
        child.props.onClick?.(e);
        setOpen(true);
      },
    });
  }

  return (
    <div onClick={() => setOpen(true)} className="inline-block cursor-pointer">
      {children}
    </div>
  );
}

// ================= OVERLAY =================
export function DialogOverlay() {
  const { open, setOpen } = useDialog();

  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-50 bg-black/70"
    />
  );
}

// ================= CONTENT =================
export function DialogContent({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { open, setOpen } = useDialog();

  if (!open) return null;

  return (
    <>
      <DialogOverlay />

      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg ${className}`}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 text-gray-500 hover:text-black"
          >
            ✕
          </button>

          {children}
        </div>
      </div>
    </>
  );
}

// ================= CLOSE =================
export function DialogClose({ children }: { children: ReactNode }) {
  const { setOpen } = useDialog();

  return (
    <div onClick={() => setOpen(false)} className="cursor-pointer">
      {children}
    </div>
  );
}

// ================= HEADER =================
export function DialogHeader({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex flex-col space-y-2 text-center sm:text-left ${className}`}
      {...props}
    />
  );
}

// ================= FOOTER =================
export function DialogFooter({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex flex-col-reverse sm:flex-row sm:justify-end gap-2 ${className}`}
      {...props}
    />
  );
}

// ================= TITLE =================
export function DialogTitle({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={`text-lg font-semibold ${className}`} {...props} />;
}

// ================= DESCRIPTION =================
export function DialogDescription({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={`text-sm text-gray-500 ${className}`} {...props} />;
}
