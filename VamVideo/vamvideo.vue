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
      @canplay="vp.useOnplay()"
      @ended="vp.useEnd()"
      @waiting="wait"
      @canplaythrough="canplay"
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
import VamVideo from "./vp.js";
import load from "./load.vue";
export default {
  name: "VamVideo",
  components: {
    load,
  },
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
    wait() {
      console.log("播放暂停，等待下载更多数据");
      this.show = true;
    },
    canplay() {
      console.log("播放继续");
      this.show = false;
    },
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
      this.$once(`hook:${isVue3?'onBeforeUnmount':'beforeDestory'}`, () => {
        window.removeEventListener("fullscreenchange", this.full, true);
      });
    },
    keydown(ev) {
      if (ev.keyCode === 32) {
        this.vp.usePlay();
      }
      this.$once(`hook:${isVue3?'onBeforeUnmount':'beforeDestory'}`, () => {
        window.removeEventListener("keydown", this.keydown, true);
      });
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