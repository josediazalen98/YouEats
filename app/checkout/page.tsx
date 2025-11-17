'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreditCard, MapPin } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CartSummary } from '@/components/cart/cart-summary';
import { checkoutFormSchema, type CheckoutFormData } from '@/lib/validations/checkout';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      deliveryAddress: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        instructions: '',
      },
      paymentInfo: {
        cardNumber: '',
        expiry: '',
        cvv: '',
        name: '',
      },
    },
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

  const onSubmit = async (data: CheckoutFormData) => {
    // Mock order placement - in production this would call an API
    console.log('Order data:', data);
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

        <form onSubmit={handleSubmit(onSubmit)}>
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
                      {...register('deliveryAddress.street')}
                    />
                    {errors.deliveryAddress?.street && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.deliveryAddress.street.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <Input
                        placeholder="New York"
                        {...register('deliveryAddress.city')}
                      />
                      {errors.deliveryAddress?.city && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.deliveryAddress.city.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        State
                      </label>
                      <Input
                        placeholder="NY"
                        maxLength={2}
                        {...register('deliveryAddress.state')}
                      />
                      {errors.deliveryAddress?.state && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.deliveryAddress.state.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      ZIP Code
                    </label>
                    <Input
                      placeholder="10001"
                      {...register('deliveryAddress.zipCode')}
                    />
                    {errors.deliveryAddress?.zipCode && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.deliveryAddress.zipCode.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Delivery Instructions (Optional)
                    </label>
                    <Input
                      placeholder="Ring doorbell, leave at door, etc."
                      {...register('deliveryAddress.instructions')}
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
                      {...register('paymentInfo.name')}
                    />
                    {errors.paymentInfo?.name && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.paymentInfo.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Card Number
                    </label>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      {...register('paymentInfo.cardNumber')}
                    />
                    {errors.paymentInfo?.cardNumber && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.paymentInfo.cardNumber.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Expiry Date
                      </label>
                      <Input
                        placeholder="MM/YY"
                        {...register('paymentInfo.expiry')}
                      />
                      {errors.paymentInfo?.expiry && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.paymentInfo.expiry.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        CVV
                      </label>
                      <Input
                        placeholder="123"
                        type="password"
                        maxLength={4}
                        {...register('paymentInfo.cvv')}
                      />
                      {errors.paymentInfo?.cvv && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.paymentInfo.cvv.message}
                        </p>
                      )}
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
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
