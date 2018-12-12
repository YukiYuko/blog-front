import Vue from "vue";
import { Button, Notice, LoadingBar, Modal } from "iview";

Vue.component("Button", Button);
Vue.component("Modal", Modal);
Vue.prototype.$Notice = Notice;
Vue.prototype.$Loading = LoadingBar;
Vue.prototype.$Modal = Modal;

import "iview/dist/styles/iview.css";
