<template>
    <div class="language-selector">
        <div class="languages">
            <p :class="{'selected': true}" @click="changeLocale('en')">EN</p>
            <p>/</p>
            <p :class="{'selected': true}" @click="changeLocale('pl')">PL</p>
        </div>
    </div>
</template>
<script setup>

const changeLocale = (languageStr) => {
  $i18n.locale = languageStr
}
</script>

<style lang="scss" scoped>
  .language-selector {
    .languages {
      display: flex;
      column-gap: 0.5em;
      font-size: 1.4em;
      padding: 1.5em 2em 0;

      p {
        transition: 0.2s;

        &.selected {
          text-decoration: underline;
          font-weight: 600;
          user-select: none;
          cursor: pointer;
          transition: 0.2s;
        }
      }
    }
  }
</style>