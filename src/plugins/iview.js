import Vue from "vue";
import { Button, Notice, LoadingBar } from "iview";

Vue.component("Button", Button);
Vue.prototype.$Notice = Notice;
Vue.prototype.$Loading = LoadingBar;

import "iview/dist/styles/iview.css";
