import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllSightings = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/sightings.json`)
    .then((result) => {
      const allSightingsObj = result.data;
      const sightings = [];
      if (allSightingsObj != null) {
        Object.keys(allSightingsObj).forEach((sightingId) => {
          const newSighting = allSightingsObj[sightingId];
          newSighting.id = sightingId;
          sightings.push(newSighting);
        });
      }
      resolve(sightings);
    })
    .catch((error) => reject(error));
});

const getSightingsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/sightings.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const allSightingsObj = result.data;
      const sightings = [];
      if (allSightingsObj != null) {
        Object.keys(allSightingsObj).forEach((sightingId) => {
          const newSighting = allSightingsObj[sightingId];
          newSighting.id = sightingId;
          sightings.push(newSighting);
        });
      }
      resolve(sightings);
    })
    .catch((err) => {
      reject(err);
    });
});

const saveSighting = (sightingInfo) => axios.post(`${baseUrl}/sightings.json`, sightingInfo);

export default {
  getAllSightings,
  getSightingsByUid,
  saveSighting,
};
