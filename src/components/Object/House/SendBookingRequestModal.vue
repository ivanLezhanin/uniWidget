<template>
  <div class="RegistrationWindow noselect">
    <div class="Content">
      <div class="Header">
        <span class="Title">Забронировать</span>
      </div>

      <div class="Form">
        <div class="FIOLine">
          <div class="inputDefaultBlock">
            <span class="inputDefaultHead"
              >Фамилия<span class="inputRequireField"></span
            ></span>
            <input
              v-model="user_signup[`lname`]"
              class="inputDefaultStyle"
              type="text"
            />
          </div>
          <div class="inputDefaultBlock">
            <span class="inputDefaultHead"
              >Имя<span class="inputRequireField"></span
            ></span>
            <input
              v-model="user_signup[`fname`]"
              class="inputDefaultStyle"
              type="text"
            />
          </div>
          <div class="inputDefaultBlock">
            <span class="inputDefaultHead"
              >Отчество<span class="inputRequireField"></span
            ></span>
            <input
              v-model="user_signup[`mname`]"
              class="inputDefaultStyle"
              type="text"
            />
          </div>
        </div>

        <div class="ContactData">
          <div class="inputDefaultBlock">
            <span class="inputDefaultHead"
              >Телефон<span class="inputRequireField"></span
            ></span>
            <input
              v-model="user_signup[`phone`]"
              class="inputDefaultStyle"
              type="text"
            />
          </div>
          <div class="inputDefaultBlock">
            <span class="inputDefaultHead"
              >E-mail адрес<span class="inputRequireField"></span
            ></span>
            <input
              v-model="user_signup[`email`]"
              class="inputDefaultStyle"
              type="text"
            />
          </div>
        </div>

        <div class="ContactApp">
          <div class="inputDefaultBlock">
            <span class="inputDefaultHead"
              >Способ связи<span class="inputRequireField"></span
            ></span>
            <div class="SelectAppForContact">
              <DefaultRadio
                :ButtonText="'Telegram'"
                :key="`${user_signup['contact_messenger']}0`"
                :ButtonActive="user_signup['contact_messenger'] == 'tg'"
                @click.native="user_signup['contact_messenger'] = 'tg'"
              />
              <DefaultRadio
                :ButtonText="'WhatsApp'"
                :key="`${user_signup['contact_messenger']}1`"
                :ButtonActive="user_signup['contact_messenger'] == 'wa'"
                @click.native="user_signup['contact_messenger'] = 'wa'"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="PasswordFields">
        <div class="Passwords">
          <div class="inputDefaultBlock">
            <span class="inputDefaultHead"
              >Комментарий к заявке (необязательно)</span
            >
            <textarea
              v-model="user_signup[`comment`]"
              class="inputDefaultStyle"
            />
          </div>
        </div>

        <div class="Rules">
          <div class="AgreeWithRules">
            <DefaultCheckbox
              :ButtonActive="terms.personal_data_permission"
              :key="terms.personal_data_permission"
              @click.native="
                terms.personal_data_permission = !terms.personal_data_permission
              "
            />
            <span>Соглашаюсь на обработку персональных данных</span>
          </div>
          <div class="AgreeWithRules">
            <DefaultCheckbox
              :ButtonActive="terms.oferta_renter"
              :key="terms.oferta_renter"
              @click.native="terms.oferta_renter = !terms.oferta_renter"
            />
            <span
              >Ознакомлен и принимаю условия договора содействия
              Арендатору</span
            >
          </div>
          <div class="AgreeWithRules">
            <DefaultCheckbox
              :ButtonActive="terms.oferta_daily_rent"
              :key="terms.oferta_daily_rent"
              @click.native="terms.oferta_daily_rent = !terms.oferta_daily_rent"
            />
            <span
              >Ознакомлен и принимаю после оплаты брони условия договора
              посуточной аренды</span
            >
          </div>
        </div>

        <DefaultButton
          class="AdaptiveButton"
          ButtonText="Отправить"
          @click.native="handleReserveRequest"
        />

        <div class="inputDefaultBlock">
          <span class="inputDefaultHead ColouredText"
            ><span class="inputRequireField"></span>Поля, обязательные для
            заполнения</span
          >
        </div>
      </div>
    </div>
    <div class="BGImages">
      <div class="Img1"></div>
      <div class="Img2"></div>
    </div>
    <div class="ButtonClose" @click="handleCloseModal()"></div>

    <Teleport
      to="body"
      v-if="errorWindowShow"
      :key="`${errorMessageData.title}${errorMessageData.desc}`"
    >
      <ModalWindow style="z-index: 1002" :handleCloseModal="closeErrorWindow">
        <template v-slot:ModalContent>
          <ErrorWindow
            :handleCloseModal="closeErrorWindow"
            :DataForError="errorMessageData"
          />
        </template>
      </ModalWindow>
    </Teleport>
  </div>
