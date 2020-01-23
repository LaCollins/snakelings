import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllSnakes = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/snakelings.json`)
    .then((result) => {
      const allSnakesObj = result.data;
      const snakes = [];
      if (allSnakesObj != null) {
        Object.keys(allSnakesObj).forEach((snakeId) => {
          const newSnake = allSnakesObj[snakeId];
          newSnake.id = snakeId;
          snakes.push(newSnake);
        });
      }
      resolve(snakes);
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  getAllSnakes,
};
