// eslint-disable-next-line no-unused-vars
function VamVideo(vp, attrObj, styleObj) {
  this.timer = null;
  this.disX = 0;
  this.disL = 0;
  this.isPageFullScreen = false;
  for (const key in attrObj) {
    if (Object.hasOwnProperty.call(attrObj, key) && key !== "controls") {
      $(".video-player").setAttribute(key, attrObj[key]);
    }
  }
  for (const key in styleObj) {
    if (Object.hasOwnProperty.call(styleObj, key)) {
      $(".video-box").style[`${key}`] = styleObj[key];
      key === "width"
        ? (this.vbw = styleObj.width)
        : (this.vbw = vp.offsetWidth);
      key === "height"
        ? (this.vbh = styleObj.height)
        : (this.vbh = vp.offsetHeight);
    }
  }
  function $(el) {
    return document.querySelector(el);
  }
  function nowTime() {
    $(".pv-currentTime").innerHTML = changeTime($(".video-player").currentTime);
    let scale = $(".video-player").currentTime / $(".video-player").duration;
    let w = $(".pv-bar").offsetWidth - $(".pv-dot").offsetWidth;
    $(".pv-dot").style.left = scale * w + "px";
    $(".pv-played").style.width = scale * w + "px";
  }
  function toZero(num) {
    if (num <= 9) {
      return "0" + num;
    } else {
      return "" + num;
    }
  }
  function changeTime(iNum) {
    let iN = parseInt(iNum);
    const iH = toZero(Math.floor(iN / 3600));
    const iM = toZero(Math.floor((iN % 3600) / 60));
    const iS = toZero(Math.floor(iN % 60));
    return iH + ":" + iM + ":" + iS;
  }
  function toZero(num) {
    if (num <= 9) {
      return "0" + num;
    } else {
      return "" + num;
    }
  }
  this.showEl = function (el) {
    $(el).style.display = "block";
  };
  this.hideEl = function (el) {
    $(el).style.display = "none";
  };
  this.setVp = function (w, h) {
    const _w = String(w).indexOf("px") != -1 ? w : w + "px";
    const _h = String(h).indexOf("px") != -1 ? h : h + "px";
    $(".video-player").style.width = _w;
    $(".video-player").style.height = _h;
    $(".video-box").style.width = _w;
    $(".video-box").style.height = _h;
    $(".pv-bar").style.width = _w;
  };
  // 底部控制栏(显示/隐藏)
  this.bottomTup = function () {
    $(".bottom-tool").style.bottom = "0px";
  };
  this.bottomTdow = function () {
    $(".bottom-tool").style.bottom = "-45px";
  };
  // 播放/暂停
  this.usePlay = function () {
    if ($(".video-player").paused) {
      $(".video-player").play();
      this.hideEl(".icon-bofang");
      this.showEl(".icon-zanting");
      nowTime();
      this.timer = setInterval(nowTime, 1000);
    } else {
      $(".video-player").pause();
      this.showEl(".icon-bofang");
      this.hideEl(".icon-zanting");
      clearInterval(this.timer);
    }
  };
  this.isplay = function () {
    this.usePlay();
  };
  // 总时长
  this.useOnplay = function () {
    $(".pv-duration").innerHTML = changeTime($(".video-player").duration);
  };
  // 播放结束
  this.useEnd = function () {
    this.showEl(".icon-bofang");
    this.hideEl(".icon-zanting");
  };
  // 静音
  this.useVolume = function () {
    if ($(".video-player").muted) {
      $(".video-player").volume = 1;
      this.hideEl(".icon-jingyin");
      this.showEl(".icon-yinliang");
      $(".video-player").muted = false;
    } else {
      $(".video-player").volume = 0;
      this.showEl(".icon-jingyin");
      this.hideEl(".icon-yinliang");
      $(".video-player").muted = true;
    }
  };
  // 页面全屏
  this.pageFullScreen = function () {
    const w = document.documentElement.clientWidth || document.body.clientWidth;
    const h =
      document.documentElement.clientHeight || document.body.clientHeight;
    this.isPageFullScreen = !this.isPageFullScreen;
    if (this.isPageFullScreen) {
      this.setVp(w, h);
      this.hideEl(".icon-quanping");
      this.showEl(".icon-huanyuan");
      this.hideEl(".pv-screens");
    } else {
      this.setVp(this.vbw, this.vbh);
      this.showEl(".icon-quanping");
      this.hideEl(".icon-huanyuan");
      this.showEl(".pv-screens");
    }
  };
  this.fullScreen = function () {
    const el = $(".video-box");
    const isFullscreen =
      document.fullScreen ||
      document.mozFullScreen ||
      document.webkitIsFullScreen;
    if (!isFullscreen) {
      this.showEl(".icon-tuichuquanping");
      this.hideEl(".icon-shipinquanping");
      this.hideEl(".pv-screen");
      (el.requestFullscreen && el.requestFullscreen()) ||
        (el.mozRequestFullScreen && el.mozRequestFullScreen()) ||
        (el.webkitRequestFullscreen && el.webkitRequestFullscreen()) ||
        (el.msRequestFullscreen && el.msRequestFullscreen());
    } else {
      this.showEl(".icon-shipinquanping");
      this.hideEl(".icon-tuichuquanping");
      this.showEl(".pv-screen");
      document.exitFullscreen
        ? document.exitFullscreen()
        : document.mozCancelFullScreen
        ? document.mozCancelFullScreen()
        : document.webkitExitFullscreen
        ? document.webkitExitFullscreen()
        : "";
    }
  };
  // 播放进度条
  this.useTime = function (ev) {
    let ev1 = ev || window.event;
    this.disX = ev1.clientX - $(".pv-dot").offsetLeft;
    document.onmousemove = (ev) => {
      let ev2 = ev || window.event;
      let L = ev2.clientX - this.disX;
      if (L < 0) {
        L = 0;
      } else if (L > $(".pv-bar").offsetWidth - $(".pv-dot").offsetWidth) {
        L = $(".pv-bar").offsetWidth - $(".pv-dot").offsetWidth;
      }
      $(".pv-dot").style.left = L + "px";
      let scale = L / ($(".pv-bar").offsetWidth - $(".pv-dot").offsetWidth);
      $(".video-player").currentTime = scale * $(".video-player").duration;
      this.nowTime();
    };
    document.onmouseup = function () {
      document.onmousemove = null;
    };
    return false;
  };
  // 音量控制
  this.useListen = function (ev) {
    let ev1 = ev || window.event;
    this.disL = ev1.clientX - $(".pv-ol").offsetLeft;
    document.onmousemove = (ev) => {
      let ev2 = ev || window.event;
      let L = ev2.clientX - this.disL;
      if (L < 0) {
        L = 0;
      } else if (L > $(".pv-yl").offsetWidth - $(".pv-ol").offsetWidth) {
        L = $(".pv-yl").offsetWidth - $(".pv-ol").offsetWidth;
      }
      $(".pv-ol").style.left = L + "px";
      let scale = L / ($(".pv-yl").offsetWidth - $(".pv-ol").offsetWidth);
      $(".pv-bg").style.width = $(".pv-ol").offsetLeft + "px";
      if ($(".pv-ol").offsetLeft !== 0) {
        this.showEl(".icon-yinliang");
        this.hideEl(".icon-jingyin");
      } else {
        this.showEl(".icon-jingyin");
        this.hideEl(".icon-yinliang");
      }
      $(".video-player").volume = scale;
    };
    document.onmouseup = function () {
      document.onmousemove = null;
    };
    return false;
  };
  // 播放速度
  this.useSpnum = function (e) {
    let ev = e || window.event;
    $(".pv-spnum").innerText = ev.target.innerText;
    const value = ev.target.innerText.replace("x", "");
    $(".video-player").playbackRate = value;
  };
}

export default VamVideo;
