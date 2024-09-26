<script setup>
import {
  computed,
} from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const selectedLanguageIndex = computed(() => store.state.StoreCassette.selectedLanguageIndex);
const requestData = computed(() => store.getters['StoreCassette/requestData']);
const selectedLanguage = computed(() => store.getters['StoreCassette/selectedLanguage']);

const teachers = computed(() => (
  requestData.value?.requestData?.allTeachers?.map((teacher) => ({
    name: teacher._allNameLocales[selectedLanguageIndex.value]?.value,
    surname: teacher._allSurnameLocales[selectedLanguageIndex.value]?.value,
    url: teacher.imgsrc?.url,
    description: teacher._allDescriptionLocales[selectedLanguageIndex.value]?.value,
    profession: teacher._allProfessionLocales[selectedLanguageIndex.value]?.value,
    facebook: '',
    vk: '',
    instagram: '',
    telegram: '',
  }))
));
</script>

<template>
  <section
    class="container-fluid align-center text-left animated sec-pad-top team-sec"
  >
    <div class="row">
      <div class="col-lg-12">
        <h3 class="header3">
          {{ selectedLanguage === "Ru" ? "Наши Педагоги" : "Педагогі" }}
        </h3>
        <div class="row minus-margin">
          <div
            v-for="(teacher, index) in teachers"
            class="col-xs-6 col-lg-4 margin-btm-lg"
            :key="`teacher-${index}`"
          >
            <img
              v-if="teacher.url"
              class="teacher img-responsive"
              :src="teacher.url"
              alt="teacher"
            />
            <span class="team-per"
            >{{ teacher.name }} {{ teacher.surname }}</span
            >
            <span class="team-desn">{{ teacher.profession }}</span>
            <p class="text1">
              {{ teacher.description }}
            </p>
            <ul class="team-social">
              <li v-if="teacher.facebook">
                <a :href="teacher.facebook" target="_blank"
                ><i class="fab fa-facebook-f"></i
                ></a>
              </li>
              <li v-if="teacher.vk">
                <a :href="teacher.vk" target="_blank"
                ><i class="fab fa-vk"></i
                ></a>
              </li>
              <li v-if="teacher.instagram">
                <a :href="teacher.instagram" target="_blank"
                ><i class="fab fa-instagram"></i
                ></a>
              </li>
              <li v-if="teacher.telegram">
                <a :href="teacher.telegram" target="_blank"
                ><i class="fab fa-telegram-plane"></i
                ></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
