import axios from "axios";

export default axios.create({
  baseURL: "Your API Url",
  headers: {
    "Content-type": "application/json"
  }
});