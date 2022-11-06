import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";

const app = createApp(App).mount("#root");

window.onbeforeunload = function () {
   document.cookie = JSON.stringify(app.lists);
};
