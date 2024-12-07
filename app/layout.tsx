import * as React from "react";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "@/context/AuthContext";
import { ProductProvider } from "@/context/ProductContext";
import { ToastProvider } from "@/context/ToastContext";
import "react-toastify/dist/ReactToastify.css";
import theme from "./theme";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ToastProvider>
            <AuthProvider>
              <ProductProvider>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  {props.children}
                </ThemeProvider>
              </ProductProvider>
            </AuthProvider>
          </ToastProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
