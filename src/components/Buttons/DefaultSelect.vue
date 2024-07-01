<template>
  <select class="DefaultSelect" @change="SelectOption($event)">
    <option
      v-for="text in OptionsArray"
      :value="text"
      :key="text"
      :selected="text === SelectedOption"
      :disabled="Disable"
    >
      {{ text }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    OptionsArray: {
      type: Array,
      default: () => {
        return []
      },
    },
    SelectOption: {
      type: Function,
      default: () => {
        return () => {}
      },
    },
    SelectedOption: {
      type: String,
      default: () => {
        return ''
      },
    },
    Disable: {
      type: Boolean,
      default: () => {
        return false
      },
    },
  },
  components: {},
  name: 'DefaultSelect',
  // initialize components based on data attribute selectors
  mounted() {},
}
</script>

<style scoped>
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

  width: fit-content;
  height: fit-content;

  padding: 7px;

  border-radius: 100%;

  border: 1px solid rgb(0, 189, 197);
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
