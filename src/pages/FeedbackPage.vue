<script setup>
import {
  defineAsyncComponent,
  ref,
  computed,
  onMounted,
} from 'vue';
import { useStore } from 'vuex';
import { oferta } from 'src/statics/text.js';
import { loadingPlaceholder } from 'src/statics/consts.js';

const CassettePlayer = defineAsyncComponent(() => import('src/components/CassettePlayer.vue'));

const store = useStore();

const cachedRequestData = ref({});
const feedbackData = ref([
  {
    name: 'Google',
    link: 'https://g.co/kgs/PLv5uRS',
  },
  {
    name: 'Yandex',
    link: 'https://yandex.by/maps/org/cassette/87092429214/reviews',
  },
]);

const feedbacks = computed(() => (cachedRequestData.value?.requestData?.allFeedbacks || []));

const selectedLanguage = computed(() => store.getters['StoreCassette/selectedLanguage']);

onMounted(() => {
  const requestData = store.getters['StoreCassette/requestData'];
  if (requestData) {
    cachedRequestData.value = requestData;
  }
});
</script>

<template>
  <div class="feedback-page flex flex-center">
    <router-link class="call-to-home" :to="{ name: 'main' }">
      {{ selectedLanguage === "Ru" ? "На главную" : "На галоўную"
      }}<span class="add-sep"></span
    ></router-link>
    <div class="page-content">
      <div class="row">
        <div class="col-lg-12">
          <h3 class="header3">
            {{ selectedLanguage === "Ru" ? "Отзывы о нас" : "Водгукі" }}
          </h3>
          <p>
            {{
              selectedLanguage === "Ru"
                ? oferta.weLoveStudentsRu
                : oferta.weLoveStudentsBy
            }}
          </p>
          <ul>
            <li v-for="(feedback, index) in feedbackData" :key="`feedback-${index}`">
              <a
                  :href="feedback.link"
                  class="feedback-link"
                  target="_blank"
              >
                {{ `${selectedLanguage === "Ru" ?
                  "Читать отзывы на" :
                  "Чытаць водгукі на"} ${feedback.name}` }}
              </a>
            </li>

          </ul>

        </div>
      </div>
      <div v-if="feedbacks && feedbacks.length" class="project-gal-wrap">
        <figure
          v-for="(client, index) in feedbacks"
          class="client-section"
          :key="`feedback-${index}`"
        >
          <div
            v-if="client.imgsrc && client.imgsrc.url"
            v-lazy:background-image="client.imgsrc.url"
            :style="{ backgroundImage: `url(${loadingPlaceholder})` }"
            class="img-responsive"
          ></div>
          <div class="description-wrap">
            <h6 class="description-name">
              <a
                v-if="client.link"
                class="description-name"
                :href="client.link"
              >
                {{ client.name }}
              </a>
              <template v-else>{{ client.name }}</template>
            </h6>
            <p class="about-client">
              {{ client.description }}
            </p>
            <CassettePlayer
              v-if="client.video && client.video.url"
              :key="`video-${index}`"
              :video-src="`${client.video.url}`"
              :thumbnail="`${client.imgsrc && client.imgsrc.url}`"
            />
          </div>
        </figure>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.feedback-page {
  color: white;
  position: relative;
  background: $dark;
  padding: $spacer * 4 $spacer * 1.5 $spacer;
  min-height: 100vh;
  @include at-break($break--base) {
  }
  .call-to-home {
    top: $spacer * 2;
    left: 0;
    font-size: 14px;
    text-transform: capitalize;
    color: #fff;
    position: absolute;
    z-index: 11;
    transform: rotate(-90deg);
    transition: all 0.6s ease-in-out;
    .add-sep {
      display: block;
      position: relative;
      background: #fff none repeat scroll 0 0;
      height: 2px;
      text-align: center;
      width: 90%;
      transition: all 0.3s ease-in-out 0s;
    }
  }
  .page-content {
    .project-gal-wrap {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;
      padding-top: $spacer;
      .client-section {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: calc($spacer/2);
        .img-responsive {
          background-size: cover;
          margin-right: calc($spacer/2);
          margin-bottom: calc($spacer/2);
          background-position: center;
          transition: all 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0s;
          width: 100px;
          height: 100px;
        }
        .description-wrap {
          width: 100%;
          .description {
            margin-bottom: calc($spacer/3);
            &-name {
              font-weight: bold;
              color: #fff;
            }
          }
          .about-client {
            margin-bottom: $spacer;
          }
          .video {
            width: 30%;
            @include under-break($break--base) {
              width: 100%;
            }
          }
        }
      }
    }
  }
  .feedback-link {
    display: inline-block;
    white-space: pre;
    margin-top: 10px;
    color: #fff;
    font-weight: bold;
    text-decoration: underline;
    transition: color 0.3s;
    &:hover {
      color: #ffcd38;
    }
  }
}
</style>
