<template>
  <div class="FlatButton noselect">{{ ButtonText }}</div>
</template>

<script>
export default {
  props: {
    ButtonText: {
      type: String,
      default: () => {
        return ''
      },
    },
  },
  components: {},
  name: 'DefaultButtonBorder',
  // initialize components based on data attribute selectors
  mounted() {},
}
</script>

<style scoped>
.FlatButton {
  position: relative;

  cursor: pointer;

  display: flex;
  flex-direction: row;
  justify-content: center;

  padding: 18px 30px;

  width: fit-content;
  min-width: 320px;

  border-radius: 10px;

  color: rgb(0, 189, 197);
  font-family: 'Montserrat';
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;

  border: 1px solid rgb(0, 189, 197);

  background: transparent;
}
</style>
