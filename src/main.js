import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

const app = createApp(App);
app.use(router)

app.mount('#app');

library.add(fas)
app.component('font-awesome-icon', FontAwesomeIcon)