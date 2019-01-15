// loading.js
// Vue.extend返回的是一个扩展实例构造器，也就是预设了部分选项的Vue实例构造器。其主要用来服务于Vue.component，用来生成组件。可以简单的理解为当在模板中遇到该组件名称作为标签的自定义元素时，会自动调用扩展实例构造器来生产组件实例，并挂载到自定义元素上。著作权归作者所有。
// 商业转载请联系作者获得授权,非商业转载请注明出处。
// 原文: https://www.w3cplus.com/vue/vue-extend.html © w3cplus.com
import LoadingComponent from "./loading.vue";
let $vm;
export default {
  install(Vue) {
    if (!$vm) {
      const LoadingPlugin = Vue.extend(LoadingComponent);

      $vm = new LoadingPlugin({
        el: document.createElement("div")
      });

      document.body.appendChild($vm.$el);
    }
    $vm.show = false;

    let loading = {
      show({ text, type } = {}) {
        $vm.show = true;
        $vm.text = text || "正在加载中...";
        $vm.type = type || "sk-rotating-plane";
      },
      hide() {
        $vm.show = false;
      }
    };

    if (!Vue.$loading) {
      Vue.$loading = loading;
    }

    // Vue.prototype.$loading = Vue.$loading;

    Vue.mixin({
      created() {
        this.$loading = Vue.$loading;
      }
    });
  }
};

/*
以上我们新建一个loading.js文件，引入我们的loading.vue组件，然后通过Vue.extend()方法创建了一个构造器LoadingPlugin，其次我们再通过new LoadingPlugin()创建了$vm实例，并挂载到一个div元素上。最后我们需要通过document.body.appendChild($vm.$el)将其插入到DOM节点中。
当我们创建了$vm实例后，我们可以访问该实例的属性和方法，比如通过$vm.show就可以改变loading组件的show值来控制其显示隐藏。
最终我们通过Vue.mixin或者Vue.prototype.$loading来全局添加了$loading事件，其又包含了show和hide两个方法。我们可以直接在页面中使用this.$loading.show()来显示加载，使用this.$loading.hide()来关闭加载。

作者：劳卜
链接：https://juejin.im/post/599c18b2f265da249823f21f
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
* */
