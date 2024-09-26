<script setup>
import {
  ref,
  computed,
  defineAsyncComponent,
  watch,
  onMounted,
} from 'vue';
import { useStore } from 'vuex';
import { debounce } from 'lodash';

const OfertaBanner = defineAsyncComponent(() => import('../components/OfertaBanner.vue'));
const PageLeft = defineAsyncComponent(() => import('../components/PageLeft.vue'));
const PageRight = defineAsyncComponent(() => import('../components/PageRight.vue'));

const store = useStore();

const isInfoOpened = ref(false);
const isContactsOpened = ref(false);
const isOfertaOpened = ref(true);

const selectedLanguage = computed(() => store.getters['StoreCassette/selectedLanguage']);

const checkStorageIsOfertaOpened = () => {
  const isOfertaInStorage = localStorage.isOfertaOpened;
  if (typeof isOfertaInStorage !== 'undefined' && isOfertaInStorage !== null) {
    isOfertaOpened.value = JSON.parse(isOfertaInStorage);
  }
};

const makeDebouncedAppointment = debounce(() => {
  const pageRight = document.querySelector('#pageRight');
  if (pageRight) {
    pageRight.focus();
  }
  isContactsOpened.value = !isContactsOpened.value;
}, 300);

const trigerOferta = () => {
  isOfertaOpened.value = !isOfertaOpened.value;
};

onMounted(() => {
  checkStorageIsOfertaOpened();
});

watch(isOfertaOpened, (newValue) => {
  localStorage.isOfertaOpened = newValue;
});
</script>

<template>
  <div class="main-wrapper body">
    <div class="pad-zero">
      <div
        id="splitlayout"
        class="splitlayout"
        :class="{
          'reset-layout': !isInfoOpened && !isContactsOpened,
          'close-right': !isInfoOpened && !isContactsOpened,
          'close-left': !isInfoOpened && !isContactsOpened,
          'open-left': isInfoOpened,
          'open-right': isContactsOpened,
        }"
        ref="splitlayout"
      >
        <div class="intro">
          <div class="side side-left" :key="`side-left-${isInfoOpened}-${isContactsOpened}`">
            <div class="call-to-action about">
              <div @click="isInfoOpened = !isInfoOpened">
                <span
                  v-if="!isInfoOpened"
                  class="goto-next"
                >
                  <template v-if="selectedLanguage === 'Ru'"
                    >Инфо о нас</template
                  >
                  <template v-else>Інфа пра нас</template>
                  <span class="add-sep"></span>
                </span>
                <span
                  v-if="isInfoOpened"
                  class="goto-close"
                >
                  <template v-if="selectedLanguage === 'Ru'"
                    >закрыть X</template
                  >
                  <template v-else>зачыніць X</template>
                  <span class="add-sep"></span>
                </span>
              </div>
            </div>
            <div class="side-left-overlay"></div>
          </div>
          <div class="side side-right" :key="`side-right-${isInfoOpened}-${isContactsOpened}`">
            <div
              class="call-to-action contact"
              @click="isContactsOpened = !isContactsOpened"
            >
              <div>
                <span
                  v-if="!isContactsOpened"
                  class="goto-next"
                >
                  <template v-if="selectedLanguage === 'Ru'">Контакты</template>
                  <template v-else>Кантакты</template>
                  <span class="add-sep"></span>
                </span>
                <span
                  v-if="isContactsOpened"
                  class="goto-close"
                >
                  <template v-if="selectedLanguage === 'Ru'"
                    >закрыть X</template
                  >
                  <template v-else>зачыніць X</template>
                  <span class="add-sep"></span>
                </span>
              </div>
            </div>
            <div
              class="col-xs-12 align-center sec-pad-left sec-pad-right main-content text-center"
            >
              <header class="logo">
                <img src="../statics/img/logo.svg" alt="logo" />
              </header>
              <section class="intro-text">
                <div class="ani-wrap">
                  <h1 class="header1 animated slideInUp">
                    <template v-if="selectedLanguage === 'Ru'"
                      >Музыкальная студия в Минске</template
                    >
                    <template v-else>Музычная студыя ў Мінску</template>
                  </h1>
                </div>
                <div class="ani-wrap">
                  <h5 class="animated slideInUp"></h5>
                </div>
                <p class="col-lg-10 col-sm-12 align-center cloud thin">
                  <template v-if="selectedLanguage === 'Ru'"
                    >Любовь к жизни начинается с музыки...</template
                  >
                  <template v-else
                    >Любоў да жыцця пачынаецца з музыкі ...</template
                  >
                </p>
                <div class="clearfix"></div>
                <section class="margin-top-xs-20">
                  <div class="notify-btn main-menu">
                    <a
                      class="btn btn-default md-trigger left"
                      href="tel:+375291777085"
                      ><span class="button-label">
                        <template v-if="selectedLanguage === 'Ru'"
                          >позвонить</template
                        >
                        <template v-else>патэлефанаваць</template>
                      </span>
                      <span class="mask"></span
                    ></a>
                    <span class="btn btn-default md-trigger left"
                      ><span class="button-label" @click="makeDebouncedAppointment">
                        <template v-if="selectedLanguage === 'Ru'"
                          >Записаться</template
                        >
                        <template v-else>Запісацца</template>
                      </span>
                      <span class="mask"></span
                    ></span>
                  </div>
                </section>
                <div class="clearfix"></div>
              </section>
            </div>
            <div class="container-fluid pad-zero social-wrapper">
              <footer class="copyright-text margin-sm-30 margin-top-xs-0">
                <ul class="social-icons animated fadeInLeft">
                  <li>
                    <a
                      href="https://www.facebook.com/Studio-Cassette-111576523718276/"
                      class="social-icon"
                    >
                      <i class="fab fa-facebook-f"></i>
                      <i class="fab fa-facebook-f"> </i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://vk.com/studio.cassette"
                      class="social-icon"
                    >
                      <i class="fab fa-vk"></i>
                      <i class="fab fa-vk"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/studio.cassette/"
                      class="social-icon"
                    >
                      <i class="fab fa-instagram"></i>
                      <i class="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      title="@SvetaMolokova"
                      href="https://t.me/+375291777085"
                      class="social-icon"
                    >
                      <i class="fab fa-telegram-plane"></i>
                      <i class="fab fa-telegram-plane"></i>
                    </a>
                  </li>
                </ul>
                <p>© 2020 Glebov Anton, All Rights Reserved</p>
              </footer>
            </div>
            <div class="side-right-overlay"></div>
          </div>
        </div>
        <PageLeft
          :isInfoOpened="isInfoOpened"
          :selectedLanguage="selectedLanguage"
        />
        <PageRight
          :isContactsOpened="isContactsOpened"
          ref="pageRight"
          :selectedLanguage="selectedLanguage"
        />
      </div>
    </div>
    <OfertaBanner v-if="isOfertaOpened" @trigerOferta="trigerOferta" />
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/css/animate.css";
@import "../assets/css/component2.css";
@import "../assets/css/inputtext.css";
@import "../assets/css/default-skin/default-skin.css";

