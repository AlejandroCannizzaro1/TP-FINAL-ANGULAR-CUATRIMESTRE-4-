Proyecto Meal Master

Descripción del Proyecto

Meal Master es un sistema que permite a los usuarios gestionar su perfil, recetas, comentarios y listas de favoritos, así como acceder a funcionalidades premium mediante un modelo de pago. Está diseñado para simplificar la búsqueda y gestión de recetas y mejorar la experiencia del usuario a través de una interfaz intuitiva.


Características:
- Gestión de recetas, favoritos y comentarios.
- Suscripción Premium para acceder a funcionalidades avanzadas.
- Integración con APIs externas para enriquecer la experiencia del usuario:
  - API MealDB: Obtiene una base de datos extensa de recetas, ingredientes y categorías.

Planes del Sistema

Plan Básico:
- Gestión de perfil del usuario (ABM).
- Visualización y filtrado de lista de favoritos.
- Acceso y visualización de recetas.
- Gestión de comentarios.
- Acceso a funcionalidades limitadas.

Plan Premium:
- Gestión de recetas propias (ABM) por parte del usuario premium.
- Filtrado y visualización de recetas por ingredientes.
- Acceso completo a funcionalidades avanzadas.
  

Herramientas Utilizadas

- Lenguajes: JavaScript, HTML, CSS
- Frameworks: Angular
- API externas:
- MealDB: Para recetas, ingredientes y categorías.

  

Puertos y Configuración de Backend

Para que el sistema funcione correctamente, debes ejecutar el servidor JSON para almacenar y gestionar los datos. Ejecuta los siguientes comandos para abrir los puertos necesarios:

Inicia el servidor en el puerto **3000**:
json-server --watch db.json --port 3000

Inicia el servidor en el puerto 3002:
json-server --watch db2.json --port 3002


Instrucciones para el Desarrollo:
Clonar el repositorio:
git clone https://github.com/julibucci/MealMaster-Project.git


Instalar las dependencias: Entra en el directorio del proyecto y ejecuta:
npm install


Ejecutar el servidor de desarrollo:
ng serve

Esto iniciará la aplicación en http://localhost:4200/.


Iniciar el servidor JSON (para simular las bases de datos): Asegurate de ejecutar ambos servidores JSON en puertos separados, como se explicó arriba.




Para probar las funcionalidades del usuario básico pueden usar este perfil:

Email: jane.smith@example.com
Password: 456



Para probar las funcionalidades del usuario premium pueden usar este perfil:

Email: john.doe@example.com
Password: 123


O también pueden crear su propio perfil que se inicializará con el plan básico y al simular el pago pasará a ser Premium.


