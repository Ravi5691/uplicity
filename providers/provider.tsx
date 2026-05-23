"use client";

import { ThemeProvider } from "next-themes";
import CustomCursorLayout from "@/app/component/custompointer"; 

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <CustomCursorLayout>
        {children}
      </CustomCursorLayout>
    </ThemeProvider>
  );
}
