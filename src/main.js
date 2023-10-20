import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

const app = createApp(App);
app.use(router)
app.use(store)

app.mount('#app');

library.add(fas)
library.add(far)
app.component('font-awesome-icon', FontAwesomeIcon)