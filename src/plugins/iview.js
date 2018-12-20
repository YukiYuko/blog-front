import Vue from "vue";
import {
  Button,
  Notice,
  LoadingBar,
  Modal,
  Tooltip,
  Tabs,
  TabPane,
  Row,
  Col,
  Card
} from "iview";

Vue.component("Button", Button);
Vue.component("Modal", Modal);
Vue.component("Tooltip", Tooltip);
Vue.component("Tabs", Tabs);
Vue.component("TabPane", TabPane);
Vue.component("Row", Row);
Vue.component("Cols", Col);
Vue.component("Card", Card);
Vue.prototype.$Notice = Notice;
Vue.prototype.$Loading = LoadingBar;
Vue.prototype.$Modal = Modal;

import "iview/dist/styles/iview.css";
