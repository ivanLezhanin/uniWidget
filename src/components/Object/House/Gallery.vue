<template>
  <div class="GalleryWrapper">
    <div class="Gallery" v-if="!loading">
      <div class="Header">
        <span
          >Не ищите повод для поездки,<br />
          <span class="BlueText">создавайте его вместе с нами</span></span
        >
        <span class="Mobile">
          <span>Не ищите повод для поездки</span>
          <span class="BlueText">создавайте </span>
          <span class="BlueText">его вместе с нами</span></span
        >
        <div class="noselect" @click="OpenReserveForm">Забронировать</div>
      </div>

      <photo-slider
        class="HideOnMobile"
        :inputPhotosArray="
          getAllObjectsPhotos == null || getAllObjectsPhotos?.length <= 3
            ? []
            : getAllObjectsPhotos
        "
        :key="getAllObjectsPhotos"
      ></photo-slider>

      <CustomPhotoSlider
        class="HideOnPC"
        v-if="getAllObjectsPhotosForMobile.length >= 1"
        style="z-index: 4"
        :PhotosForSlider="getAllObjectsPhotosForMobile"
      />

      <div class="Person">
        <div class="PersonPhotoWrapper">
          <CustomPhotoPlaceholder
            :PhotoURL="
              getPhotoURL(
                TerritoryGalleryData?.territory_contact_person?.url_img
              )
            "
          />
        </div>
        <div class="CommentBlock">
          <img
            loading="lazy"
            src="../../../assets/icons/object/house/WhoAcceptTriangle.svg"
            alt=""
          />
          <div class="Comment">
            <div class="WhoAccept">
              <span>Вас встретит</span>
              <span class="PersonName"
                >{{ TerritoryGalleryData?.territory_contact_person?.lname }}
                {{
                  TerritoryGalleryData?.territory_contact_person?.fname
                }}</span
              >
            </div>

            <img
              class="MobileTriangle"
              loading="lazy"
              src="../../../../static/MobilePolygon.png"
              alt=""
            />
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
  props: {
    TerritoryGalleryData: {
      type: Object,
      default: () => {
        return {}
      },
    },
    OpenReserveForm: {
      type: Function,
      default: () => {
        return null
      },
    },
  },
  watch: {
    TerritoryGalleryData(newValue, oldValue) {
      if (newValue !== {}) this.loading = false
      this.TerritoryGalleryData = newValue
    },
  },
  name: 'AboutGallery',
  components: {},
  data() {
    return {
      loading: true,
    }
  },

  computed: {
    getAllObjectsPhotos() {
      let resArray = []
      for (let i of this.TerritoryGalleryData?.territory_objects) {
        let photosArray = i?.territory_object_photos
        if (photosArray == null) {
          continue
        }
        for (let b of photosArray) {
          let correctURL = getRightIMGurl(b.url_img)
          resArray.push(correctURL)
        }
      }
      return resArray
    },
    getAllObjectsPhotosForMobile() {
      let resArray = []
      for (let i of this.TerritoryGalleryData?.territory_objects) {
        let photosArray = i?.territory_object_photos
        if (photosArray == null) {
          continue
        }
        resArray = resArray.concat(photosArray)
      }
      return resArray
    },
  },
  methods: {
    getPhotoURL(url) {
      if (url != null) {
        return getRightIMGurl(url)
      } else {
        return '#'
      }
    },
  },
}
</script>

<style scoped>
.MobileTriangle {
  display: none;
}

.HideOnPC {
  display: none;
}

.GalleryWrapper {
  position: relative;
  display: flex;

  width: 100%;
  height: fit-content;
}
.Gallery {
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
  justify-content: space-between;

  margin-bottom: 32px;

  width: 100%;
}
.Header > * {
  margin-bottom: auto;
  margin-top: auto;
}
.Header > span.Mobile {
  display: none;
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
}
.Header > div {
  cursor: pointer;

  position: relative;

  width: fit-content;
  height: fit-content;

  padding: 21px 133px;
  background: rgb(0, 189, 197);

  border-radius: 10px;

  color: rgb(255, 255, 255);
  font-family: 'Montserrat';
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0px;
  text-align: left;
}

