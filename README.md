

npm install
# Run
npm run dev
# Build de Producción:
npm run build

# Web
http://localhost:5173/



acdata-platform-web/
├─ public/
│  ├─ favicon.ico
│  ├─ index.html
│  └─ ... (otros estáticos públicos)
├─ src/
│  ├─ assets/
│  │  ├─ images/
│  │  ├─ icons/
│  │  └─ styles/ (CSS global, Tailwind config, etc.)
│  │
│  ├─ components/
│  │  ├─ common/
│  │  │  ├─ Button.tsx
│  │  │  ├─ Input.tsx
│  │  │  ├─ NavBar.tsx
│  │  │  ├─ Sidebar.tsx
│  │  │  └─ ... (otros componentes compartidos)
│  │  └─ forms/
│  │     ├─ FormField.tsx
│  │     ├─ ValidationError.tsx
│  │     └─ ...
│  │
│  ├─ hooks/
│  │  ├─ useAuth.ts (hook para autenticación global)
│  │  ├─ useFetch.ts
│  │  └─ ... (otros hooks reutilizables)
│  │
│  ├─ layouts/
│  │  ├─ MainLayout.tsx (layout general)
│  │  ├─ AuthLayout.tsx (layout para secciones de autenticación)
│  │  └─ DashboardLayout.tsx (layout específico para cpanel)
│  │
│  ├─ modules/
│  │  ├─ cpanel/
│  │  │  ├─ pages/
│  │  │  │  ├─ DashboardPage.tsx (vista principal del panel)
│  │  │  │  ├─ ReportsPage.tsx (ej. página de reportes)
│  │  │  │  └─ SettingsPage.tsx (configuraciones del panel)
│  │  │  ├─ components/
│  │  │  │  ├─ ChartWidget.tsx (componente para gráficas)
│  │  │  │  ├─ StatsCard.tsx (componente para tarjetas de estadísticas)
│  │  │  │  └─ ... (otros componentes específicos del panel)
│  │  │  ├─ services/
│  │  │  │  ├─ cpanelApi.ts (llamadas a API específicas del panel)
│  │  │  │  └─ ...
│  │  │  ├─ hooks/
│  │  │  │  └─ useDashboardData.ts (hook para datos del dashboard)
│  │  │  └─ index.ts (exportaciones centrales del módulo)
│  │  │
│  │  ├─ user/
│  │  │  ├─ pages/
│  │  │  │  ├─ RegisterPage.tsx (vista del formulario de registro)
│  │  │  └─ services/
│  │  │     ├─ userApi.ts (llamadas a API para registro de usuario, perfíl, etc.)
│  │  │     └─ ...
│  │  │
│  │  ├─ auth/
│  │  │  ├─ pages/
│  │  │  │  ├─ LoginPage.tsx (vista de login)
│  │  │  ├─ components/
│  │  │  │  └─ LoginForm.tsx (formulario de login)
│  │  │  ├─ services/
│  │  │  │  ├─ authApi.ts (llamadas a la API de autenticación)
│  │  │  └─ hooks/
│  │  │     ├─ useLogin.ts (lógica de login)
│  │  │     └─ ...
│  │  │
│  │  └─ ... (futuros módulos)
│  │
│  ├─ routes/
│  │  ├─ index.tsx (definición principal de rutas)
│  │  ├─ ProtectedRoute.tsx (componente para rutas protegidas)
│  │  └─ ... (otros componentes de ruteo)
│  │
│  ├─ services/
│  │  ├─ apiClient.ts (configuración axios/fetch global)
│  │  └─ ... (servicios globales, ej. para notificaciones)
│  │
│  ├─ state/
│  │  ├─ authStore.ts (estado global de autenticación, si se usa Zustand o Context)
│  │  └─ ... (otros estados globales)
│  │
│  ├─ tests/
│  │  ├─ unit/
│  │  ├─ integration/
│  │  └─ e2e/
│  │
│  ├─ types/
│  │  ├─ global.d.ts
│  │  ├─ userTypes.ts
│  │  └─ ...
│  │
│  ├─ i18n/
│  │  ├─ en.json
│  │  ├─ es.json
│  │  └─ i18n.ts (configuración de internacionalización)
│  │
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ vite-env.d.ts
│
└─ package.json
 

# Control de Versiones 
git init
git add .
git commit -m "Initial commit: acdata-platform-web"


# Crear el proyecto
npm create vite@latest acdata-platform-web -- --template react-ts
