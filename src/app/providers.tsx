"use client";
import { store } from "@/store/store";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <NextUIProvider>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </NextUIProvider>
    </Provider>
  );
}
