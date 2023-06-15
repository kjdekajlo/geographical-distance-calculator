<template>
    <div class="home-page">
      <p class="instructions">Enter geographical coordinates of two points to calculate a distance between them.</p>
      <DistanceCalculator @distance-changed="distanceMeters = $event"/>
      <p class="result">These points are {{ utils.shorten(distanceKilometers) }} km / {{ utils.shorten(distanceMeters) }} m from each other.</p>
    </div>
</template>

<script setup>
import DistanceCalculator from './DistanceCalculator.vue'
import { ref, computed } from 'vue'
import * as utils from '../../utils/utils'

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

    p {
      font-size: 1.75em;
      font-weight: 400;
    }

    .instructions {
      margin-top: 3em;
    }
  }
</style>