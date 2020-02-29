import Share from './src/components/share.vue';
import _Vue from 'vue';

Share.install = Vue => {
    if (!Vue) {
        window.Vue = Vue = _Vue
    }
    Vue.component(Share.name, Share)
 }

 export default Share