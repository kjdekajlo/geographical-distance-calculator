<template>
    <div class="language-selector">
        <div class="languages">
            <p :class="{'selected': locale === 'en'}" @click="changeLocale('en')">EN</p>
            <p>/</p>
            <p :class="{'selected': locale === 'pl'}" @click="changeLocale('pl')">PL</p>
        </div>
    </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const changeLocale = (languageStr) => {
  locale.value = languageStr
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
        user-select: none;
        cursor: pointer;
        transition: 0.2s;

        &.selected {
          text-decoration: underline;
          font-weight: 600;
          transition: 0.2s;
        }
      }
    }
  }

  @media screen and (max-width: 1300px) {
    .language-selector {
      .languages {
        padding: 1.5em 2em 0;
      }
    }
  }
</style>