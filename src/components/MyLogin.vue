<!--
 * @Description: 登录组件
 * @Author: Allen
 * @Date: 2025-02-19 20:55:17
 * @LastEditors: Allen
 * @LastEditTime: 2025-03-01 15:34:08
 -->
<template>
  <div id="myLogin">
    <el-dialog title="登录" width="300px" center :visible.sync="isLogin">
      <el-form :model="LoginUser" :rules="rules" status-icon ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="name">
          <el-input prefix-icon="el-icon-user-solid" placeholder="请输入账号" v-model="LoginUser.name"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            prefix-icon="el-icon-view"
            type="password"
            placeholder="请输入密码"
            v-model="LoginUser.pass"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" type="primary" @click="Login" style="width:100%;">登录</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "MyLogin",
  data() {
    // 用户名的校验方法
    let validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入用户名"));
      }
      // 用户名以字母开头,长度在5-16之间,只能包含字母和数字
      const userNameRule = /^[a-zA-Z][a-zA-Z0-9]{4,15}$/;
      if (userNameRule.test(value)) {
        this.$refs.ruleForm.validateField("checkPass");
        return callback();
      } else {
        return callback(new Error("字母开头,长度5-16之间,只能包含字母和数字"));
      }
    };
    // 密码的校验方法
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入密码"));
      }
      // 密码以字母开头,长度在8-18之间,允许字母数字和下划线
      const passwordRule = /^[a-zA-Z]\w{7,17}$/;
      if (passwordRule.test(value)) {
        this.$refs.ruleForm.validateField("checkPass");
        return callback();
      } else {
        return callback(
          new Error("字母开头,长度8-18之间,不允许字母数字和下划线")
        );
      }
    };
    return {
      LoginUser: {
        name: "",
        pass: ""
      },
      // 用户信息校验规则,validator(校验方法),trigger(触发方式),blur为在组件 Input 失去焦点时触发
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  computed: {
    // 获取vuex中的showLogin，控制登录组件是否显示
    isLogin: {
      get() {
        return this.$store.getters.getShowLogin;
      },
      set(val) {
        this.$refs["ruleForm"].resetFields();
        this.setShowLogin(val);
      }
    }
  },
  methods: {
  ...mapActions(["setUser", "setShowLogin"]),
  async Login() {
  try {
    const valid = await this.$refs["ruleForm"].validate();
    if (!valid) return;

    const res = await this.$axios.post("/api/user/login", {
      account: this.LoginUser.name,
      password: this.LoginUser.pass
    });

    if (res.data.code === 200 || res.data.code === "200") {
      this.handleLoginSuccess(res.data);
    } else {
      this.handleLoginError(res.data.message); // 用 message 字段
    }
  } catch (err) {
    this.handleLoginError("登录请求失败，请稍后重试");
  }
},
  handleLoginSuccess(data) {
  this.setUser(data.data);
  this.isLogin = false;
  this.notifySucceed(data.message); // 用 message 字段
},
handleLoginError(msg) {
  this.$refs["ruleForm"].resetFields(); // 只重置密码字段更好
  this.notifyError(msg);
}
}
};
</script>
<style>
</style>