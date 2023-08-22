# Data Lovers Studio Ghibli

Este proyecto es una interfaz de usuario que permite a los usuarios explorar películas del Studio Ghibli, buscar y filtrar por nombre y año de lanzamiento, y también muestra estadísticas relacionadas con los personajes que aparecen en ellas.

## Características

- Explora y busca películas del Studio Ghibli.
- Muestra detalles de las películas, como título, director, productor, fecha de lanzamiento y personajes.
- Filtra películas por título y ordena por fecha de lanzamiento o título.
- Muestra estadísticas sobre los personajes en las películas, incluyendo la cantidad de personajes femeninos, masculinos y especies no humanas.

## Instalación

1. Clona este repositorio: `git clone https://github.com/tu-usuario/data-lovers-studio-ghibli.git`
2. Ingresa al directorio del proyecto: `cd data-lovers-studio-ghibli`
3. Abre el archivo `index.html` en tu navegador web.

## Demostración de uso

1. Abre la página web en tu navegador.
2. Explora las películas del Studio Ghibli.
3. Utiliza el campo de búsqueda para encontrar películas por título.
4. Utiliza los filtros y opciones de ordenamiento para refinar los resultados.
5. Haz clic en el botón "Show Statistics" para ver estadísticas sobre los personajes en las películas.
6. Haz clic en el botón "Character Stats Chart" para ver un gráfico de barras que muestra las estadísticas.

### Exploración y Visualización de Películas

- Las películas del Studio Ghibli se muestran en tarjetas con sus respectivas imágenes y títulos.
- Los usuarios pueden hacer clic en una tarjeta para ver más detalles de la película, incluyendo su director, productor y fecha de lanzamiento.
- Los detalles de la película se muestran en un diálogo emergente.

### Búsqueda y Filtrado

- Los usuarios pueden buscar películas por título utilizando el campo de búsqueda.
- Los resultados de búsqueda se muestran en tiempo real a medida que se escribe en el campo de búsqueda.
- Los usuarios pueden filtrar películas por título y ordenarlas por fecha de lanzamiento o título.

### Estadísticas de Personajes

- Al hacer clic en el botón "Show Statistics", se muestran estadísticas relacionadas con los personajes en las películas.
- Las estadísticas incluyen el número de personajes femeninos, masculinos y especies no humanas presentes en las películas.
- Las estadísticas se actualizan en función de los datos cargados.

### Gráfico de Barras de Estadísticas

- Al hacer clic en el botón "Character Stats Chart", se muestra un gráfico de barras que representa las estadísticas de los personajes.
- El gráfico visualiza la cantidad de personajes femeninos, masculinos y especies no humanas.
- El gráfico utiliza la librería Chart.js para su generación.

## Proceso de investigación y diseño del proyeto

De acuerdo a lo señalado anteriormente, se ha utilizado la información contenida en la data de Studio Ghibli para realizar este proyecto. A partir de allí, se estableció que esta página web se utilizará por personas que disfrutan y conocen sobre las películas del Studio Ghibli y que quieran obtener más información sobre ellas.

## Historias de usuario

Una vez entendida la necesidad de los usuarios, se han definido las siguientes historias de usuarios: 

### Historia de usuario 1: Mostrar las películas del Studio

Desplegar una página web que muestre las películas de Studio Ghibli, por lo que: 
- yo como: usuaria,
- quiero: ver las películas de studios ghibli,
- para: obtener más información de cada una de ellas.
  
Criterios de aceptación:
- Tiene un encabezado con el logo del Studio Ghibli
- Tiene una barra navegadora en la parte superior
- Muestra las imágenes de las películas en cuatro columnas
- Las imágenes de las películas contienen su nombre en la parte inferior

### Historia de usuario 2: Dar funcionalidad al buscador

Se puede ingresar información en el buscador y obtener como el resultado la información que necesita, por lo que:
- yo como: usuaria,
- quiero: acceder a un buscador,
- para: encontrar la película de la cual deseo más información.

Criterios de aceptación:
- Existe un buscador en la parte superior de la página
- La usuaria puede acceder al buscador y escribir en él
- Al ingresar el nombre de la película al buscador, éste debe retornar la/s que cumpla/n con la condición

### Historia de usuario 3: Filtros para ordenar

Se pueden seleccionar criterios para ordenar la información, porlo que:
- yo como: usuaria,
- quiero: acceder a una opción desplegable “sort by”,
- para: ordenar según el criterio seleccionado.

Criterios de aceptación:
- Existe un "sort by:" desplegable en la parte superior de la página
- Al hacer clic en "sort by" deberá desplegarse las opciones por la cual filtrar
- Ordenar según orden alfabético ascendente
- Ordenar según orden alfabético descendente
- Ordenar según el año de lanzamiento de la película
- Al seleccionar el criterio para ordenar, las películas se reordenarán y mostrarán según esta condición

### Historia de usuario 4: Más información sobre cada película

Al hacer clic en cada imagen se puede obtener más información de cada película, para lo cual:
- yo como: usuaria,
quiero: ver el contenido de la imagen,
para: obtener más información de cada película.

Criterios de aceptación:
- Vincular la data con nuestra página principal
- Dar clic en la imagen para que muestre más información de la película
- Cargar una página con información detallada de la película (nombre, año de lanzamiento, director, productor, descripción de la misma y personajes)

## Diseño de interfaz de usuario

![image (1)](https://github.com/RocioLV/DEV010-data-lovers/assets/138071814/c6ba16a6-48cd-4847-92dc-392eac6d7b9c)

![image (2)](https://github.com/RocioLV/DEV010-data-lovers/assets/138071814/0471d90c-4cca-4758-9728-e7dc9a890135)

![image (3)](https://github.com/RocioLV/DEV010-data-lovers/assets/138071814/febb67a3-8123-43d5-b40c-67b0591d9d14)

## Acceso al proyecto

La página ha sido desplegada en el siguiente enlace: 

## Tecnologías utilizadas en el proyecto

- HTML5
- CSS
- Javascript
- Git
- Github / Github Pages
- Node.js
- Jest

## Pruebas

El proyecto se ha sometido a pruebas para asegurar su funcionamiento correcto:

- Se ha verificado que las tarjetas de las películas se generan correctamente y muestran los detalles adecuados al hacer clic.
- Se ha comprobado que la búsqueda filtra las películas según el título ingresado.
- Se han realizado pruebas para verificar el filtrado y ordenamiento de las películas.
- Se ha confirmado que las estadísticas de personajes se muestran correctamente al hacer clic en "Show Statistics".
- El gráfico de barras se ha probado con datos de ejemplo para verificar su generación y visualización.

## Contribución

¡Contribuciones son bienvenidas! Si deseas contribuir a este proyecto, sigue estos pasos:

1. Fork este repositorio.
2. Crea una nueva rama para tu contribución: `git checkout -b mi-nueva-funcion`
3. Realiza tus cambios y commits: `git commit -m "Agrega nueva función"`
4. Haz push a tu rama: `git push origin mi-nueva-funcion`
5. Crea un Pull Request en este repositorio.

## Créditos

- Desarrollado por Rocío Lorca y Evelyn V.Pírez 
- Datos proporcionados por Studio Ghibli API.
- Librería Chart.js utilizada para generar gráficos.
