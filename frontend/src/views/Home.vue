<template>
  <div>
    <div>
      <div class="container column">
        <!-- Div for picture content -->
        <div class="top"></div>

        <!-- Div for features -->
        <div class="bottom">
          <h1 class="text-center mt-5 mb-5">
            Code Judging & Submission System
          </h1>
          <hr />
          <div class="row">
            <h3 class="m-auto">Course / Problem Creation</h3>
            <h3 class="m-auto">Auto Grading</h3>
          </div>
          <hr />
        </div>
        <div class="row justify-content-center">
          <button
            type="button"
            class="btn btn-secondary mr-5"
            @click="show = true"
          >
            Login
          </button>
          <button
            type="button"
            class="btn btn-primary ml-5"
            @click="show = true"
          >
            Register
          </button>
        </div>
      </div>
    </div>
    <div>
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
                    <h5 v-if="invalid" class="red">
                      Invalid Email or Password
                    </h5>
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
  </div>
</template>

<script>
import ApiMixin from "../mixins/api_mixin";
import { mapActions } from "vuex";

export default {
  name: "Home",
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
    findAccount() {
      this.postData("http://localhost:3013/rest/account/find/", "POST", {
        email: this.email,
        password: this.password,
      }).then((data) => {
        if (data.length > 0) {
          this.account = data[0];
          this.setAccount(data[0]);
          this.show = false;
          this.invalid = false;
          this.$root.$emit('login', data[0]);
        } else {
          this.invalid = true;
        }
      });
    },
  },
  components: {},
};
</script>

<style scoped>
.column {
  flex-direction: column;
}

.top {
  width: 100%;
}

.bottom {
  width: 100%;
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
</style>
