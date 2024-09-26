<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import LanguageButton from 'src/components/LanguageButton.vue';
import { request } from 'src/datocms';
import { HOMEPAGE_QUERY } from 'src/statics/consts.js';

const languages = ref([
  { name: 'Ru', label: 'Рус', isSelected: false },
  { name: 'Blr', label: 'Бел', isSelected: true },
]);

const error = ref(null);
const loading = ref(true);
const store = useStore();

const selectedLanguage = computed(() => languages.value
  .find((language) => language.isSelected).name);

const requestData = computed({
  get: () => store.state.StoreCassette.requestData,
  set: (val) => store.commit('StoreCassette/updateRequestData', val),
});

onMounted(async () => {
  try {
    requestData.value = await request({
      query: HOMEPAGE_QUERY,
      variables: { limit: 50 },
    });
  } catch (e) {
    error.value = e;
  }
  loading.value = false;
});

const setSelectedLanguageIndex = (index) => {
  store.commit('StoreCassette/setSelectedLanguageIndex', index);
};

const onSelectLanguage = (selectedName) => {
  languages.value.forEach((language) => {
    language.isSelected = language.name === selectedName;
  });
  setSelectedLanguageIndex(selectedLanguage.value === 'Ru' ? 0 : 1);
};
</script>

<template>
  <div id="q-app">
    <LanguageButton
      :languages="languages"
      @select-language="onSelectLanguage"
    />
    <router-view />
  </div>
</template>
