# vue-vamvideo
> Vue.js Custom video components

## Using documents
### 1. Introducing components
```
npm install vue-vam-video
```
### 2. configuration parameter

- `properties`: Video properties.

- `videoStyle`: Video style.

- `controlsConfig`: Video control settings.

Examples are as follows：
```html
<template>
  <div id="app">
    <vam-video
      :properties="videoOption.properties"
      :videoStyle="videoOption.videoStyle"
      :controlsConfig="videoOption.controlsConfig"
    ></vam-video>
  </div>
</template>

<script>
import VamVideo from "vue-vam-video";
export default {
  name: "App",
  components: {
    VamVideo
  },
  data: () => ({
    videoOption: {
      properties: {
        poster: require("./assets/logo.png"),
        src:
          // "https://mos-vod-drcn.dbankcdn.cn/P_VT/video_injection/2A1343EFA/v3/6CC21C811065945606293295744/MP4Mix_H.264_1920x1080_6000_HEAAC1_PVC_NoCut.mp4",
          "https://tv.youkutv.cc/2019/11/12/mjkHyHycfh0LyS4r/playlist.m3u8",
        preload: "auto",
        // loop: "loop",
        // autoplay:"autoplay",
        // muted:true
      },
      videoStyle: {
        // width: "1200px",
        // height: "600px",
      },
      controlsConfig: {
        fullScreenTit:"全屏",
        EscfullScreenTit:"退出全屏",
        pageFullScreenTit:"页面全屏",
        escPageFullScreenTit:"退出页面全屏",
        speedTit:"倍速",
        yinliangTit:"音量",
        jingyinTit:"静音",
        playTit:"播放",
        pauseTit:"暂停",
        fullScreen:true,
        pageFullScreen:true,
        speed:true,
        listen:true
      }
    },
  })
};
</script>

```
### 3. Support m3u8 video format

You need to install the following dependencies.
```
npm install hls.js --save
```