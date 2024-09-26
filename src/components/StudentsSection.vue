<script setup>
import {
  computed,
} from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const selectedLanguageIndex = computed(() => store.state.StoreCassette.selectedLanguageIndex);
const requestData = computed(() => store.getters['StoreCassette/requestData']);
const selectedLanguage = computed(() => store.getters['StoreCassette/selectedLanguage']);

const students = computed(() => (
  requestData.value?.requestData?.allStudents?.map((student) => ({
    name: student._allNameLocales[selectedLanguageIndex.value]?.value,
    surname: student._allSurnameLocales[selectedLanguageIndex.value]?.value,
    url: student.imgsrc?.url,
    description: student._allDescriptionLocales[selectedLanguageIndex.value]?.value,
    teaser: student._allTeaserLocales[selectedLanguageIndex.value]?.value,
  }))
));
</script>

<template>
  <section
    class="container-fluid align-center text-left animated sec-pad-top students"
  >
    <div class="row">
      <div class="col-lg-12">
        <h3 class="header3">
          {{ selectedLanguage === "Ru" ? "Наши Ученики" : "Вучні" }}
        </h3>
        <router-link class="more-details" :to="{ name: 'students' }">{{
            selectedLanguage === "Ru" ? "Подробнее" : "Падрабязна"
          }}</router-link>
        <p>
          <template v-if="selectedLanguage === 'Ru'"
          >Творческий - значит уникальный. Каждый человек имеет
            способности к творчеству, и наши ученики тому подтверждение.
            Такие разные, по-своему уникальные и успешные ученики Cassette
            studio.</template
          >
          <template v-else
          >Творчы - значыць унікальны! Кожны чалавек мае здольнасці да
            творчасці, і нашыя вучні таму доказ! Такія розныя, па-свойму
            таленавітыя і ўнікальныя вучні Cassette Studio!</template
          >
        </p>
      </div>
    </div>
    <div class="project-gal-wrap">
      <div class="project-gallery row minus-margin">
        <figure
          v-for="(student, index) in (students && students.slice(0, 4))"
          class="col-sm-6 margin-btm-lg"
          :key="`student-${index}`"
        >
          <img
            v-if="student.url"
            class="img-responsive student"
            :src="student.url"
            alt="student image "
          />
          <p>
            <strong>{{ student.name }}</strong>
          </p>
          <p itemprop="caption description">
            {{ student.teaser }}
          </p>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
