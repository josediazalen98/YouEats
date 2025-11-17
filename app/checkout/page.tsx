'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, MapPin } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CartSummary } from '@/components/cart/cart-summary';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    instructions: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  const subtotal = getTotal();
  const deliveryFee = items.length > 0 ? items[0].restaurant.deliveryFee : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items.length, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock order placement - in production this would call an API
    const orderId = Math.random().toString(36).substring(7);
    clearCart();
    router.push(`/orders/${orderId}`);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <main className="flex-1 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Checkout Form */}
            <div className="space-y-6 lg:col-span-2">
              {/* Delivery Address */}
              <div className="rounded-lg border bg-white p-6">
                <div className="mb-4 flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary-600" />
                  <h2 className="text-xl font-semibold">Delivery Address</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Street Address
                    </label>
                    <Input
                      placeholder="123 Main St"
                      value={deliveryAddress.street}
                      onChange={(e) =>
                        setDeliveryAddress({
                          ...deliveryAddress,
                          street: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <Input
                        placeholder="New York"
                        value={deliveryAddress.city}
                        onChange={(e) =>
                          setDeliveryAddress({
                            ...deliveryAddress,
                            city: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        State
                      </label>
                      <Input
                        placeholder="NY"
                        value={deliveryAddress.state}
                        onChange={(e) =>
                          setDeliveryAddress({
                            ...deliveryAddress,
                            state: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      ZIP Code
                    </label>
                    <Input
                      placeholder="10001"
                      value={deliveryAddress.zipCode}
                      onChange={(e) =>
                        setDeliveryAddress({
                          ...deliveryAddress,
                          zipCode: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Delivery Instructions (Optional)
                    </label>
                    <Input
                      placeholder="Ring doorbell, leave at door, etc."
                      value={deliveryAddress.instructions}
                      onChange={(e) =>
                        setDeliveryAddress({
                          ...deliveryAddress,
                          instructions: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="rounded-lg border bg-white p-6">
                <div className="mb-4 flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-primary-600" />
                  <h2 className="text-xl font-semibold">Payment Information</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Cardholder Name
                    </label>
                    <Input
                      placeholder="John Doe"
                      value={paymentInfo.name}
                      onChange={(e) =>
                        setPaymentInfo({
                          ...paymentInfo,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Card Number
                    </label>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) =>
                        setPaymentInfo({
                          ...paymentInfo,
                          cardNumber: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Expiry Date
                      </label>
                      <Input
                        placeholder="MM/YY"
                        value={paymentInfo.expiry}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            expiry: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        CVV
                      </label>
                      <Input
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            cvv: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-4">
                <CartSummary
                  subtotal={subtotal}
                  deliveryFee={deliveryFee}
                  tax={tax}
                  total={total}
                />
                <Button type="submit" size="lg" className="w-full">
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
