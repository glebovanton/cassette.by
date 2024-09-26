<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useQuasar } from 'quasar';

const selectedLanguage = ref('Ru');
const name = ref(null);
const email = ref(null);
const message = ref(null);
const subject = ref('Заказ с Cassette.by');

const $q = useQuasar();
const cassetteForm = ref(null);
const cleanForm = () => {
  name.value = null;
  email.value = null;
  message.value = null;
  cassetteForm.value.focus();
  cassetteForm.value.resetValidation();
};

const onSubmit = () => {
  if (!email.value) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message:
        selectedLanguage.value === 'Ru'
          ? 'Пожалуйста, не отправляйте пустое сообщение'
          : 'Калі ласка, не адпраўляйце пустое паведамленне',
    });
  } else {
    const dataString = `name=${name.value}&email=${email.value}&subject=${subject.value}&message=${message.value}`;

    axios
      .post('sendmail.php', dataString)
      .then(() => {
        cleanForm();
      })
      .catch((error) => {
        $q.notify({
          type: 'negative',
          color: 'red',
          textColor: 'white',
          icon: 'error_circle_outline',
          message: error.message || error,
        });
      });

    $q.notify({
      type: 'positive',
      color: 'green-4',
      textColor: 'white',
      icon: 'check_circle_outline',
      message: selectedLanguage.value === 'Ru' ? 'Отправлено' : 'Адпраўлена',
    });
  }
};
</script>

<template>
  <div
    class="cassette-form q-pa-md"
    style="max-width: 400px;"
    ref="cassetteFormWrap"
  >
    <q-form
      greedy
      class="q-gutter-md"
      ref="cassetteForm"
      @submit.prevent="onSubmit"
    >
      <q-input
        dark
        v-model="name"
        :label="selectedLanguage === 'Ru' ? 'Ваше имя *' : 'Вашае імя *'"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) ? true : (selectedLanguage === 'Ru'
            ? 'Ваше имя не может быть пустым'
            : 'Вашае імя не можа быць пустым'),
        ]"
        ref="nameField"
      />
      <q-input
        dark
        v-model="email"
        :label="
          selectedLanguage === 'Ru'
            ? 'Ваш телефон или почта *'
            : 'Ваш тэлефон або пошта *'
        "
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) ? true : (selectedLanguage === 'Ru'
            ? 'Поле не может быть пустым'
            : 'Поле не можа быць пустым'),
        ]"
      />
      <q-input
        dark
        v-model="message"
        :label="selectedLanguage === 'Ru' ? 'Сообщение *' : 'Паведамленне *'"
        type="textarea"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) ? true : (selectedLanguage === 'Ru'
            ? 'Поле не может быть пустым'
            : 'Поле не можа быць пустым'),
        ]"
      />
      <button type="submit" class="btn btn-default">
        <span class="mask"></span>
        {{ selectedLanguage === "Ru" ? "Записаться" : "Запісацца" }}
      </button>
    </q-form>
  </div>
</template>

<style lang="scss" scoped>
.cassette-form {
  .btn {
    margin-top: 18px;
    padding: 6px 55px;
    color: #fff;
    font-size: 16px;
    letter-spacing: 1px;
    overflow: hidden;
    position: relative;
    text-transform: uppercase;
    border: 2px solid #fff;
    border-radius: 0;
    height: 57px;
    background: transparent;
    box-shadow: none;
    transition: all 0.9s cubic-bezier(0.19, 1, 0.22, 1) 0s;
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    user-select: none;
    &:hover {
      border-color: #fff;
      color: #000;
      .mask {
        width: 100%;
      }
    }
    .mask {
      background: #fff;
      width: 0;
      display: block;
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      z-index: -1;
      transition: all 1.1s cubic-bezier(0.19, 1, 0.22, 1) 0s;
    }
  }
}
</style>
