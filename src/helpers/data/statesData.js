import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getStateById = (stateId) => axios.get(`${baseUrl}/states/${stateId}.json`);

export default { getStateById };