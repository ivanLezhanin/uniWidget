<template>
  <div class="ErrorWindow noselect">
    <div class="Content">
      <span class="Title">{{ DataForError?.title }}</span>
      <span class="Desc">{{ DataForError?.desc }}</span>
    </div>

    <div class="BGImages">
      <div class="Img1"></div>
      <div class="Img2"></div>
    </div>

    <div class="ButtonClose" @click="handleCloseModal()"></div>
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
    DataForError: {
      type: Object,
      default: () => {
        return null
      },
    },
  },
  name: 'ErrorWindow',
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
  },
}
</script>

<style scoped>
.ErrorWindow > .BGImages {
  position: absolute;
  display: block;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  z-index: 1;
}
.ErrorWindow > .BGImages > * {
  position: absolute;
  display: block;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
}

.Content > .Title {
  position: relative;
  display: block;

  width: auto;
  height: fit-content;

  color: rgb(0, 189, 197);
  font-family: 'Montserrat';
  font-size: 38px;
  font-weight: 600;
  letter-spacing: 0px;
  text-align: center;
}
.Content > .Desc {
  position: relative;
  display: block;

  width: auto;
  height: fit-content;

  color: rgb(0, 0, 0);
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0px;
  text-align: center;
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

.ErrorWindow > .BGImages {
  position: absolute;
  display: block;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  z-index: 1;
}
.ErrorWindow > .BGImages > * {
  position: absolute;
  display: block;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
}

.ButtonClose {
  position: absolute;
  cursor: pointer;

  top: 20px;
  right: 20px;

  width: 26px;
  height: 26px;

  background: url('../assets/icons/org/menu/CloseModalButton.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto;

  z-index: 5;
}

.Img1 {
  background: url('../assets/icons/org/menu/AuthWindowBG1.svg');
  background-repeat: no-repeat;
  background-size: auto;
  background-position: 0% 0%;
}
.Img2 {
  background: url('../assets/icons/org/menu/AuthWindowBG2.svg');
  background-repeat: no-repeat;
  background-size: auto;
  background-position: 100% 100%;
}

.ErrorWindow {
  position: relative;

  padding: 80px 50px;

  width: fit-content;
  height: fit-content;

  background-color: white;

  border-radius: 15px;
}
.ErrorWindow > .Content {
  position: relative;

  max-width: 450px;
  min-width: 200px;

  width: auto;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 40px;

  z-index: 10;
}

.ErrorWindow > .Content > .Header > * {
  margin-top: auto;
  margin-bottom: auto;
}
.ErrorWindow > .Content > .Header {
  position: relative;
  display: flex;

  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  height: fit-content;
}
.ErrorWindow > .Content > .Header > .Title {
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

.ErrorWindow > .Content > .ContentListWrapper {
  position: relative;

  width: 100%;
  height: 536px;

  overflow: hidden;
}

.ErrorWindow > .Content > .ContentListWrapper > .ContentList {
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
