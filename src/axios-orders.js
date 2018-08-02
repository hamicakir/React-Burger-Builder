import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-62905.firebaseio.com/'
});

export default instance;