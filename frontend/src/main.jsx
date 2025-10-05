import { RouterProvider } from "react-router/dom";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {router} from "./config/router";
import AuthGuard from "./components/AuthGuard";


const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthGuard>
          <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
          </QueryClientProvider>
      </AuthGuard>
  </StrictMode>
)
