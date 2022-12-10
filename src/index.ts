import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import ButtonComponent from "./components/button.vue"

const app = createApp(App).component('v-button', ButtonComponent);

app.mount("#root");
