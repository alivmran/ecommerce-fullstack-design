import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, User, LogOut, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";

interface HeaderProps {
  cartCount?: number;
}

const Header = ({ cartCount = 0 }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">

          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg group-hover:scale-110 transition-transform">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-primary">ShopHub</h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link to="/products" className="text-sm font-medium transition-colors hover:text-primary">
              Products
            </Link>

            {user && user.isAdmin && (
               <Link to="/admin/products" className="text-sm font-medium text-red-500 hover:text-red-700">
                 Admin Panel
               </Link>
            )}
          </nav>


          <div className="flex items-center space-x-4">
            
   
            {user ? (
               <div className="hidden md:flex items-center space-x-2">
                 <span className="text-sm font-medium">Hi, {user.name}</span>
                 <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                   <LogOut className="h-5 w-5" />
                 </Button>
               </div>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-xs flex items-center justify-center text-accent-foreground">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="text-sm font-medium transition-colors hover:text-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-sm font-medium transition-colors hover:text-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              
              {user && user.isAdmin && (
                <Link 
                  to="/admin/products" 
                  className="text-sm font-medium text-red-500 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Panel
                </Link>
              )}
              
              {user ? (
                <>
                  <div className="py-2 text-sm font-medium text-muted-foreground">
                    Signed in as: {user.name}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </Button>
                </>
              ) : (
                <Link 
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="default" className="w-full">Login</Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;