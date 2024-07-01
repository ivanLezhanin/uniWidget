<template>
  <div class="AboutWrapper">
    <div class="About">
      <div class="Rules">
        <span>Общие правила</span>
        <div class="ItemsList">
          <div class="Column">
            <div class="Row">
              <span>Заезд</span>
              <span class="BoldText">После {{ getArrivalTime }}</span>

              <img
                class="MobileForest"
                loading="lazy"
                src="../../../../static/MobileForestBlock.png"
                alt=""
              />
            </div>

            <div class="Row">
              <span>Отъезд</span>
              <span class="BoldText">До {{ getDepartureTime }}</span>
            </div>
          </div>
          <div class="Column">
            <div class="ExtraText ExtraBGColor">
              <span class="Header"
                >Возврат полной стоимости бронирования возможен не менее чем за
                14 дней до даты заезда и за вычетом комиссии банка.
              </span>
              <span
                >В иных случаях отмены бронирования и возврата денежных средств
                каждый случай рассматривается индивидуально.</span
              >
            </div>
          </div>
          <div class="Column">
            <div class="ExtraText">
              <span class="Header">Ваши деньги в безопасности</span>
              <span
                >Оплачивая полную стоимость проживания на нашем сайте, вы можете
                быть уверены в безопасности расчетов. Ваши деньги фиксируются на
                специальном счете в банке и выплачиваются хозяину жилья только
                после вашего выезда.</span
              >
            </div>
            <div class="ExtraBG"></div>
          </div>
        </div>
      </div>

      <div class="PlaceOnMap">
        <div class="Header">
          <span>Место на карте</span>
          <div class="MapPlace">
            <img
              src="../../../assets/AboutObject/Icons/PlaceOnMap.svg"
              alt=""
            />
            <span>{{ getFullAdress }}</span>
          </div>

          <div class="MapHeaderBG"></div>
        </div>

        <div
          class="MapContainer"
          v-if="
            TerritoryAboutData.address_link_yamaps != null &&
            TerritoryAboutData.address_link_yamaps != '' &&
            TerritoryAboutData.address_link_yamaps != '#'
          "
        >
          <iframe
            :src="TerritoryAboutData.address_link_yamaps"
            class="responsive-iframe"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>

          <div class="MapBG"></div>
        </div>

        <div class="CloudBG"></div>
      </div>

      <!-- <div class="CommentSlider">
        <span class="Header">Отзывы</span>
        <CommentSlider :inputCommentsArray="commentsArray" />
      </div> -->

      <!-- <div class="Experience">
        <span class="Header">Впечатления рядом</span>
        <span class="Desc">Спрашивайте у администратора</span>
        <div class="List">
          <div class="ExpCard">
            <div class="CardIMG"></div>
            <span class="Title">Квадроциклы</span>
            <span class="Desc"
              >Арендуйте квадроцикл и вы получите мощную перезагрузку,
              отключитесь от суеты будних дней, получите заряд энергии и порцию
              адреналина. Такой вид отдыха запомниться вам надолго.</span
            >
            <span class="Price">от 2 500 руб.</span>
            <div class="Info">Подробнее</div>
          </div>
          <div class="ExpCard">
            <div class="CardIMG"></div>
            <span class="Title">Квадроциклы</span>
            <span class="Desc"
              >Арендуйте квадроцикл и вы получите мощную перезагрузку,
              отключитесь от суеты будних дней, получите заряд энергии и порцию
              адреналина. Такой вид отдыха запомниться вам надолго.</span
            >
            <span class="Price">от 2 500 руб.</span>
            <div class="Info">Подробнее</div>
          </div>
          <div class="ExpCard">
            <div class="CardIMG"></div>
            <span class="Title">Квадроциклы</span>
            <span class="Desc"
              >Арендуйте квадроцикл и вы получите мощную перезагрузку,
              отключитесь от суеты будних дней, получите заряд энергии и порцию
              адреналина. Такой вид отдыха запомниться вам надолго.</span
            >
            <span class="Price">от 2 500 руб.</span>
            <div class="Info">Подробнее</div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  props: {
    TerritoryAboutData: Object,
  },
  components: {},
  data() {
    return {
      commentsArray: [
        {
          avatarURL:
            'https://android-obzor.com/wp-content/uploads/2022/02/1-4.jpg',

          name: 'Константин',
          comm: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
        },
        {
          avatarURL:
            'https://cs12.pikabu.ru/post_img/big/2022/11/08/10/1667929102152124336.jpg',
          name: 'Ирина',
          comm: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. ',
        },
        {
          avatarURL:
            'https://android-obzor.com/wp-content/uploads/2022/02/7-4.jpg',
          name: 'Иван',
          comm: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.  Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
        },
        {
          avatarURL:
            'https://android-obzor.com/wp-content/uploads/2022/02/15-4.jpg',
          name: 'Александр',
          comm: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
        },
      ],
    }
  },
  computed: {
    getFullAdress() {
      if (this.TerritoryAboutData != null) {
        return `${this.TerritoryAboutData.address_city}, ул. ${this.TerritoryAboutData.address_street} ${this.TerritoryAboutData.address_house}`
      }
    },

    getRules() {
      if (this.TerritoryAboutData != null) {
        return `${this.TerritoryAboutData.rules}`
      }
    },

    getArrivalTime() {
      if (this.TerritoryAboutData != null) {
        return `${this.TerritoryAboutData.arrival_time}`
      }
    },

    getDepartureTime() {
      if (this.TerritoryAboutData != null) {
        return `${this.TerritoryAboutData.departure_time}`
      }
    },
  },
}
</script>

