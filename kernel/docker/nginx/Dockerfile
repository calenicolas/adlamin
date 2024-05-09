# Usa la imagen oficial de nginx como base
FROM nginx

# Crea un nuevo grupo llamado "roberto" con GID 1000
RUN addgroup --gid 1000 roberto_group

# Crea un nuevo usuario llamado "roberto" con el UID 1000 y lo agrega al grupo "roberto_group"
RUN adduser --disabled-password --gecos "" --uid 1000 --ingroup roberto_group roberto
RUN mkdir /var/run/nginx

# Cambia el propietario de los archivos de configuración de nginx al usuario "roberto"
RUN chown -R roberto:roberto_group /etc/nginx
RUN chown -R roberto:roberto_group /var/cache/nginx
RUN chown -R roberto:roberto_group /var/run/nginx

# Establece el usuario para ejecutar el contenedor como "roberto"
USER roberto

# Copia el ngnix conf
COPY nginx.conf /etc/nginx/nginx.conf

# CMD estándar de nginx para iniciar el servidor
CMD ["nginx", "-g", "daemon off;"]
