# UrbanVía - Backend

Este es el backend del proyecto UrbanVía, una API REST orientada al registro y gestión de incidencias viales (baches) en la vía pública.

El proyecto frontend (interfaz de usuario) se encuentra en un repositorio separado. Puedes acceder a él aquí:  
[Inserta aquí el enlace de GitHub del frontend]

## Documentación

Todo el detalle sobre la arquitectura, los requisitos, las historias de usuario y los casos de prueba realizados se encuentra en el documento Word ubicado dentro de la carpeta `docs/`.

## Tecnologías utilizadas

* Fastify: Framework principal para la gestión de la API y la recepción de archivos multimedia.
* MongoDB Atlas y Mongoose: Para la gestión de la base de datos NoSQL en la nube.
* JWT y Bcrypt: Para el manejo de sesiones, autenticación y encriptación de contraseñas.
* GitFlow: Metodología utilizada para el control de versiones y trazabilidad del código.

## Roles de usuario

El sistema clasifica el acceso en dos tipos de usuarios principales:

* Vecino: Puede registrarse, iniciar sesión, reportar un bache (adjuntando una fotografía obligatoria) y visualizar únicamente sus propios reportes.
* Supervisor: Inicia sesión para visualizar el registro de todos los baches reportados en el municipio. No tiene permisos para crear nuevas incidencias.

## Instrucciones de instalación

1. Clona este repositorio en tu equipo local.
2. Instala las dependencias ejecutando: `npm install`
3. Crea un archivo `.env` en la raíz del proyecto y configura las siguientes variables:

```env
PORT=5000
MONGO_URI=tu_cadena_de_conexion_a_mongo_atlas
JWT_SECRET=tu_clave_secreta
```

4. Inicia el servidor en modo de desarrollo con el comando: `npm run dev`
5. Para utilizar la aplicación completa, asegúrate de iniciar también el proyecto frontend.
