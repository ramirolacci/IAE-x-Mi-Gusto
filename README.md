
![Vista previa de la app](./public/Demo.png)

Aplicación web construida con Vite + React + TypeScript que automatiza el envío de beneficios personalizados: valida correos, obtiene códigos únicos desde Supabase y dispara correos HTML. El foco es ofrecer una experiencia de alto impacto visual para una campaña para la **IAE**.

### Características principales
- **Formulario simple y responsivo** con retroalimentación inmediata (TailwindCSS).
- **Validación avanzada de correos** antes de procesar cada solicitud.
- **Asignación única de códigos** desde la tabla `email_codes` en Supabase (marca cada código como usado y registra email + timestamp).
- **Emails HTML + texto plano** generados dinámicamente; incluye plantilla en `email-template.html`.


### Flujo funcional
1. Usuario ingresa su email y presiona **Obtener** (o Enter).
2. El frontend valida formato y verifica configuración de Supabase.
3. Se solicita a Supabase un código disponible y se marca como usado.
4. Se construyen las versiones HTML/texto del correo.
5. Se envía el mensaje.

### Créditos

- **Facundo Carrizo** — GitHub: [@facu14carrizo](https://github.com/facu14carrizo) · LinkedIn: [facu14carrizo](https://www.linkedin.com/in/facu14carrizo)
- **Ramiro Lacci** — GitHub: [@ramirolacci19](https://github.com/ramirolacci19) · LinkedIn: [ramiro-lacci](https://www.linkedin.com/in/ramiro-lacci)

---

### Licencia

© 2025 Mi Gusto. Todos los derechos reservados. Proyecto privado para uso comercial de la marca.

Mi Gusto ® es una empresa de La Honoria Alimentos SA - Argentina - CUIT: 30-71558654-8