/****************************/
/** Reset **/
/****************************/

body, html {
  height: 100%;
  margin: 0;
  padding: 0;
}

strong {
  font-weight: bold;
}
.body {
  color: #fff;
  background: #1e1e1e;
  font-size: 14px;
  font-style: normal;
  line-height: 1.5;
  overflow-y: auto;
}

/* Mozilla based browsers */
::-moz-selection {
  background: #f8ec2e;
  color: #000;
}

/* Works in Safari */
::selection {
  background: #f8ec2e;
  color: #000;
}

.force-UTF-8 {
  content: "¡";
}

/****************************/
/** Main **/
/****************************/
.pad-zero {
  padding: 0;
}

.pad-left-zero {
  padding-left: 0;
}

.pad-right-zero {
  padding-left: 0;
}

.sec-pad {
  padding-top: 100px;
  padding-bottom: 100px;
}

.sec-pad-sm {
  padding-top: 50px;
  padding-bottom: 50px;
}

.sec-pad-xs {
  padding-top: 30px;
  padding-bottom: 30px;
}

.sec-pad-top {
  padding-top: 100px;
}

.sec-pad-top-sm {
  padding-top: 50px;
}

.sec-pad-top-xs {
  padding-top: 30px;
}

.sec-pad-bottom {
  padding-bottom: 100px;
}

.sec-pad-bottom-sm {
  padding-bottom: 100px;
}

.sec-pad-bottom-xs {
  padding-bottom: 30px;
}

.sec-pad-left {
  padding-left: 100px;
}

.sec-pad-right {
  padding-right: 100px;
}

.padding-top-lg-175 {
  padding-top: 175px;
}

.padding-top-lg-100 {
  padding-top: 100px;
}

.padding-top-lg-170 {
  padding-top: 170px;
}

.padding-top-sm {
  padding-top: 60px;
}

.margin-btm-lg {
  margin-bottom: 47px;
}

.margin-top-sm {
  margin-top: 35px;
}

.margin-btm-sm {
  margin-bottom: 30px;
}

.margin-top-xs-20 {
  margin-top: 20px;
}

.preloader-it {
  background: #fff;
  position: fixed;
  z-index: 110;
  height: 100%;
  width: 100%;
  overflow: hidden !important;
}

/* Effect 1: YouTube loading */
.la-anim-1 {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 10px;
  background: #000;
  -webkit-transform: translate3d(-100%, 0, 0);
  transform: translate3d(-100%, 0, 0);
  pointer-events: none;
}

.la-anim-1::after {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100%;
  background: #000;
  content: "";
  opacity: 0;
  -webkit-transition: opacity 0.2s, box-shadow 2s 4s;
  transition: opacity 0.2s, box-shadow 2s 4s;
  -webkit-transform: rotate(2deg) translateY(-2px);
  transform: rotate(2deg) translateY(-2px);
}