.BlueText {
  color: rgb(0, 189, 197);
}

.Person {
  position: relative;

  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.Person > * {
  margin-top: auto;
  margin-bottom: auto;
}
.Person > .PersonPhotoWrapper {
  position: relative;

  width: 160px;
  height: 160px;

  margin-right: 8px;

  flex-shrink: 0;

  border-radius: 100%;
  overflow: hidden;
}
.Person > .PersonPhotoWrapper > * {
  width: 100%;
  height: 100%;
}

.Person > .CommentBlock {
  position: relative;

  display: flex;
  flex-direction: row;

  width: 100%;
  height: auto;
}

.Person > .CommentBlock > .Comment {
  position: relative;

  padding: 24px;

  margin-left: -20px;
  z-index: 10;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  width: auto;
  height: 100%;

  background-color: #efefef;

  border-radius: 15px;
  transform: rotate(-1.57deg);
}

.Person > .CommentBlock > .Comment > .WhoAccept {
  position: relative;

  display: flex;
  flex-direction: column;

  transform: rotate(1.57deg);

  color: rgb(0, 0, 0);
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0px;
  text-align: left;
}
.PersonName {
  color: rgb(9, 206, 215);
  font-family: 'Montserrat';
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0px;
  text-align: left;
}

.Person > .CommentBlock > .Comment > .PersonRating {
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  margin-bottom: auto;
}

.Person
  > .CommentBlock
  > .Comment
  > .PersonRating
  > img:not(:nth-last-child(1)) {
  margin-right: 7px;
}

.Mountain {
  position: absolute;

  width: 100%;
  height: 100%;

  top: 230px;

  background: url('../../../assets/AboutObject/Mountain1.svg'),
    url('../../../assets/AboutObject/Bird.svg');
  background-position: calc(100% + 132px) 85%,
    calc(50% + 80px + 132px) calc(100% - 410px);
  background-repeat: no-repeat;
  background-size: 1178px auto, 112px auto;

  z-index: 0;
}
</style>

<style scoped>
.story-carousel {
  margin-bottom: 32px;
}
.story-carousel .story-carousel__slide {
  height: 486px;
}

.story-carousel .story-carousel__slide > img {
  position: relative;
  height: 100%;
}
</style>

<style scoped>
@media (max-width: 768px) {
  .MobileTriangle {
    position: absolute;
    top: -42px;
    right: 15px;
    display: block;
  }

  .Header > span:not(.Mobile) {
    display: none;
  }
  .Header > span.Mobile {
    display: block;
  }

  .HideOnPC {
    display: block;
    aspect-ratio: 3 / 2;

    width: calc(100% - 20px);
    margin: 0% auto;
    border-radius: 20px;
    overflow: hidden;

    margin-bottom: 36px;
  }

  .HideOnMobile {
    display: none !important;
  }

  .Header {
    padding: 0% 10px;
    flex-direction: column;
    justify-content: flex-start;
    margin-bottom: 26px;
  }

  .Mountain {
    display: none;
  }

  .Gallery {
    width: 100%;
    margin-bottom: 84px;
  }

  .Header > span {
    font-size: 26px;
    font-weight: 700;
    text-align: left;
    line-height: normal;
  }

  .Header > div {
    display: none;
    width: 100%;
    min-width: 0;
    text-align: center;
    padding: 21px 0%;

    margin-top: 20px;
  }

  .Person {
    width: 100%;
    flex-direction: column;
    gap: 20px;
    padding: 0% 10px;
  }
  .PersonPhotoWrapper {
    margin-left: auto !important;
    margin-right: auto !important;
  }

  .CommentBlock > img {
    display: none;
  }

  .Person > .CommentBlock > .Comment {
    position: relative;
    padding: 24px;
    margin-left: 0px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    transform: none;
    width: 100%;
  }

  .Person > .CommentBlock > .Comment > .WhoAccept {
    transform: rotate(0deg);
  }

  .Person > .CommentBlock > .Comment > .WhoAccept > span {
    font-weight: 400;
  }
  .Person > .CommentBlock > .Comment > .WhoAccept > span.PersonName {
    font-weight: 700;
  }
}
</style>
