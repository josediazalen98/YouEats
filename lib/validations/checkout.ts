import { z } from 'zod';

export const deliveryAddressSchema = z.object({
  street: z.string().min(5, 'Street address must be at least 5 characters'),
  city: z.string().min(2, 'City name must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters').max(2, 'State must be 2 characters'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format'),
  instructions: z.string().optional(),
});

export const paymentInfoSchema = z.object({
  name: z.string().min(3, 'Cardholder name must be at least 3 characters'),
  cardNumber: z.string()
    .regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, 'Invalid card number format')
    .transform(val => val.replace(/\s/g, '')),
  expiry: z.string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date (use MM/YY format)')
    .refine((val) => {
      const [month, year] = val.split('/');
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      return expiry > new Date();
    }, 'Card has expired'),
  cvv: z.string().regex(/^\d{3,4}$/, 'CVV must be 3 or 4 digits'),
});

export const checkoutFormSchema = z.object({
  deliveryAddress: deliveryAddressSchema,
  paymentInfo: paymentInfoSchema,
});

export type DeliveryAddressFormData = z.infer<typeof deliveryAddressSchema>;
export type PaymentInfoFormData = z.infer<typeof paymentInfoSchema>;
export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
