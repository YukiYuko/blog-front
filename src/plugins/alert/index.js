import Vue from "vue";
import AlertComponent from "./alert";
import { pageScroll } from "../../lib/assist";

//extend 是构造一个组件的语法器.传入参数，返回一个组件
let AlertConstructor = Vue.extend(AlertComponent);

const instance = new AlertConstructor({
  el: document.createElement("div")
});

let hashChange = () => {
  pageScroll.unlock();
  const el = instance.$el;
  el.parentNode && el.parentNode.removeChild(el);
};

AlertConstructor.prototype.closeAlert = function() {
  hashChange();
  window.removeEventListener("hashchange", hashChange);
  typeof this.callback === "function" && this.callback();
};

const Alert = (options = {}) => {
  instance.mes = options.mes;
  instance.callback = options.callback;

  window.addEventListener("hashchange", hashChange);

  document.body.appendChild(instance.$el);

  pageScroll.lock();
};

export default Alert;
