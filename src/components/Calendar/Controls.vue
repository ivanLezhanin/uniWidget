<template>
  <div class="calendar-date-selector">
    <span @click="selectPrevious">&lt;</span>
    <MonthText
      @click="selectCurrent"
      :selected-date="selectedDate"
      class="calendar-month-header-selected-month"
    />
    <span @click="selectNext">&gt;</span>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import MonthText from "./MonthText.vue";
export default {
  name: 'Controls',
  components: {MonthText},
  props: {
    currentDate: {
      type: String,
      required: true,
    },

    selectedDate: {
      type: Object,
      required: true,
    },
  },

  methods: {
    selectPrevious() {
      let newSelectedDate = dayjs(this.selectedDate).subtract(1, 'month')
      this.$emit('dateSelected', newSelectedDate)
    },

    selectCurrent() {
      let newSelectedDate = dayjs(this.currentDate)
      this.$emit('dateSelected', newSelectedDate)
    },

    selectNext() {
      let newSelectedDate = dayjs(this.selectedDate).add(1, 'month')
      this.$emit('dateSelected', newSelectedDate)
    },
  },
}
</script>

<style scoped>
.calendar-date-selector {
  display: flex;
  justify-content: space-between;
  width: auto;
  color: var(--grey-800);
}

.calendar-date-selector > * {
  cursor: pointer;
  user-select: none;
}
</style>
