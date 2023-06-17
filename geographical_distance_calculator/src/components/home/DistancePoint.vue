<template>
  <div class="distance-point">
    <p class="point-name">{{ props.text.toUpperCase() }}</p>
    <DistanceInput @coordinate-changed="setCoordinate" :coordinateType="'latitude'"/>
    <DistanceInput @coordinate-changed="setCoordinate" :coordinateType="'longtitude'"/>
    <p class="point-display">( {{ utils.shorten(point.latitude) }}, {{ utils.shorten(point.longtitude) }} )</p>
  </div>
</template>

<script setup>
import DistanceInput from './DistanceInput.vue'
import { ref, computed, watch } from 'vue'
import * as utils from '../../utils/utils'

const props = defineProps({
  text: {
    type: String,
    required: false
  }
})

const latitude = ref(0)
const longtitude = ref(0)

const point = computed(() => {
  return {
      latitude: latitude.value,
      longtitude: longtitude.value
    }
})

const emit = defineEmits(['point-changed'])

watch(point, async (newPoint) => {
  emit('point-changed', newPoint)
})

const setCoordinate = (coordinateValue, coordinateType) => {
  switch(coordinateType) {
    case 'latitude':
      latitude.value = coordinateValue
      break
    case 'longtitude':
      longtitude.value = coordinateValue
      break
  }
}
</script>

<style lang="scss" scoped>
.distance-point {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0.75em;

  .point-name {
    font-size: 1.4em;
  }
}

</style>