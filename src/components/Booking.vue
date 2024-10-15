<template>
  <div class="AboutObjectWrapper">
    <div class="AboutObject" v-if="!loading">
      <div class="Block B1Content">
        <div class="Column ColumnRight">
          <div class="PriceBlock">
            <dropdown-menu
                direction="center"
                :overlay="false"
                overlayZIndex="3000"
            >
              <template #trigger>
                <div class="ChooseObject noselect">
                  <span>{{ getObjectName }}</span>
                  <span class="ChangeButton">Изменить</span>
<!--                  <span>Выбрать номер</span>-->
<!--                  <img-->
<!--                      src="../assets/icons/object/house/DropDownIcon1.svg"-->
<!--                      alt=""-->
<!--                  />-->
                </div>
              </template>
              <template #body>
                <div class="ObjectList">
                  <div
                      class="Object"
                      v-for="(obj, indx) in TerritoryHeadData.territory_objects"
                      :key="`${indx}${obj.id}${ObjectSelected?.id}`"
                  >
                    <span class="ObjectTitle"
                    >{{ obj.name }}</span
                    >
                    <div class="ObjectRightBlock">
                      <span class="ORBPrice">
                        {{ getTextFormatFromNumber(obj.day_cost) }} руб./сутки
                      </span>
                      <span class="ORBSelect noselect" @click="ObjectSelected = obj;
                      getPricesArray()
                          Calculator.peoples =
                            Calculator.peoples > ObjectSelected.bed_max
                              ? ObjectSelected.bed_max
                              : Calculator.peoples
                        "
                      >{{
                          ObjectSelected != null && ObjectSelected?.id == obj.id
                              ? 'Выбрано'
                              : 'Выбрать'
                        }}</span
                      >
                    </div>
                  </div>
                </div>
              </template>
            </dropdown-menu>

            <Preloader v-if="!ordersLoaded" />
            <div v-else class="PriceForm">
              <div class="FormLine">
                  <div class="Column">
                    <span class="CHeader">Заезд</span>
                    <div
                        class="DDTriggerButton CLine noselect"
                        @click="toggleDropdown('Menu1', 'CDatepickerSDD')"
                    >
                      <span> {{ Calculator.startDateText }}</span>
                      <img
                          src="../assets/icons/object/house/DropDownIcon1.svg"
                          alt=""
                      />
                    </div>
                    <!-- DropdownMenu -->
                    <div
                        id="CDatepickerSDD"
                        class="CalcDropdown"
                        v-show="DropdownsShow.Menu1 == true"
                    >
                      <Composition
                          :key="`${Calculator.initialDatePickerDate}${Calculator.endDate}${Calculator.initialDatePickerStrictedDate}${getNeededRooms}${OrdersArray}`"
                          :SelectedDay="getDateFromStartDatepicker"
                          :StartDay="Calculator.initialDatePickerDate"
                          :UseRangeDateFixer="true"
                          :ChangeEndDate="changeEndDate"
                          :RangeFixerEndDate="Calculator.endDate"
                          :StrictModeStartDate="
                        Calculator.initialDatePickerStrictedDate
                      "
                          :ViewObject="ObjectSelected"
                          :IsPrimaryChoosing="true"
                          :RoomsNeeded="getNeededRooms"
                          :ordersArray="OrdersArray"
                      />
                    </div>
                  </div>
                  <div class="Column">
                    <span class="CHeader">Выезд</span>
                    <div
                        class="DDTriggerButton CLine noselect"
                        @click="toggleDropdown('Menu2', 'CDatepickerEDD')"
                    >
                      <span> {{ Calculator.endDateText }}</span>
                      <img
                          src="../assets/icons/object/house/DropDownIcon1.svg"
                          alt=""
                      />
                    </div>
                    <!-- DropdownMenu -->
                    <div
                        id="CDatepickerEDD"
                        class="CalcDropdown"
                        v-show="DropdownsShow.Menu2 == true"
                    >
                      <Composition
                          :key="`${Calculator.endDate}${Calculator.StrictModeStartDate}${Calculator.endDateText}${getNeededRooms}${OrdersArray}`"
                          :SelectedDay="getDateFromEndDatepicker"
                          :StartDay="Calculator.endDate"
                          :StrictModeStartDate="Calculator.startDate"
                          :ViewObject="ObjectSelected"
                          :UseFreeDayFixer="true"
                          :RoomsNeeded="getNeededRooms"
                          :getRoomsBlocked="setRoomsBlocked"
                          :ordersArray="OrdersArray"
                      />
                    </div>
                  </div>
                </div>
              <div class="FormLine">
                  <span class="HeadTitle">Количество человек</span>
                  <div class="Line">
                    <span class="PeopleCounter"> {{ Calculator.peoples }} </span>
                    <div class="CalcButtons">
                      <div
                          class="Button BMinus"
                          :style="`${
                        Calculator.peoples == 1 ? 'opacity: 0.3;' : ''
                      }`"
                          @click="PeopleMinus"
                      ></div>
                      <div
                          class="Button BPlus"
                          :style="`${
                        Calculator.peoples ==
                        ObjectSelected.bed_max * ObjectSelected.equal_objects
                          ? 'opacity: 0.3;'
                          : ''
                      }`"
                          @click="PeoplePlus"
                      ></div>
                    </div>
                  </div>
                </div>
            </div>

            <div class="AdditonalService noselect" style="display: none">
              <div class="PlusButton"></div>
              <span>Дополнительные услуги</span>
            </div>

            <div class="TextUnderButton">
              <span>Пока вы ни за что не платите </span>
            </div>

            <DefaultButton
                class="ReserveButton"
                ButtonText="Забронировать"
                :isActive="Calculator.endDate != '1990-01-01'"
                :SendCallback="openSendModalHandle"
                :UseAnimationIfNotActive="false"
            />

            <div class="PriceBlockFooter">
              <span class="PriceFormula" :key="ObjectSelected.id"
              >{{ getTextFormatFromNumber(ObjectSelected.day_cost) }}₽ х
                {{ getNightsFromSelectedDates }}
                {{ RightTextForNights(getNightsFromSelectedDates) }}</span
              >
              <span class="PriceResult">{{ getFullPrice }}₽</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body" v-if="ShowRequestModal">
      <ModalWindow
          style="z-index: 990"
          :handleCloseModal="closeSendModalHandle"
          :key="RequestUpdater"
      >
        <template v-slot:ModalContent>
          <SendBookingRequestModal
              :handleCloseModal="closeSendModalHandle"
              :CalculatorData="RequestModalData"
          />
        </template>
      </ModalWindow>
    </Teleport>

    <Teleport to="body" v-if="ShowComfortsModal">
      <ModalWindow :handleCloseModal="closeComfortsModalHandle">
        <template v-slot:ModalContent>
          <ComfortsListModal
              :handleCloseModal="closeComfortsModalHandle"
              :comfortsListData="TerritoryHeadData.comforts"
          />
        </template>
      </ModalWindow>
    </Teleport>
  </div>
</template>

<script>
import DropdownMenu from 'v-dropdown-menu'
import dayjs from 'dayjs'

import {findPricesByObjectID} from '../api/price_calendar.js'

import {getObjectOrdersOptimized} from '../api/order.js'

import Teleport from 'vue2-teleport'

import ModalWindow from "./ModalWindow.vue";

import Composition from "./Calendar/Composition.vue";
import DefaultButton from "./Buttons/DefaultButton.vue";
import SendBookingRequestModal from "./Object/House/SendBookingRequestModal.vue";
import ComfortsListModal from "./Object/House/ComfortsListModal.vue";

import Preloader from "./Preloader.vue";

export default {
  name: 'Booking',
  props: {
    TerritoryHeadData: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  watch: {
    TerritoryHeadData(newValue, oldValue) {
      if (newValue !== null) this.loading = false
      this.TerritoryHeadDatas = newValue
    },
    loading(newValue, oldValue) {
      if (newValue === false) {
        this.ObjectSelected = this.TerritoryHeadData.territory_objects[0]
        this.getPricesArray()
      }
    },
  },
  components: {ModalWindow, DropdownMenu, Teleport, Composition, DefaultButton, SendBookingRequestModal, ComfortsListModal, Preloader},
  data() {
    return {
      loading: true,
      ordersLoaded: false,
      Calculator: {
        initialDatePickerStrictedDate: '',
        initialDatePickerDate: '',
        initialDatePickerDayNext: '',

        startDate: '',
        startDateText: '',
        endDate: '',
        endDateText: '',
        peoples: 1,

        pricePerNight: 6900,
        maxPeoples: 8,

        roomsBlocked: [],
      },

      DropdownsShow: {
        Menu1: false,
        Menu2: false,
      },
      DropdownsEl: {
        Menu1: null,
        Menu2: null,
      },

      DatePickerStart: null,

      DatepickerPriceArray: [
        {
          date: '2023-8-26',
          price: '10 200',
          opened: true,
        },
        {
          date: '2023-8-13',
          price: '10 600',
          opened: true,
        },
        {
          date: '2023-8-01',
          price: '14 800',
          opened: true,
        },
        {
          date: '2023-8-11',
          price: '19 500',
          opened: true,
        },
        {
          date: '2023-8-16',
          price: '8 200',
          opened: true,
        },
        {
          date: '2023-8-18',
          price: '8 200',
          opened: false,
        },
        {
          date: '2023-8-22',
          price: '8 200',
          opened: false,
        },
      ],
      DatepickerDefaultPrice: '10 000',

      ShowRequestModal: false,
      RequestModalData: {
        arrival_date: '',
        departure_date: '',
        total_price: '',
        extra_bed_price: '',
        day_price: '',
        holiday_price: '',
        territoryObjectId: '',
        people_number: 0,
      },
      RequestUpdater: 0,

      ShowComfortsModal: false,

      ObjectSelected: null,

      priceArray: [],

      OrdersArray: [],
    }
  },
  created() {
    let options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      timezone: 'UTC',
    }
    let DateNowText = new Date().toLocaleString('ru', options)
    let nextDay = new Date(
        new Date().getTime() + 24 * 60 * 60 * 1000
    ).toLocaleString('ru', options)
    let prevDay = new Date(
        new Date().getTime() - 24 * 60 * 60 * 1000
    ).toLocaleString('ru', options)

    this.Calculator.initialDatePickerStrictedDate = prevDay.split('.').reverse()
    this.Calculator.initialDatePickerStrictedDate =
        this.Calculator.initialDatePickerStrictedDate.join('-')

    this.Calculator.initialDatePickerDate = DateNowText.split('.').reverse()
    this.Calculator.initialDatePickerDate =
        this.Calculator.initialDatePickerDate.join('-')

    this.Calculator.initialDatePickerDayNext = nextDay.split('.').reverse()
    this.Calculator.initialDatePickerDayNext =
        this.Calculator.initialDatePickerDayNext.join('-')

    this.Calculator.startDateText = DateNowText
    this.Calculator.endDateText = 'Выберите дату'

    this.Calculator.startDate = dayjs(
        this.Calculator.initialDatePickerDate
    ).format('YYYY-MM-DD')
    this.Calculator.endDate = dayjs('1990-1-1').format('YYYY-MM-DD')

    this.Calculator.initialDatePickerStrictedDate = dayjs(
        this.Calculator.initialDatePickerStrictedDate
    ).format('YYYY-MM-DD')
  },
  computed: {
    getFullAdress() {
      if (this.TerritoryHeadData !== null) {
        return `${this.TerritoryHeadData.address_city}`
      }
    },

    datesInRange() {
      if (this.Calculator.endDate != '1990-01-01') {
        const startDate = dayjs(this.Calculator.startDate)
        const endDate = dayjs(this.Calculator.endDate)

        // Создание массива дат
        const datesArray = []
        let currentDate = startDate

        while (currentDate.isBefore(endDate)) {
          datesArray.push(currentDate.format('YYYY-MM-DD'))
          currentDate = currentDate.add(1, 'day')
        }
        return datesArray
      } else {
        return [this.Calculator.startDate]
      }
    },

    getNightsFromSelectedDates() {
      return this.datesInRange.length
    },
    getFullPrice() {
      if (this.Calculator.endDateText == 'Выберите дату') {
        return new Intl.NumberFormat('ru-RU').format(
            this.ObjectSelected.day_cost
        )
      }

      return new Intl.NumberFormat('ru-RU').format(
          this.getTotalPrice(this.Calculator.peoples)
      )
    },
    getFullPriceNumber() {
      return this.getTotalPrice(this.Calculator.peoples)
    },

    getLimitedComfortsList() {
      if (this.TerritoryHeadData.comforts.length > 6) {
        let temp = []
        for (let i = 0; i < this.TerritoryHeadData.comforts.length; i++) {
          if (i <= 5) {
            temp.push(this.TerritoryHeadData.comforts[i])
          }
        }
        return temp
      } else {
        return this.TerritoryHeadData.comforts
      }
    },

    getNeededRooms() {
      let neededRooms = Math.ceil(
          this.Calculator.peoples / this.ObjectSelected.bed_max
      )

      if (
          this.Calculator.roomsBlocked.filter((num) => num === 0).length <
          neededRooms
      ) {
        this.Calculator.endDateText = 'Выберите дату'
        this.Calculator.endDate = dayjs('1990-1-1').format('YYYY-MM-DD')
      }

      return neededRooms
    },

    getObjectName() {
      let a = this.TerritoryHeadData.territory_objects.find(
          (x) => x.id === this.ObjectSelected.id
      )

      if (a) {
        return a.name
      }

      return ''
    },
  },
  methods: {
    async getPricesArray() {
      let _resp = await findPricesByObjectID(this.ObjectSelected.id)
      this.priceArray = _resp.data.price_calendar

      await this.getObjectOrders()
    },

    async getObjectOrders() {
      let _ord = await getObjectOrdersOptimized(this.ObjectSelected.id)
      this.OrdersArray = _ord.data;

      this.ordersLoaded = true;
    },

    PeopleMinus() {
      if (this.Calculator.peoples > 1) {
        this.Calculator.peoples -= 1
      }
    },
    PeoplePlus() {
      if (
          this.Calculator.peoples <
          this.ObjectSelected.bed_max * this.ObjectSelected.equal_objects
      ) {
        this.Calculator.peoples += 1
      }
    },

    toggleDropdown(DropdownName, DropdownID) {
      let showDD = !this.DropdownsShow[DropdownName]

      let self = this

      let listener = function (event) {
        event.stopPropagation()
      }
      let listener2 = function (event) {
        if (
            !event.target.matches('.DDTriggerButton') &&
            !event.target.parentElement.matches('.DDTriggerButton')
        ) {
          window.removeEventListener('click', listener2)

          document
              .getElementById(DropdownID)
              .removeEventListener('click', listener)

          self.DropdownsShow[DropdownName] = false
        }
      }

      if (showDD) {
        this.DropdownsShow[DropdownName] = showDD

        for (let MenuName in this.DropdownsShow) {
          if (MenuName != DropdownName) {
            if (this.DropdownsShow[MenuName] == true) {
              this.DropdownsShow[MenuName] = false

              window.removeEventListener('click', listener2)
              document
                  .getElementById(DropdownID)
                  .removeEventListener('click', listener)
            }
          }
        }

        window.addEventListener('click', listener2)
        document.getElementById(DropdownID).addEventListener('click', listener)
      } else {
        window.removeEventListener('click', listener2)

        document
            .getElementById(DropdownID)
            .removeEventListener('click', listener)

        self.DropdownsShow[DropdownName] = false
      }
    },

    getDateFromStartDatepicker(DateReversed) {
      let options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC',
      }

      let DateStart = new Date(DateReversed).toLocaleString('ru', options)

      this.Calculator.startDateText = DateStart
      this.Calculator.startDate = dayjs(DateReversed).format('YYYY-MM-DD')

      this.toggleDropdown('Menu1', 'CDatepickerSDD')
    },

    getDateFromEndDatepicker(DateReversed) {
      let options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC',
      }

      let DateEnd = new Date(DateReversed).toLocaleString('ru', options)

      this.Calculator.endDateText = DateEnd
      this.Calculator.endDate = dayjs(DateReversed).format('YYYY-MM-DD')

      this.toggleDropdown('Menu2', 'CDatepickerEDD')
    },

    changeEndDate(newEndDate) {
      let options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC',
      }

      this.Calculator.endDateText = 'Выберите дату'
      this.Calculator.endDate = dayjs('1990-1-1').format('YYYY-MM-DD')
    },

    getTextFormatFromNumber(Number) {
      return new Intl.NumberFormat('ru-RU').format(Number)
    },

    openSendModalHandle() {
      let a = {
        arrival_date: this.Calculator.startDate,
        departure_date: this.Calculator.endDate,
        total_price: this.getFullPriceNumber,
        extra_bed_price: this.ObjectSelected.additional_person_cost,
        day_price: this.ObjectSelected.day_cost,
        holiday_price: this.getFullPriceNumber,
        territoryObjectId: this.ObjectSelected.id,
        people_number: this.Calculator.peoples,
        object_room: 1,
        ordersList: [],
        amo_obj_id: this.ObjectSelected.amo_obj_id,
      }

      let total_price = this.getFullPriceNumber
      let one_price_piece = Math.ceil(total_price / this.getNeededRooms)
      let usedRoomsIndexes = []
      let peoples = this.Calculator.peoples
      for (let i = 0; i < this.getNeededRooms; i++) {
        let peoples_count_for_order = 0
        if (peoples > this.ObjectSelected.bed_max) {
          peoples -= this.ObjectSelected.bed_max
          peoples_count_for_order = this.ObjectSelected.bed_max
        } else {
          peoples_count_for_order = peoples
        }

        let room_num = 0
        for (let j = 0; j < this.Calculator.roomsBlocked.length; j++) {
          if (
              this.Calculator.roomsBlocked[j] == 0 &&
              !usedRoomsIndexes.includes(j)
          ) {
            room_num = j + 1
            usedRoomsIndexes.push(j)
            break
          }
        }

        let _price_for_order = 0
        if (i == this.getNeededRooms - 1) {
          _price_for_order = total_price
        } else {
          _price_for_order = one_price_piece
          total_price -= one_price_piece
        }

        let temp = {
          people_count: peoples_count_for_order,
          price: _price_for_order,
          room: room_num,
          amo_obj_id: this.ObjectSelected.amo_obj_id,
        }
        a.ordersList.push(temp)
      }

      this.RequestModalData = a
      this.RequestUpdater++

      this.ShowRequestModal = true
    },

    closeSendModalHandle() {
      this.ShowRequestModal = false
    },

    closeComfortsModalHandle() {
      this.ShowComfortsModal = false
    },

    getTotalPrice(Peoples) {
      let totalPrice = 0

      for (let Date of this.datesInRange) {
        let dayOfWeek = dayjs(Date).day()
        let isWeekend = dayOfWeek == 6 || dayOfWeek == 5 ? true : false

        let bed_max = this.ObjectSelected.bed_max

        let priceToday = isWeekend
            ? this.ObjectSelected.day_cost_holiday
            : this.ObjectSelected.day_cost

        let peoplesMaxToday = isWeekend
            ? this.ObjectSelected.people_max_holiday
            : this.ObjectSelected.people_max

        let addCostToday = isWeekend
            ? this.ObjectSelected.additional_person_cost_holiday
            : this.ObjectSelected.additional_person_cost

        let find_date_in_price_array = this.priceArray.find((obj) => {
          return obj.date === Date ? true : false
        })

        if (find_date_in_price_array != null) {
          priceToday = parseInt(find_date_in_price_array.price)
        }

        let a = (Peoples % bed_max) - peoplesMaxToday
        console.log(`a = ${a}`)

        let b = a < 0 ? 0 : a
        console.log(`b = ${b}`)

        let c = b * addCostToday + priceToday
        console.log(`c = ${c}`)

        let d =
            Peoples == bed_max ? (Peoples - peoplesMaxToday) * addCostToday : 0
        console.log(`d = ${d}`)

        let result =
            (Math.ceil(Peoples / bed_max) - 1) *
            (priceToday + (bed_max - peoplesMaxToday) * addCostToday) +
            c +
            d
        console.log(`result = ${result}`)

        totalPrice += result
      }

      return totalPrice
    },

    RightTextForNights(NightCounter) {
      if (NightCounter % 10 === 1 && NightCounter % 100 !== 11) {
        return 'ночь'
      } else if (
          NightCounter % 10 > 1 &&
          NightCounter % 10 < 5 &&
          (NightCounter % 100 < 10 || NightCounter % 100 > 20)
      ) {
        return 'ночи'
      } else {
        return 'ночей'
      }
    },

    setRoomsBlocked(arr) {
      this.Calculator.roomsBlocked = arr
    },
  },
}
</script>