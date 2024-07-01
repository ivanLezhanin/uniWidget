<template>
  <div class="calendar-month">
    <div class="calendar-month-header">
      <Controls
        :current-date="today"
        :selected-date="showDate"
        @dateSelected="changeShowDate"
      />
    </div>

    <DaysHeader />

    <ol class="days-grid" :key="AllOrdersList">
      <DayItemReworked
        v-for="(day, indx) in PrevMonthDays"
        :class="{
          PrevMonthDays: true,
          PrevMonthLastChild: indx == PrevMonthDays.length - 1,
        }"
        :key="`${day.date}${getSelectedDay}`"
        :day="day"
        :is-today="day.date === getSelectedDay"
        :isStrictDay="day.price.opened == false"
        :selectDate="selectDate"
        :strictDate="StrictModeStartDate"
        :IsPrimaryChoosing="IsPrimaryChoosing"
        :HideDayCost="HideDayCost"
      />
      <DayItemReworked
        v-for="day in CurrentMonthDays"
        :key="`${day.date}${getSelectedDay}`"
        :day="day"
        :is-today="day.date === getSelectedDay"
        :isStrictDay="day.price.opened == false"
        :selectDate="selectDate"
        :strictDate="StrictModeStartDate"
        :IsPrimaryChoosing="IsPrimaryChoosing"
        :HideDayCost="HideDayCost"
      />
      <DayItemReworked
        v-for="(day, indx) in NextMonthDays"
        :class="{
          NextMonthDays: true,
          NextMonthFirstChild: indx === 0,
        }"
        :key="`${day.date}${getSelectedDay}`"
        :day="day"
        :is-today="day.date === getSelectedDay"
        :isStrictDay="day.price.opened == false"
        :selectDate="selectDate"
        :strictDate="StrictModeStartDate"
        :IsPrimaryChoosing="IsPrimaryChoosing"
        :HideDayCost="HideDayCost"
      />
    </ol>
  </div>
</template>

<script>
import consultant2023 from '../../static/consultant2023.json'
import consultant2024 from '../../static/consultant2024.json'

import Controls from "./Controls.vue";
import DaysHeader from "./DaysHeader.vue";
import DayItemReworked from "./DayItemReworked.vue";

import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'

import { findPricesByObjectID } from '../../api/price_calendar.js'

import { adminGetAllOrders } from '../../api/order.js'

dayjs.extend(weekday)
dayjs.extend(weekOfYear)

