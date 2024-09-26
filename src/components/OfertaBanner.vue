<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

defineOptions({
  name: 'OfertaBanner',
});

const store = useStore();
const selectedLanguageIndex = computed(() => store.state.StoreCassette.selectedLanguageIndex);
</script>

<template>
  <div class="banner">
    <div id="banner__container">
      <p v-if="selectedLanguageIndex === 1" class="banner__text">
        Ажыццяўляючы заказ паслугі Выканаўца, Заказчык прымае і згаджаецца з
        усімі ўмовамі, выкладзенымі ў сапраўдным
        <br />
        <a
          class="banner__link"
          href="/LLC_merger_agreement.html"
          target="_blank"
          ><strong>дагаворы далучэння</strong></a
        >, з
        <a class="banner__link" href="/privacy_policy_ooo.html" target="_blank"
          ><strong>палітыкай прыватнасці</strong></a
        >
        <br />
        і з інфармацыяй, размешчанай на сайце Выканаўца ў момант прыняцця
        Выканаўцам заказу.
      </p>
      <p v-else class="banner__text">
        Осуществляя заказ услуги Исполнителя, Заказчик принимает и соглашается
        со всеми условиями, изложенными в настоящем
        <br />
        <a
          class="banner__link"
          href="/LLC_merger_agreement.html"
          target="_blank"
          ><strong>договоре присоединения</strong></a
        >, с
        <a class="banner__link" href="/privacy_policy_ooo.html" target="_blank"
          ><strong>политикой конфиденциальности</strong></a
        >
        <br />
        и с информацией, размещенной на сайте Исполнителя в момент принятия
        Исполнителем заказа.
      </p>
      <span class="close" @click="$emit('trigerOferta')">✕</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner {
  text-align: center;
  bottom: 5px;
  position: fixed;
  left: 50%;
  z-index: 200;
  width: 75vw;
  max-width: 900px;
  font-size: 12px;
  line-height: 16px;
  color: #333;
  background-color: #ffffffcf;
  border-radius: 8px;
  transform: translateX(-50%);
  padding: calc($spacer/3);
  padding-right: $spacer;
  &__container {
    position: relative;
    padding: 4px 30px 4px 8px;
  }
  &__text {
    font-size: 13px;
    line-height: 1.4;
    color: black;
    font-weight: 400;
    a {
      line-height: 1;
    }
  }
  &__link {
    font-weight: bold;
    color: #06c;
    text-decoration: none;
    &:hover {
      color: #f90;
      text-decoration: underline;
    }
  }
  .close {
    position: absolute;
    top: 4px;
    right: 8px;
    font-size: 18px;
    cursor: pointer;
    &:hover {
      top: 3.5px;
      right: 7.5px;
      font-size: 19px;
    }
  }
}
</style>
