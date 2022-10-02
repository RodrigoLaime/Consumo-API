const API_URL_RANDOM =
  "https://api.thecatapi.com/v1/images/search?limit=2";
const API_URL_FAVOTITES =
  "https://api.thecatapi.com/v1/favourites?api_key=live_D2xXjz3mmv6qKskwoiIMZFwBv4AEl0hhmCDHQcJuyfYnjWaVVDWqPOFC7c7A9cqE";
const API_URL_UPLOAD =
  "https://api.thecatapi.com/v1/images/upload?api_key=live_D2xXjz3mmv6qKskwoiIMZFwBv4AEl0hhmCDHQcJuyfYnjWaVVDWqPOFC7c7A9cqE";
const API_URL_FAVOTITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;


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

async function loadFavouriteMichis() {  //cambia la url a favorite
  const res = await fetch(API_URL_FAVOTITES, {
    method: 'GET',
    headers: {'X-API-KEY': 'live_D2xXjz3mmv6qKskwoiIMZFwBv4AEl0hhmCDHQcJuyfYnjWaVVDWqPOFC7c7A9cqE'},
  });
  const data = await res.json();
  console.log('Favoritos')
  console.log(data)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {//si el status code es 200
    const section = document.getElementById('favoriteMichis')
    section.innerHTML = "";

    const h2 = document.createElement('h2');
    const h2Text = document.createTextNode('Michis favoritos');
    h2.appendChild(h2Text);
    section.appendChild(h2);

    data.forEach(michi => {
      const article = document.createElement('article');
      const img = document.createElement('img');
      const btn = document.createElement('button');
      const btnText = document.createTextNode('Eliminar');

      img.src = michi.image.url;
      img.width = 150;
      btn.appendChild(btnText);
      btn.onclick = () => deleteFavouriteMichi(michi.id);
      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
    });
  }
}

async function saveFavouriteMichi(id) {
  const res = await fetch(API_URL_FAVOTITES, {
    method: 'POST',//metodo para pedir solicitud 
    headers: {//como en que queremos obtener informacion o comunicarnos con el baquen
      'Content-Type': 'application/json',//lenguaje entre frontend y baquen
      'X-API-KEY': 'live_D2xXjz3mmv6qKskwoiIMZFwBv4AEl0hhmCDHQcJuyfYnjWaVVDWqPOFC7c7A9cqE'
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
  } else {
    console.log('Michi guardado en favoritos')
    loadFavouriteMichis();
  }
}

async function deleteFavouriteMichi(id) {
  const res = await fetch(API_URL_FAVOTITES_DELETE(id), {
    method: 'DELETE',
    headers: {
        'X-API-KEY': 'live_D2xXjz3mmv6qKskwoiIMZFwBv4AEl0hhmCDHQcJuyfYnjWaVVDWqPOFC7c7A9cqE'
    }
  });
  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log('Michi eliminado de favoritos')
    loadFavouriteMichis();
  }
}

async function uploadMichiPhoto() {
    const form = document.getElementById('uploadingForm')
    const formData = new FormData(form)//va a agregar todos los valores que allamos agarrado en nuestros inputs y lo va a agregar a formData

    console.log(formData.get('file'));

    const res = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers: {
            /* 'Content-Type': 'multipart/form-data', *///lo borramos por que fetchData esd ran inteligente que cuando en el body llamson a formData agrega estos datos de contentType
            'X-API-KEY': 'live_D2xXjz3mmv6qKskwoiIMZFwBv4AEl0hhmCDHQcJuyfYnjWaVVDWqPOFC7c7A9cqE',
        },
        body: formData
    });
}

loadRandomMichis();
loadFavouriteMichis();