<template>
  <div class="RadioWrapper">
    <div class="RadButton noselect">
      <div class="CheckBox" v-show="ButtonActive"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ButtonActive: {
      type: Boolean,
      default: () => {
        return false
      },
    },
  },
  components: {},
  name: 'DefaultCheckbox',
  // initialize components based on data attribute selectors
  mounted() {},
}
</script>

<style scoped>
.CheckBox {
  position: absolute;
  display: block;

  left: 2px;
  bottom: 2px;

  width: 20px;
  height: 20px;

  background: url('../../assets/icons/checkbox.svg');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

.RadioWrapper > * {
  margin-top: auto;
  margin-bottom: auto;
}
.RadioWrapper > .Text {
  color: rgb(0, 0, 0);
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
}
.RadioWrapper {
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 4px;

  cursor: pointer;

  width: fit-content;
  height: fit-content;
}

.RadButton {
  position: relative;

  width: 20px;
  height: 20px;

  border-radius: 4px;

  border: 1px solid rgb(62, 62, 62);
}

.inner {
  position: relative;

  width: 12px;
  height: 12px;

  border-radius: 100%;

  background-color: transparent;
}
.inner.active {
  background: rgb(0, 189, 197);
}
</style>
