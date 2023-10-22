"use client"
import React, { ReactNode } from 'react'
// import { QueryClient ,QueryClientProvider } from 'react-query'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'


const queryClient = new QueryClient()


const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>

    )
}

export default ReactQueryProvider