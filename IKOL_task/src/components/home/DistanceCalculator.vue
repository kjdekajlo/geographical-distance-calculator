<template>
    <div class="points-container">
        <DistancePoint @point-changed="setPoint($event, 'origin')" :text="from"/>
          <img class="arrow" src="../../assets/arrow.svg" />
        <DistancePoint @point-changed="setPoint($event, 'destination')" :text="to"/>
    </div>
</template>

<script setup>
import DistancePoint from './DistancePoint.vue'
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const from = computed(() => {
  return t("distanceCalculator.text.origin")
})

const to = computed(() => {
  return t("distanceCalculator.text.destination")
})

const nullPoint = {
  latitude: 0,
  longtitude: 0
}

const origin = ref( nullPoint )
const destination = ref( nullPoint )

const setPoint = (pointValue, pointType) => {
  switch(pointType) {
    case 'origin':
      origin.value = pointValue
      break
    case 'destination':
      destination.value = pointValue
      break
  }
}

const distanceData = computed(() => {
  return {
      origin: origin.value,
      destination: destination.value
    }
})

const emit = defineEmits(['distance-changed'])

let distance = ref(0)

watch(distanceData, async (newDistanceData) => {
  const distanceData = JSON.stringify(newDistanceData)

  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")

  await fetch('http://localhost:3000/api/distance', {
      headers: myHeaders,
      method: 'POST',
      body: distanceData
    })
    .then(response => response.text())
    .then(result => {
      const resultObj = JSON.parse(result)
      distance.value = resultObj.d
    })
    .catch(error => console.log('Error!', error))
})

watch(distance, async (newDistance) => {
  emit('distance-changed', newDistance)
})

</script>

<style lang="scss" scoped>
  .points-container {
    display: flex;
    flex-direction: row;
    align-items: center;

    .arrow {
      height: 50px;
      margin-top: 40px;
    }
  }
</style>