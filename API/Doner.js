import axios from "axios";

export default axios.create({
  baseURL: "https://doner-b5ec5.firebaseio.com/",
  headers: {
    key: "AIzaSyAZKOcab8DUXtAV19472sCaTCjhITO5-NU",
  },
});
