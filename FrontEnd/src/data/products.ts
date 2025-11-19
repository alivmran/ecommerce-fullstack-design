export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
}

import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

export const products: Product[] = [
  {
    id: 1,
    name: "Classic Cotton T-Shirt",
    price: 29.99,
    image: product1,
    description: "Comfortable and versatile cotton t-shirt perfect for everyday wear. Made from 100% premium cotton with a modern fit.",
    category: "Clothing",
    stock: 50
  },
  {
    id: 2,
    name: "Urban Runner Sneakers",
    price: 89.99,
    image: product2,
    description: "High-performance athletic sneakers with superior cushioning and style. Perfect for running or casual wear.",
    category: "Footwear",
    stock: 30
  },
  {
    id: 3,
    name: "Leather Backpack",
    price: 129.99,
    image: product3,
    description: "Premium leather backpack with spacious compartments. Ideal for work, travel, or daily commute.",
    category: "Accessories",
    stock: 20
  },
  {
    id: 4,
    name: "Aviator Sunglasses",
    price: 149.99,
    image: product4,
    description: "Classic aviator sunglasses with UV protection. Timeless style meets modern lens technology.",
    category: "Accessories",
    stock: 45
  },
  {
    id: 5,
    name: "Stainless Steel Watch",
    price: 199.99,
    image: product5,
    description: "Elegant timepiece with stainless steel band and precision quartz movement. Water resistant up to 50m.",
    category: "Accessories",
    stock: 25
  },
  {
    id: 6,
    name: "Cable Knit Sweater",
    price: 79.99,
    image: product6,
    description: "Cozy cable knit sweater made from soft wool blend. Perfect for cool weather and layering.",
    category: "Clothing",
    stock: 35
  }
];
