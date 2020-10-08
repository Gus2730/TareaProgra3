# Resumen tarea 1 progra 3
https://drive.google.com/file/d/1fA9enVfv8c9N3QNX54MHRd5dhvodSYK8/view?usp=sharing
## Lenguaje JavaScript [![N|Solid](http://drive.google.com/uc?export=view&id=1lDVNN84IUWBBXbpctFzX3pwfJlmaVu-d)]( https://uniwebsidad.com/libros/javascript)
    JavaScript es un lenguaje de programación que se utiliza principalmente para crear páginas web dinámicas.
	Una página web dinámica es aquella que incorpora efectos como texto que aparece y desaparece, animaciones, acciones que se activan al pulsar botones y ventanas con mensajes de aviso al usuario.
	Técnicamente, JavaScript es un lenguaje de programación interpretado, por lo que no es necesario compilar los programas para ejecutarlos. En otras palabras, los programas escritos con JavaScript se pueden probar directamente en cualquier navegador sin necesidad de procesos intermedios.
## Framework Vue [![N|Solid](http://drive.google.com/uc?export=view&id=1D47xfy4Tz1gu6RRvAhybamg5ai2WzY_e)](https://es.vuejs.org/v2/guide/)
	Vue (pronunciado /vjuː/, como view) es un framework progresivo para construir interfaces de usuario. A diferencia de otros frameworks monolíticos, Vue está diseñado desde cero para ser utilizado incrementalmente. La librería central está enfocada solo en la capa de visualización, y es fácil de utilizar e integrar con otras librerías o proyectos existentes. Por otro lado, Vue también es perfectamente capaz de impulsar sofisticadas Single-Page Applications cuando se utiliza en combinación con herramientas modernas y librerías de apoyo.
## Editor Visual Studio Code [![N|Solid](http://drive.google.com/uc?export=view&id=1fA9enVfv8c9N3QNX54MHRd5dhvodSYK8)](https://code.visualstudio.com/?wt.mc_id=DX_841432)
    Visual Studio Code es un editor de código optimizado con soporte para operaciones de desarrollo como depuración, ejecución de tareas y control de versiones. Su objetivo es proporcionar solo las herramientas que un desarrollador necesita para un ciclo rápido de código, compilación y depuración
    
## Pasos utilizados para crear la aplicación, ejecutarla y utilizarla
#
    Para crear un proyecto de vue se necesita ejecutar una serie de comandos desde el powershell de windows, para ello deberemos ejecutar este programa como modo administrador con el fin de aplicar los comandos a mencionar:
- npm install vue
- npm install -g @vue/cli
- npm install vue bootstrap-vue bootstrap

#
    Los siguientes comandos se utilizan para poder habilitar la ejecución de scripts desde la terminal que posee integrado Visual code, ya que hay ciertos o la mayoría de comando usados para crear el proyecto no pueden ser ejecutados ya que poseen restricciones por parte del sistema operativo, al ejecutarlos presionamos la tecla "s" y un enter para habilitar estas opciones.
- Set-ExecutionPolicy -Scope LocalMachine unrestricted
- Set-ExecutionPolicy -Scope CurrentUser unrestricted

#
    Con estos comandos verificamos si la inatalaciones de los programas se realizaron de forma exitosa.
- vue --version
- npm --version
- node --version

#
    Una vez ejecutado todos los comandos  anteriormente mencionados procedemos a abrir visual code y su terminal, luego para crear un proyecto de vue ejecutamos el siguiente comando "vue create laboratorio2", donde laboratorio2 es el nombre que se le asigna al proyecto. Luego de haberlo ejecutado, en la terminal se le desplegara dos opciones como las que se visualizan en la siguiente imagen.
![Duck](http://drive.google.com/uc?export=view&id=1EEsOXnP2soofO6xQavlv4MZ8IQe4z_TT)
#
    Ahí es nada mas de seguir las instrucciones y agregar las dependencias que se vayan a usar. Luego de esto tomamos la carpeta donde se creó el proyecto y la arrastramos hacia visual code para que se carguen los archivos y así poderlos manipular. Con el comando "npm run serve" compilamos nuestro proyecto y asi se nos mostrará como la siguiente imagen:
![Duck](http://drive.google.com/uc?export=view&id=1zW-uwnfJwbtrkQMa4Ssi3ZOQJAv0ZKTs)
    
#
    Luego de esto tecleamos la tecla control y le damos un clic a cualquiera de las dos URLs  y se nos mostrará una ventana en nuestro navegador web como la siguiente imagen, en ella podremos visualizar los diseños generados para las vistas.
![Duck](http://drive.google.com/uc?export=view&id=1h5Y9kp9jKDPUX0j3_eyB9PE7TGzOLkwy)
#
Ademas se utilizaron las siguientes librerías como complemento para desarrollar ciertas funciones de forma más simple.
- npm install vuesax@next
- npm install vue-moment

El primer comando es para complemento gráfico y el segundo para dar formato a los campos de tipo date.

## Paginas de guia para el desarrollo de la aplicacion.
>Nos guiamos con un minicurso en youtube que nos enseña a desarrollar aplicaciones web con vue.https://www.youtube.com/playlist?list=PLPl81lqbj-4J-gfAERGDCdOQtVgRhSvIT
>Tambien investigamos que era vue en https://es.vuejs.org/v2/guide/.
>Para entender un poco sobre javaScrip leimos un poco en https://uniwebsidad.com/libros/javascript



