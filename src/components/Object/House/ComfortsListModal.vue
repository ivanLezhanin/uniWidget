<template>
  <div class="RegistrationWindow noselect">
    <div class="Content">
      <div class="Header">
        <span class="Title">Какие удобства вас ждут</span>
        <div class="ButtonClose" @click="handleCloseModal()"></div>
      </div>

      <div class="ContentListWrapper">
        <div class="ContentList">
          <div
            class="ComfortBlock"
            v-for="(Comf, cindx) in ComfortListSorted"
            :key="Comf.cat_name + cindx"
          >
            <span class="Head">{{ Comf.cat_name }}</span>
            <div class="Items">
              <div
                class="Item"
                v-for="(item, itemindx) in Comf.obj_list"
                :key="`${item.id}${itemindx}`"
              >
                <div class="ItemIMG" :style="loadImages(item.url_img)"></div>
                <span class="Text">{{ item.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    comfortsListData: {
      type: Array,
      default: () => {
        return []
      },
    },
  },

  name: 'ComfortsListModal',
  mounted() {},
  data() {
    return {
      ComfortListSorted: [],
    }
  },
  created() {
    this.comfortsSorted()
  },
  methods: {
    comfortsSorted() {
      let res = []

      for (let comf of this.comfortsListData) {
        let find_cat = res.find((x) => {
          if (x.cat_name == comf.category) {
            return true
          }
        })

        if (find_cat == null) {
          res.push({
            cat_name: comf.category,
            obj_list: [comf],
          })
        } else {
          find_cat.obj_list.push(comf)
        }
      }

      this.ComfortListSorted = res
    },

    loadImages(url) {
      return `background: url("${url}");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;`
    },
  },
}
</script>

<style scoped>
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

  width: 435px;

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

  padding: 60px 47px 60px 60px;
  padding: 60px 47px 60px 60px;

  min-width: 680px;
  height: 100%;

  background-color: white;

  border-radius: 15px;
}
.RegistrationWindow > .Content {
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 40px;

  z-index: 10;
}

.RegistrationWindow > .Content > .Header > * {
  margin-top: auto;
  margin-bottom: auto;
}
.RegistrationWindow > .Content > .Header {
  position: relative;
  display: flex;

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
  font-size: 20px;
  font-weight: 700;
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

<style scoped>
@media (max-width: 480px) {
  .RegistrationWindow > .Content > .Header > .Title {
    font-size: 20px;
    line-height: normal;
    width: calc(100% - 32px);
  }

  .RegistrationWindow .ButtonClose {
    top: 0px;
    right: 0px;
    width: 16px;
    height: 16px;
    background-size: contain;
  }

  .RegistrationWindow {
    padding: 20px 15px 20px 20px;
    min-width: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 15px;
  }

  .RegistrationWindow > .Content {
    height: 70svh;
    overflow: hidden;
    gap: 20px;
  }

  .RegistrationWindow > .Content > .Header {
    flex-shrink: 0;
    flex-grow: 0;
    flex-basis: auto;
  }

  .RegistrationWindow > .Content > .ContentListWrapper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;
    flex-shrink: 1;
    flex-grow: 0;
    flex-basis: auto;
  }

  .RegistrationWindow > .Content > .ContentListWrapper > .ContentList {
    gap: 20px;
  }
}
@media (min-width: 480px) and (max-width: 768px) {
  .RegistrationWindow > .Content > .Header > .Title {
    font-size: 20px;
    line-height: normal;
    width: calc(100% - 32px);
  }

  .RegistrationWindow .ButtonClose {
    top: 0px;
    right: 0px;
    width: 16px;
    height: 16px;
    background-size: contain;
  }

  .RegistrationWindow {
    padding: 20px 15px 20px 20px;
    min-width: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 15px;
  }

  .RegistrationWindow > .Content {
    height: 70svh;
    overflow: hidden;
    gap: 20px;
  }

  .RegistrationWindow > .Content > .Header {
    flex-shrink: 0;
    flex-grow: 0;
    flex-basis: auto;
  }

  .RegistrationWindow > .Content > .ContentListWrapper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;
    flex-shrink: 1;
    flex-grow: 0;
    flex-basis: auto;
  }

  .RegistrationWindow > .Content > .ContentListWrapper > .ContentList {
    gap: 20px;
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
