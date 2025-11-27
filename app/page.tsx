"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MercadoPagoModal } from "@/components/metodos-pago-modal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  cantidad_producto: number;
  category?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const categories = [
  { id: "todos", name: "Todos" },
  { id: "snacks", name: "Snacks" },
  { id: "caramelos", name: "Caramelos" },
  { id: "bebidas", name: "Bebidas" },
];

export default function FoodOrderingApp() {
  const [productos, setProductos] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // 🔐 LOGIN / REGISTER STATES
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState<string | null>(null);

   // ✅ Verifica si el usuario ya está logueado
   useEffect(() => {
     const storedUser = localStorage.getItem("user")
     if (storedUser) {
       setUser(storedUser)
       setIsLoggedIn(true)
     }
 }, [])

  // ✅ LOGIN
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Por favor completa ambos campos");
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al iniciar sesión");

      localStorage.setItem("user", email);
      setUser(email);
      setIsLoggedIn(true);
    } catch (err: any) {
      alert(err.message);
    }
  };

  // ✅ REGISTRO
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al registrarse");

      alert("Cuenta creada. Verifica tu correo para activarla ✅");
      setIsRegistering(false);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
  };

  // ✅ Llamada a la API de Prisma
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("/api/productos");
        const data = await res.json();

        const mapped = data.map((item: any) => ({
          id: item.id,
          name: item.descripcion,
          description: item.descripcion,
          price: item.precio,
          image: item.imagen_descriptiva,
          cantidad_producto: item.cantidad_producto,
          category: item.categoria,
        }));

        setProductos(mapped);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchProductos();
  }, []);

  // ✅ Filtrado por categoría
  const filteredProducts = productos.filter((p) => {
    if (selectedCategory === "todos") {
      return true; // Muestra todos si la categoría seleccionada es "todos"
    }
    // Si no es "todos", filtra por la categoría seleccionada
    return p.category === selectedCategory;
  });

  // ✅ Lógica del carrito
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (!existingItem) return prevCart;

      if (existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }

      return prevCart.filter((item) => item.id !== productId);
    });
  };
  const solicitarAExpendedoraLiberarProductosSolicitados = async () => {
    const res = await fetch("/api/expedir_producto", {method:"POST"});

  };
  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const getTotalItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  const formatPrice = (price: number) => `$${price.toLocaleString("es-AR")}`;

  // 🔒 Mostrar login / registro si no está autenticado
  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <Card className="w-full max-w-sm p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">
            {isRegistering ? "Crear Cuenta" : "Iniciar Sesión"}
          </h2>

          <form
            onSubmit={isRegistering ? handleRegister : handleLogin}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm mb-1">Correo Electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded-md bg-white dark:bg-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded-md bg-white dark:bg-gray-800"
              />
            </div>

            {isRegistering && (
              <div>
                <label className="block text-sm mb-1">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded-md bg-white dark:bg-gray-800"
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2"
            >
              {isRegistering ? "Registrarse" : "Entrar"}
            </Button>
          </form>

          <div className="text-center mt-4">
            {isRegistering ? (
              <p>
                ¿Ya tienes cuenta?{" "}
                <button
                  onClick={() => setIsRegistering(false)}
                  className="text-red-500 hover:underline"
                >
                  Inicia sesión
                </button>
              </p>
            ) : (
              <p>
                ¿No tienes cuenta?{" "}
                <button
                  onClick={() => setIsRegistering(true)}
                  className="text-red-500 hover:underline"
                >
                  Regístrate
                </button>
              </p>
            )}
          </div>
        </Card>
      </div>
    );
  }

  // ✅ Si el usuario está logueado, mostrar la app normal
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* HEADER */}
      <header className="fondo-header text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-serif">AutoStop</h1>

          <div className="flex items-center gap-4">
            <p className="text-sm">Hola, {user}</p>
            <Button
              variant="outline"
              size="sm"
              className="bg-red-600 text-white"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </Button>
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
      <div className="max-w-7xl mx-auto px-4 mt-6 caja">
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

      {/* PRODUCTOS */}
      <div className="max-w-7xl mx-auto p-4 flex gap-6 relative caja">
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
                <p className="text-gray-600 text-sm mb-3">
                  {product.description}
                </p>
                {/* cantidad disponible */}
                <p className="text-sm text-gray-500 mb-2">
                  {product.cantidad_producto > 0
                    ? `Stock disponible: ${product.cantidad_producto}`
                    : "Sin stock"}
                </p>

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

          {/* CARRITO */}
          <div className="caja">
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
                            className="bg-red-500"
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

                <div className="border-t pt-4 mb-4 caja">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>

                <Button
                  onClick={
                    ()=>setShowPaymentModal(true)
                  }
                  disabled={cart.length === 0}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 caja"
                >
                  Pagar Ahora
                </Button>
              </CardContent>
            </Card>
          </div>
          {/* MODAL MERCADO PAGO */}
          <MercadoPagoModal
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            total={getTotalPrice()}
            items={cart}
          />
{/* 
           <form action="/api/compras_stripe" method="POST">
            <section>
              <button type="submit" role="link">
                Checkout
              </button>
            </section>
          </form> */}
        </div>
      </div>
    </div>
  );
}

// 🌙 Toggle de tema
export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="border-none absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
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
  );
}
