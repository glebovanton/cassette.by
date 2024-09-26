<script setup>
import {
  computed,
  toRefs,
} from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const props = defineProps({
  isInfoOpened: {
    type: Boolean,
  },
});
const { isInfoOpened } = toRefs(props);

const selectedLanguageIndex = computed(() => store.state.StoreCassette.selectedLanguageIndex);
const requestData = computed(() => store.getters['StoreCassette/requestData']);
const selectedLanguage = computed(() => store.getters['StoreCassette/selectedLanguage']);

const prices = computed(() => (
  requestData.value?.requestData?.allPrices?.map((price) => ({
    title: price._allTitleLocales[selectedLanguageIndex.value]?.value,
    tariffs: price._allTariffsLocales[selectedLanguageIndex.value]?.value,
  }))
));
</script>

<template>
  <section
    class="container-fluid align-center text-left animated sec-pad-top about-sec"
    :class="{ fadeInLeft: isInfoOpened }"
  >
    <div class="row">
      <div class="col-lg-12">
        <h3 class="header3">
          {{ selectedLanguage === "Ru" ? "Стоимость занятий" : "Кошт заняткаў" }}
        </h3>
        <div
          v-for="(priceSection, index) in prices"
          :key="`priceSection-${index}`"
        >
          <div class="devider"></div>
          <p class="text1">
            {{ priceSection.title }}
          </p>
          <div
            v-for="(tariff, index) in priceSection.tariffs"
            :key="`price-${index}`"
            class="event-detail price"
          >
            <span class="icon fa fa-chevron-circle-right"></span>
            <p class="title">{{ tariff }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
