import Home from '../views/Home';
import About from '../views/About';
import Classes from '../views/Classes';
import Login from '../views/Login';
import Problems from '../views/Problems';
import Problem from '../components/Problem';
import Solve from '../components/solve.vue';
import Submission from '../components/submission.vue';

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
        path: '/classes',
        name: 'Classes',
        component: Classes
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
      path: '/classes/:class/problems',
      name: 'Problems',
      component: Problems
    },
    {
      path: '/problem/:id',
      name: 'Problem',
      component: Problem
    },
    {
      path: '/problem/:id/solve',
      name: 'Solve',
      component: Solve
    },
    {
      path: '/submissoin/:id',
      name: 'Submission',
      component: Submission
    },
  ]

export default routes;