.la-anim-1.la-animate {
  z-index: 100;
  opacity: 1;
  -webkit-transition: -webkit-transform 5s ease-in, opacity 1s 5s;
  transition: transform 5s ease-in, opacity 1s 5s;
  -webkit-transform: translate3d(0%, 0, 0);
  transform: translate3d(0%, 0, 0);
}

.la-anim-1.la-animate::after {
  opacity: 1;
}

.side-left-overlay,
.side-right-overlay {
  position: absolute;
  top: 0;
  z-index: -2;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.58) none repeat scroll 0 0;
}

@-webkit-keyframes back_ken {
  0% {
    -webkit-transform: scale(1);
  }
  50% {
    -webkit-transform: scale(1.4);
  }
  100% {
    -webkit-transform: scale(1);
  }
}
@-moz-keyframes back_ken {
  0% {
    -moz-transform: scale(1);
  }
  50% {
    -moz-transform: scale(1.4);
  }
  100% {
    -moz-transform: scale(1);
  }
}
@-o-keyframes back_ken {
  0% {
    -o-transform: scale(1);
  }
  50% {
    -o-transform: scale(1.4);
  }
  100% {
    -o-transform: scale(1);
  }
}
@keyframes back_ken {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
}
#parallax_it {
  width: 750px;
}

.side-left {
  padding-top: 100px;
}
.side-left #parallax_it {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
}
.side-left p,
.side-left .address-detail a,
.address-detail .side-left a {
  color: #fff;
}
.side-left .small-hr {
  margin-top: 17px;
  margin-bottom: 25px;
}
.side-left .tag-wrap {
  position: absolute;
  bottom: 97px;
  z-index: 1;
}
.side-left footer {
  float: left;
}
.side-left #countdown {
  color: #fff;
  font-size: 18px;
  margin-top: 26px;
}
.side-left .content-wrap {
  height: 100%;
  padding-left: 100px;
}

.preloader {
  background: #1e1e1e;
}

p.tagline,
.address-detail a.tagline {
  font-size: 30px;
  font-weight: 600;
  line-height: 45px;
  letter-spacing: -1px;
}

.side-left,
.side-right {
  background: transparent url("../statics/img/mainbg2.jpg") no-repeat fixed center;
  background-size: cover !important;
}

.social-icons {
  float: left;
  margin-right: 22px;
  li {
    display: inline-block;
    float: left;
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
  }
  .social-icon {
    color: #fff;
    font-size: 18px;
    overflow: hidden;
    text-transform: uppercase;
    line-height: 25px;
    position: relative;
    display: inline-block;
    position: relative;
    width: 20px;
    height: 30px;
    span {
      display: inline-block;
      position: relative;
      &.fa {
        line-height: 25px;
      }
    }
    .fab {
      transition: all 0.3s ease-in-out;
    }
  }
}
.social-icons .social-icon .fab {
  position: absolute;
  top: 0;
  left: 0;
  margin: auto;
  transform: translateY(50%);
  transition: all 0.3s ease-in-out;
  & + .fab {
    transform: translateY(200px);
  }
}
.social-icons .social-icon:hover .fab {
  transform: translateY(-200px);
  & + .fab {
    transform: translateY(50%);
  }
}
.social-icons .social-icon:hover i.fa-facebook {
  color: #3b5998;
}
.social-icons .social-icon:hover i.fa-twitter {
  color: #00aced;
}
.social-icons .social-icon:hover i.fa-linkedin {
  color: #007bb6;
}
.social-icons .social-icon:hover i.fa-behance {
  color: #1769ff;
}

.side-right {
  color: #fff;
  right: 0;
  .notify-btn {
    display: flex;
    justify-content: left;
    .btn {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: $spacer;
      margin-right: calc($spacer / 2);
    }
    .button-label {
      font-size: 14px;
    }
  }
}
.side-right .social-wrapper {
  bottom: 92px;
  left: 0;
  right: 0;
  position: absolute;
  width: 314px;
  margin: 0 auto;
  footer {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
}
.side-right p,
.side-right .address-detail a,
.address-detail .side-right a {
  color: #fff;
}
.side-right .copyright-text p,
.side-right .copyright-text .address-detail a,
.address-detail .side-right .copyright-text a {
  font-size: 9px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #fff;
  float: left;
}
.side-right .twitter-sec {
  width: 600px;
  float: left;
}
.side-right .twitter-sec .twiter-ico-wrap {
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: block;
  float: left;
  margin-right: 14px;
  height: 50px;
  text-align: center;
  width: 50px;
}
.side-right .twitter-sec .twiter-ico-wrap i {
  padding-top: 16px;
}
.side-right .twitter-sec #tweecool {
  min-height: 125px;
  position: relative;
  font-size: 16px;
  line-height: 27px;
  width: 80%;
  float: left;
}
.side-right .twitter-sec #tweecool ul li {
  position: absolute;
  opacity: 0;
  visibility: hidden;
  -moz-transition: all 1s ease-in-out;
  -o-transition: all 1s ease-in-out;
  -webkit-transition: all 1s ease-in-out;
  transition: all 1s ease-in-out;
}
.side-right .twitter-sec #tweecool ul li.current {
  opacity: 1;
  visibility: visible;
}
.side-right .twitter-sec #tweecool ul li img {
  display: none;
}
.side-right .twitter-sec #tweecool ul li span {
  display: block;
  font-size: 13px;
  color: #8d8d8d;
  padding-top: 2px;
}

