# Sistema de Notificación de Cámaras Hikvision

Este proyecto es un sistema que captura las notificaciones de desconexión de video de cámaras Hikvision y las almacena en una base de datos. Actualmente, el proyecto se encuentra en su primera fase de desarrollo.

## Tecnologías Utilizadas

El proyecto se ha desarrollado utilizando las siguientes tecnologías:

- [Node.js](https://nodejs.org/): Un entorno de ejecución para JavaScript construido con el motor de JavaScript V8 de Chrome.
- [MySQL](https://www.mysql.com/): Un sistema de gestión de bases de datos relacional, multihilo y multiusuario con más de seis millones de instalaciones.
- [Express](https://expressjs.com/): Un marco de aplicación web de back-end para Node.js, diseñado para construir aplicaciones web y API.
- [Sequelize](https://sequelize.org/): Un ORM basado en promesas para Node.js y io.js. Soporta las dialectos PostgreSQL, MySQL, MariaDB, SQLite y MSSQL y cuenta con una sólida transacción.
- [IMAP](https://tools.ietf.org/html/rfc3501): Un protocolo de Internet que permite a un cliente de correo electrónico obtener acceso al correo electrónico en un servidor de correo.

## Dependencias

El proyecto utiliza las siguientes dependencias:

- `dotenv`: ^16.3.1
- `express`: ^4.18.2
- `imap`: ^0.8.19
- `mailparser`: ^3.6.6
- `morgan`: ^1.10.0
- `mysql2`: ^3.7.0

Cada dependencia tiene un papel específico en el funcionamiento del proyecto. Por ejemplo, `dotenv` se utiliza para cargar variables de entorno desde un archivo `.env` a `process.env`. `express` se utiliza para crear el servidor web. `mysql2` se utiliza para conectarse a la base de datos MySQL. `morgan` se utiliza para registrar las solicitudes HTTP en la consola. `imap` y `mailparser` se utilizan para conectarse a un servidor IMAP y analizar los mensajes de correo electrónico.

## Dependencias de Desarrollo

- `@faker-js/faker`: ^8.0.2
- `nodemon`: ^3.0.2
- `sequelize-cli`: ^6.6.2

## Instalación

Para poner en marcha el proyecto, sigue estos pasos:

1. Clona el repositorio:
2. Instala las dependencias:
3. Configura tus variables de entorno creando un archivo `.env` en la raíz del proyecto. Ejemplo:
4. Ejecuta las migraciones de la base de datos (Asegúrate de tener configurada la base de datos MySQL):
5. Inicia el servidor:

## Uso
1. Inicia el servidor:
2. Envía un correo electrónico a la dirección de correo electrónico configurada en el archivo `.env` con el siguiente formato:
3. Comprueba que el correo electrónico se ha guardado en la base de datos:

