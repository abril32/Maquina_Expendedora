"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Plus } from "lucide-react"
//import { MercadoPagoModal } from "@/components/mercado-pago-modal"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
}

interface CartItem extends Product {
  quantity: number
}

const products: Product[] = [
  {
    id: 1,
    name: "Papas Fritas Lays",
    description: "Bolsa de papas fritas crujientes",
    price: 900,
    image: "https://res.cloudinary.com/donns8by6/image/upload/v1761682856/papas_w1nsgd.jpg",
    category: "snacks",
  },
  {
    id: 2,
    name: "Mogul Extreme",
    description: "Gomitas ácidas",
    price: 450,
    image: "https://res.cloudinary.com/donns8by6/image/upload/v1761682738/gomitas_kjqile.jpg",
    category: "caramelos",
  },
  {
    id: 3,
    name: "Coca Cola",
    description: "Lata de refresco de cola 500ml",
    price: 650,
    image: "https://res.cloudinary.com/donns8by6/image/upload/v1761682803/coca_fe7h8q.jpg",
    category: "bebidas",
  },
  {
    id: 4,
    name: "Alfajor Jorgito",
    description: "Alfajor de chocolate",
    price: 300,
    image: "https://res.cloudinary.com/donns8by6/image/upload/v1761684329/alfajor_q7kkyf.webp",
    category: "caramelos",
  },
  {
    id: 5,
    name: "Sprite",
    description: "Botella de refresco de 600ml",
    price: 690,
    image: "https://res.cloudinary.com/donns8by6/image/upload/v1761684513/sprite_lpvzd2.jpg",
    category: "bebidas",
  },
  {
    id: 6,
    name: "Chocolate Milka",
    description: "Barra de chocolate con leche",
    price: 1200,
    image: "https://res.cloudinary.com/donns8by6/image/upload/v1761684217/milka_zzirdf.jpg",
    category: "caramelos",
  },
]

const categories = [
  { id: "todos", name: "Todos" },
  { id: "snacks", name: "Snacks" },
  { id: "caramelos", name: "Caramelos" },
  { id: "bebidas", name: "Bebidas" },
]

export default function FoodOrderingApp() {
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [cart, setCart] = useState<CartItem[]>([])
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  // Filtro dinámico por categoría
  const filteredProducts =
    selectedCategory === "todos"
      ? products
      : products.filter((p) => p.category === selectedCategory)

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId)
      if (!existingItem) return prevCart

      if (existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
      }

      return prevCart.filter((item) => item.id !== productId)
    })
  }

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0)

  const getTotalItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0)

  const formatPrice = (price: number) => `$${price.toLocaleString()}`

  return (
    <div className="min-h-screen-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* HEADER */}
      <header className="fondo-header text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">AutoStop</h1>
          <div className="flex items-center gap-4">      
            <ModeToggle />
          </div>
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            {getTotalItems() > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {getTotalItems()}
              </Badge>
            )}
          </div>
        </div>
      </header>

      {/* CATEGORÍAS */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`whitespace-nowrap ${
                selectedCategory === category.id
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "hover:bg-red-50"
              }`}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className=" max-w-7xl mx-auto p-4 flex gap-6 relative">
        {/* GRID DE PRODUCTOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-lg transition-shadow w-[300px]"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4 w-[250px]">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-red-500 font-bold text-lg">
                    {formatPrice(product.price)}
                  </span>
                  <Button
                    onClick={() => addToCart(product)}
                    className="bg-red-500 hover:bg-red-600 text-white"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Añadir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CARRITO */}
        <div className="w-80 absolute top-4 right-[-25px]">
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Tu Pedido</h2>

              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Tu carrito está vacío
                </p>
              ) : (
                <div className="space-y-3 mb-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-gray-500 text-xs">
                          {formatPrice(item.price)} x {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Quitar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t pt-4 mb-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
              </div>

              <Button
                onClick={() => setShowPaymentModal(true)}
                disabled={cart.length === 0}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3"
              >
                Pagar Ahora
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
