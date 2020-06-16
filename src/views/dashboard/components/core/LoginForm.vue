<template>
  <v-sheet
    style="z-index:10;width:30vw;border-radius:50px;background:rgba(225,255,255,0.85);"
  >
    <div
      style="display:flex;flex-direction:column;align-items:center;padding-top:3vh;padding-bottom:3vh"
    >
      <img src="../../../../assets/logo.png" style="width:5vw;height:5vw" />
      <p style="font-size:1.5vw;color:#2F4F4F;" class="font-weight-black">
        欢迎登陆XX农牧管理系统
      </p>
      <v-form ref="form" v-model="valid" style="width:20vw;">
        <v-text-field
          v-model="phoneNumber"
          :rules="phoneRules"
          label="手机号"
          required
          clearable
        ></v-text-field>

        <v-text-field
          v-model="password"
          :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="show3 ? 'text' : 'password'"
          label="密码"
          class="input-group--focused"
          @click:append="show3 = !show3"
          required
          clearable
        ></v-text-field>
        <div>
          <v-text-field
            v-model="identifyCode"
            :rules="identifyRules"
            label="验证码"
            required
            clearable
            style="display:inline-block"
          ></v-text-field>
          <s-identify
            ref="identifyCode"
            style="display:inline-block;position:relative;top:1.5vh;left:1.2vw;"
          ></s-identify>
        </div>
        <div style="display:flex-direction:column;align-items:space-around">
          <v-btn block color="success" @click="login">
            登陆
          </v-btn>
          <v-btn text color="indigo" dark @click="register">
            获取账号
          </v-btn>
          <v-btn
            style="position:relative;left:7vw;"
            text
            color="indigo"
            dark
            @click="forgetPw"
          >
            忘记密码
          </v-btn>
        </div>
      </v-form>
    </div>
  </v-sheet>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  components: {
    SIdentify: () => import("../../../../components/SIdentify")
  },
  data: () => ({
    show3: false,
    valid: true,
    phoneNumber: "",
    phoneRules: [
      v => !!v || "请填写手机号",
      v => (v && v.length === 11) || "手机号长度错误"
    ],
    password: "",
    passwordRules: [
      v => !!v || "请填写密码",
      v => (v && v.length > 0) || "密码长度错误"
    ],
    identifyCode: "",
    identifyRules: [
      v => !!v || "请填写验证码",
      v => (v && v.length === 4) || "验证码长度错误"
    ],
    checkbox: false
  }),

  methods: {
    register() {
      this.$router.push("/register");
    },
    ...mapMutations(["changeLogin"]),
    login() {
      let postData = this.$qs.stringify({
        username: this.phoneNumber,
        password: this.password
      });
      let _this = this;
      if (this.phoneNumber.length !== 11 || this.password.length < 8) {
        _this.$message({
          message: "用户名和密码输入不规范",
          type: "error",
          center: true
        });
        this.$refs.identifyCode.drawPic();
        return;
      }
      if (this.identifyCode !== this.$refs.identifyCode.identifyCode) {
        _this.$message({
          message: "验证码错误",
          type: "error",
          center: true
        });
      } else {
        this.$axios
          .post("/login", postData)
          .then(function(response) {
            if (response.data.state === 200) {
              _this.userToken = response.data.data.token;
              // 将用户token保存到vuex中
              _this.changeLogin({
                Authorization: _this.userToken,
                userID: response.data.data.userID,
                nickname:_this.phoneNumber,
                role: response.data.data.role,
              });
              _this.$router.push(_this.global.homeUrl);
              _this.$message({
                message: response.data.message,
                type: "success",
                center: true
              });
            } else {
              _this.$message({
                message: response.data.message,
                type: "error",
                center: true
              });
            }
          })
          .catch(error => {
            _this.$message({
              message: error.message,
              type: "error",
              center: true
            });
            console.log(error);
          });
      }
      this.$refs.identifyCode.drawPic();
    }
  }
};
</script>
