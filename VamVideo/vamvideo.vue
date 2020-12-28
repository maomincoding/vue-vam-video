<template>
  <div
    class="video-box"
    @mouseenter="vp.bottomTup()"
    @mouseleave="vp.bottomTdow()"
  >
    <video
      class="video-player"
      @canplay="vp.useOnplay()"
      @ended="vp.useEnd()"
      @click="vp.isplay()"
    ></video>
    <div class="bottom-tool">
      <div class="pv-bar">
        <div class="pv-played"></div>
        <div class="pv-dot" @mousedown="vp.useTime()"></div>
      </div>
      <div class="pv-controls">
        <div class="pc-con-l">
          <div class="play-btn" @click="vp.usePlay()">
            <i class="iconfont icon-bofang"></i>
            <i class="iconfont icon-zanting hide"></i>
          </div>
          <div class="pv-time">
            <span class="pv-currentTime">00:00:00</span>
            <span>/</span>
            <span class="pv-duration">00:00:00</span>
          </div>
        </div>
        <div class="pc-con-r">
          <div class="pv-listen ml">
            <div class="pv-yl">
              <p class="pv-ol" @mousedown="vp.useListen()"></p>
              <p class="pv-bg"></p>
            </div>
            <div class="pv-iconyl" @click="vp.useVolume()">
              <i class="iconfont icon-yinliang"></i>
              <i class="iconfont icon-jingyin hide"></i>
            </div>
          </div>
          <div class="pv-speed ml">
            <p class="pv-spnum">1x</p>
            <ul class="selectList" @click="vp.useSpnum()">
              <li>0.5x</li>
              <li>1x</li>
              <li>1.25x</li>
              <li>1.5x</li>
              <li>2x</li>
            </ul>
          </div>
          <div class="pv-screen ml" @click="vp.pageFullScreen()">
            <i class="iconfont icon-quanping"></i>
            <i class="iconfont icon-huanyuan hide"></i>
          </div>
          <div class="pv-screens ml" @click="vp.fullScreen()">
            <i class="iconfont icon-shipinquanping"></i>
            <i class="iconfont icon-tuichuquanping hide"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VamVideo from "./vp.js";
export default {
  name: "VamVideo",
  data: () => ({
    vp: null,
    defaultStyle: {
      width: "1200px",
      height: "600px",
    },
  }),
  props: {
    properties: {
      type: Object,
    },
    videoStyle: {
      type: Object,
    },
  },
  mounted() {
    this.vp = new VamVideo(
      document.querySelector(".video-box"),
      this.properties,
      Object.keys(this.videoStyle).length === 0
        ? this.defaultStyle
        : this.videoStyle
    );
  },
};
</script>

<style scoped>
@import "./css/iconfont/iconfont.css";
@import "./css/index.css";
</style>