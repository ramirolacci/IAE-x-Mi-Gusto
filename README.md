
<div align="center">

  <img src="./public/Logo%20Mi%20Gusto%202025.png" alt="Logo Mi Gusto" width="200" />

  # IAE x Mi Gusto

  **Plataforma web de automatización y entrega de beneficios exclusivos para la campaña IAE.**

  [![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

  <br />

  <img src="./public/Demo.png" alt="Vista previa de la app" width="850" style="border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.15);" />

</div>

---

## 📌 Descripción

Aplicación web desarrollada con **Vite**, **React** y **TypeScript** orientada a automatizar la entrega de beneficios personalizados durante la campaña exclusiva para la **IAE**. La solución garantiza una experiencia fluida, rápida y segura, integrando validaciones de email en tiempo real y asignación única de códigos promocionales respaldados por **Supabase**.

---

## 🚀 Características Principales

- 🎨 **Interfaz de Alto Impacto Visual**: Formulario simple, elegante y 100% responsivo con retroalimentación inmediata diseñado en Tailwind CSS.
- ✉️ **Validación Avanzada de Correos**: Verificación rigurosa de formato e integridad antes de procesar cualquier solicitud.
- 🔑 **Asignación Única y Segura de Códigos**: Consulta atómica a la tabla `email_codes` en Supabase, registrando el timestamp y previniendo la duplicidad de uso.
- 📧 **Plantillas HTML Dinámicas**: Generación y despacho automático de correos electrónicos adaptativos (HTML + Texto Plano).

---

## 🔄 Flujo Funcional

```mermaid
graph LR
    A[Usuario ingresa Email] --> B[Validación de Formato Frontend]
    B --> C[Consulta Código en Supabase]
    C --> D[Marcado de Código como Usado]
    D --> E[Generación de Email HTML]
    E --> F[Envío Exitoso del Beneficio]
```

1. **Ingreso de datos**: El usuario completa su dirección de correo en la plataforma.
2. **Validación inicial**: Frontend verifica la sintaxis del email y el estado del servicio.
3. **Reserva en base de datos**: Supabase asigna el primer código disponible en `email_codes` y registra el consumo.
4. **Construcción del mensaje**: Se ensambla la plantilla HTML dinámica personalizada.
5. **Notificación**: Se despacha el beneficio directamente a la bandeja del usuario.

---

## 👥 Créditos y Desarrollo

| Desarrollador | Enlaces |
| :--- | :--- |
| **Facundo Carrizo** | [![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white)](https://github.com/facu14carrizo) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/facu14carrizo) |
| **Ramiro Lacci** | [![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white)](https://github.com/ramirolacci19) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ramiro-lacci) |

---

## ⚖️ Licencia

© 2025 **Mi Gusto**. Todos los derechos reservados. Proyecto privado para uso comercial exclusivo de la marca.

> Mi Gusto ® es una marca registrada de **La Honoria Alimentos S.A.** — Argentina — CUIT: 30-71558654-8



