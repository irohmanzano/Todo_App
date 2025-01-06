'use client'

import "./globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import RequireAuth from "./components/RequireAuth";
import { AuthContextProvider } from './context/AuthContextProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <RequireAuth>
            {children}
          </RequireAuth>
        </AuthContextProvider>
      </body>
    </html>
  );
}
