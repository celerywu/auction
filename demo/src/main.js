// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

window.onload = function(){
  getRem(750,100)
};
window.onresize = function(){
  getRem(750,100)
};
function getRem(pwidth,prem){
  var html = document.getElementsByTagName("html")[0];
  var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
  html.style.fontSize = oWidth/pwidth*prem + "px";
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
