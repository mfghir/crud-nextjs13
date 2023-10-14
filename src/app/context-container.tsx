"use client";

import React from "react";
import {
  QueryClientProvider,
  Hydrate,
  DehydratedState,
  QueryClient,
} from "@tanstack/react-query";

export interface ContextContainerProps {
  state?: DehydratedState;
  children: React.ReactNode;
}

export const ContextContainer: React.FC<ContextContainerProps> = ({
  state,
  children,
}) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={state}>{children}</Hydrate>
    </QueryClientProvider>
  );
};