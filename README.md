# vue-vamvideo
> Vue.js Custom video components

## Using documents
1. Introducing components
2. configuration parameter

- `properties`: Video properties.

- `videoStyle`: Video style.

These two parameters need to be set separately.
```html
<template>
  <div id="app">
    <vam-video :properties="videoOption.properties" :videoStyle="videoOption.videoStyle"></vam-video>
  </div>
</template>

<script>
export default {
  name: "Index",
  data: () => ({
    videoOption: {
      properties: {
        poster: require("./img/bg.png"),
        src:
          "https://mos-vod-drcn.dbankcdn.cn/P_VT/video_injection/A91343E9D/v3/9AB0A7921049102362779584128/MP4Mix_H.264_1920x1080_6000_HEAAC1_PVC_NoCut.mp4",
        preload: "auto",
        loop: "loop",
        // autoplay:"autoplay",
        // muted:true,
        // controls:"controls"
      },
      videoStyle: {
        // width: "1200px",
        // height: "600px",
      },
    },
  })
};
</script>
```
3. Support m3u8 video format

You need to install the following dependencies.
```
npm install hls.js --save
```