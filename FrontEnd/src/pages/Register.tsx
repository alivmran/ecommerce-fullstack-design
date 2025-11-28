import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import { toast } from "sonner";
import { Lock } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // New State for Admin Logic
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminSecret, setAdminSecret] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuthStore();

  // Auto-check the admin box if URL is /register?admin=true
  useEffect(() => {
    if (searchParams.get("admin") === "true") {
      setIsAdmin(true);
    }
  }, [searchParams]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send adminSecret to backend to pass the security check
        body: JSON.stringify({ name, email, password, isAdmin, adminSecret }),
      });
      const data = await res.json();

      if (res.ok) {
        login(data);
        toast.success(isAdmin ? "Admin Account Created!" : "Account created successfully!");
        navigate("/");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">{isAdmin ? "Create Admin Account" : "Sign Up"}</h2>
            <p className="mt-2 text-muted-foreground">Create your ShopHub account</p>
          </div>
          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Admin Toggle Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="admin" 
                checked={isAdmin} 
                onCheckedChange={(checked) => setIsAdmin(checked as boolean)} 
              />
              <label
                htmlFor="admin"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Register as Admin
              </label>
            </div>

            {/* Secret Key Input - Only visible when Admin is checked */}
            {isAdmin && (
              <div className="bg-red-50 p-4 rounded-md border border-red-200 animate-in fade-in slide-in-from-top-2">
                <label className="block text-sm font-medium mb-2 text-red-700 flex items-center">
                  <Lock className="w-4 h-4 mr-2" />
                  Admin Secret Key (Required)
                </label>
                <Input
                  type="password"
                  placeholder="Enter the secret code"
                  value={adminSecret}
                  onChange={(e) => setAdminSecret(e.target.value)}
                  className="border-red-300 focus-visible:ring-red-500"
                  required={isAdmin}
                />
                <p className="text-xs text-red-600 mt-2">
                  Ask your supervisor for the admin code.
                </p>
              </div>
            )}

            <Button type="submit" className="w-full">
              {isAdmin ? "Register Admin" : "Register"}
            </Button>
          </form>
          <div className="text-center mt-4">
             Have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;