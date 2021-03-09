import axios from "axios";

const apiClient = axios.create({
  method: "get",
  baseURL: "https://restcountries.eu/rest/v2/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application"
  }
});

export default {
  getCountryByName(name) {
    const url = "name/" + name + "?fullText=true";
    return apiClient.get(url);
  }
};
