import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Header from "@/components/Header";
import { toast } from "sonner";
import { Edit, Plus, Trash2 } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      toast.error("Error fetching products");
    }
  };

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/login");
    } else {
      fetchProducts();
    }
  }, [user, navigate]);

  const deleteHandler = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        if (res.ok) {
          toast.success("Product deleted");
          fetchProducts(); 
        } else {
          toast.error("Failed to delete");
        }
      } catch (error) {
        toast.error("Error deleting product");
      }
    }
  };

  const createHandler = () => {
    navigate("/admin/product/new"); 
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Products</h1>
          <Button onClick={createHandler}>
            <Plus className="mr-2 h-4 w-4" /> Create Product
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>NAME</TableHead>
                <TableHead>PRICE</TableHead>
                <TableHead>CATEGORY</TableHead>
                <TableHead>STOCK</TableHead>
                <TableHead className="text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell className="font-medium">{product._id.substring(0, 10)}...</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;