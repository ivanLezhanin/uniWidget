<template>
  <div class="OpportunitiesWrapper">
    <div class="Opportunities">
      <div class="Header">
        <span
          ><span class="TextColor">То, что дополнит </span>вашу поездку</span
        >
      </div>

      <div class="Photos">
        <div class="PColumn">
          <div
            class="PhotoContainer"
            v-for="n in getCardsColumnLength(1)"
            :key="n"
            :style="
              getPhotoURL(calculateCardID(n, 1)) == '#' ? 'display: none' : ''
            "
          >
            <CustomPhotoPlaceholder
              :PhotoURL="getPhotoURL(calculateCardID(n, 1))"
              :class="n % 2 == 0 ? 'GridFiveImgs-2' : 'GridFiveImgs-1'"
            />
            <span class="Head">{{
              getCard(calculateCardID(n, 1), 'title')
            }}</span>
            <span class="Body">{{
              getCard(calculateCardID(n, 1), 'description')
            }}</span>
          </div>
        </div>
        <div class="PColumn">
          <div class="Polygon1" v-if="getCardsColumnLength(2) != 0"></div>
          <div
            v-for="n in getCardsColumnLength(2)"
            :key="n"
            :class="`PhotoContainer ${n == 1 ? 'Photo-top-80' : ''}`"
            :style="
              getPhotoURL(calculateCardID(n, 2)) == '#' ? 'display: none' : ''
            "
          >
            <CustomPhotoPlaceholder
              :PhotoURL="getPhotoURL(calculateCardID(n, 2))"
              :class="n % 2 == 0 ? 'GridFiveImgs-1' : 'GridFiveImgs-2'"
            />
            <span class="Head">{{
              getCard(calculateCardID(n, 2), 'title')
            }}</span>
            <span class="Body">{{
              getCard(calculateCardID(n, 2), 'description')
            }}</span>
          </div>
        </div>
        <div class="PColumn">
          <div
            class="PhotoContainer"
            v-for="n in getCardsColumnLength(3)"
            :key="n"
            :style="
              getPhotoURL(calculateCardID(n, 3)) == '#' ? 'display: none' : ''
            "
          >
            <CustomPhotoPlaceholder
              :PhotoURL="getPhotoURL(calculateCardID(n, 3))"
              :class="n % 2 == 0 ? 'GridFiveImgs-2' : 'GridFiveImgs-1'"
            />
            <span class="Head">{{
              getCard(calculateCardID(n, 3), 'title')
            }}</span>
            <span class="Body">{{
              getCard(calculateCardID(n, 3), 'description')
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="Mountain"></div>
  </div>
</template>

<script>
import { getRightIMGurl } from '@/middleware/getRightIMGurl.js'

export default {
  name: 'Opportunity',
  props: {
    TerritoryOpportunityData: Object,
  },
  data() {
    return {}
  },
  methods: {
    getPhotoURL(photo_id) {
      if (
        this.TerritoryOpportunityData.territory_cards != null &&
        this.TerritoryOpportunityData.territory_cards.length >= photo_id + 1
      ) {
        return getRightIMGurl(
          this.TerritoryOpportunityData['territory_cards'][photo_id]['url_img']
        )
      } else {
        return '#'
      }
    },

    getCard(card_id, prop) {
      if (
        this.TerritoryOpportunityData.territory_cards != null &&
        this.TerritoryOpportunityData.territory_cards.length >= card_id + 1
      ) {
        return this.TerritoryOpportunityData['territory_cards'][card_id][
          prop
        ] == null ||
          this.TerritoryOpportunityData['territory_cards'][card_id][prop] == ''
          ? 'Пусто'
          : this.TerritoryOpportunityData['territory_cards'][card_id][prop]
      } else {
        return 'Пусто'
      }
    },

    calculateCardID(index, column) {
      return column - 1 + 3 * (index - 1)
    },

    getCardsColumnLength(column) {
      let counter = Math.floor(this.getCardsCounter / 3)
      let ostatok = this.getCardsCounter % 3

      if (counter != 0 && column == ostatok) {
        counter++
      }

      return counter
    },
  },
  computed: {
    getCardsCounter() {
      if (
        this.TerritoryOpportunityData?.territory_cards == null ||
        this.TerritoryOpportunityData?.territory_cards?.length == 0
      ) {
        return 0
      } else {
        return this.TerritoryOpportunityData.territory_cards.length
      }
    },
  },
}
</script>

<style scoped>
:root {
  --var_ra: 123;
}

.OpportunitiesWrapper {
  position: relative;
  display: flex;

  width: 100%;
  height: fit-content;
}
.Opportunities {
  position: relative;

  display: flex;
  flex-direction: column;

  margin: 0% auto 128px auto;

  width: 1136px;

  z-index: 10;
}

.Header {
  position: relative;

  display: flex;
  flex-direction: row;

  margin-bottom: 32px;

  width: 100%;
  height: fit-content;
}
.Header > span {
  position: relative;

  width: fit-content;
  height: fit-content;

  font-family: 'Montserrat';
  font-size: 38px;
  font-weight: 700;
  letter-spacing: 0px;
  text-align: left;

  color: #000;
}
.TextColor {
  color: rgb(0, 189, 197);
}

.Photos {
  position: relative;

  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: row;
  justify-content: center;

  gap: 40px;

  overflow: hidden;
}

.Photos > .PColumn {
  position: relative;
  display: flex;

  width: 30%;
  height: fit-content;

  flex-direction: column;
  justify-content: flex-start;
  gap: 44px;

  flex-shrink: 0;
  flex-grow: 1;
  flex-basis: auto;
}
.Photos > .PColumn:nth-child(3) {
  margin-top: 15px;
}

.Photos2 {
  position: relative;

  width: 50%;
  height: fit-content;

  display: flex;
  flex-direction: column;

  row-gap: 32px;
}

.column {
  position: relative;

  width: 50%;
  height: fit-content;
}

.PhotoContainer {
  position: relative;

  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: column;

  z-index: 10;
}

.PhotoContainer > *:not(span):not(div) {
  position: relative;

  width: 100%;
  height: auto;

  margin-bottom: 16px;

  border-radius: 20px;
}
.PhotoContainer > .Head {
  position: relative;

  margin-top: 14px;
  margin-bottom: 8px;

  color: rgb(0, 0, 0);
  font-family: 'Montserrat';
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0px;
  text-align: center;
}
.PhotoContainer > .Body {
  position: relative;

  margin-bottom: 8px;

  color: rgb(0, 0, 0);
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0px;
  text-align: left;
}

.Photos-33 {
  width: 33.5% !important;
}
.Photos-66 {
  width: 66.5% !important;
}
.Photo-top-80 {
  margin-top: 80px;
}

.Polygon1 {
  position: absolute;

  width: 47px;
  height: 47px;

  top: 0;
  right: 2px;

  background: url('../../../../static/icons/territory_assets/PhotosTriangle1.svg');
  background-position: 50% 50%;
  background-size: contain;
  background-repeat: no-repeat;

  z-index: 20;
}
.Polygon2 {
  position: absolute;

  width: 54px;
  height: 54px;

  top: calc(-54px - 13px);
  right: 27px;

  background: url('../../../../static/icons/territory_assets/PhotosTriangle2.svg');
  background-position: 50% 50%;
  background-size: contain;
  background-repeat: no-repeat;

  z-index: 20;
}
.Mountain {
  position: absolute;

  width: 100%;
  height: 100%;

  top: 0;

  background: url('../../../assets/AboutObject/Mountain2.svg');
  background-position: 90% 0%;
  background-repeat: no-repeat;
  background-size: 120% auto;

  z-index: 0;
}

.GridFiveImgs-1 {
  border-radius: 20px;
  aspect-ratio: 1 / 0.95;
}
.GridFiveImgs-2 {
  border-radius: 20px;
  aspect-ratio: 0.78 / 1;
}
</style>

<style scoped>
@media (max-width: 768px) {
  .Opportunities {
    margin-bottom: 84px !important;
    width: 100%;
  }

  .Header {
    margin-bottom: 26px;
  }

  .Header > span {
    padding: 0% 12px;

    width: 320px;

    font-size: 26px;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0px;
    text-align: left;
    color: #000;
  }

  .Photos {
    padding: 0% 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 40px;
    overflow: hidden;
  }

  .Photos > .PColumn {
    width: 100%;
    flex-direction: column;
    gap: 40px;
  }

  .Polygon1 {
    display: none;
  }

  .Photo-top-80 {
    margin-top: 0px;
  }

  .PhotoContainer > .Head {
    margin-top: 12px;
    margin-bottom: 8px;
    padding: 0 16px;
    font-size: 18px;
    text-align: left;
  }
  .PhotoContainer > .Body {
    font-size: 16px;
    font-weight: 400;
    text-align: left;
    padding: 0 16px;
  }
}
</style>
