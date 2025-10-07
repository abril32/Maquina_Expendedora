"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Plus } from "lucide-react"
import { MercadoPagoModal } from "@/components/mercado-pago-modal"

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
    name: "Patatas Fritas",
    description: "Bolsa de patatas fritas crujientes",
    price: 150,
    image: "/crispy-potato-chips-bag.png",
    category: "snacks",
  },
  {
    id: 2,
    name: "Barrita Energética",
    description: "Barrita de avena y frutos secos",
    price: 180,
    image: "/nuts-oats-energy-bar.png",
    category: "snacks",
  },
  {
    id: 3,
    name: "Refresco Cola",
    description: "Lata de refresco de cola 33cl",
    price: 160,
    image: "/placeholder-mrfdr.png",
    category: "bebidas",
  },
  {
    id: 4,
    name: "Sándwich Mixto",
    description: "Sándwich de jamón y queso",
    price: 250,
    image: "/ham-and-cheese-sandwich.png",
    category: "sandwiches",
  },
  {
    id: 5,
    name: "Ensalada César",
    description: "Ensalada fresca con pollo y aderezo",
    price: 320,
    image: "/caesar-salad-chicken.png",
    category: "saludable",
  },
  {
    id: 6,
    name: "Chocolate",
    description: "Barra de chocolate con leche",
    price: 120,
    image: "/milk-chocolate-bar.png",
    category: "dulces",
  },
]


export default function FoodOrderingApp() {
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [cart, setCart] = useState<CartItem[]>([])
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const filteredProducts =
    selectedCategory === "todos" ? products : products.filter((product) => product.category === selectedCategory)

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId)
      if (!existingItem) return prevCart
  
      if (existingItem.quantity > 1) {
        // Resta 1 a la cantidad
        return prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
      }
  
      // Si la cantidad es 1, elimina el producto del carrito
      return prevCart.filter((item) => item.id !== productId)
    })
  }
  

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-red-500 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🚗</div>
            <h1 className="text-2xl font-bold">AutoStop</h1>
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

      <div className="absolute top-[100px] left-1/2 -translate-x-1/2 w-full max-w-7xl p-4 flex gap-6">
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow w-[300px]">
            <div className="aspect-square overflow-hidden">
              <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
              />
              </div>
                <CardContent className=" p-4 w-[250px]">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-red-500 font-bold text-lg">{formatPrice(product.price)}</span>
                    <Button
                      onClick={() => addToCart(product)}
                      className="bg-red-500 hover:bg-red-600 text-white"
                      size="sm"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Añadir al Carrito
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Cart Sidebar */}
        <div className="w-80">
          <Card className="sticky top-4 rigth">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Tu Pedido</h2>

              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Tu carrito está vacío</p>
              ) : (
                <div className="space-y-3 mb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-gray-500 text-xs">
                          {formatPrice(item.price)} x {item.quantity}
                          </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
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

      {/* Mercado Pago Modal */}
      <MercadoPagoModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        total={getTotalPrice()}
        items={cart}
        />
      </div>
  
  )
}