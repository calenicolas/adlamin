
# Parametros para las acciones

## **deploy**
Accion para desplegar una aplicación.

- **applicationName** (string, requerido): El nombre de la aplicación a desplegar.
- **image** (string, requerido): La imagen del contenedor a utilizar para el despliegue.
- **amount** (number, requerido): El número de instancias de la aplicación a desplegar.
- **port** (string, requerido): El puerto en el cual la aplicación estará disponible. Debe tener al menos 4 caracteres.
- **cpu** (string, opcional): La cantidad porcentual de CPU asignada a la aplicación. El valor debe ser solo numeros.
- **memory** (string, opcional): La cantidad de memoria asignada a la aplicación. El valor debe especificar la unidad, "m" es para megabytes, "g" es para gigabytes
- **serverName** (string, opcional): El nombre del servidor donde se desplegará la aplicación.
- **labels** (array, opcional): Etiquetas que pueden ser aplicadas a la aplicación. Los valores permitidos son 'stream' y 'internal'.
- **sequence** (string, opcional): Secuencia de port knocking. De ser especificado, la applicacion requerira esta secuencia desde el cliente que desee usarla. Si no es provista se devuelve 403.
- **autoScale** (object, opcional): Configuración de auto-escalado. Utiliza el esquema `autoScaleSchema`.
- **reverseProxy** (object, opcional): Configuración del proxy inverso. Utiliza el esquema `reverseProxySchema`.

### **autoScaleSchema**
Este esquema define las configuraciones necesarias para el escalado automático de una aplicación.

- **minCpu** (string, requerido): La cantidad mínima de porcentaje de uso de CPU. Si la applicacion consume menos que esto, se intentaran reducir instancias.
- **minMemory** (string, requerido): La cantidad mínima de porcentaje de uso de memoria. Si la applicacion consume menos que esto, se intentaran reducir instancias.
- **minInstances** (number, requerido): El número mínimo de instancias que deben estar corriendo.
- **maxMemory** (string, requerido): La cantidad máxima de porcentaje de uso de memoria. Si la applicacion consume mas que esto, se intentaran aumentar instancias.
- **maxCpu** (string, requerido): La cantidad máxima de porcentaje de uso de CPU. Si la applicacion consume mas que esto, se intentaran aumentar instancias.
- **maxInstances** (number, requerido): El número máximo de instancias permitidas.

### **reverseProxySchema**
Este esquema define las configuraciones para un proxy inverso.

- **cpu** (string, opcional): La cantidad porcentual de CPU asignada al proxy inverso.
- **memory** (string, opcional): La cantidad de memoria asignada al proxy inverso.

## **edit_reverse_proxy**
Este esquema define las configuraciones para editar un proxy inverso.

- **applicationName** (string, requerido): El nombre de la aplicación asociada al proxy inverso.
- **cpu** (string, opcional): La cantidad de CPU asignada al proxy inverso.
- **memory** (string, opcional): La cantidad de memoria asignada al proxy inverso.

## **edit_proxy_access**
Este esquema define las configuraciones para editar el acceso de un proxy. Funciona para aplicaciones desplegadas con el parametro `sequence`

- **action** (string, opcional): La acción a realizar, puede ser 'deny' o 'allow'.
- **proxyContainerName** (string, requerido): El nombre del contenedor del proxy. Internamente se usa `public_reverse_proxy`
- **appName** (string, requerido): El nombre de la aplicación a la que se está otorgando o denegando acceso.
- **servers** (array, requerido): Lista de servidores que tendrán acceso. Cada servidor debe ser una cadena de texto.
- **serverName** (string, requerido): El nombre del servidor específico para el cual se está editando el acceso.
- **client** (string, requerido): El cliente que está solicitando el acceso.

