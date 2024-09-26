<script>
export default {
  name: 'LanguageButton',
  data() {
    return {};
  },
  props: {
    languages: {
      type: Array,
    },
  },
};
</script>

<template>
  <ul class="toggle-language">
    <li
      v-for="(language, index) in languages"
      :class="{ active: language.isSelected }"
      :key="index"
      @click="$emit('select-language', language.name)"
    >
      {{ language.label }}
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.toggle-language {
  $customWhite: #ffffff7d;
  position: fixed;
  top: 45px;
  right: 90px;
  display: flex;
  margin-bottom: 0;
  list-style: none;
  padding-left: 0;
  border: solid 1px $customWhite;
  box-shadow: 0 0 5px #ffffff4a;
  color: grey;
  z-index: 1000;
  backdrop-filter: blur(2px);
  li {
    display: flex;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    padding: 0 0.5em;
    transition: all ease-in-out 0.5s;
    width: 30px;
    color: #ffffff7d;
    font-weight: bold;
    &:first-of-type {
      border-right: solid 1px $customWhite;
    }
    &.active {
      background: $customWhite;
      color: black;
      &:hover {
        background: $customWhite;
      }
    }
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
}
</style>