<style scoped>
.MobileForest {
  display: none;
}

.AboutWrapper {
  position: relative;
  display: flex;

  width: 100%;
  height: fit-content;
}
.About {
  position: relative;

  display: flex;
  flex-direction: column;

  margin: 0% auto 128px auto;

  width: 1136px;
}

.Rules {
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  margin-bottom: 128px;

  width: 100%;
  height: fit-content;
}
.Rules > span {
  position: relative;

  margin-bottom: 32px;

  color: rgb(0, 0, 0);
  font-family: 'Montserrat';
  font-size: 38px;
  font-weight: 700;
  letter-spacing: 0px;
  text-align: left;
}
.Rules > .ItemsList {
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: left;

  width: 100%;
  height: fit-content;

  gap: 20px;

  width: 100%;
  height: fit-content;
}

.Rules > .ItemsList > .Column {
  position: relative;

  display: flex;
  flex-direction: column;

  gap: 14px;

  height: fit-content;
}

.Rules > .ItemsList > .Column:nth-child(1) {
  width: fit-content;
  flex-shrink: 0;
}
.Rules > .ItemsList > .Column:nth-child(2) {
  width: 36%;
  flex-shrink: 0;
}
.Rules > .ItemsList > .Column:nth-child(3) {
  width: 100%;
}

.Rules > .ItemsList > .Column > .Row {
  position: relative;

  padding: 28px 20px;

  display: flex;
  flex-direction: row;

  background: rgb(0, 189, 197);
  border-radius: 15px;
}
.Rules > .ItemsList > .Column > .Row > span:nth-child(1) {
  position: relative;

  width: 100px;
}

.Rules > .ItemsList > .Column > .Row > span {
  color: rgb(255, 255, 255);
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0px;
}
.Rules > .ItemsList > .Column > .Row > span.BoldText {
  font-size: 18px;
  font-weight: 700;
}

.Rules > .ItemsList > .Column > .ExtraText {
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 28px 20px;

  background: rgb(0, 162, 182);
  border-radius: 15px;

  z-index: 2;
}
.Rules > .ItemsList > .Column > .ExtraText.ExtraBGColor {
  gap: 16px;
  background: rgb(0, 102, 147);
}

.Rules > .ItemsList > .Column > .ExtraText > span {
  color: rgb(255, 255, 255);
  font-family: 'Montserrat';
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0px;
  text-align: left;
}
.Rules > .ItemsList > .Column > .ExtraText > span.Header {
  font-size: 16px;
  font-weight: 700;
}

.Rules > .ItemsList > .Column > .ExtraBG {
  position: absolute;
  display: block;

  width: 100%;
  height: 100%;
  top: -90px;

  background: url('../../../assets/AboutObject/Icons/Forest1.svg'),
    url('../../../assets/AboutObject/Icons/Forest2.svg');

  background-repeat: no-repeat;
  background-size: 176px 102px, 125px 103px;
  background-position: calc(100% - 105px) 15px, calc(100% - 21px) 10px;

  z-index: 1;
}

.PlaceOnMap {
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  margin-bottom: 128px;

  width: 100%;
}

.PlaceOnMap > .Header {
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  margin-bottom: 32px;

  width: fit-content;

  z-index: 10;
}

.PlaceOnMap > .Header > span {
  position: relative;

  color: rgb(0, 0, 0);
  font-family: 'Montserrat';
  font-size: 38px;
  font-weight: 700;
  letter-spacing: 0px;
  text-align: left;

  margin-bottom: 8px;
}

.PlaceOnMap > .Header > .MapPlace {
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.PlaceOnMap > .Header > .MapPlace > * {
  margin-top: auto;
  margin-bottom: auto;
}
.PlaceOnMap > .Header > .MapPlace > img {
  width: fit-content;
  margin-right: 4px;
}
.PlaceOnMap > .Header > .MapPlace > span {
  color: rgb(0, 0, 0);
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0px;
  text-align: left;
}

.MapContainer {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */

  margin-bottom: 160px;
}
.MapContainer > .responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;

  z-index: 2;
}

