"use client";

import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

// import theme from "../styles/theme";
export function Providers({ children }) {
  return (
    <ChakraProvider>
     {children}
    </ChakraProvider>
  );
}