.form-control.notify-input-box::-webkit-input-placeholder {
  color: #000;
  font-size: 16px;
  letter-spacing: 1px;
  text-transform: uppercase;
  opacity: 1;
}
.form-control.notify-input-box:-moz-placeholder {
  /* Firefox 18- */
  color: #000;
  font-size: 16px;
  letter-spacing: 1px;
  text-transform: uppercase;
  opacity: 1;
}
.form-control.notify-input-box::-moz-placeholder {
  /* Firefox 19+ */
  color: #000;
  font-size: 16px;
  letter-spacing: 1px;
  text-transform: uppercase;
  opacity: 1;
}
.form-control.notify-input-box:-ms-input-placeholder {
  color: #000;
  font-size: 16px;
  letter-spacing: 1px;
  text-transform: uppercase;
  opacity: 1;
}

.align-center,
.address-detail {
  overflow: hidden;
  clear: both;
  float: none;
  margin: 0 auto;
}

.logo {
  display: inline-block;
  img {
    width: 135px;
  }
}

.type-wrap {
  min-height: 120px;
  padding-bottom: 40px;
}

.small-hr {
  background: #fff none repeat scroll 0 0;
  display: block;
  height: 4px;
  width: 32px;
}

.bg-img {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.trans-overlay-dark {
  background: #fff;
  /* The Fallback */
  background: rgba(255, 255, 255, 0.4);
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
}

.project-gal-wrap img {
  width: 100%;
}

.detail-info {
  position: relative;
  z-index: 2;
  text-align: left;
}

.owl-carousel.owl-theme .owl-item {
  min-height: 247px;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  -webkit-appearance: none;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
.owl-carousel.owl-theme .owl-controls span {
  background: none;
  border: 2px solid #fff;
  border-radius: 0;
  display: inline-block !important;
  height: 12px;
  margin: 5px 7px;
  opacity: 1;
  width: 12px;
}
.owl-carousel.owl-theme .owl-dot {
  float: left;
}
.owl-carousel.owl-theme .owl-nav {
  display: none;
}
.owl-carousel.owl-theme .owl-dot.active span {
  background: #000;
}

#qualities .owl-carousel.owl-theme .owl-item {
  background: #fff;
}
#qualities .owl-carousel.owl-theme .owl-item:hover {
  box-shadow: 0 0 0 4px #fff inset;
  -webkit-box-shadow: 0 0 0 4px #fff inset;
  -ms-box-shadow: 0 0 0 4px #fff inset;
  -moz-box-shadow: 0 0 0 4px #fff inset;
}

.table {
  display: table;
}

.align-middle {
  display: table-cell;
  vertical-align: middle;
}

.nav-btn,
.contact,
.about {
  font-size: 14px;
  text-transform: uppercase;
  position: absolute;
  top: 0;
  z-index: 11;
  -moz-transition: all 0.6s ease-in-out;
  -o-transition: all 0.6s ease-in-out;
  -webkit-transition: all 0.6s ease-in-out;
  transition: all 0.6s ease-in-out;
}

#qualities,
#team {
  color: #fff;
  padding-top: 52px;
}
#qualities span,
#team span {
  display: block;
}
#qualities .item,
#team .item {
  padding: 0 32px;
  overflow: hidden;
}
#qualities .fa-qual,
#team .fa-qual {
  font-size: 36px;
  padding-top: 28px;
  padding-bottom: 5px;
}
#qualities .qual-tag,
#qualities .name,
#team .qual-tag,
#team .name {
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
}
#qualities .qual-desc,
#team .qual-desc {
  font-size: 12px;
  font-weight: 500;
  padding: 25px 0;
}

.back-left,
.back-left:focus,
.back-left:hover {
  left: 45px;
  color: #fff;
}

.back-right,
.back-right:focus,
.back-right:hover {
  color: #fff;
  right: 45px;
}

.btn-default.active.focus,
.btn-default.active:focus,
.btn-default.active:hover,
.btn-default.focus:active,
.btn-default:active:focus,
.btn-default:active:hover,
.open > .dropdown-toggle.btn-default.focus,
.open > .dropdown-toggle.btn-default:focus,
.open > .dropdown-toggle.btn-default:hover {
  background: transparent;
  color: #fff;
  outline: none;
  border: 2px solid #fff;
}

