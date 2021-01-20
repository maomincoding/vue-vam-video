<template>
  <div
    class="video-box"
    @mousemove="vp.bottomTup()"
    @mouseleave="vp.bottomTdow()"
  >
    <load
      :radius="40"
      :progress="0"
      :stroke="6"
      :color="'#1989fa'"
      v-show="show"
      class="mz"
    ></load>
    <div class="mz" v-show="!show">
      <i
        class="iconfont icon-bofang"
        style="font-size: 58px; z-index: 1000"
        @click="vp.isplay()"
      ></i>
      <i class="iconfont icon-zanting hide fain" style="font-size: 58px"></i>
    </div>
    <video
      class="video-player"
      @canplay="canplayVd"
      @ended="endedVd"
      @waiting="waitingVd"
      @canplaythrough="canplaythroughVd"
      @play="playVd"
      @pause="pauseVd"
      @error="errorVd"
      @volumechange="volumechangeVd"
      @emptied="emptiedVd"
      @ratechange="ratechangeVd"
      @empty="emptyVd"
      @seeking="seekingVd"
      @timeupdate="timeupdateVd"
      @stalled="stalledVd"
      @abort="abortVd"
    ></video>
    <div class="bottom-tool" @mousemove="vp.clearVb()">
      <div class="pv-bar">
        <div class="pv-played">
          <div class="pv-dot" @mousedown="vp.useTime()"></div>
        </div>
      </div>
      <div class="pv-controls">
        <div class="pc-con-l">
          <div class="play-btn" @click="vp.usePlay()" v-show="!show">
            <i class="iconfont icon-bofang" :title="controls.playTit"></i>
            <i
              class="iconfont icon-zanting hide"
              :title="controls.pauseTit"
            ></i>
          </div>
          <div class="pv-time">
            <p class="pv-currentTime">00:00:00</p>
            <p>/</p>
            <p class="pv-duration">00:00:00</p>
          </div>
        </div>
        <div class="pc-con-r">
          <div class="pv-listen ml" v-if="controls.listen">
            <div class="pv-yl">
              <p class="pv-ol" @mousedown="vp.useListen()"></p>
              <p class="pv-bg"></p>
            </div>
            <div class="pv-iconyl" @click="vp.useVolume()">
              <i
                class="iconfont icon-yinliang"
                :title="controls.yinliangTit"
              ></i>
              <i
                class="iconfont icon-jingyin hide"
                :title="controls.jingyinTit"
              ></i>
            </div>
          </div>
          <div class="pv-speed ml" v-if="controls.speed">
            <p class="pv-spnum" :title="controls.speedTit">1x</p>
            <ul class="selectList" @click="vp.useSpnum()">
              <li>0.5x</li>
              <li>1x</li>
              <li>1.25x</li>
              <li>1.5x</li>
              <li>2x</li>
            </ul>
          </div>
          <div
            class="pv-screen ml"
            @click="vp.pageFullScreen()"
            v-show="screen"
            v-if="controls.pageFullScreen"
          >
            <i
              class="iconfont icon-quanping"
              :title="controls.pageFullScreenTit"
            ></i>
            <i
              class="iconfont icon-huanyuan hide"
              :title="controls.escPageFullScreenTit"
            ></i>
          </div>
          <div
            class="pv-screens ml"
            @click="vp.fullScreen()"
            v-if="controls.fullScreen"
          >
            <i
              class="iconfont icon-shipinquanping"
              v-show="shipinquanping"
              :title="controls.fullScreenTit"
            ></i>
            <i
              class="iconfont icon-tuichuquanping"
              v-show="tuichuquanping"
              :title="controls.EscfullScreenTit"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { h } from 'vue';
