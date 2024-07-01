<template>
  <Booking :TerritoryHeadData="HeadComponentData" />
</template>

<script>
import Booking from "./components/Booking.vue";
import {getTerritoryMainInfo} from "./api/territory.js";
import {getByAppKey} from "./api/widget.js";

export default {
      name: 'App',
      components: {Booking},
      data() {
        return {
          HeadComponentData: {},
          HeadFieldsArray: [
            'name',
            'object_name',
            'address_city',
            'address_house',
            'address_street',
            'territory_photos',
            'short_desc',
            'comforts',
            'territory_objects',
          ],
        }
      },
      async created() {
        const getWidget = await getByAppKey(this.$appKey).then((res) => res.data)
        const TerritoryID = getWidget.territoryId;
        const mainTerritoryInfo = await getTerritoryMainInfo(TerritoryID).then((res) => res.data)

        this.HeadComponentData = this.createObjectFromParentWithFields(
            mainTerritoryInfo,
            this.HeadFieldsArray
        )
      },
      methods: {
        createObjectFromParentWithFields(parentObj, FieldsFromParentArray) {
          let resultObj = {}
          for (let propName of FieldsFromParentArray) {
            resultObj[propName] = parentObj[propName]
          }

          return resultObj
        },
      }
    }
</script>