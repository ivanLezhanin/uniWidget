<template>
  <li
    class="calendar-day noselect"
    :class="{
      'calendar-day--not-current': !day.isCurrentMonth,
      'calendar-day--selected': isToday,
      'choose--stricted': dateIsStricted || (IsPrimaryChoosing && isToday),
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
  name: 'DayItem',

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
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
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
