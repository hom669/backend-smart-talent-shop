# Backend Smart Talent Shop
<p align="center">
  <img src="https://github.com/hom669/frontend-smart-talent-shop/assets/78924776/07233a7c-0be7-4323-899f-e686f44220a0" alt="smart_logo" width="200" />
  <img src="https://github.com/hom669/backend-smart-talent-shop/assets/78924776/6a58d62a-f803-4eb6-9f1c-4582651c2ad8" alt="angular" width="200" />
</p>

Este proyecto está desarrollado con [Node.js](https://nodejs.org), versión 20.10.0 Para la gestión de paquetes, se utiliza [npm](https://www.npmjs.com/).

## Instalación

Primero, asegúrate de tener Node.js instalado en tu sistema. Luego, sigue estos pasos para instalar las dependencias:

```bash
# Si usas npm
npm install
```
## Configuración Inicial

```bash
# Crear archivo .env con configuración de conexion a base de datos y puerto de arranque de la aplicacion Ejemplo:
PORT = '3001'
SECRET_KEY = 'l7<Ip1d#MDK#i%n*VjrtgrgX<hYL<'
USER_DB = 'root'
PASS_DB = 'password'
HOST_DB = 'localhost'
NAME_DB = 'db-name'
```

## Ejecutar Proyecto

```bash
# Ejecutar Proyecto
npm run dev
```

```bash
# Transformacion automatica typescript
npm run typescript
```

# ENDPOINT disponibles

## Ordenes

```bash
# Para acceder a las 1. ordenes del sistema, 2. Crear Orden, 3. Acceder ordenes por usuario
  GET http://localhost/api/orders
  POST http://localhost/api/orders
  GET http://localhost/api/orders/:idUser
```

## Productos
```bash
# Para acceder a las 1. productos creados del sistema, 2. Crear Producto, 3. Actualizacion de producto, 4. Eliminar Producto
  GET http://localhost/api/products
  POST http://localhost/api/products
  PUT http://localhost/api/products/:idProduct
  DELETE http://localhost/api/products/:idProduct
```


## Usuarios
```bash
# Para acceder a las 1. Crear Usuario, 2. Realizar Login al sistema
  POST http://localhost/api/users/
  POST http://localhost/api/users/login
```

# JWT

El sistema tiene la implementacion tanto en frontend como backend usando autenticacion con JWT 

JSON Web Token (JWT) es un estándar abierto ( RFC 7519 ) que define una forma compacta y autónoma de transmitir información de forma segura entre partes como un objeto JSON. Esta información se puede verificar y confiar porque está firmada digitalmente. Los JWT se pueden firmar usando un secreto (con el algoritmo HMAC ) o un par de claves pública/privada usando RSA o ECDSA .

# Diagrama Entidad Relacion BD creada en Mysql

El aplicativo se conecta usando libreria sequelize al motor de base de datos Mysql [Node.js]([https://nodejs.org](https://sequelize.org/docs/v6/getting-started/))

## Diagrama

![image](https://github.com/hom669/backend-smart-talent-shop/assets/78924776/069a28a1-cac0-47c8-902a-dc6c994ce1b0)


