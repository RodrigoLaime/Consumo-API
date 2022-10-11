const api = axios.create({
  baseURL: 'https://api.thecatapi.com/v1'
});
api.defaults.headers.common['X-API-KEY'] = 'live_D2xXjz3mmv6qKskwoiIMZFwBv4AEl0hhmCDHQcJuyfYnjWaVVDWqPOFC7c7A9cqE'; //de aqui para arriba es la instancia lista y funcionanando para utilizarlo

const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2';/* url de api  */
const API_URL_FAVOTITES = 'https://api.thecatapi.com/v1/favourites';/* url de api para agregar a favorito */
const API_URL_FAVOTITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;/* url de api para eliminar de favorito */
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';/* url de api para agregar imagen a la api */

const spanError = document.getElementById('error')


async function loadRandomMichis() {/* funcion cargar random imagenes */
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log('Random')
  console.log(data)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');

    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');

    img1.src = data[0].url;
    img2.src = data[1].url;

    btn1.onclick = () => saveFavouriteMichi(data[0].id);/* le pasasmos la funcion para guardar a favoritos */
    btn2.onclick = () => saveFavouriteMichi(data[1].id);
  }
}

async function loadFavouriteMichis() {
  const res = await fetch(API_URL_FAVOTITES, {
    method: 'GET',/* metodo que enlas mediante un llamado a una api */
    headers: {/* metodo de comunicacion mediante llave */
      'X-API-KEY': 'live_D2xXjz3mmv6qKskwoiIMZFwBv4AEl0hhmCDHQcJuyfYnjWaVVDWqPOFC7c7A9cqE',
    },
  });
  const data = await res.json();/* la respuesta lo convertimos en json */
  console.log('Favoritos')
  console.log(data)/* imprime la respuesta */

  if (res.status !== 200) {/* si si el status code no es 200 */
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    const section = document.getElementById('favoriteMichis')
    section.innerHTML = "";

    /*  const h2 = document.createElement('h2');
     const h2Text = document.createTextNode('Michis favoritos');
     h2.appendChild(h2Text);
     section.appendChild(h2); */

    data.forEach(michi => {
      const article = document.createElement('article');
      const img = document.createElement('img');
      const btn = document.createElement('button');
      const btnText = document.createTextNode('Sacar al michi de favoritos');

      img.src = michi.image.url;
      img.classList.add('gatitos');
      img.width = 150;
      btn.appendChild(btnText);
      btn.onclick = () => deleteFavouriteMichi(michi.id);/*  */
      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
    });
  }
}

async function saveFavouriteMichi(id) {
  const { data, status } = await api.post('/favourites', {
    image_id: id,
  });

  // const res = await fetch(API_URL_FAVOTITES, {
  //   method: 'POST',/* epecifica que el id se va a agregar a fovoritos */
  //   headers: {/*la forma de comunicar con el baquen, indica cual es el tipo de respuesta que esperamos del baquen */
  //     'Content-Type': 'application/json',/* cual es el tipo de idioma de dato o informacion en que se comuncan el frontend y el baquend */
  //     'X-API-KEY': 'live_D2xXjz3mmv6qKskwoiIMZFwBv4AEl0hhmCDHQcJuyfYnjWaVVDWqPOFC7c7A9cqE',
  //   },
  //   body: JSON.stringify({/* body la informacion que vamos a enviar la informacion tal cual */
  //     image_id: id
  //   }),
  // });
  // const data = await res.json();

  console.log('Save')

  if (status !== 200) {
    spanError.innerHTML = "Hubo un error: " + status + data.message;
  } else {
    console.log('Michi guardado en favoritos')
    loadFavouriteMichis();
  }
}

async function deleteFavouriteMichi(id) {
  const res = await fetch(API_URL_FAVOTITES_DELETE(id), {
    method: 'DELETE',
    headers: {
      'X-API-KEY': 'live_D2xXjz3mmv6qKskwoiIMZFwBv4AEl0hhmCDHQcJuyfYnjWaVVDWqPOFC7c7A9cqE',
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
  const formData = new FormData(form);

  console.log(formData.get('file'))

  const res = await fetch(API_URL_UPLOAD, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      'X-API-KEY': 'live_D2xXjz3mmv6qKskwoiIMZFwBv4AEl0hhmCDHQcJuyfYnjWaVVDWqPOFC7c7A9cqE',
    },
    body: formData,
  })
  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    console.log({ data })
  } else {
    console.log('Foto de michi subida :)')
    console.log({ data })
    console.log(data.url)
    saveFavouriteMichi(data.id);
  }
}

loadRandomMichis();
loadFavouriteMichis();