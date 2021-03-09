import axios from "axios";

export const DT_API_BASE_URL =
  "https://afrecruitingfront-webapi-dev.azurewebsites.net/api";

const apiClient = axios.create({
  baseURL: DT_API_BASE_URL,

  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-DevTours-Developer": "Tilo Werner"
  },
  timeout: 15000
});

export default {
  getLocations() {
    return apiClient.get("/location");
  },
  getEvents(perPage, page) {
    return apiClient.get("/events?_limit=" + perPage + "&_page=" + page);
  },
  getEvent(id) {
    return apiClient.get("/events/" + id);
  },
  postEvent(event) {
    return apiClient.post("/events", event);
  }
};
