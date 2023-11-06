import {
  fetchBreeds,
  fetchCatByBreed,
  fetchCatDiscriptionByBreed,
} from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import './css/styles.css';
import Notiflix from 'notiflix';

const ref = {
  selectData: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

const { selectData, catInfo, loader, error } = ref;
const arrayBreeds = [];

selectData.classList.add('visually-hidden');
error.classList.add('visually-hidden');
catInfo.classList.add('visually-hidden');

fetchBreeds()
  .then(data => {
    data.forEach(element => {
      arrayBreeds.push({ text: element.name, value: element.id });
    });

    let slim = new SlimSelect({
      select: selectData,
      data: arrayBreeds,
    });
    selectData.classList.remove('visually-hidden');
  })
  .catch(onError);

selectData.addEventListener('change', selectBreed);

function selectBreed(event) {
  loader.classList.replace('visually-hidden', 'loader');
  selectData.classList.add('visually-hidden');
  catInfo.classList.add('visually-hidden');

  const { currentTarget } = event;
  fetchCatByBreed(currentTarget.value)
    .then(data => {
      const { id, url } = data[0];
      fetchCatDiscriptionByBreed(id)
        .then(element => {
          loader.classList.replace('loader', 'visually-hidden');
          selectData.classList.remove('visually-hidden');
          const { temperament, name, description } = element.breeds[0];
          catInfo.innerHTML = `<div><img src="${url}" alt="${name}" width="400"/></div><div><h1>${name}</h1><p>${description}</p><p><b>Temperament:</b> ${temperament}</p></div>`;
          catInfo.classList.remove('visually-hidden');
        })
        .catch(onError);
    })
    .catch(onError);
}

function onError(error) {
  selectData.classList.remove('visually-hidden');
  loader.classList.replace('loader', 'visually-hidden');

  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!',
    {
      position: 'center-center',
      timeout: 10000,
    }
  );
}
