import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";

const ProductEdit = () => {
  const { id } = useParams();
  const isNewProduct = id === "new"; 
  
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isNewProduct && id) {
      const fetchProduct = async () => {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setName(data.name);
        setPrice(data.price);
        setImage(data.image);
        setCategory(data.category);
        setStock(data.stock);
        setDescription(data.description);
      };
      fetchProduct();
    }
  }, [id, isNewProduct]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = { name, price, image, category, stock, description };

    try {
      const url = isNewProduct 
        ? "/api/products"
        : `/api/products/${id}`;
      
      const method = isNewProduct ? "POST" : "PUT";

      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        toast.success(isNewProduct ? "Product Created" : "Product Updated");
        navigate("/admin/products");
      } else {
        toast.error("Operation failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Link to="/admin/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
        </Link>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">{isNewProduct ? "Create Product" : "Edit Product"}</h1>
          
          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Price ($)</label>
                <Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Input value={category} onChange={(e) => setCategory(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Stock Count</label>
                <Input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Image URL</label>
              <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                className="min-h-[150px]"
                required 
              />
            </div>

            <Button type="submit" className="w-full">
              <Save className="mr-2 h-4 w-4" /> {isNewProduct ? "Create Product" : "Update Product"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;