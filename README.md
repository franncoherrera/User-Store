# **User Store** 📦

## Descripción 📝

User Store es una aplicación que simula una tienda en línea, permitiendo a los usuarios:

- Registrarse, iniciar sesión y validar su correo electrónico.
- Crear y gestionar categorías de productos.
- Crear y obtener productos.
- Subir imágenes individuales o múltiples tanto para productos como para categorías.

## Funcionalidades Principales 🔧

- **Autenticación y Autorización**: Registro, inicio de sesión y validación de correo electrónico mediante JWT.
- **Gestión de Categorías**: Crear y listar categorías de productos.
- **Gestión de Productos**: Crear y listar productos con la posibilidad de subir imágenes.
- **Soporte para Múltiples Imágenes**: Carga de imágenes múltiples para mejorar la experiencia visual del usuario.

## Tecnologías Utilizadas 💻

- **Mongoose** (MongoDB): Para la gestión de la base de datos.
- **TypeScript**: Tipado estático para mayor robustez y mantenibilidad del código.
- **JWT (JSON Web Tokens)**: Implementación de seguridad para autenticación y autorización.

## Pasos para Ejecutar el Proyecto 🚀

1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno
3. Ejecutar el comando `npm install`
4. Levantar las bases de datos con el comando
   ```
   docker compose up -d
   ```
5. Ejecutar `npm run dev`

## Obtener Gmail Key

[Google AppPasswords](https://myaccount.google.com/u/0/apppasswords)
