<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { defaultThumbnail } from 'src/statics/consts.js';

export default {
  name: 'VideoPlayer',
  props: {
    videoSrc: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      default: defaultThumbnail,
    },
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, {
      controls: true,
      autoplay: false,
      preload: 'auto',
      fluid: true, // Responsive video player
      poster: this.thumbnail || defaultThumbnail,
    });

    this.player.on('ended', () => {
    });
  },
  beforeUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<template>
  <div class="video-wrapper">
    <video
      ref="videoPlayer"
      class="video-js vjs-default-skin vjs-4-3"
      controls
      preload="auto"
      :poster="thumbnail || defaultThumbnail"
    >
      <source :src="videoSrc" type="video/mp4" />
      <p class="vjs-no-js">
        To view this video, please enable JavaScript, and consider upgrading to a
        web browser that
        <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
      </p>
    </video>
  </div>
</template>

<style scoped>
.video-wrapper {
  width: 100%;
  max-width: 720px; /* Adjust according to your layout */
  margin: 0 auto;
}

.video-js {
  width: 100%;
  height: auto;
}
</style>
