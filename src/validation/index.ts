import { z } from 'zod';

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  category: z.string(),
  description: z.string(),
  image: z.string(),
  rating: z.object({
    rate: z.number(),
    count: z.number(),
  }),
  discount: z.number().optional(),
});

export const cartProductSchema = productSchema.extend({
  quantity: z.number(),
  selected: z.boolean(),
});

export const signInSchema = z.object({
  login: z.string().min(1, 'Login is required'),
  password: z.string().min(1, 'Password is required'),
});

export const signUpSchema = z
  .object({
    login: z.string().min(6, 'Login is required').email('Should be your email'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .regex(/\d/, 'Password must contain at least one number'),
    // .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    // .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    // .regex(/[\W_]/, 'Password must contain at least one special character')
    rePassword: z.string().optional(),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ['rePassword'],
    message: 'Passwords must match',
  });

export const userInfoSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(100, { message: 'Name cannot exceed 100 characters' }),
  phone: z.string().refine((val) => val.replace(/\D/g, '').length === 12, {
    message: 'Invalid number',
  }),

  email: z.string().email({ message: 'Invalid email address' }),
});

const deliveryEnum = z.enum(['pickup', 'novapost'], {
  required_error: 'Choose option',
});
const deliveryInfo = z.object({
  warehouse: z.object({
    name: z.string(),
    ref: z.string(),
  }),
  name: z.string().min(1, 'Name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  patronymic: z.string().optional(),
});
const pickupSchema = z.object({
  deliveryMethod: z.literal(deliveryEnum.Enum.pickup),
});
const novapostSchema = z.object({
  deliveryMethod: z.literal(deliveryEnum.Enum.novapost),
  deliveryInfo,
});
export const deliverySchema = z.discriminatedUnion('deliveryMethod', [pickupSchema, novapostSchema]);

export const paymentEnum = z.enum(['cash', 'credit', 'online'], {
  required_error: 'You need to select a notification type.',
});

export const paymentSchema = z.object({
  type: paymentEnum,
});

export const orderSchema = z.object({
  city: z.object({
    name: z.string().min(2, 'City required'),
    ref: z.string().min(1, 'Ref required'),
  }),
  uniqueCount: z.number(),
  count: z.number(),
  productPrice: z.number(),
  deliveryPrice: z.number(),
  totalPrice: z.number(),
  userId: z.string().optional(),
  user: userInfoSchema,
  delivery: deliverySchema,
  payment: paymentSchema,
  products: z.array(cartProductSchema),
});
