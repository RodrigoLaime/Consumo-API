const API_URL_RANDOM =
  "https://api.thedogapi.com/v1/images/search?limit=4&api_key=live_r9cVjvYPsXffzNKRnpHXSVFXbWqToFNEdrZKjdnAr5grkHp95EhluJdhzv9NoKoJ";
const API_URL_FAVOTITES =
  "https://api.thedogapi.com/v1/favourites?limit=4&api_key=live_r9cVjvYPsXffzNKRnpHXSVFXbWqToFNEdrZKjdnAr5grkHp95EhluJdhzv9NoKoJ";


/*   const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=c08d415f-dea7-4a38-bb28-7b2188202e46';
  const API_URL_FAVOTITES = 'https://api.thecatapi.com/v1/favourites?api_key=c08d415f-dea7-4a38-bb28-7b2188202e46'; */
  
  const spanError = document.getElementById('error')
  
  async function loadRandomMichis() {
    const res = await fetch(API_URL_RANDOM);//fetch metodo que permite hacer solicitud a una api como get
    const data = await res.json();//transformamos a json
    console.log('Random')
    console.log(data)
  
    if (res.status !== 200) {
      spanError.innerHTML = "Hubo un error: " + res.status;//mostrar en pantalla si res es un error
    } else {
      const img1 = document.getElementById('img1');
      const img2 = document.getElementById('img2');
      
      const btn1 = document.getElementById('btn1');
      const btn2 = document.getElementById('btn2');
      
      img1.src = data[0].url;//insertar la imagen a la etiqueta imagen
      img2.src = data[1].url;

      btn1.onclick = () => saveFavouriteMichi(data[0].id);
      btn2.onclick = () => saveFavouriteMichi(data[1].id);
    }
  }
  
  async function loadFavouriteMichis() { //cambia la url a favorite
    const res = await fetch(API_URL_FAVOTITES);
    const data = await res.json();
    console.log('Favoritos')
    console.log(data)
  
    if (res.status !== 200) {
      spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {//si el status code es 200
      data.forEach(michi => {
        const section = document.getElementById('favoriteMichis')
        const article = document.createElement('article');
        const img = document.createElement('img');
        const btn = document.createElement('button');
        const btnText = document.createTextNode('Sacar al michi de favoritos');

        btn.appendChild(btnText);
        img.src = michi.image.url 
        img.width = 150 

        article.appendChild(img);
        article.appendChild(btn);

        section.appendChild(article);
      });
    }
  }
  
  async function saveFavouriteMichi(id) {
    const res = await fetch(API_URL_FAVOTITES, {
      method: 'POST', //metodo para pedir solicitud 
      headers: {//como en que queremos obtener informacion o comunicarnos con el baquen
        'Content-Type': 'application/json',//lenguaje entre frontend y baquen
      },
      body: JSON.stringify({ //medoto en que enviamos informacion al baquend
        image_id: id//enviamos lo que necesita la api
      }),
    });
    const data = await res.json();//luego lo volvemos a convertir json
  
    console.log('Save')
    console.log(res)
  
    if (res.status !== 200) {
      spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    }
  }
  
  loadRandomMichis();
  loadFavouriteMichis();