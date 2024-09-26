<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { loadingPlaceholder } from 'src/statics/consts.js';

const store = useStore();

const selectedLanguageIndex = computed(() => store.state.StoreCassette.selectedLanguageIndex);
const requestData = computed(() => store.getters['StoreCassette/requestData']);
const selectedLanguage = computed(() => store.getters['StoreCassette/selectedLanguage']);

const students = computed(() => requestData.value?.requestData?.allStudents?.map((student) => ({
  name: student._allNameLocales[selectedLanguageIndex.value]?.value || '',
  surname: student._allSurnameLocales[selectedLanguageIndex.value]?.value || '',
  url: student.imgsrc?.url || '',
  description: student._allDescriptionLocales[selectedLanguageIndex.value]?.value || '',
  teaser: student._allTeaserLocales[selectedLanguageIndex.value]?.value || '',
})));
</script>

<template>
  <div class="students-page flex flex-center">
    <router-link class="call-to-home" :to="{ name: 'main' }">
      {{ selectedLanguage === "Ru" ? "На главную" : "На галоўную"
      }}<span class="add-sep"></span
    ></router-link>
    <div class="page-content">
      <div class="row">
        <div class="col-lg-12">
          <h3 class="header3">
            {{ selectedLanguage === "Ru" ? "Наши Ученики" : "Вучні" }}
          </h3>
          <p>
            <template v-if="selectedLanguage === 'Ru'"
              >Давно мечтаешь научиться играть на музыкальном инструменте?
              Хочешь петь как профессиональный исполнитель? Музыкальная студия
              Cassette - это уютное место в центре Минска с профессиональными
              педагогами и необходимым музыкальным оборудованием. Наши ученики
              уже поют и играют на сцене. Не теряй ни минуты и ты!</template
            >
            <template v-else
              >Даўно марыш навучыцца граць на музычным інструменце? Хочаш
              спяваць як прафесійны выканаўца? Музычная студыя Cassette - гэта
              ўтульнае месца ў цэнтры Мінска з прафесійнымі педагогамі і
              неабходным музычным абсталяваннем. Нашы вучні ўжо выступаюць на
              прафесійнай сцэне. Не губляй ні хвіліны і ты!</template
            >
          </p>
        </div>
      </div>
      <div class="project-gal-wrap">
        <figure
          v-for="(student, index) in students"
          class="student-section"
          :key="`student-${index}`"
        >
          <div
            v-lazy:background-image="student.url"
            :style="{ backgroundImage: `url(${loadingPlaceholder})` }"
            class="img-responsive"
          ></div>
          <h6 class="description">{{ student.name }} {{ student.surname }}</h6>
          <p class="about-student">
            {{ student.description }}
          </p>
        </figure>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.students-page {
  color: white;
  position: relative;
  background: $dark;
  padding: $spacer * 4 $spacer * 1.5 $spacer;
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
      .student-section {
        width: 100%;
        @include at-break($break--base) {
          width: 48%;
        }
        .img-responsive {
          background-size: cover;
          margin-bottom: calc($spacer/2);
          background-position: center;
          transition: all 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0s;
          width: 100%;
          height: 90vw;
          @include at-break($break--base) {
            height: 50vw;
          }
        }
        .description {
          margin-bottom: calc($spacer/3);
        }
        .about-student {
          margin-bottom: $spacer;
        }
      }
    }
  }
}
</style>