export default {
  name: 'Composition',
  props: {
    StartDay: {
      type: String,
      required: false,
    },

    SelectedDay: {
      type: Function,
      default: () => {},
    },

    DayDefaultPrice: {
      type: String,
      default: () => {
        return ''
      },
    },

    StrictModeStartDate: {
      type: String,
      default: () => {
        return ''
      },
    },

    UseRangeDateFixer: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    ChangeEndDate: {
      type: Function,
      default: () => {},
    },
    RangeFixerEndDate: {
      type: String,
      default: () => {
        return ''
      },
    },

    ViewObject: {
      type: Object,
      default: () => {
        return null
      },
    },
    IsPrimaryChoosing: {
      type: Boolean,
      default: () => {
        return false
      },
    },

    UseFreeDayFixer: {
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

    CalendarOfPricesForDays: {
      type: Boolean,
      default: () => {
        return false
      },
    },

    RoomsNeeded: {
      type: Number,
      default: () => {
        return 0
      },
    },

    getRoomsBlocked: {
      type: Function,
      default: () => {},
    },

    ordersArray: {
      type: Array,
      default: () => {
        return []
      },
    },
  },

  watch: {
    ordersArray(newValue, oldValue) {
      console.log(newValue)
      if (newValue !== null) {
        this.AllOrdersList = newValue
      }
    },
  },

  components: {Controls, DaysHeader, DayItemReworked},

  data() {
    return {
      selectedDate: null,
      showDate: null,
      DayPriceArray: [],
      AllOrdersList: [],
      startDateIsSricted: false,
      blockedAllNextMonth: false,
    }
  },

  async created() {
    if (this.StartDay == null) {
      this.selectedDate = dayjs()
      this.showDate = dayjs()
    } else {
      if (
        !this.IsPrimaryChoosing &&
        this.UseFreeDayFixer &&
        this.StartDay == '1990-01-01'
      ) {
        this.selectedDate = dayjs(this.StartDay)
        this.showDate = dayjs(this.StrictModeStartDate)
      } else {
        this.selectedDate = dayjs(this.StartDay)
        this.showDate = dayjs(this.StartDay)
      }
    }

    this.AllOrdersList = this.ordersArray

    // let AllOrders = await adminGetAllOrders()
    // this.AllOrdersList = AllOrders.data
  },

  computed: {
    getWeekendCalendar() {
      let weekendCalendar = []
      weekendCalendar =
        consultant2023?.holidays != null
          ? weekendCalendar.concat(consultant2023?.holidays)
          : weekendCalendar
      weekendCalendar =
        consultant2023?.holidays != null
          ? weekendCalendar.concat(consultant2023?.nowork)
          : weekendCalendar

      weekendCalendar =
        consultant2024?.holidays != null
          ? weekendCalendar.concat(consultant2024?.holidays)
          : weekendCalendar
      weekendCalendar =
        consultant2024?.holidays != null
          ? weekendCalendar.concat(consultant2024?.nowork)
          : weekendCalendar

      return weekendCalendar
    },

    async getViewObject() {
      if (this.ViewObject != null) {
        let a = await findPricesByObjectID(this.ViewObject.id)
        this.DayPriceArray = a.data.price_calendar
      }

      return this.ViewObject
    },

    days() {
      return [
        ...this.previousMonthDays,
        ...this.currentMonthDays,
        ...this.nextMonthDays,
      ]
    },

    CurrentMonthDays() {
      return [...this.currentMonthDays]
    },
    PrevMonthDays() {
      return [...this.previousMonthDays]
    },
    NextMonthDays() {
      return [...this.nextMonthDays]
    },

    today() {
      return dayjs().format('YYYY-MM-DD')
    },

    getSelectedDay() {
      return dayjs(this.selectedDate).format('YYYY-MM-DD')
    },

    month() {
      return Number(this.showDate.format('M'))
    },

    SelectedDateMonth() {
      return Number(dayjs(this.StrictModeStartDate).format('M'))
    },

    year() {
      return Number(this.showDate.format('YYYY'))
    },

    numberOfDaysInMonth() {
      return dayjs(this.showDate).daysInMonth()
    },

    currentMonthDays() {
      let ReadyDaysArray = []
      return [...Array(this.numberOfDaysInMonth)].map((day, index) => {
        let prevDayDate = null
        if (index != 0) {
          prevDayDate = `${this.year}-${this.month}-${index}`
        } else if (index == 0) {
          prevDayDate = -1
        }
        let Date = `${this.year}-${this.month}-${index + 1}`
        let PriceDate = this.getDayAttr(
          'cur',
          ReadyDaysArray,
          prevDayDate,
          Date,
          true
        )

        ReadyDaysArray.push({
          day: Date,
          price: PriceDate,
        })
        return {
          date: dayjs(Date).format('YYYY-MM-DD'),
          isCurrentMonth: true,
          price: PriceDate,
          obj_id: this.getViewObject.id,
        }
      })
    },

    previousMonthDays() {
      const firstDayOfTheMonthWeekday = this.getWeekday(
        this.currentMonthDays[0].date
      )
      const previousMonth = dayjs(`${this.year}-${this.month}-01`).subtract(
        1,
        'month'
      )
      // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
      const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
        ? firstDayOfTheMonthWeekday - 1
        : 6

      const previousMonthLastMondayDayOfMonth = dayjs(
        this.currentMonthDays[0].date
      )
        .subtract(visibleNumberOfDaysFromPreviousMonth, 'day')
        .date()

      let ReadyDaysArray = []
      return [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
        (day, index) => {
          let Date = `${previousMonth.year()}-${previousMonth.month() + 1}-${
            previousMonthLastMondayDayOfMonth + index
          }`
          let prevDayDate = null
          if (index != 0) {
            prevDayDate = `${this.year}-${this.month}-${index}`
          }
          let PriceDate = this.getDayAttr(
            'prev',
            ReadyDaysArray,
            prevDayDate,
            Date,
            false
          )
          ReadyDaysArray.push({
            day: Date,
            price: PriceDate,
          })
          return {
            date: dayjs(Date).format('YYYY-MM-DD'),
            isCurrentMonth: false,
            price: PriceDate,
            obj_id: this.getViewObject.id,
          }
        }
      )
    },

    nextMonthDays() {
      const lastDayOfTheMonthWeekday = this.getWeekday(
        `${this.year}-${this.month}-${this.currentMonthDays.length}`
      )

      const nextMonth = dayjs(`${this.year}-${this.month}-01`).add(1, 'month')

      const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
        ? 7 - lastDayOfTheMonthWeekday
        : lastDayOfTheMonthWeekday

      let ReadyDaysArray = []
      return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
        let Date = `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
        let prevDayDate = null
        if (index != 0) {
          prevDayDate = `${this.year}-${this.month}-${index}`
        } else if (index == 0) {
          prevDayDate = -1
        }
        let PriceDate = this.getDayAttr(
          'next',
          ReadyDaysArray,
          prevDayDate,
          Date,
          false
        )

        ReadyDaysArray.push({
          day: Date,
          price: PriceDate,
        })
        return {
          date: dayjs(Date).format('YYYY-MM-DD'),
          isCurrentMonth: false,
          price: PriceDate,
          obj_id: this.getViewObject.id,
        }
      })
    },
  },

  methods: {
    getWeekday(date) {
      return dayjs(date).weekday()
    },

    selectDate(newSelectedDate) {
      this.selectedDate = newSelectedDate
      this.showDate = newSelectedDate
      this.SelectedDay(newSelectedDate)

      if (!this.IsPrimaryChoosing && this.HideDayCost == false) {
        let haveBlockedRooms = []

        //Создаём комнаты
        for (let i = 0; i < this.ViewObject.equal_objects; i++) {
          haveBlockedRooms.push(0)
        }

        const endDate = dayjs(newSelectedDate).format('YYYY-MM-DD')
        for (let i of this.CurrentMonthDays) {
          if (
            this.isDateInRange(i.date, this.StrictModeStartDate, endDate, true)
          ) {
            for (let room = 0; room < i.price.rooms.length; room++) {
              if (i.date == this.StrictModeStartDate) {
                if (i.price.rooms[room].secondHalfOfDay == 'closed') {
                  haveBlockedRooms[room] += 1
                }
              } else if (i.date == endDate) {
                if (i.price.rooms[room].firstHalfOfDay == 'closed') {
                  haveBlockedRooms[room] += 1
                }
              } else {
                if (
                  i.price.rooms[room].firstHalfOfDay == 'closed' ||
                  i.price.rooms[room].secondHalfOfDay == 'closed'
                ) {
                  haveBlockedRooms[room] += 2
                }
              }
            }
          }
        }

        this.getRoomsBlocked(haveBlockedRooms)
      }

      if (this.UseRangeDateFixer) {
        this.ChangeEndDate('1990-01-01')
      }
    },

    changeShowDate(newShowDate) {
      this.showDate = newShowDate
    },

    getDayAttr(dayArrayName, ReadyDays, PrevDate, Date, currentMonth) {
      let temp = {
        price: 0,
        opened: true,

        roomsFirstHalfAvailable: 0,
        roomsSecondHalfAvailable: 0,

        rooms: [],
      }

      if (this.ViewObject == null) {
        return temp
      }

      //Создаём комнаты
      for (let i = 0; i < this.ViewObject.equal_objects; i++) {
        temp.rooms.push({
          hasOrder: false,
          orderID: null,

          firstHalfOfDay: 'open', //open, closed
          secondHalfOfDay: 'open', //open, closed
        })
      }

      //Если нам не нужно просчитывать цены и доступность дня
      if (this.HideDayCost && !this.CalendarOfPricesForDays) {
        temp.roomsFirstHalfAvailable = 999
        temp.roomsSecondHalfAvailable = 999
        return temp
      }

      //Задаём цену
      if (!this.CalendarOfPricesForDays) {
        //Цена по умолчанию
        temp.price = this.getTextFormatFromNumber(
          parseInt(this.ViewObject.day_cost)
        )

        //Цена в каледаре выходных
        let find_date_in_weekend_array = this.getWeekendCalendar.find(
          (_date) => {
            return this.removeLeadingZeros(_date) ===
              this.removeLeadingZeros(Date)
              ? true
              : false
          }
        )
        if (find_date_in_weekend_array != null) {
          temp.price = this.getTextFormatFromNumber(
            parseInt(this.ViewObject.day_cost_holiday)
          )
        }

        //Цена в каледаре цен
        let find_date_in_price_array = this.DayPriceArray.find((obj) => {
          return this.removeLeadingZeros(obj.date) ===
            this.removeLeadingZeros(Date)
            ? true
            : false
        })
        if (find_date_in_price_array != null) {
          temp.price = this.getTextFormatFromNumber(
            parseInt(find_date_in_price_array.price)
          )
        }
      } else {
        //Цена в каледаре цен
        let find_date_in_price_array = this.DayPriceArray.find((obj) => {
          return this.removeLeadingZeros(obj.date) ===
            this.removeLeadingZeros(Date)
            ? true
            : false
        })
        if (find_date_in_price_array != null) {
          temp.price = this.getTextFormatFromNumber(
            parseInt(find_date_in_price_array.price)
          )
        }
        temp.opened = true
        return temp
      }

      //Проверяем, входит ли данный день в заказ
      for (let order of this.AllOrdersList) {
        // if (order['status.name'] == 'Отклонено') {
        //   continue
        // }

        //Если дата входит в диапазон дат какого-то заказа
        if (
          this.isDateInRange(
            Date,
            order['arrival_date'],
            order['departure_date'],
            true
          )
        ) {
          // console.log(order)
          // console.log(order['object_room'])
          // console.log(temp.rooms)

          let thisRoom = temp.rooms[order['object_room'] - 1]

          if (thisRoom == null) {
            continue
          }

          thisRoom.orderID = order?.id
          thisRoom.hasOrder = true
          thisRoom.firstHalfOfDay = 'closed'
          thisRoom.secondHalfOfDay = 'closed'

          if (
            this.removeLeadingZeros(Date) ==
            this.removeLeadingZeros(order['arrival_date'])
          ) {
            thisRoom.firstHalfOfDay = 'open'
          }
          if (
            this.removeLeadingZeros(Date) ==
            this.removeLeadingZeros(order['departure_date'])
          ) {
            thisRoom.secondHalfOfDay = 'open'
          }
        }
      }

      //Получаем кол-во свободных комнат
      for (let i of temp.rooms) {
        if (i.firstHalfOfDay == 'open') {
          temp.roomsFirstHalfAvailable++
        }

        if (i.secondHalfOfDay == 'open') {
          temp.roomsSecondHalfAvailable++
        }
      }

      if (
        temp.roomsFirstHalfAvailable == 0 &&
        temp.roomsSecondHalfAvailable == 0
      ) {
        temp.opened = false

        return temp
      }

      let findPrevDate = ReadyDays.find(function (item, index, array) {
        return item.day == PrevDate ? true : false
      })

      if (
        this.DateAfterDate(
          this.removeLeadingZeros(Date),
          this.removeLeadingZeros(this.StrictModeStartDate)
        )
      ) {
        //Если текущая дата идёт после начальной (выбранной) даты
        if (this.UseFreeDayFixer == true) {
          if (
            (findPrevDate != null &&
              findPrevDate.price.roomsSecondHalfAvailable == 0) ||
            (findPrevDate != null &&
              findPrevDate.price.blockNextBlocks == true) ||
            (findPrevDate != null &&
              temp.roomsFirstHalfAvailable < this.RoomsNeeded)
          ) {
            //Если пред. дата заблокированна, блокируем эту
            temp.opened = false
            temp.blockNextBlocks = true
          }
        } else {
          if (
            temp.roomsSecondHalfAvailable == 0 ||
            temp.roomsSecondHalfAvailable < this.RoomsNeeded
          ) {
            temp.opened = false
          }
        }
      }

      return temp
    },

    getTextFormatFromNumber(Number) {
      return new Intl.NumberFormat('ru-RU').format(Number)
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

    isDateInRange(date, startDate, endDate, includeLastDay) {
      const dateObj = new Date(this.removeLeadingZeros(date))
      const startObj = new Date(this.removeLeadingZeros(startDate))
      const endObj = new Date(this.removeLeadingZeros(endDate))
      return includeLastDay == true
        ? dateObj >= startObj && dateObj <= endObj
        : dateObj >= startObj && dateObj < endObj
    },
    DateAfterDate(date, startDate) {
      const dateObj = new Date(date)
      const startObj = new Date(startDate)
      return dateObj > startObj
    },

    removeLeadingZeros(dateString) {
      if (dateString == null) {
        return null
      }

      const parts = dateString.split('-')
      const year = parseInt(parts[0], 10).toString()
      const month = parseInt(parts[1], 10).toString()
      const day = parseInt(parts[2], 10).toString()
      return year + '-' + month + '-' + day
    },
  },
}
</script>

<style scoped>
.days-grid > .NextMonthDays,
.days-grid > .PrevMonthDays {
  border-radius: 0;
}

.days-grid > .PrevMonthDays.PrevMonthLastChild {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
.days-grid > .NextMonthDays.NextMonthFirstChild {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.calendar-month {
  width: fit-content;
  height: fit-content;

  padding: 1rem;

  position: relative;
  background-color: white;

  border-radius: 0.5rem;
}

.day-of-week {
  color: var(--grey-800);
  font-size: 18px;
  background-color: #fff;
  padding-bottom: 5px;
  padding-top: 10px;
}

.day-of-week,
.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.day-of-week > * {
  text-align: center;
  padding-right: 5px;
}

.days-grid {
  height: 100%;
  position: relative;
  grid-column-gap: var(--grid-gap);
  grid-row-gap: var(--grid-gap);
  border-top: solid 1px var(--grey-200);
}
</style>

<style scoped>
@media (max-width: 480px) {
}
@media (min-width: 480px) and (max-width: 768px) {
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
