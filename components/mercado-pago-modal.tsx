"use client"

// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: 'YOUR_ACCESS_TOKEN' });

const preference = new Preference(client);

preference.create({
  body: {
    items: [
      {
        title: 'Mi producto',
        quantity: 1,
        unit_price: 2000,
        id: ''
      }
    ],
  }
})
.then((response) => {
  console.log('Respuesta completa:', response);
  console.log('ID de la preferencia:', response.id || response?.id);
})
.catch((error) => {
  console.error('Error al crear preferencia:', error);
});

/*
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, Smartphone, Building2, X } from "lucide-react"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface MercadoPagoModalProps {
  isOpen: boolean
  onClose: () => void
  total: number
  items: CartItem[]
}

export function MercadoPagoModal({ isOpen, onClose, total, items }: MercadoPagoModalProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const paymentMethods = [
    {
      id: "credit_card",
      name: "Tarjeta de Crédito/Débito",
      icon: CreditCard,
      description: "Visa, Mastercard, American Express",
    },
    {
      id: "mercado_pago",
      name: "Mercado Pago",
      icon: Smartphone,
      description: "Paga con tu cuenta de Mercado Pago",
    },
    {
      id: "bank_transfer",
      name: "Transferencia Bancaria",
      icon: Building2,
      description: "Transferencia desde tu banco",
    },
  ]

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`
  }

  const handlePayment = async () => {
    if (!selectedPaymentMethod) return

    setIsProcessing(true)

    // Simular procesamiento de pago
    setTimeout(() => {
      setIsProcessing(false)
      alert("¡Pago procesado exitosamente! Tu pedido está en camino.")
      onClose()
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">Pagar con Mercado Pago</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Resumen del pedido *//*}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Resumen del pedido</h3>
              <div className="space-y-2 text-sm">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-3 pt-3 flex justify-between font-bold">
                <span>Total:</span>
                <span className="text-green-600">{formatPrice(total)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Métodos de pago *//*}
          <div className="space-y-3">
            <h3 className="font-semibold">Selecciona tu método de pago</h3>
            {paymentMethods.map((method) => {
              const Icon = method.icon
              return (
                <Card
                  key={method.id}
                  className={`cursor-pointer transition-all ${
                    selectedPaymentMethod === method.id ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Icon className="w-6 h-6 text-blue-600" />
                      <div className="flex-1">
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-gray-500">{method.description}</p>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          selectedPaymentMethod === method.id ? "bg-blue-500 border-blue-500" : "border-gray-300"
                        }`}
                      >
                        {selectedPaymentMethod === method.id && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Botón de pago *//*}
          <Button
            onClick={handlePayment}
            disabled={!selectedPaymentMethod || isProcessing}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Procesando pago...
              </div>
            ) : (
              `Pagar ${formatPrice(total)}`
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Tu pago está protegido por Mercado Pago. Transacción segura y encriptada.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
*/

