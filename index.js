// index.js

// 引入组件
import VamVideo from "./VamVideo/vamvideo.vue";
VamVideo.install = (Vue) => Vue.component(VamVideo.name, VamVideo); //注册组件

export default VamVideo;