</template>

<script>
import Teleport from 'vue2-teleport'

import { getUserInfo } from '../../../api/user.js'
import { createOrder } from '../../../api/order.js'

import DefaultRadio from "../../Buttons/DefaultRadio.vue";
import DefaultCheckbox from "../../Buttons/DefaultCheckbox.vue";
import DefaultButton from "../../Buttons/DefaultButton.vue";
import ModalWindow from "../../ModalWindow.vue";
import ErrorWindow from "../../ErrorWindow.vue";

export default {
  props: {
    handleCloseModal: {
      type: Function,
      default: () => {
        return null
      },
    },

    handleRegSuccess: {
      type: Function,
      default: () => {
        return null
      },
    },

    CalculatorData: {
      type: Object,
      default: () => {
        return null
      },
    },
  },
  components: { Teleport, DefaultRadio, DefaultCheckbox, DefaultButton, ModalWindow, ErrorWindow },
  async created() {
    let UserInfo = null
    try {
      UserInfo = await getUserInfo(this.$store.state.auth.user.id)
    } catch (e) {}

    this.UserData = UserInfo?.data == null ? null : UserInfo?.data

    if (this.UserData != null) {
      for (let key in this.user_signup) {
        this.user_signup[key] = this.UserData[key]
        if (key == 'contact_messenger') {
          this.user_signup[key] = this.UserData['communicate_by']
        }
      }
    }
  },
  name: 'RegistrationWindow',
  mounted() {},
  data() {
    return {
      user_signup: {
        fname: '',
        mname: '',
        lname: '',
        email: '',
        phone: '',
        comment: '',
        contact_messenger: 'tg',
      },

      terms: {
        personal_data_permission: false,
        oferta_renter: false,
        oferta_daily_rent: false,
      },

      UserData: null,
      order_source: 'widget',
      host_reward: 0.0,
      errorWindowShow: false,
      errorMessageData: {
        title: '',
        desc: '',
      },
      windowSuccess: false,
    }
  },
  methods: {
    closeErrorWindow() {
      this.errorWindowShow = false

      // if (this.windowSuccess) {
      //   this.$router.go(this.$router.currentRoute)
      // }
    },

    handleSignup() {
      let self = this

      if (!this.fieldsNotEmpty()) {
        return 0
      }
    },

    fieldsNotEmpty() {
      for (let field in this.user_signup) {
        if (this.user_signup[field] === '') {
          this.errorMessageData = {
            title: 'Упс!',
            desc: 'Пожалуйста, заполните все поля',
          }
          this.errorWindowShow = true
          return false
        }
      }

      if (this.user_signup.password !== this.password_repeat) {
        this.errorMessageData = {
          title: 'Упс!',
          desc: 'Пароли не совпадают',
        }
        this.errorWindowShow = true
        return false
      }

      if (this.agreeWithTerms === false) {
        this.errorMessageData = {
          title: 'Почти готово!',
          desc: 'Примите обязательное соглашение на обработку данных',
        }
        this.errorWindowShow = true
        return false
      }

      return true
    },

    ButtonRedirect(url) {
      this.$router.push(url)
    },

    async handleReserveRequest() {
      for (let i in this.user_signup) {
        if (i == 'comment' && this.user_signup[i] == null) {
          this.user_signup[i] = ''
        }
        if (this.user_signup[i] == '' && i != 'comment') {
          this.errorMessageData = {
            title: 'Упс!',
            desc: 'Пожалуйста, заполните все поля',
          }
          this.errorWindowShow = true
          return 0
        }
      }

      for (let i in this.terms) {
        if (this.terms[i] == false) {
          this.errorMessageData = {
            title: 'Почти готово!',
            desc: 'Пожалуйста, примите все правила соглашения',
          }
          this.errorWindowShow = true
          return 0
        }
      }

      let temp = {}
      for (let i in this.terms) {
        temp[i] = Number(this.terms[i])
      }
      for (let i in this.user_signup) {
        temp[i] = this.user_signup[i]
      }
      for (let i in this.CalculatorData) {
        temp[i] = this.CalculatorData[i]
      }

      let mainOrderID = null
      for (let i = 0; i < this.CalculatorData.ordersList.length; i++) {
        if (i != 0) {
          temp.order_number = mainOrderID
        }
        temp.total_price = this.CalculatorData.ordersList[i].price
        temp.object_room = this.CalculatorData.ordersList[i].room
        temp.people_number = this.CalculatorData.ordersList[i].people_count
        temp.amo_obj_id = this.CalculatorData.amo_obj_id
        temp.order_source = this.order_source
        temp.host_reward = this.CalculatorData.ordersList[i].price

        let order_created_resp = await createOrder([temp])

        if (i == 0) {
          mainOrderID = order_created_resp.data[0].id
        }
      }

      this.errorMessageData = {
        title: 'Заявка отправлена!',
        desc: 'Ожидайте, пока с вами свяжутся',
      }
      this.errorWindowShow = true
      this.windowSuccess = true
    },

    splitOrder() {
      let temp = {}
      for (let i in this.terms) {
        temp[i] = Number(this.terms[i])
      }
      for (let i in this.user_signup) {
        temp[i] = this.user_signup[i]
      }
      for (let i in this.CalculatorData) {
        temp[i] = this.CalculatorData[i]
      }
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

.Img1 {
  background: url('../../../assets/icons/org/menu/AuthWindowBG1.svg');
  background-repeat: no-repeat;
  background-size: auto;
  background-position: 0% 0%;
}
.Img2 {
  background: url('../../../assets/icons/org/menu/AuthWindowBG2.svg');
  background-repeat: no-repeat;
  background-size: auto;
  background-position: 100% 100%;
}

.RegistrationWindow > .ButtonClose {
  position: absolute;
  cursor: pointer;

  top: 32px;
  right: 32px;

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

  padding: 56px 30px 76px 30px;

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
  gap: 36px;

  z-index: 10;
  overflow: auto;

  height: 100%;

  margin-top: 20px;
  padding-right: 10px;
}
.RegistrationWindow > .Content > .Header {
  position: relative;

  width: 100%;
  height: fit-content;
}
.RegistrationWindow > .Content > .Header > .Title {
  position: relative;

  display: block;

  width: 100%;
  height: fit-content;

  color: rgb(0, 189, 197);
  font-family: 'Montserrat';
  font-size: 38px;
  font-weight: 600;
  line-height: 46px;
  letter-spacing: 0px;
  text-align: center;
}

.RegistrationWindow > .Content > .Form {
  position: relative;

  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 24px;
}

.RegistrationWindow > .Content > .Form > .FIOLine {
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 10px;
}

.RegistrationWindow > .Content > .Form > .ContactData {
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 20px;
}

.RegistrationWindow > .Content > .Form > .ContactData > * {
  width: 50%;
}

.RegistrationWindow > .Content > .PasswordFields {
  position: relative;

  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
}

.RegistrationWindow > .Content > .PasswordFields > .Passwords {
  position: relative;

  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 20px;
}
.PasswordFields > .Passwords > .inputDefaultBlock {
  width: 100%;
}
.PasswordFields > .Passwords > .inputDefaultBlock > textarea {
  min-height: 150px;
}

.Rules {
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 15px;
}
</style>

<style scoped>
@media (max-width: 480px) {
  .RegistrationWindow {
    position: relative;
    padding: 25px 15px 25px 25px;
    min-width: 0px;
  }

  .RegistrationWindow > .Content > .Header > .Title {
    font-size: 20px;
    line-height: normal;
    text-align: center;
    margin-top: 8px;
  }

  .RegistrationWindow > .Content > .Form > .FIOLine,
  .RegistrationWindow > .Content > .Form > .ContactData {
    flex-direction: column;
    gap: 10px;
  }

  .RegistrationWindow > .Content > .Form > .ContactData > * {
    width: 100%;
  }

  .AdaptiveButton {
    min-width: 0;
    width: 100%;
  }

  .RegistrationWindow > .ButtonClose {
    z-index: 12;
  }
}
@media (min-width: 480px) and (max-width: 768px) {
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
