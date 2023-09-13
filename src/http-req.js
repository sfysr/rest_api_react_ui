import axios from "axios";

export default axios.create({
  baseURL: "http://kma-api-project-f528f5982a4a.herokuapp.com/api/dataitem",
  headers: {
    "Content-type": "application/json"
  }
});