.MapContainer > .MapBG {
  position: absolute;

  width: 100%;
  height: 100%;

  bottom: 34px;

  background: url('../../../assets/AboutObject/MapBG.svg');
  background-position: 50% 100%;
  background-size: 94%;
  background-repeat: no-repeat;
  transform: scale(1, 1.2);

  z-index: 0;
}

.CloudBG {
  position: absolute;

  width: 100%;
  height: 100%;

  top: -45px;

  background: url('../../../assets/AboutObject/Cloud.svg');
  background-position: 65% 0%;
  background-size: 245px auto;
  background-repeat: no-repeat;

  z-index: 0;
}

.PlaceOnMap > .Header > .MapHeaderBG {
  position: absolute;

  width: 100%;
  height: 100%;

  top: 0;
  left: 48px;

  background: url('../../../assets/AboutObject/BlueTriangle.svg');
  background-position: 100% 60%;
  background-size: 30px auto;
  background-repeat: no-repeat;

  z-index: 0;
}

.CommentSlider {
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  width: 100%;
  height: fit-content;

  margin-bottom: 128px;
}
.CommentSlider > .Header {
  position: relative;

  color: rgb(0, 0, 0);
  font-family: 'Montserrat';
  font-size: 38px;
  font-weight: 700;
  letter-spacing: 0px;
  text-align: left;

  margin-bottom: 32px;
}

.Experience {
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  width: 100%;
  height: fit-content;
}
.Experience > .Header {
  position: relative;

  color: rgb(0, 0, 0);
  font-family: 'Montserrat';
  font-size: 38px;
  font-weight: 700;
  letter-spacing: 0px;
  text-align: left;

  margin-bottom: 8px;
}
.Experience > .Desc {
  position: relative;

  color: rgb(0, 0, 0);
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0px;
  text-align: left;

  margin-bottom: 32px;
}
.Experience > .List {
  position: relative;

  display: flex;
  flex-direction: row;

  justify-content: flex-start;

  column-gap: 20px;
}

.Experience > .List > .ExpCard {
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;

  width: auto;
  height: auto;

  background: rgb(230, 230, 230);

  border-radius: 20px;

  overflow: hidden;
}
.Experience > .List > .ExpCard > .CardIMG {
  position: relative;

  margin-bottom: 16px;

  width: 100%;
  height: 213px;

  background: url('../../../../assets/test/main.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.Experience > .List > .ExpCard > .Title {
  position: relative;

  width: auto;

  margin-bottom: 8px;
  padding: 0% 13px;

  color: rgb(0, 0, 0);
  font-family: 'Montserrat';
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0px;
  text-align: left;
}
.Experience > .List > .ExpCard > .Desc {
  position: relative;

  width: auto;

  padding: 0% 13px;

  color: rgb(0, 0, 0);
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0px;
  text-align: left;
}
.Experience > .List > .ExpCard > .Price {
  position: relative;

  width: auto;

  margin-top: 32px;
  margin-bottom: 32px;

  padding: 0% 13px;

  color: rgb(0, 0, 0);
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0px;
  text-align: left;
}
.Experience > .List > .ExpCard > .Info {
  position: relative;

  width: auto;
  height: fit-content;

  margin: 0% 20px 22px 20px;
  padding: 21px;

  color: rgb(255, 255, 255);
  font-family: 'Montserrat';
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0px;
  text-align: center;

  background: rgb(0, 189, 197);
  border-radius: 10px;
}
</style>

<style scoped>
@media (max-width: 768px) {
  .Rules {
    margin-bottom: 84px;
  }

  .MobileForest {
    position: absolute;
    top: -36px;
    right: 8px;
    display: block;
  }

  .PlaceOnMap {
    margin-bottom: 0px;
  }

  .PlaceOnMap > .Header > span {
    position: relative;

    color: rgb(0, 0, 0);
    font-family: 'Montserrat';
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .MapContainer > .MapBG {
    bottom: 6%;
  }

  .About {
    padding: 0% 10px;
    min-width: 0;
    width: 100%;
    margin-bottom: 0%;
  }

  .Rules > span {
    margin-bottom: 26px;
    font-size: 26px;
  }

  .Rules > .ItemsList {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
  }

  .Rules > .ItemsList > .Column:nth-child(1) {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .Rules > .ItemsList > .Column {
    width: 100% !important;
  }

  .Rules > .ItemsList > .Column > .ExtraBG {
    display: none;
  }
}
</style>