.ani-wrap {
  position: relative;
  overflow: hidden;
  h1 {
    font-weight: normal;
    text-align: left;
    max-width: 442px;
  }
}

@keyframes moveUp {
  50% {
    transform: translate(0px, -100%);
    -webkit-transform: translate(0px, -100%);
    -ms-transform: translate(0px, -100%);
  }
  51% {
    opacity: 0;
    transform: translate(0px, -100%);
    -webkit-transform: translate(0px, -100%);
    -ms-transform: translate(0px, -100%);
  }
  52% {
    opacity: 1;
    transform: translate(0px, 100%);
    -webkit-transform: translate(0px, 100%);
    -ms-transform: translate(0px, 100%);
  }
  100% {
    transform: translate(0px, 0px);
    -webkit-transform: translate(0px, 0px);
    -ms-transform: translate(0px, 0px);
  }
}
@-webkit-keyframes moveUp {
  50% {
    transform: translate(0px, -100%);
    -webkit-transform: translate(0px, -100%);
    -ms-transform: translate(0px, -100%);
  }
  51% {
    opacity: 0;
    transform: translate(0px, -100%);
    -webkit-transform: translate(0px, -100%);
    -ms-transform: translate(0px, -100%);
  }
  52% {
    opacity: 1;
    transform: translate(0px, 100%);
    -webkit-transform: translate(0px, 100%);
    -ms-transform: translate(0px, 100%);
  }
  100% {
    transform: translate(0px, 0px);
    -webkit-transform: translate(0px, 0px);
    -ms-transform: translate(0px, 0px);
  }
}

.black {
  color: #fff;
}

.close-notify {
  display: block;
  font-weight: 300;
  margin-bottom: 30px;
  margin-top: 22px;
  width: 41px;
}
.close-notify:hover,
.close-notify:focus,
.close-notify:active {
  color: #fff;
}

.notify-cmpt.notify-form-type-3.md-content {
  background: url("../statics/img/newsletterimg.jpg");
  text-align: center;
}
.notify-cmpt.notify-form-type-3.md-content p,
.notify-cmpt.notify-form-type-3.md-content .address-detail a,
.address-detail .notify-cmpt.notify-form-type-3.md-content a {
  margin-top: 12px;
  color: #8d8d8d;
}
.notify-cmpt.notify-form-type-3.md-content .md-content-wrap {
  padding-top: 123px;
}
.notify-cmpt.notify-form-type-3 .notify-btn {
  bottom: 0;
  left: 0;
  position: relative;
}
.notify-cmpt.notify-form-type-3 .notify-wrap #message {
  font-size: 15px;
  line-height: 25px;
  padding-left: 0;
  padding-top: 10px;
  min-height: 35px;
  color: #000;
}
.notify-cmpt.notify-form-type-3 .notify-wrap #notify_close {
  cursor: pointer;
  font-size: 20px;
  position: absolute;
  right: 25px;
  top: 20px;
}
.notify-cmpt.notify-form-type-3 .notify-wrap #notify_close span {
  color: #000;
}
.notify-cmpt.notify-form-type-3 .notify-wrap .btn {
  border: 2px solid #000;
  right: 0;
  top: 0;
  height: 57px;
  display: block;
  width: 335px;
  color: #000;
  margin-top: 27px;
  -webkit-transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);
  backface-visibility: hidden;
  padding: 0 30px !important;
}
.notify-cmpt.notify-form-type-3 .notify-wrap .btn .mask {
  background: #000;
}
.notify-cmpt.notify-form-type-3 .notify-wrap .btn:hover {
  border-color: #000;
  color: #fff;
}
.notify-cmpt.notify-form-type-3 .notify-wrap .notify-input-box {
  background: transparent none repeat scroll 0 0;
  border: 2px solid #000;
  border-radius: 0;
  box-shadow: none;
  width: 335px;
  text-align: center;
  color: #000;
  font-size: 16px;
  letter-spacing: 1px;
  min-height: 57px;
  padding: 0;
  margin-top: 42px;
}
.notify-cmpt.notify-form-type-3 .notify-wrap .notify-input-box:hover,
.notify-cmpt.notify-form-type-3 .notify-wrap .notify-input-box:focus,
.notify-cmpt.notify-form-type-3 .notify-wrap .notify-input-box:active {
  box-shadow: none;
}
.notify-cmpt.notify-form-type-3 .notify-wrap .input__label--hoshi::before,
.notify-cmpt.notify-form-type-3 .notify-wrap .input__label--hoshi::after {
  border-bottom: 4px solid #fff;
}
.notify-cmpt.notify-form-type-3 .notify-wrap .input__label--hoshi::after {
  border-bottom: 8px solid #fff;
}

.section-title {
  padding-top: 11%;
  padding-bottom: 18px;
}

.form-horizontal .form-group {
  margin-left: 0;
  margin-right: 0;
}

.input-wrap {
  position: relative;
  overflow: hidden;
}
.input-wrap i {
  display: none;
}

