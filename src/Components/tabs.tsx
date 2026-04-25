import React, { createContext, useContext, useState } from "react";

type TabsContextType = {
  value: string;
  setValue: (v: string) => void;
};

const TabsContext = createContext<TabsContextType | null>(null);

function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs must be used داخل Tabs");
  return ctx;
}

// ---------- Root ----------
export function Tabs({
  defaultValue,
  children,
}: {
  defaultValue: string;
  children: React.ReactNode;
}) {
  const [value, setValue] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  );
}

// ---------- List ----------
export function TabsList({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 ${className}`}
      {...props}
    />
  );
}

// ---------- Trigger ----------
export function TabsTrigger({
  value,
  className = "",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }) {
  const { value: active, setValue } = useTabs();

  const isActive = active === value;

  return (
    <button
      onClick={() => setValue(value)}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus:outline-none ${
        isActive
          ? "bg-white text-black shadow-sm"
          : "text-gray-500 hover:text-black"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// ---------- Content ----------
export function TabsContent({
  value,
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { value: string }) {
  const { value: active } = useTabs();

  if (active !== value) return null;

  return (
    <div className={`mt-2 focus:outline-none ${className}`} {...props}>
      {children}
    </div>
  );
}