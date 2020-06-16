<template>
  <v-sheet
    style="z-index:10;width:30vw;border-radius:50px;background:rgba(225,255,255,0.85);"
  >
    <div
      style="display:flex;flex-direction:column;align-items:center;padding-top:3vh;padding-bottom:3vh"
    >
      <img src="../../../../assets/logo.png" style="width:5vw;height:5vw" />
      <p style="font-size:1.5vw;color:#2F4F4F;" class="font-weight-black">
        请填写以下注册信息
      </p>
      <v-form ref="form" style="width:20vw;">
        <v-text-field
          v-model="phoneNumber"
          :rules="phoneRules"
          label="手机号"
          required
          clearable
        ></v-text-field>

        <v-text-field
          ref="pw"
          v-model="password"
          :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="show3 ? 'text' : 'password'"
          label="密码"
          clearable
          class="input-group--focused"
          @click:append="show3 = !show3"
          required
        ></v-text-field>

        <v-text-field
          v-model="confPassword"
          :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[validatePw]"
          :type="show4 ? 'text' : 'password'"
          label="确认密码"
          clearable
          class="input-group--focused"
          @click:append="show4 = !show4"
          required
        ></v-text-field>
        <div style="display:flex;justify-content:space-between;">
          <v-checkbox
            style="display:inline-block;"
            v-model="checkbox"
            :rules="[v => !!v || '请同意我们的服务条款']"
            label="同意我们的服务条款"
            required
          >
          </v-checkbox>
          <v-dialog
            v-model="dialog"
            width="600px"
            style="display:inline-block;"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                small="true"
                text
                color="indigo"
                dark
                v-bind="attrs"
                v-on="on"
                style="position:relative;top:2vh;"
              >
                服务条款
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">服务条款</span>
              </v-card-title>
              <v-card-text>服务条款</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  @click="
                    dialog = false;
                    checkbox = false;
                  "
                  >不同意</v-btn
                >
                <v-btn
                  color="green darken-1"
                  text
                  @click="
                    dialog = false;
                    checkbox = true;
                  "
                  >同意</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <v-btn :disabled="!formValid" block color="success" @click="createUser">
          提交
        </v-btn>
      </v-form>
      <div>
        <v-btn text color="indigo" dark to="/login">
          已有账号，前去登陆
        </v-btn>
      </div>
    </div>
  </v-sheet>
</template>
<script>
export default {
  components: {},
  data: () => ({
    dialog: false,
    show3: false,
    show4: false,
    phoneNumber: "",
    phoneRules: [
      v => !!v || "请填写手机号",
      v => (v && v.length === 11) || "手机号长度错误"
    ],
    password: "",
    passwordRules: [
      v => !!v || "请填写密码",
      v => (v && v.length > 7) || "密码长度必须大于7位"
    ],
    confPassword: "",
    checkbox: false
  }),
  computed: {
    formValid() {
      return (
        this.phoneNumber.length === 11 &&
        this.password.length > 7 &&
        this.password === this.confPassword &&
        this.checkbox
      );
    }
  },
  methods: {
    createUser() {
      var _this = this;
      let postData = this.$qs.stringify({
        username: this.phoneNumber,
        password: this.password
      });
      this.$axios
        .post("/register", postData)
        .then(function(response) {
          _this.$message({
            message: response.data.message,
            type: response.data.state === 200 ? "success" : "error",
            center: true
          });
          if (response.data.state === 200) {
            _this.$router.push("/login");
          }
          console.log(response);
        })
        .catch(function(error) {
          _this.$message({
            message: error.message,
            type: "warning",
            center: true
          });
          console.log(error);
        });
    },
    validatePw(v) {
      if (v && v === this.password) return true;
      else return "两次密码输入不一致";
    }
  }
};
</script>