@-webkit-keyframes sep-anim {
  0% {
    width: 0;
  }
  100% {
    width: 20px;
  }
}
@keyframes sep-anim {
  0% {
    width: 0;
  }
  100% {
    width: 20px;
  }
}
.address-detail {
  margin-top: 60px;
  text-align: left;
}
.address-detail .col-sm-4:hover .add-sep {
  -webkit-animation-name: sep-anim;
  animation-name: sep-anim;
  -webkit-animation-duration: 0.4s;
  animation-duration: 0.4s;
  animation-delay: 0s;
  -webkit-animation-delay: 0s;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
}
.address-detail .col-sm-4 span {
  font-size: 13px;
  color: #8d8d8d;
  text-transform: capitalize;
}
.address-detail .sep-wrap {
  width: 20px;
  margin-bottom: 12px;
}
.address-detail .sep-wrap .add-sep {
  background: #fff none repeat scroll 0 0;
  display: block;
  height: 2px;
  text-align: center;
  width: 20px;
}
.address-detail p,
.address-detail a {
  font-size: 14px;
  font-weight: 500;
  padding: 0;
  color: #fff;
}
.address-detail .icon-detail {
  font-size: 14px;
  display: block;
  padding-bottom: 10px;
  color: #fff;
  text-transform: uppercase;
}
.address-detail a {
  font-size: 14px;
  display: block;
  padding-bottom: 0;
  padding-top: 0;
}
.address-detail i {
  display: block;
}

.fa {
  color: #fff;
  -webkit-appearance: none;
  -webkit-backface-visibility: hidden;
}

@-webkit-keyframes border-widthc {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
@keyframes border-widthc {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
@-webkit-keyframes border-heightc {
  0% {
    height: 0%;
  }
  100% {
    height: 100%;
  }
}
@keyframes border-heightc {
  0% {
    height: 0%;
  }
  100% {
    height: 100%;
  }
}
.call-to-action {
  display: block;
  height: 20px;
  width: 150px;
}
.call-to-action div {
  cursor: pointer;
}
.call-to-action div .add-sep {
  background: #fff none repeat scroll 0 0;
  height: 2px;
  display: block !important;
  text-align: center;
  width: 0;
  -moz-transition: all 0.3s ease-in-out 0s;
  -o-transition: all 0.3s ease-in-out 0s;
  -webkit-transition: all 0.3s ease-in-out 0s;
  transition: all 0.3s ease-in-out 0s;
}
.call-to-action div:hover .add-sep {
  width: 100%;
}
.call-to-action .goto-next,
.call-to-action .goto-close {
  font-size: 1rem;
  position: absolute;
  display: block;
  right: 0;
}
.call-to-action .goto-next span,
.call-to-action .goto-close span {
  display: inline-block;
  position: relative;
}

.about {
  left: 32px;
  -webkit-transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  transform: rotate(-90deg);
}

.contact {
  right: 32px;
  -webkit-transform: rotate(270deg);
  -ms-transform: rotate(270deg);
  transform: rotate(270deg);
}
.contact span {
  bottom: 0;
}

.contact,
.about {
  top: 163px;
  text-transform: capitalize;
  color: #fff;
}

#astronomy {
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: -1;
}
#astronomy #demo-canvas {
  height: 100%;
  left: 0;
  position: absolute;
  width: 100%;
}

@keyframes moveclouds {
  0% {
    margin-left: 100%;
  }
  100% {
    margin-left: -100%;
  }
}
@-webkit-keyframes moveclouds {
  0% {
    margin-left: 100%;
  }
  100% {
    margin-left: -100%;
  }
}
@keyframes moveclouds2 {
  0% {
    margin-left: 100%;
  }
  50% {
    margin-left: 100%;
  }
  100% {
    margin-left: -100%;
  }
}
@-webkit-keyframes moveclouds2 {
  0% {
    margin-left: 100%;
  }
  50% {
    margin-left: 100%;
  }
  100% {
    margin-left: -100%;
  }
}
.layer {
  height: 100%;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
}
.layer img {
  max-width: 100%;
  height: 100%;
}

.clouds .cloud {
  bottom: 0;
  left: 0;
  position: absolute;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  width: 100%;
  height: 100%;
  will-change: transform;
}
.clouds .cloud-1 {
  -webkit-animation: moveclouds 25s linear infinite;
  animation: moveclouds 25s linear infinite;
}
.clouds .cloud-2 {
  -webkit-animation: moveclouds 50s linear infinite;
  animation: moveclouds 50s linear infinite;
}
.clouds .cloud-3 {
  -webkit-animation: moveclouds2 25s linear infinite;
  animation: moveclouds2 25s linear infinite;
}

