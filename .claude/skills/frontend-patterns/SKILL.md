---
name: frontend-patterns
description: Patrones del frontend de Platam Pay (Next.js 16 App Router, React 19, TypeScript). Usar cuando se crea un componente, página, formulario, hook, servicio de API o store de Zustand. Incluye el sistema de estilos (Tailwind 4 + CVA), React Hook Form + Zod, y cómo consumir los microservicios backend.
---

# Frontend Patterns — Platam Pay V2 Frontend

## Stack

- **Next.js** 16.1.6 (App Router)
- **React** 19.2.3 + **TypeScript** 5.x
- **Estilos:** Tailwind CSS 4 + Class Variance Authority (CVA)
- **Forms:** React Hook Form 7 + Zod 4
- **Estado global:** Zustand 5
- **Estado servidor:** TanStack Query (React Query) 5
- **HTTP:** Axios (clientes por dominio en `infrastructure/api/`)
- **Iconos:** Lucide React

## Estructura de Carpetas

```
app/
  (auth)/login/          # Rutas públicas (sin protección)
  (protected)/           # Rutas que requieren sesión
  (onboarding)/          # Flujo de onboarding
  api/                   # Route Handlers (Next.js API routes — solo para httpOnly cookies)
features/
  auth/                  # Módulo de autenticación
    components/          # Componentes específicos del feature
    schemas/             # Schemas Zod de validación
    services/            # Llamadas a API (usa infrastructure/api/)
    types/               # Tipos TypeScript del feature
    constants/
  onboarding/
  partners/
  products/
  management/
components/transversal/   # Librería de componentes compartidos
  buttons/Button.tsx
  forms/Input.tsx, Select.tsx, Textarea.tsx, DatePicker.tsx
  sections/Alert.tsx, Modal.tsx, Avatar.tsx, FormStep.tsx
  layout/Header.tsx, Sidebar.tsx, PanelMenu.tsx
  DataTable/
infrastructure/api/       # Clientes Axios por dominio
store/                    # Stores de Zustand
services/                 # Servicios globales (no de feature)
```

## Componentes con CVA (Class Variance Authority)

```typescript
// components/transversal/buttons/Button.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary-500 text-white hover:bg-primary-600',
        secondary: 'border border-secondary-500 text-secondary-500',
        ghost: 'hover:bg-gray-100',
      },
      size: {
        default: 'h-[44px] px-6 text-sm',
        sm: 'h-9 px-3 text-xs',
        lg: 'h-12 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  )
);
Button.displayName = 'Button';
```

## Formularios con React Hook Form + Zod

```typescript
// features/{feature}/schemas/index.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// features/{feature}/components/LoginForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/transversal/forms/Input';

export function LoginForm() {
  const { control, handleSubmit, formState: { isSubmitting, errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    await authService.login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input name="email" control={control} label="Email" type="email" />
      <Input name="password" control={control} label="Contraseña" type="password" />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Cargando...' : 'Ingresar'}
      </Button>
    </form>
  );
}
```

## Input Genérico con Controller

```typescript
// El componente Input acepta un parámetro de tipo genérico para tipado del control
const Input = <T extends FieldValues>({
  name,
  control,
  label,
  dependency,       // Nombre de otro campo del form
  dependencyValue,  // Si el campo "dependency" tiene este valor, mostrar este Input
  ...props
}: InputProps<T>) => {
  const depCurrent = dependency ? useWatch({ control, name: dependency }) : undefined;
  if (dependency && depCurrent !== dependencyValue) return null;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <input className={cn(inputVariants({ variant: fieldState.error ? 'error' : 'default' }))} {...field} {...props} />
      )}
    />
  );
};
```

## Store Zustand

```typescript
// store/config.store.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ConfigStore {
  data: ConfigData | null;
  loading: boolean;
  initialized: boolean;
  initializeConfig: () => Promise<void>;
}

export const useConfigStore = create<ConfigStore>()(
  devtools(
    (set, get) => ({
      data: null,
      loading: false,
      initialized: false,
      initializeConfig: async () => {
        const { initialized, loading } = get();
        if (initialized || loading) return;   // Evita doble ejecución en Strict Mode
        set({ loading: true });
        const data = await configService.getConfig();
        set({ data, loading: false, initialized: true });
      },
    }),
    { name: 'config-store' }
  )
);
```

## Clientes HTTP (Axios por Dominio)

```typescript
// infrastructure/api/transversal-client.ts
import axios from 'axios';
import { resolveAccessToken } from './resolve-access-token';

export const transversalClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TRANSVERSAL_MS_URL,
});

transversalClient.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${await resolveAccessToken()}`;
  return config;
});

transversalClient.interceptors.response.use(
  (res) => res.data,
  (error) => { /* toast de error + throw ApiError */ }
);
```

Clientes disponibles: `transversalClient`, `authClient`, `partnerClient`, `suppliersClient`, `onboardingClient`.
`transversalPublicClient` — sin token, para endpoints públicos (login, register).

## Services por Feature

```typescript
// features/auth/services/auth.service.ts
export const authService = {
  login(data: LoginFormData): Promise<LoginResponse> {
    return transversalPublicClient.post('/auth/login', data);
  },

  async setSession(tokens: AuthTokens) {
    // Route Handler para guardar tokens en httpOnly cookies
    await fetch('/api/auth/set-session', {
      method: 'POST',
      body: JSON.stringify(tokens),
    });
  },
};
```

## Sistema de Colores (Tailwind CSS 4)

CSS custom properties en `styles/globals.css`:
- `--color-primary` → lime green `#22C55E`
- `--color-secondary` → turquoise `#10B981`
- `--color-tertiary` → cyan `#06B6D4`
- `--color-success/warning/error/info` → semánticos
- `.dark` class para dark mode

Clases utilitarias: `.gradient-primary`, `.glass-effect`.

## Autenticación (httpOnly Cookies)

- Tokens JWT almacenados en httpOnly cookies (vía Route Handler `/api/auth/set-session`)
- `resolveAccessToken()` en `infrastructure/api/resolve-access-token.ts` lee la cookie y la inyecta en el header `Authorization`
- Route group `(protected)` en App Router para rutas que requieren sesión
