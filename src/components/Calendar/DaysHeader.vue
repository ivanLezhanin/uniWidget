<template>
  <ol class="day-of-week">
    <li v-for="weekday in weekdays" :key="weekday">{{ weekday }}</li>
  </ol>
</template>

<script>
const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

export default {
  name: 'DaysHeader',

  computed: {
    weekdays() {
      return WEEKDAYS
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

.day-of-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  list-style-type: none;
}

.day-of-week > * {
  color: rgb(0, 0, 0);
  font-family: 'Montserrat';
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0px;
  text-align: center;
}

@media (max-width: 480px) {
  .day-of-week > * {
    font-size: 12px;
  }
}
@media (min-width: 480px) and (max-width: 768px) {
  .day-of-week > * {
    font-size: 12px;
  }
}
@media (min-width: 768px) and (max-width: 992px) {
}
@media (min-width: 992px) and (max-width: 1400px) {
}
@media (min-width: 1400px) and (max-width: 1600px) {
}
@media (min-width: 1600px) {
}
</style>
