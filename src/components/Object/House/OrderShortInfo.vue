<template>
  <div class="RegistrationWindow noselect">
    <div class="Content">
      <div class="Header">
        <span class="Title">{{ getRightDate }}</span>
        <div class="ButtonClose" @click="handleCloseModal()"></div>
      </div>

      <span class="TerName">{{ getTerName }}</span>
      <span class="ObjectName">{{ getObjName }}</span>
      <div class="MiniInfo">
        <span class="PeopleCount">{{ getPeoplesName }}</span>
        <div class="PeoplesIcon"></div>
        <span class="DatesRange">{{ getRangeDate }}</span>
      </div>
      <span class="TotalPrice"> Итого: {{ getTotalPrice }} ₽</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    handleCloseModal: {
      type: Function,
      default: () => {
        return null
      },
    },
    orderShortData: {
      type: Object,
      default: () => {
        return null
      },
    },
  },

  name: 'OrderShortInfo',
  mounted() {},
  data() {
    return {}
  },
  created() {},
  methods: {
    loadImages(url) {
      return `background: url("${url}");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;`
    },

    getTextFormatFromNumber(Number) {
      return new Intl.NumberFormat('ru-RU').format(Number)
    },
  },
  computed: {
    getRightDate() {
      if (this.orderShortData == null) {
        return ''
      }

      let DateArray = this.orderShortData?.createdAt.split('T')[0].split('-')
      return `${DateArray[2]}.${DateArray[1]}.${DateArray[0]}`
    },
    getTerName() {
      if (this.orderShortData == null) {
        return ''
      }

      return this.orderShortData?.OriginalTerritory?.name
    },
    getObjName() {
      if (this.orderShortData == null) {
        return ''
      }

      let objID = this.orderShortData?.territoryObjectId

      let obj = this.orderShortData?.OriginalTerritory?.territory_objects.find(
        (obj) => parseInt(obj.id) === parseInt(objID)
      )

      return obj == null ? '' : obj.name
    },
    getPeoplesName() {
      if (this.orderShortData == null) {
        return ''
      }

      return this.orderShortData?.people_number
    },

    getRangeDate() {
      if (this.orderShortData == null) {
        return ''
      }

      let StartDateArray = this.orderShortData?.arrival_date.split('-')
      let EndDateArray = this.orderShortData?.departure_date.split('-')
      return `${StartDateArray[2]}.${StartDateArray[1]}.${StartDateArray[0]} - ${EndDateArray[2]}.${EndDateArray[1]}.${EndDateArray[0]}`
    },

    getTotalPrice() {
      if (this.orderShortData == null) {
        return ''
      }

      return this.getTextFormatFromNumber(this.orderShortData?.total_price)
    },
  },
}
</script>

<style scoped>
.TotalPrice {
  position: relative;
  display: block;

  width: fit-content;
  height: fit-content;

  color: rgb(0, 0, 0);
  font-family: 'Montserrat';
  font-size: 18px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
}
.MiniInfo > * {
  margin-top: auto;
  margin-bottom: auto;
}
.MiniInfo {
  position: relative;
  display: flex;

  width: 100%;

  margin-bottom: 18px;

  flex-direction: row;
  justify-content: flex-start;
}
.MiniInfo > .PeopleCount {
  position: relative;
  display: block;

  width: fit-content;
  height: fit-content;

  margin-right: 2px;

  color: rgb(0, 0, 0);
  font-family: 'Montserrat';
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0px;
  text-align: left;
}
.MiniInfo > .PeoplesIcon {
  position: relative;
  display: block;

  margin-right: 14px;

  width: 14px;
  height: 16px;

  background: url('../../../assets/icons/booking_assets/reserve_human.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.MiniInfo > .DatesRange {
  color: rgb(0, 0, 0);
  font-family: 'Montserrat';
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0px;
  text-align: left;
}

.ObjectName {
  position: relative;
  display: block;

  width: calc(100% - 26px);
  height: fit-content;

  margin-bottom: 6px;

  color: rgb(0, 0, 0);
  font-family: 'Montserrat';
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 0px;
  text-align: left;
}
.TerName {
  position: relative;
  display: block;

  width: calc(100% - 26px);
  height: fit-content;

  margin-bottom: 4px;

  color: rgb(0, 0, 0);
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0px;
  text-align: left;
}
.ColouredText {
  color: rgb(0, 189, 197);
  font-family: 'Montserrat';
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: 0px;
  text-align: left;
}
.AgreeWithRules {
  position: relative;

  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 8px;
}
.AgreeWithRules > span {
  position: relative;

  width: 300px;

  color: rgb(0, 0, 0);
  font-family: 'Montserrat';
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0px;
  text-align: left;
}
.AgreeWithRules > * {
  margin-top: auto;
  margin-bottom: auto;
}

.SelectAppForContact {
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 20px;
}

.RegistrationWindow > .BGImages {
  position: absolute;
  display: block;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  z-index: 1;
}
.RegistrationWindow > .BGImages > * {
  position: absolute;
  display: block;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
}

.ButtonClose {
  position: relative;
  cursor: pointer;

  width: 26px;
  height: 26px;

  background: url('../../../assets/icons/org/menu/CloseModalButton.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto;

  z-index: 5;
}

.RegistrationWindow {
  position: relative;

  padding: 30px 18px;

  min-width: 300px;
  height: 100%;

  background-color: white;

  border-radius: 15px;
}
.RegistrationWindow > .Content {
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  z-index: 10;
}

.RegistrationWindow > .Content > .Header > * {
  margin-top: auto;
  margin-bottom: auto;
}
.RegistrationWindow > .Content > .Header {
  position: relative;
  display: flex;

  margin-bottom: 18px;

  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  height: fit-content;
}
.RegistrationWindow > .Content > .Header > .Title {
  position: relative;

  display: block;

  width: fit-content;
  height: fit-content;

  color: rgb(0, 0, 0);
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0px;
  text-align: left;
}

.RegistrationWindow > .Content > .ContentListWrapper {
  position: relative;

  width: 100%;
  height: 536px;

  overflow: hidden;
}

.RegistrationWindow > .Content > .ContentListWrapper > .ContentList {
  position: relative;

  width: 100%;
  height: 100%;

  padding: 20px 0%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 60px;

  overflow: auto;
}
.ContentListWrapper > .ContentList > .ComfortBlock {
  position: relative;

  width: auto;
  height: fit-content;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 18px;
}
.ContentListWrapper > .ContentList > .ComfortBlock > .Head {
  position: relative;

  width: fit-content;
  height: fit-content;

  margin-left: 5px;

  color: rgb(0, 0, 0);
  font-family: 'Montserrat';
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0px;
  text-align: left;
}

.ContentListWrapper > .ContentList > .ComfortBlock > .Items {
  position: relative;

  width: auto;
  height: fit-content;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 14px;
}
.ContentList > .ComfortBlock > .Items > .Item > * {
  margin-top: auto;
  margin-bottom: auto;
}
.ContentList > .ComfortBlock > .Items > .Item {
  position: relative;

  width: fit-content;
  height: fit-content;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 8px;
}
.ComfortBlock > .Items > .Item > .Text {
  position: relative;
  display: block;

  width: fit-content;
  height: fit-content;

  color: rgb(0, 0, 0);
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0px;
  text-align: left;
}
.ComfortBlock > .Items > .Item > .ItemIMG {
  position: relative;
  display: block;

  width: 24px;
  height: 24px;
}
</style>
