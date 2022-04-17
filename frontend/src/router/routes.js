import Home from "../views/Home";
import About from "../views/About";
import Classes from "../views/Classes";
import CreateClass from "../views/CreateClass.vue"
import Login from "../views/Login";
import Problems from "../views/Problems";
import Problem from "../components/Problem";
import Solve from "../components/solve.vue";
import Submission from "../components/submission.vue";
import Submissions from "../views/Submissions.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/classes",
    name: "Classes",
    component: Classes,
  },
  {
    path: "/createClass",
    name: "createClass",
    component: CreateClass,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/classes/:class/problems",
    name: "Problems",
    component: Problems,
  },
  {
    path: "/problem/:id",
    name: "Problem",
    component: Problem,
  },
  {
    path: "/problem/:id/solve",
    name: "Solve",
    component: Solve,
  },
  {
    path: "/submission/:id",
    name: "Submission",
    component: Submission,
  },
  {
    path: "/submissions",
    name: "Submissions",
    component: Submissions,
  },
];

export default routes;
