<template>
    <div class="distance-input-container">
        <p class="label">{{ utils.capitalize(labelName) }}</p>
        <div class="inputs" @keydown="preventMinus($event)">
          <label><input v-model="degree" name="degree" type="number" min="0" :max="maxDegree" class="distance-input"/>°</label>
          <label><input v-model="minute" name="minute" type="number" min="0" max="60" class="distance-input"/>'</label>
          <label><input v-model="second" name="second" type="number" min="0" max="60" class="distance-input"/>"</label>
        </div>
          <span class="directions" v-if="props.coordinateType">
            <p :class="{'selected': directionType === directions[0]}" @click="directionType = directions[0]">{{ directions[0] }}</p>
            <p>/</p>
            <p :class="{'selected': directionType === directions[1]}" @click="directionType = directions[1]">{{ directions[1] }}</p>
        </span>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import * as utils from '../../utils/utils'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  coordinateType: {
    type: String,
    required: false
  }
})

const labelName = computed(() => {
  switch(props.coordinateType) {
    case 'latitude':
      return t("point.latitude")
    case 'longtitude':
      return t("point.longtitude")
    default:
      return ""
  }
})

const setDirections = () => {
  switch(props.coordinateType) {
    case 'latitude':
      directionType.value = 'N'
      maxDegree = 90
      break
    case 'longtitude':
      directionType.value = 'E'
      maxDegree = 180
      break
  }
}

const degree = ref(0)
const minute = ref(0)
const second = ref(0)

let directionType = ref('')
let maxDegree = 0

watch(degree, async (newValue, prevValue) => {
  if (newValue > maxDegree) {
    degree.value = prevValue
  } else if (newValue == maxDegree) {
    minute.value = 0
    second.value = 0
  }
})

watch(minute, async (newValue, prevValue) => {
  if (coordinate.value > maxDegree) minute.value = prevValue

  if (newValue > 60) minute.value = prevValue

  if (newValue > 60) {
    minute.value = prevValue
  } else if (newValue === 60) {
    minute.value = 0
    degree.value = degree.value + 1
  }
})

watch(second, async (newValue, prevValue) => {
  if (coordinate.value > maxDegree) second.value = prevValue

  if (newValue > 60) {
    second.value = prevValue
  } else if (newValue === 60) {
    second.value = 0
    minute.value = minute.value + 1
  }
})

const preventMinus = (event) => {
  if (event.key === '-') event.preventDefault()
}

const coordinate = computed(() => {
  const coordinateNumber = degree.value + minute.value / 60 + second.value / 3600

  switch(directionType.value) {
    case directions.value[0]:
      return coordinateNumber
    case directions.value[1]:
      return -coordinateNumber
    case 0:
      return 0
  }

  return (directionType.value === directions.value[1]) ? -coordinateNumber : coordinateNumber
})

const directions = computed(() => 
  {
    switch(props.coordinateType) {
      case 'latitude':
        return ['N', 'S']
      case 'longtitude':
        return ['E', 'W']
      default:
        return ['','']
    }
  }
)

const emit = defineEmits(['coordinate-changed'])

watch(coordinate, async (newCoordinate) => {
  emit('coordinate-changed', newCoordinate, props.coordinateType)
})

onMounted(() => {
  setDirections()
})

</script>

<style lang="scss" scoped>

$distance-input-color: #25326d;

  .distance-input-container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    justify-items: center;
    align-items: center;
    column-gap: 1em;
    color: $distance-input-color;

    .label {
      justify-self: end;
    }

    .inputs {
      display: flex;
      column-gap: 5px;

      label {
        display: inline-flex;
      }

      .distance-input {
        border-radius: 5px;
        border: $distance-input-color solid 2px;
        width: 50px;
      }
    }

    .directions {
      display: flex;
      flex-direction: row;
      cursor: pointer;
      user-select: none;
      justify-self: start;
      column-gap: 5px;

      .selected {
        font-weight: 600;
        text-decoration: underline;
      }
    }
  }
</style>