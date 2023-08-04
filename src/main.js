import data from './data/ghibli/ghibli.js'

function printdata(array){
  const container = document.querySelector('.movie-grid')
  for(let i = 0 ; i < array.length; i++){
    // console.log(array[i]);
    container.innerHTML += ` <figure>  
        <img
          src="${array[i].poster}"
          alt="${array[i].title}"
        />
        <figcaption>${array[i].title}</figcaption>
      </figure>` //template string, estructura viene del HTML
  }
}

printdata(data.films);


