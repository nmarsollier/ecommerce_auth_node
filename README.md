# Si queres sabes mas sobre mi:

[Nestor Marsollier](https://github.com/nmarsollier/profile)

## Microservicio de Seguridad

Se encarga de registrar y autenticar usuarios en el sistema.

Utiliza el esquema JWT con un header Authorization "bearer" estándar.

Cada usuario tiene asociado una lista de permisos, existen 2 permisos genéricos "user" y "admin". Los usuarios que se registran son todos "user",  muchos procesos necesitan un usuario "admin" para poder funcionar, por lo tanto hay que editar el esquema en mongodb para asociarle el permiso admin a algún usuario inicialmente.

[Documentación de API](./README-API.md)

La documentación de las api también se pueden consultar desde el home del microservicio
que una vez levantado el servidor se puede navegar en [localhost:3000](http://localhost:3000/)

## Dependencias

### Node 10.15

Seguir los pasos de instalación del sitio oficial [nodejs.org](https://nodejs.org/en/)

### MongoDb

La base de datos se almacena en MongoDb.

Ver tutorial de instalación en [ecommerce](https://github.com/nmarsollier/ecommerce).

### RabbitMQ

Este microservicio notifica los logouts de usuarios con Rabbit.

Ver tutorial de instalación en [ecommerce](https://github.com/nmarsollier/ecommerce).

## Ejecución

Abrir ventana de comandos en la carpeta del microservicio y ejecutar :

```bash
npm install
npm start
```

## Apidoc

Apidoc es una herramienta que genera documentación de apis para proyectos node (ver [Apidoc](http://apidocjs.com/)).

El microservicio muestra la documentación como archivos estáticos si se abre en un browser la raíz del servidor [localhost:3000](http://localhost:3000/)

Ademas se genera la documentación en formato markdown.

## Configuración de la app

Esta aplicacion se configura con variables de entorno del sistema operativo

SERVER_PORT : Puerto de la app (3000)
LOG_LEVEL : Nivel de log (debug)
MONGO_URL : Url de mongo (mongodb://localhost/authentication)
JWT_SECRET : JWT  (+b59WQF+kUDr0TGxevzpRV3ixMvyIQuD1O)
PASSWORD_SALT : Para JWT (DP3whK1fL7kKvhWm6pZomM/y8tZ92mkEBtj29A4M+b8)
RABBIT_URL : Servidor rabbit (amqp://localhost)


## Docker

También podemos usar docker en este repositorio, ejecutamos :

```bash
docker build -t dev-auth-node -f Dockerfile.dev .

# Mac || Windows
docker run -d --name dev-auth-node -p 3000:3000 dev-auth-node

# Linux
docker run --add-host host.docker.internal:172.17.0.1 -d --name dev-auth-node -p 3000:3000 dev-auth-node
```

El contenedor se puede parar usando :

```bash
docker stop dev-auth-node
```

Se vuelve a levantar usando

```bash
docker start dev-auth-node
```
