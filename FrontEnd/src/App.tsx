import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/login"; // Ensure file is named login.tsx
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ProductList from "./pages/admin/Productlist";
import ProductEdit from "./pages/admin/ProductEdit";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* --- Public Routes (Anyone can access) --- */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* --- Protected Routes (Must be logged in) --- */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/products" 
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/product/:id" 
            element={
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } 
          />
          
          {}
          <Route 
            path="/admin/products" 
            element={
              <ProtectedRoute adminOnly>
                <ProductList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/product/:id/edit" 
            element={
              <ProtectedRoute adminOnly>
                <ProductEdit />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/product/new" 
            element={
              <ProtectedRoute adminOnly>
                <ProductEdit />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;