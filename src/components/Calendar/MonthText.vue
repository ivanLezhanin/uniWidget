<template>
  <div class="calendar-date-indicator">{{ selectedMonth }}</div>
</template>

<script>
export default {
  name: 'MonthText',
  props: {
    selectedDate: {
      type: Object,
      required: true,
    },
  },

  computed: {
    selectedMonth() {
      var options = {
        year: 'numeric',
        month: 'long',
        timezone: 'UTC',
      }
      let DateNowText = new Date(this.selectedDate).toLocaleString(
        'ru',
        options
      )
      return DateNowText
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

.calendar-date-indicator {
  font-family: 'Montserrat';
  font-size: 24px;
  font-weight: 600;
  color: var(--grey-00);
}
@media (max-width: 480px) {
  .calendar-date-indicator {
    font-size: 14px;
    line-height: normal;
  }
}
@media (min-width: 480px) and (max-width: 768px) {
  .calendar-date-indicator {
    font-size: 14px;
    line-height: normal;
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
