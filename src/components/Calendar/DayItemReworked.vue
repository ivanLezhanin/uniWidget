<template>
  <li
    class="calendar-day noselect"
    :class="{
      'calendar-day--not-current': !day.isCurrentMonth,
      'calendar-day--selected': isToday,
      'choose--stricted': chooseIsStricted,
      'choose--stricted--start-day':
        isToday == true || (isStartDate && !IsPrimaryChoosing),
    }"
    @click="changeDateByClick()"
  >
    <span>{{ label }}</span>
    <span
      v-if="day.price.price != null && HideDayCost == false"
      :class="{
        price: true,
        notActual: day.price.opened == false,
      }"
      >{{ day.price.price }} &#8381;</span
    >
  </li>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'DayItemReworked',

  props: {
    day: {
      type: Object,
      required: true,
    },

    isCurrentMonth: {
      type: Boolean,
      default: false,
    },

    isToday: {
      type: Boolean,
      default: false,
    },

    isStrictDay: {
      type: Boolean,
      default: false,
    },

    selectDate: {
      type: Function,
      default: () => {},
    },

    strictDate: {
      type: String,
      default: () => {
        return ''
      },
    },
    IsPrimaryChoosing: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    HideDayCost: {
      type: Boolean,
      default: () => {
        return false
      },
    },
  },

  computed: {
    label() {
      return dayjs(this.day.date).format('D')
    },

    dateIsStricted() {
      if (this.strictDate == '') {
        return false
      }

      let dateNowObj = dayjs(this.day.date)
      let strictDayObj = dayjs(this.strictDate)

      if (this.isStrictDay || this.isStrictedDate(dateNowObj, strictDayObj)) {
        return true
      } else {
        return false
      }
    },

    isStartDate() {
      if (this.strictDate == '') {
        return false
      }

      if (this.day.date == this.strictDate) {
        return true
      } else {
        return false
      }
    },

    chooseIsStricted() {
      return this.dateIsStricted || (this.IsPrimaryChoosing && this.isToday)
    },
  },

  methods: {
    changeDateByClick() {
      if (this.dateIsStricted) {
        return 0
      }

      this.selectDate(dayjs(this.day.date))
    },

    isNegative(num) {
      if (num == 0) {
        return true
      }

      if (Math.sign(num) === -1) {
        return true
      }

      return false
    },

    getDateDifference(dateNowObject, strictDateObject) {
      /*
        Если возвращает отрицательное число: dateNow была ДО текущего strictDate
        Если возвращает положительное число: dateNow была ПОСЛЕ текущего strictDate
        Если возвращает 0: dateNow == strictDate
      */
      return dateNowObject.diff(strictDateObject)
    },

    isStrictedDate(dateNowObject, strictDateObject) {
      return this.isNegative(
        this.getDateDifference(dateNowObject, strictDateObject)
      )
    },
  },
}
</script>

<style scoped>
.calendar-day {
  position: relative;

  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: center;

  min-width: 70px;
  width: auto;
  height: auto;

  padding: 8px;

  gap: 8px;

  border-radius: 8px;

  border: 1px solid transparent;
}

.calendar-day > span {
  position: relative;

  color: black;
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0px;
  text-align: center;
}

.calendar-day > span.price {
  position: relative;

  color: rgb(98, 212, 122);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0px;
  text-align: center;
}
.calendar-day > span.price.notActual {
  color: rgb(170, 169, 169);
}

.calendar-day--not-current {
  background-color: #505050;
}
.calendar-day--not-current > span {
  color: white;
}

.calendar-day--selected {
  border: 1px solid rgb(0, 158, 255);
  background-color: transparent;

  box-shadow: 0px 4px 10px -3px rgba(0, 0, 0, 0.25);
}
.calendar-day--selected > span {
  position: relative;

  color: rgb(0, 158, 255);
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0px;
  text-align: center;
}

.calendar-day--selected > span.price {
  position: relative;

  color: rgb(98, 212, 122);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0px;
  text-align: center;
}
.calendar-day--selected > span.price.notActual {
  color: rgb(170, 169, 169);
}

.calendar-day--not-current.calendar-day--selected {
  border: 1px solid rgba(0, 0, 0, 0.25);
  background-color: #e5faff;

  box-shadow: 0px 4px 10px -3px rgba(0, 0, 0, 0.25);
}

.calendar-day:hover {
  border: 1px solid rgb(67, 183, 255);
}

.calendar-day.calendar-day--not-current:hover {
  border: 1px solid rgba(0, 0, 0, 0.25);
  background-color: #333333;
}

.calendar-day.choose--stricted.choose--stricted--start-day {
  border: 1px solid rgba(0, 0, 0, 0.25);
  background-color: rgb(0, 158, 255);

  box-shadow: 0px 4px 10px -3px rgba(0, 0, 0, 0.25);
}
.calendar-day.choose--stricted.choose--stricted--start-day > span {
  color: rgb(255, 255, 255);
}

.calendar-day.choose--stricted.choose--stricted--start-day > span.price {
  color: rgb(80, 255, 117);
}

.calendar-day.choose--stricted > span {
  color: rgb(170, 169, 169);
}
</style>

<style scoped>
@media (max-width: 480px) {
  .calendar-day {
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 00px;
    width: auto;
    height: auto;
    padding: 2px 6px;
    gap: 2px;
    border-radius: 8px;
  }
  .calendar-day > span {
    position: relative;
    font-family: 'Montserrat';
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0px;
    text-align: center;
  }

  .calendar-day > span.price {
    font-size: 6px;
    font-weight: 700;
  }
}
@media (min-width: 480px) and (max-width: 768px) {
  .calendar-day {
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 00px;
    width: auto;
    height: auto;
    padding: 2px 6px;
    gap: 2px;
    border-radius: 8px;
  }
  .calendar-day > span {
    position: relative;
    font-family: 'Montserrat';
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0px;
    text-align: center;
  }

  .calendar-day > span.price {
    font-size: 6px;
    font-weight: 700;
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
