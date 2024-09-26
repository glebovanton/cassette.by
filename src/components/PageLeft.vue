<script setup>
import { computed, toRefs } from 'vue';
import { useStore } from 'vuex';
import AboutUsSection from 'src/components/AboutUsSection.vue';
import PricesSection from 'src/components/PricesSection.vue';
import StudentsSection from 'src/components/StudentsSection.vue';
import TeachersSection from 'src/components/TeachersSection.vue';

const props = defineProps({
  isInfoOpened: {
    type: Boolean,
  },
  selectedLanguage: {
    type: String,
    default: 'Ru',
  },
});

const store = useStore();

const { selectedLanguage } = toRefs(props);

const requestData = computed(() => store.getters['StoreCassette/requestData']);
</script>

<template>
  <div class="page page-left">
    <div v-if="requestData" class="page-inner full-height">
      <AboutUsSection :isInfoOpened="isInfoOpened" />
      <PricesSection :isInfoOpened="isInfoOpened" />
      <TeachersSection />
      <StudentsSection />
      <section
        class="feedback-sec container-fluid align-center text-left animated sec-pad-top-sm
        sec-pad-bottom padding-btm-xs-0"
      >
        <div class="row">
          <div class="col-lg-12">
            <h3 class="header3">
              {{ selectedLanguage === "Ru" ? "Отзывы о нас" : "Водгукі" }}
            </h3>
            <div class="row">
              <div class="col-xs-12">
                <router-link class="more-details" :to="{ name: 'feedback' }">{{
                  selectedLanguage === "Ru" ? "Подробнее" : "Падрабязна"
                }}</router-link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        class="client-sec container-fluid align-center text-left animated sec-pad-top-sm
        sec-pad-bottom padding-btm-xs-0"
      >
        <div class="row">
          <div class="col-lg-12">
            <h3 class="header3">
              {{
                selectedLanguage === "Ru" ? "Наши партнёры" : "Нашы партнёры"
              }}
            </h3>
            <div class="row">
              <div class="col-sm-3 col-xs-6">
                <img
                  class="img-responsive"
                  src="../statics/img/client1.svg"
                  alt="client"
                />
              </div>
              <div class="col-sm-3 col-xs-6">
                <img
                  class="img-responsive"
                  src="../statics/img/client2.svg"
                  alt="client"
                />
              </div>
              <div class="col-sm-3 col-xs-6">
                <img
                  class="img-responsive"
                  src="../statics/img/client3.png"
                  alt="client"
                />
              </div>
              <div class="col-sm-3 col-xs-6">
                <img
                  class="img-responsive"
                  src="../statics/img/client4.png"
                  alt="client"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss">
ul {
  list-style: none;
}

.page-left {
  min-height: 100%;
  .page-inner {
    section {
      padding: calc($spacer / 2) calc($spacer * 1.5);
      .more-details {
        text-decoration: underline;
        margin-bottom: 26px;
        font-weight: 400;
        line-height: 2.5;
      }
    }
    .small-hr {
      margin-top: 9px;
      margin-bottom: 23px;
    }
    .client-sec {
      .col-sm-3 {
        text-align: center;
        img {
          display: inline-block;
        }
      }
    }
  }
}
.img-responsive {
  width: 100%;
  object-fit: cover;
  transition: 0.7s ease-in-out;
  &.teacher {
    height: 41vw;
    max-height: 300px;
    //object-position: 20% 10px;
    @include at-break($break--base) {
      filter: grayscale(100%);
      &:hover {
        filter: none;
      }
      //-webkit-filter: grayscale(100%);
    }
  }
  &.student {
    height: 64vw;
    max-height: 300px;
    @include at-break($break--base) {
      height: 34vw;
      filter: grayscale(100%);
      &:hover {
        filter: none;
      }
    }
  }
}
.minus-margin {
  margin-left: calc(-#{$spacer} / 2);
  margin-right: calc(-#{$spacer} / 2);
}
.row {
  .margin-btm-lg {
    padding: calc($spacer/2) calc($spacer/2) 0;
  }
}

.page-left .page-inner .about-sec .about-icon-wrap span {
  display: block;
}
.page-left .page-inner .about-sec .about-icon-wrap span.key-fact {
  font-size: 16px;
  color: #000;
  text-transform: capitalize;
  margin-bottom: 14px;
  margin-top: 25px;
}
.page-left .page-inner .about-sec .about-icon-wrap .icon {
  color: #c6b6a1;
  font-size: 48px;
}
.page-left .page-inner .team-sec span {
  display: block;
}
.page-left .page-inner .team-sec .team-per {
  color: #fff;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 3px;
}
.page-left .page-inner .team-sec .team-desn {
  font-size: 12px;
  color: #8d8d8d;
  text-transform: capitalize;
  margin-bottom: 17px;
}
.page-left .page-inner .team-sec .team-social {
  float: left;
}
.page-left .page-inner .team-sec .team-social li {
  margin-right: 12px;
  float: left;
}
.page-left .page-inner .team-sec .team-social li a i {
  color: #fff;
  font-size: 12px;
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.page-left .page-inner .team-sec .team-social li a:hover i {
  color: #8d8d8d;
}
.page-left .page-inner .project-gal-wrap {
  margin-top: 60px;
}
.page-left .page-inner .pswp__caption__center {
  display: none;
}
.page-left .page-inner figure figcaption {
  font-size: 12px;
  text-transform: capitalize;
  color: #8d8d8d;
}
.page-left .page-inner figure a {
  display: block;
  overflow: hidden;
  position: relative;
}
.page-left .page-inner figure a .hover {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  -moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}
.page-left .page-inner figure a .hover span {
  display: block;
  left: 0;
  position: absolute;
  right: 0;
  text-align: center;
  top: calc(50% - 11px);
}
.page-left .page-inner figure a:hover .hover {
  opacity: 1;
}
.event-detail {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: calc($spacer/4) 0;
  width: 100%;
  &.price {
    flex-wrap: nowrap;
  }
  .item {
    float: left;
    padding-bottom: 5px;
    text-transform: initial;
    &:last-child {
      padding-bottom: 0;
    }
    .title {
      font-size: 16px;
      display: inline-block;
    }
    .description {
      font-size: 14px;
      line-height: 1.2;
      padding-left: $spacer;
    }
  }
  .icon {
    color: #8d8d8d;
    display: inline-block;
    float: left;
    font-size: 16px;
    line-height: 25px;
    padding-top: calc($spacer/20);
    padding-right: calc($spacer / 2);
  }
}
.page-left .page-inner .trans-overlay-dark-about {
  background: #fff;
  /* The Fallback */
  background: rgba(255, 255, 255, 0);
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
}
</style>
