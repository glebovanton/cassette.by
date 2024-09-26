<script>
export default {
  name: 'CustomFooter',
  data() {
    return {
      leftDrawerOpen: false,
      socials: [
        {
          link: 'https://www.instagram.com/studio.cassette/',
          icon: 'fab fa-instagram',
          target: '_blank',
        },
        {
          link: 'https://vk.com/studio.cassette',
          icon: 'fab fa-vk',
          target: '_blank',
        },
        {
          link: 'https://www.facebook.com/Studio-Cassette-111576523718276/',
          icon: 'fab fa-facebook-square',
          target: '_blank',
        },
        {
          link: 'viber://chat?number=+375291777085',
          icon: 'fab fa-viber',
          target: '_blank',
        },
        {
          link: 'https://t.me/+375291777085',
          icon: 'fab fa-telegram',
          target: '_blank',
        },
      ],
    };
  },
};
</script>

<template>
  <footer bordered class="footer text-white">
    <q-tabs
      no-caps
      active-color="primary"
      indicator-color="transparent"
      class="text-white on-right"
    >
      Вы можете нас найти здесь:
      <a
        v-for="(social, index) in socials"
        :key="`social-${index}`"
        class="social-icon"
        :href="social.link"
        :target="social.target"
      >
        <q-icon color="white" :name="social.icon" />
      </a>
    </q-tabs>
    <p class="text-caption text-weight-thin float-right on-left">
      ©2020 Glebov Anton, All Rights Reserved
    </p>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  @include at-break($break--base) {
    background-color: transparent;
  }
  .social-icon {
    padding: 0 calc($spacer/2);
  }
}
</style>
