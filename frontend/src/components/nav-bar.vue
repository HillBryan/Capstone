<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link class="navbar-brand" to="/">Capstone Project</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/classes">Classes</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/submissions"
              >Submissions</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/create/problem"
              >Create Problem</router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <span class="nav-link login" @click="show = true">{{
              getText()
            }}</span>
          </li>
        </ul>
      </div>
    </nav>
    <div v-if="show">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Login</h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true" @click="exit()">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <p>Email:</p>
                  <input
                    type="text"
                    class="form-control classInput"
                    id="emailInput"
                    placeholder="Email..."
                    v-model="email"
                  />
                  <p>Password:</p>
                  <input
                    type="password"
                    class="form-control classInput"
                    id="passwordInput"
                    placeholder="Password..."
                    v-model="password"
                  />
                  <h5 v-if="invalid" class="red">Invalid Email or Password</h5>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="exit()"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="findAccount()"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import ApiMixin from "../mixins/api_mixin";
import { mapActions } from "vuex";

export default {
  name: "navBar",
  mixins: [ApiMixin],
  data() {
    return {
      show: false,
      email: "",
      password: "",
      account: {},
      invalid: false,
    };
  },
  methods: {
    ...mapActions(["setAccount"]),
    exit() {
      this.show = false;
      this.invalid = false;
    },
    getText() {
      return this.account.name ? this.account.name : "Login";
    },
    findAccount() {
      this.postData("http://localhost:3013/rest/account/find/", "POST", {
        email: this.email,
        password: this.password,
      }).then((data) => {
        console.log(data);
        if (data.length > 0) {
          this.account = data[0];
          this.setAccount({
            name: this.account.name,
            email: this.email,
            password: this.password,
          });
          this.show = false;
          this.invalid = false;
        } else {
          this.invalid = true;
        }
      });
    },
  },
};
</script>

<style scoped>
.nav-item {
  text-align: center;
}

.login:hover {
  cursor: pointer;
  color: white;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.input {
  display: flex;
  flex-direction: row;
}

.modal-body {
  display: table;
}
p {
  display: table-row;
}
label {
  display: table-cell;
}
input {
  display: table-cell;
}

.red {
  color: red;
}
</style>
