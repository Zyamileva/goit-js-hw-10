import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_dPHL6jmhrFCixGco46716soO480sAjBax8aA1Z0XeQg3VUCxneiSygaEIQyFwRhu';

document.querySelector('cat-info');
const BASE_URL = 'https://api.thecatapi.com/v1/';
const END_POINT = 'breeds';
const END_POINT_IMAGES = 'images/';

export function fetchBreeds() {
  return fetch(`${BASE_URL}${END_POINT}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `${BASE_URL}${END_POINT_IMAGES}search?breed_ids=${breedId}`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

export function fetchCatDiscriptionByBreed(Id) {
  return fetch(`${BASE_URL}${END_POINT_IMAGES}${Id}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}
