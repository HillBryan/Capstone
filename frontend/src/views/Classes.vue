<template>
  <div class="container mt-2">
    <div v-if="spinner" class="spinner-border spinner" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-if="!spinner" class="topRow">
      <h1 class="text-center">
        <span
          >&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;</span
        >
      </h1>
      <h1 class="text-center">Courses</h1>
      <button
        type="button"
        class="btn btn-secondary justify-content-end"
        @click="route()"
      >
        Create Course
      </button>
    </div>
    <hr />
    <div v-if="!spinner" class="Courses">
      <card v-for="course in courses" :key="course.id" :course="course"></card>
      <div class="cardAdd ml-auto mr-auto" @click="show = true">
        <h4 class="text-center m-auto">Add Course <span>&#10753;</span></h4>
      </div>
    </div>
    <div v-if="show">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Enter Class Code to Add Class</h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true" @click="show = false"
                      >&times;</span
                    >
                  </button>
                </div>
                <div class="modal-body">
                  <p>Enter Class Code:</p>
                  <div class="modalInput">
                    <input
                      type="text"
                      class="form-control classInput"
                      id="mainClassInput"
                      placeholder="Class Code..."
                      v-model="classCode"
                    />
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="show = false"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="show = false"
                  >
                    Add Class
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
import card from "../components/classCard.vue";

export default {
  name: "Classes",
  components: { card },
  data: function () {
    return {
      show: false,
      spinner: true,
      classCode: '',
      courses: [
        {
          name: "Data Structures",
          id: 100,
          instructor: "Dr. Mohan",
          course_code: "CS 3460",
          grade: "100",
          course_secret: 'AK6F'
        },
        {
          name: "Algorithms",
          id: 101,
          instructor: "Dr. Mohan",
          course_code: "CS 3450",
          grade: "91.2",
          course_secret: 'MEK9'
        },
      ],
    };
  },
  methods: {
    route() {
      this.$router.push({ name: "createClass", params: {  } });
    },
  },
  created() {},
  mounted() {
    this.spinner = false;
  },
};
</script>

<style scoped>
.spinner {
  margin-left: 50%;
  zoom: 200%;
}

.cardAdd {
  margin-top: 3%;
  margin-bottom: 2%;
  height: 10vh;
  width: 12vw !important;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
  border-radius: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: all 0.2s ease-in-out;
}

.cardAdd:hover {
  transform: scale(1.05);
  cursor: pointer;
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

.topRow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
