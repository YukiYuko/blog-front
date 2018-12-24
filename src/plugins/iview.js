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
  Card,
  Tag,
  Input,
  Message,
  Form,
  FormItem
} from "iview";

Vue.component("CButton", Button);
Vue.component("Modal", Modal);
Vue.component("Tooltip", Tooltip);
Vue.component("Tabs", Tabs);
Vue.component("TabPane", TabPane);
Vue.component("Row", Row);
Vue.component("Cols", Col);
Vue.component("Card", Card);
Vue.component("Tag", Tag);
Vue.component("CInput", Input);
Vue.component("CForm", Form);
Vue.component("FormItem", FormItem);
Vue.prototype.$Notice = Notice;
Vue.prototype.$Loading = LoadingBar;
Vue.prototype.$Modal = Modal;
Vue.prototype.$Message = Message;

import "iview/dist/styles/iview.css";
