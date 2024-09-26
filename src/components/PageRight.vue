<script>
import CassetteForm from './CassetteForm.vue';

export default {
  name: 'PageRight',
  components: {
    CassetteForm,
  },
  props: {
    isContactsOpened: {
      type: Boolean,
    },
    selectedLanguage: {
      type: String,
      default: 'Ru',
    },
  },
  data() {
    return {
      cassetteMail: 'cassetteby@gmail.com',
      cassettePhone: '+375 (29) 177-70-85',
    };
  },
  computed: {
    cassetteAddress() {
      return this.selectedLanguage === 'Ru'
        ? 'г.Минск, ул. Первомайская 14, кор 2. Каб 2-15'
        : 'г.Мінск, вул. Першамайская 14, кор 2. Каб 2-15';
    },
  },
  methods: {
    digitalize(value) {
      return value ? value.trim().replace(/\D/g, '') : '';
    },
  },
};
</script>

<template>
  <div class="page page-right">
    <section
      class="container-fluid align-center animated sec-pad"
      :class="{ fadeInRight: isContactsOpened }"
    >
      <h3>
        <template v-if="selectedLanguage === 'Ru'"
          >Здравствуйте, рады Вас видеть!</template
        >
        <template v-else>Вітаем вас!</template>
      </h3>
      <p class="text1">
        <template v-if="selectedLanguage === 'Ru'"
          >Cassette - уютная студия музыкального обучения в самом центре Минска.
          Мы работаем с 9.00 до 22.00 без выходных!</template
        >
        <template v-else
          >Cassette - утульная музычная студыя ў самым цэнтры Мінска! Мы працуем
          з 9.00 да 22.00 без выхадных!</template
        >
      </p>
      <p class="text1">
        <template v-if="selectedLanguage === 'Ru'"
          >Запишитесь на пробное занятие прямо сейчас!</template
        >
        <template v-else>Запішыцеся на пробны бясплатны занятак!</template>
      </p>
      <CassetteForm ref="cassetteForm" :selectedLanguage="selectedLanguage" />

      <div class="row">
        <div class="address-detail">
          <div class="col-sm-4 margin-btm-sm">
            <div class="sep-wrap">
              <span class="add-sep"></span>
            </div>
            <span>
              <template v-if="selectedLanguage === 'Ru'">Адрес</template>
              <template v-else>Адрас</template></span
            >
            <p class="value">{{ cassetteAddress }}</p>
          </div>
          <div class="col-sm-4 margin-btm-sm">
            <div class="sep-wrap">
              <span class="add-sep"></span>
            </div>
            <span>Email</span>
            <a class="value" :href="`mailto:${cassetteMail}`">{{
              cassetteMail
            }}</a>
          </div>
          <div class="col-sm-4 margin-btm-sm">
            <div class="sep-wrap">
              <span class="add-sep"></span>
            </div>
            <span
              ><template v-if="selectedLanguage === 'Ru'">Телефоны</template>
              <template v-else>Тэлефоны</template></span
            >
            <a class="value" :href="`callto:${digitalize(cassettePhone)}`">{{
              cassettePhone
            }}</a>
          </div>
          <div class="col-sm-4 margin-btm-sm">
            <div class="sep-wrap">
              <span class="add-sep"></span>
            </div>
            <span
              ><template v-if="selectedLanguage === 'Ru'">Инфо</template>
              <template v-else>Інфа</template></span
            >
            <br />
            <span class="value">
              <a href="/LLC_merger_agreement.html" target="_blank">{{
                selectedLanguage === "Ru"
                  ? "Договор присоединения"
                  : "Дагавор далучэння"
              }}</a>
              <br />
              <a href="/privacy_policy_ooo.html" target="_blank">{{
                selectedLanguage === "Ru"
                  ? "Политика конфиденциальности"
                  : "Палітыка прыватнасці"
              }}</a>
            </span>
          </div>
        </div>
      </div>
    </section>
    <section class="container map-sec">
      <q-img
        src="../statics/img/map.jpg"
        spinner-color="white"
        style="height: 50vh; max-width: 100%;"
      />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.page-right {
  padding: calc($spacer / 2) calc($spacer * 1.5);
  color: white;
  h3 {
    font-size: 24px;
    line-height: 35px;
    padding-bottom: 32px;
  }
  .sec-pad {
    .address-detail {
      display: flex;
      margin-top: $spacer * 2;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;
      .margin-btm-sm {
        position: relative;
        min-height: 1px;
        padding: 0 calc($spacer/2) calc($spacer/2);
        cursor: pointer;
        max-width: 248px;
        &:hover {
          .sep-wrap {
            background: transparent;
            .add-sep {
              width: 100%;
              animation-name: sep-anim;
            }
          }
          span {
            color: #8d8d8d;
          }
        }
        .sep-wrap {
          width: 20px;
          margin-bottom: 12px;
          background: #fff;
          .add-sep {
            display: block;
            height: 2px;
            text-align: center;
            width: 0;
            background: #fff none repeat scroll 0 0;
            transition: width 0.4s ease-in-out;
          }
        }
        span {
          text-transform: capitalize;
          transition: color 0.4s ease-in-out;
          font-weight: lighter;
        }
        .value {
          font-size: 15px;
          line-height: 150%;
          letter-spacing: normal;
          display: block;
          font-weight: bold;
          margin-bottom: 0;
          white-space: pre-wrap;
        }
      }
    }
  }
  .map-sec {
    margin-top: $spacer;
  }
}
</style>
