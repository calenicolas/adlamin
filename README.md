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

Para evitar que nuestro registro de imagenes sea accedido por personas externas, vamos a usar port knocking.
Mediane port-knocking 

## VPN
En un futuro

# Instalacion

```bash
git clone [repo url]
cd adlamin
./install
```
