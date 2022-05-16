import axios from "axios";

const ProductInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/products/',
    timeout: 4000,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  export { ProductInstance };

