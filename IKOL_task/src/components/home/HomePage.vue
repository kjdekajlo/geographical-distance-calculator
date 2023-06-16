<template>
    <div class="home-page">
      <p class="instructions">{{ t("homePage.instructions") }}</p>
      <DistanceCalculator @distance-changed="distanceMeters = $event"/>
      <p class="result">{{ t("homePage.result.start") }} {{ utils.shorten(distanceKilometers) }} km / {{ utils.shorten(distanceMeters) }} m{{ t("homePage.result.end") }}</p>
    </div>
</template>

<script setup>
import DistanceCalculator from './DistanceCalculator.vue'
import { ref, computed } from 'vue'
import * as utils from '../../utils/utils'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const distanceMeters = ref(0)

const distanceKilometers = computed(() => {
  return utils.metersToKilometers(distanceMeters.value)
})

</script>

<style lang="scss" scoped>
  .home-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 5em;
    font-weight: 200;
    padding: 1.5em 2em 0;

    p {
      font-size: 1.75em;
      font-weight: 400;

      &.instructions {
        margin-top: 3em;
      }
    }
  }
</style>