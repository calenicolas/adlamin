# Adlamin

Util para servidores debian.
Cubre los casos basicos de deploy.

# Casos de uso

Asumiendo que deseamos tener imagenes privadas de docker y las queremos desplegar en produccion, con este gestor podremos:

- Hostear imagenes de forma privada sin necesidad de pagar mas que por la propia infrastructura para almacenarlas y mantenerlas accesibles.
- Desplegar imagenes indicando cuantas instancias.
- Eliminar maquinas desplegadas.
- Aumentar la cantidad existente de replicas, ya sea con la imagen actual o una nueva imagen.

# Como funiona ?

La herramienta se compone por **2 servicios**:

- Un **registro de imagenes de docker** escuchando conexiones en el puerto 2001
- Un **servicio http que permite desplegar las imagenes** escuchando conexiones en el puerto 2002

# Como se gestiona el acceso a los servicios ?

## Port Knocking

Para evitar que nuestro registro de imagenes o el servicio para desplegar sea accedido por personas externas, vamos a usar port knocking.
La secuencia de cada servicio se genera al momento de la instalacion (TODO).

## VPN
TODO.

# Instalacion

```bash
git clone [repo url]
cd adlamin
./install
```

# Despliegues

## Publicos

```json
{
  "image_name":"nombre de la imagen",
  "app_name":"nombre de la app",
  "service_port":"puerto que expone el servicio",
  "proxy_container_name":"dmz",
  "server_name":"nombre del dominio donde la app va a estar hosteada",
  "operation": "replace", // puede ser add, kill o replace
  "amount": 1 // cantidad de replicas
}
```

## Internos

# Implementacion en Actions de github

Para deployar en cada push a master, o configuraciones similares, pueden basarse [en este repositorio](https://github.com/calenicolas/adlamin-pipeline-example)