const isVue3 = typeof h === 'function';
import {v2index} from './mixinv2.js'
import {v3index} from './mixinv3.js'
import VamVideo from "./vp.js";
import load from "./load.vue";
export default {
  name: "VamVideo",
  components: {
    load,
  },
   mixins:[isVue3?v3index:v2index],
  data: () => ({
    vp: null,
    show: true,
    screen: true,
    shipinquanping: true,
    tuichuquanping: false,
    defaultStyle: {
      width: "1200px",
      height: "600px",
    },
  }),
  computed: {
    controls: function () {
      return this.controlsConfig ? this.controlsConfig : false;
    },
  },
  props: {
    properties: {
      type: Object,
    },
    videoStyle: {
      type: Object,
    },
    controlsConfig: {
      type: Object,
    },
  },
  methods: {
    // Video events
    // 媒体已经收到开始播放的请求
    playVd(){
      this.$emit('play');
    },
    // 回放已经暂停
    pauseVd(){
      this.$emit('pause');
    },
    // 回放可以开始
    canplayVd(){
      this.$emit('canplay');
      this.vp.useOnplay();
    },
    // 媒体已经播放完一遍，且停止了
    endedVd(){
      this.$emit('ended');
      this.vp.useEnd();
    },
    // 回放暂停，以下载更多数据
    waitingVd() {
      this.$emit('waiting');
      this.show = true;
    },
    // 回放可以继续，不应该中断，readState 为 3
    canplaythroughVd() {
      this.$emit('canplaythrough');
      this.show = false;
    },
    // 下载期间发生了网络错误
    errorVd(){
      this.$emit('error');
    },
    // volume 或 muted 属性值发生了变化
    volumechangeVd(){
      this.$emit('volumechange');
    },
    // 网络连接关闭了
    emptiedVd(){
      this.$emit('emptied');
    },
    // 媒体播放速率发生变化
    ratechangeVd(){
      this.$emit('ratechange');
    },
    // 发生了错误，阻止媒体下载
    emptyVd(){
      this.$emit('empty');
    },
    // 回放已移动到新位置
    seekingVd(){
      this.$emit('seeking');
    },
    // currentTime 被非常规或意外地更改了
    timeupdateVd(){
      this.$emit('timeupdate');
    },
    // 浏览器尝试下载，但尚未收到数据
    stalledVd(){
      this.$emit('stalled');
    },
    // 下载被中断
    abortVd(){
       this.$emit('abort');
    },
    // ***
    full() {
      if (document.fullscreenElement) {
        this.tuichuquanping = true;
        this.shipinquanping = false;
        this.screen = false;
      } else {
        this.tuichuquanping = false;
        this.shipinquanping = true;
        this.screen = true;
      }
    },
    keydown(ev) {
      if (ev.keyCode === 32) {
        this.vp.usePlay();
      }
    },
    onhls() {
      // 创建script标签，引入外部文件
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://cdn.jsdelivr.net/hls.js/latest/hls.min.js";
      document.getElementsByTagName("head")[0].appendChild(script);
      script.onload = () => {
        console.log("hls.js资源加载成功");
        // eslint-disable-next-line no-undef
        var hls = new Hls();
        hls.loadSource(this.properties.src);
        hls.attachMedia(document.querySelector(".video-player"));
        // eslint-disable-next-line no-undef
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log("加载成功");
        });
        // eslint-disable-next-line no-undef
        hls.on(Hls.Events.ERROR, (event, data) => {
          console.log(event, data);
          // 监听出错事件
          console.log("加载失败");
        });
      };
      script.onerror = function () {
        console.log("hls.js资源加载失败");
      };
    },
  },
  mounted() {
    document.addEventListener("fullscreenchange", this.full, true);
    document.addEventListener("keydown", this.keydown, true);
    if (this.properties && this.videoStyle) {
      this.vp = new VamVideo(
        document.querySelector(".video-box"),
        this.properties,
        Object.keys(this.videoStyle).length === 0
          ? this.defaultStyle
          : this.videoStyle
      );
    } else if (this.properties) {
      this.vp = new VamVideo(
        document.querySelector(".video-box"),
        this.properties
      );
    } else if (this.videoStyle) {
      this.vp = new VamVideo(
        document.querySelector(".video-box"),
        null,
        Object.keys(this.videoStyle).length === 0
          ? this.defaultStyle
          : this.videoStyle
      );
    } else {
      this.vp = new VamVideo(document.querySelector(".video-box"));
    }
    if (
      this.properties &&
      this.properties.src &&
      this.properties.src.substr(
        this.properties.src.length - 4,
        this.properties.src.length
      ) === "m3u8"
    ) {
      this.onhls();
    }
  },
};
</script>

<style scoped>
@import "./css/iconfont/iconfont.css";
@import "./css/index.css";
</style>