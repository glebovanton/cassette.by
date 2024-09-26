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

const services = computed(() => (requestData.value?.requestData?.allServices?.map((service) => ({
  name: service._allNameLocales,
  description: service._allDescriptionLocales,
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
          {{ selectedLanguage === "Ru" ? "О нас" : "Пра нас" }}
        </h3>
        <p class="text1">
          <template v-if="selectedLanguage === 'Ru'"
          >Творчество – это необходимый элемент нашей жизни. Каждый
            человек уникален от природы, и мы знаем наверняка, что
            неспособных людей нет. Наши основные принципы - это
            индивидуальный подход, доступность и последовательность методик,
            с помощью которых ученик приходит к заветной цели! На уроках по
            вокалу вы сможете раскрыть свою природную свободу голоса,
            укрепить голосовой аппарат и стать уверенным в себе, а игра на
            музыкальных инструментах поможет поверить в свои силы и
            уникальность, развить творческое мышление и мелкую моторику, а
            также стать профессиональным музыкантом.</template
          >
          <template v-else
          >Творчасць - гэта неабходны элемент нашага жыцця. Кожны чалавек
            унікальны , і мы ведаем, што няздольных людзей няма. Нашы
            асноўныя прынцыпы - гэта індывідуальны падыход, даступнасць і
            паслядоўнасць методык, з дапамогай якіх вучань прыходзіць да
            сваёй мэты! На ўроках па вакале вы зможаце раскрыць сваю
            прыродную свабоду галасу, умацаваць галасавы апарат і стаць
            упэўненым у сабе, а гульня на музычных інструментах дапаможа
            паверыць у свае сілы і ўнікальнасць, развіць творчае мысленне і
            дробную маторыку, а таксама стаць прафесійным музыкам.</template
          >
        </p>
        <ul class="event-detail">
          <li
            v-for="(service, index) in services"
            :key="`service-${index}`"
            class="item"
          >
            <span class="icon fa fa-chevron-circle-right"></span>
            <h6 class="header6 title">
              {{ service.name[selectedLanguageIndex].value }}
            </h6>
            <p class="description">
              {{ service.description[selectedLanguageIndex].value }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
