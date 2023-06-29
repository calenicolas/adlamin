# SE ROMPE AHORA PORQUE
- SE CREA UNA IPTABLES -T NAT CON EMPTY IP!!! siempre que arranca pasa esto
- PARA SOLUCIONARLO HAY QUE PERMITIR EL TRAFICO HACIA EL PUERTO 80 y 443 CUANDO HACEMOS INSTALLLLL1!!!!

# Adlamin

Util para servidores debian.
Cubre los casos basicos de deploy.

# Instalacion

```bash
git clone [repo url]
cd adlamin
./install
```

# Deploy

Asumiendo que la ip de nuestro servidor es 168.21.4.24

## Subir la imagen

Para que podamos deployar una imagen de docker, primero hay que subirla.
Para ello vamos a publicar imagenes en 168.21.4.24:5000

## Deploy

Para deployar, lo haremos mediante un POST a cualquier endpoint pero con este payload

```json
{
  "image_name": "Nombre de la imagen publicada anteriormente",
  "container_name": "Nombre para el container. Si se repite rompe",
  "service_port": 80,
  "container_network": "La red donde queremos que corra nuestro container. Si varios container estan en la misma red no hace falta hacer forward entre redes",
  "proxy_container_name": "dmz",
  "proxy_container_network": "dmz",
  "protocol": "Protocolo de red del servicio",
  "server_name": "URL donde escuchamos requests (reloco.com por ejemplo)"
}
```
