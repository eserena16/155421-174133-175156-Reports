# App Notification

Este microservicio corresponde a la implementacion para resolver las consultas del API.
Consume a partir de una cola de mensajes las notificaciones con las ventas y compras de los distintos productos y los almacena en una base de datos en mongo.

## Instalación

1. Clona este repositorio.
2. Ejecuta `npm install` para instalar las dependencias.

## Uso

1. Puedes utilizar docker para instanciar la aplicación, utilizando el archivo docker-compose.yml.
2. Al levantar una instancia de la aplicación, la misma estará leyendo una cola de mensajes (RabbitMQ) para almacenar los datos en la base de datos de mongo.


