import ResponsiveDrawer from "@/components/Menu/ResponsiveDrawer";
import { Html, Head, Main, NextScript } from "next/document";
import React, { useState } from "react";
import AuthLogin from "@/components/Auth/AuthLogin";

export default function Document() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <Html lang="en">
      <Head />

      <body>
        {/* <ResponsiveDrawer /> */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
