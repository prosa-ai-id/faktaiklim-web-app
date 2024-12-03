import axios from "axios";
import moment from "moment";
import { boot } from "quasar/wrappers";
import { searchStore } from "src/stores/search";

const baseURL = process.env.BACKEND_HOST;
const api = axios.create({ baseURL: baseURL });

const search = searchStore();

const goTo = function (url) {
  if (this.$route.path !== url) {
    this.$router.push(url);
  }
};

const thousand = function (number) {
  if (number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  } else {
    return 0;
  }
};

function download(url, filename) {
  axios({
    url: url,
    method: "GET",
    responseType: "blob",
  }).then((response) => {
    const fileURL = window.URL.createObjectURL(new Blob([response.data]));
    const fileLink = document.createElement("a");
    fileLink.href = fileURL;
    fileLink.setAttribute("download", filename);
    document.body.appendChild(fileLink);
    fileLink.click();
  });
}

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
  app.config.globalProperties.$search = search;
  app.config.globalProperties.$goTo = goTo;
  app.config.globalProperties.$moment = moment;
  app.config.globalProperties.$thousand = thousand;
  app.config.globalProperties.$download = download;
});

export { api };