/*****************************************************/
/* Mediaqueries */
/*****************************************************/
@media only screen and (max-width: 1680px) {
  .padding-top-sm-120 {
    padding-top: 120px;
  }
}
@media only screen and (max-width: 1600px) {
  h1 {
    font-size: 60px;
    line-height: 60px;
  }

  .padding-top-md-135 {
    padding-top: 135px;
  }

  .padding-top-md-75 {
    padding-top: 75px;
  }

  .padding-top-xs-80 {
    padding-top: 80px;
  }

  .contact,
  .about {
    top: 140px;
  }

  #parallax_it {
    width: 700px;
  }

  .side-left {
    padding-top: 75px;
  }
  .side-left .about {
    left: 6px;
  }
  .side-left .content-wrap {
    padding-left: 75px;
  }
  .side-left .copyright-text {
    bottom: 66px;
  }
  .side-left .tag-wrap {
    bottom: 75px;
  }

  .side-right .contact {
    right: 6px;
  }
  .side-right .social-wrapper {
    bottom: 66px;
  }
  .side-right .main-content {
    padding-left: 75px;
  }
  .side-right .notify-wrap {
    bottom: 40px;
    right: 75px;
  }
  .side-right .sec-pad-right {
    padding-right: 75px;
  }
  .side-right .timer-sec {
    bottom: 75px;
    right: 75px;
  }
}
@media only screen and (max-width: 1400px) {
  .padding-top-xs-40 {
    padding-top: 40px;
  }

  #parallax_it {
    width: 500px;
  }

  .intro-text {
    clear: both;
    .thin {
      font-size: 1rem;
    }
  }

  .contact,
  .about {
    top: 105px;
  }

  .side-left {
    padding-top: 40px;
  }
  .side-left .about {
    left: -28px;
  }
  .side-left .content-wrap {
    padding-left: 40px;
  }
  .side-left .copyright-text {
    bottom: 30px;
  }
  .side-left .tag-wrap {
    bottom: 38px;
  }

  .side-right .contact {
    right: -28px;
  }
  .side-right .social-wrapper {
    bottom: calc($spacer/2);
  }
  .side-right .main-content {
    padding-left: 40px;
  }
  .side-right .notify-wrap {
    bottom: 5px;
    right: 40px;
  }
  .side-right .timer-sec {
    bottom: 40px;
    right: 40px;
  }
  .side-right .sec-pad-right {
    padding-right: 40px;
  }
}
@media only screen and (max-width: 1366px) {
  .padding-top-sm-100 {
    padding-top: 100px;
  }

  .padding-top-sm-40 {
    padding-top: 40px;
  }

  .side-right .twitter-sec {
    width: 100%;
  }
  .side-right .twitter-sec .twiter-ico-wrap {
    margin-right: 0;
    margin-bottom: 10px;
    float: none;
  }
  .side-right .twitter-sec #tweecool {
    float: none;
    width: 100%;
  }
}
@media only screen and (max-width: 1024px) {
  h2 {
    font-size: 25px;
    line-height: 35px;
  }

  .margin-sm-30 {
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .margin-top-xs-30 {
    margin-top: 30px;
  }

  .padding-top-xs-0 {
    padding-top: 0px;
  }

  .padding-top-xs-100 {
    padding-top: 100px;
  }

  .padding-btm-xs-0 {
    padding-bottom: 0 !important;
  }

  .margin-top-xs-0 {
    margin-top: 0px;
  }

  .padding-top-xs-30 {
    padding-top: 30px;
  }

  #parallax_it {
    position: static;
    transform: none !important;
    -webkit-transform: none !important;
    -ms-transform: none !important;
    display: block;
  }

  .hover {
    display: none;
  }

  .timer-sec {
    position: static;
  }

  .notify-cmpt.notify-form-type-3 .notify-wrap .btn:hover {
    color: #000;
  }

  .notify-cmpt.notify-form-type-2 .notify-wrap .btn:hover,
  .notify-cmpt.notify-form-type-2 .notify-wrap .btn:active,
  .notify-cmpt.notify-form-type-2 .notify-wrap .btn:focus {
    color: #000;
  }

  .side {
    width: 100%;
  }
  .side.side-left {
    display: none;
  }

  .full-height {
    min-height: auto !important;
  }

  .address-detail .copyright-text {
    display: block;
  }

  .side.side-right {
    position: relative;
    min-height: 100vh;
  }
  .side.side-right #countdown {
    margin-top: 26px;
  }
  .side.side-right .social-wrapper {
    left: 40px;
    width: 100%;
  }
  .side.side-right .main-content {
    text-align: left;
  }

  .side-left,
  .side-right {
    background-attachment: scroll;
    will-change: transform;
  }

  .page {
    position: static;
    width: 100%;
  }

  .page.page-left {
    -webkit-transform: translateX(0px);
    -ms-transform: translateX(0px);
    transform: translateX(0px);
    position: static;
  }
  .page.page-right {
    left: 0;
    -webkit-transform: translateX(0px);
    -ms-transform: translateX(0px);
    transform: translateX(0px);
    position: static;
  }

  .about,
  .contact {
    display: none;
  }

  .open-left .side-right,
  .open-right .side-left {
    -webkit-transform: translateX(0) scale(1);
    -ms-transform: translateX(0) scale(1);
    transform: translateX(0) scale(1);
  }

  .open-left .side-left,
  .open-right .side-right {
    z-index: 200;
    -webkit-transform: translateX(0);
    -ms-transform: translateX(0);
    transform: translateX(0);
  }

  .open-left .side-left .main,
  .open-right .side-right .main {
    -webkit-transform: translateY(0) translateX(0) scale(1);
    -ms-transform: translateY(0) translateX(0) scale(1);
    transform: translateY(0) translateX(0) scale(1);
    opacity: 1;
    visibility: visible;
  }

  .open-left .page-left,
  .open-right .page-right {
    -webkit-transform: translateX(0%);
    -ms-transform: translateX(0%);
    transform: translateX(0%);
  }

  .reset-layout .page,
  .splitlayout.open-right .page-left,
  .splitlayout.open-left .page-right,
  .splitlayout.close-right .page-left,
  .splitlayout.close-left .page-right {
    position: static;
  }

  .btn:hover .mask {
    width: 0;
  }

  .btn:hover,
  .btn:focus,
  .btn:active {
    color: #fff;
  }

  .page-right .btn:hover,
  .page-right .btn:focus,
  .page-right .btn:active {
    color: #fff;
    border: 2px solid #fff;
  }

  .side-right .social-icons .social-icon:hover span {
    transform: translateY(0px);
    -webkit-transform: translateY(0px);
    -ms-transform: translateY(0px);
  }
}
@media only screen and (max-width: 850px) {
  .notify-cmpt.notify-form-type-3 .notify-wrap .notify-input-box,
  .notify-cmpt.notify-form-type-3 .notify-wrap .btn {
    width: 100%;
  }
}
@media only screen and (max-width: 767px) {
  .margin-btm-xs {
    margin-bottom: 30px;
  }

  .margin-bottom-0 {
    margin-bottom: 0 !important;
  }

  .client-sec .col-xs-6:nth-child(1),
  .client-sec .col-xs-6:nth-child(2) {
    margin-bottom: 40px;
  }

  .side.side-right #tweecool {
    min-height: 100vh;
  }
}
@media only screen and (max-width: 736px) {
  .sec-pad {
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .sec-pad-top {
    padding-top: 50px;
  }

  .sec-pad-bottom {
    padding-bottom: 50px;
  }

  .padding-top-xs-50 {
    padding-top: 50px;
  }

  .page-right input {
    height: 45px;
  }

  .side.side-left {
    min-height: 400px;
  }
  .side.side-left .zs-enabled {
    min-height: 400px !important;
  }

  .address-detail {
    margin-top: 30px;
  }

  .notify-cmpt.notify-form-type-3 .notify-wrap .notify-input-box,
  .notify-cmpt.notify-form-type-3 .notify-wrap .btn {
    margin-top: 15px;
  }

  .notify-cmpt.notify-form-type-3.md-content .md-content-wrap {
    padding-top: 40px;
  }
}
@media only screen and (max-width: 668px) {
  .notify-cmpt.notify-form-type-3.md-content .md-content-wrap {
    padding-top: 20px;
  }
}
@media only screen and (max-width: 568px) {
  h1 {
    font-size: 40px;
    line-height: 50px;
  }

  .margin-sm-30 {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .notify-cmpt.notify-form-type-3.md-content .md-content-wrap {
    padding-top: 7px;
  }
}
@media only screen and (max-width: 500px) {
  #parallax_it {
    width: 350px;
  }
}
@media only screen and (max-width: 485px) {
  .notify-cmpt.notify-form-type-2 .notify-wrap .notify-input-box {
    float: none;
  }

  .notify-cmpt.notify-form-type-2 .notify-wrap .btn {
    border-left: 2px solid #000;
    margin-top: 20px;
  }

  .notify-cmpt.notify-form-type-2 .notify-wrap .notify-input-box,
  .notify-cmpt.notify-form-type-2 .notify-wrap .btn {
    width: 100%;
    text-align: center;
  }

  .notify-cmpt.notify-form-type-2 .notify-wrap .notify-input-box {
    padding: 0;
  }

  .page-left .page-inner .event-detail li span {
    display: block;
    float: none;
  }
}
@media only screen and (max-width: 414px) {
  h3 {
    padding-bottom: 25px;
  }

  .copyright-text .social-icons,
  .copyright-text p,
  .copyright-text .address-detail a,
  .address-detail .copyright-text a {
    width: 100%;
  }

  .side-left #countdown {
    font-size: 14px;
  }

  .side.side-right {
    min-height: 100vh;
  }

  .notify-cmpt.notify-form-type-3.md-content .md-content-wrap {
    padding-top: 100px;
  }
}
@media only screen and (max-width: 320px) {
  #parallax_it {
    width: 270px;
  }
}
</style>
