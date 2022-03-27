import Home from '../views/Home';
import About from '../views/About';
import Classes from '../views/Classes';
import Login from '../views/Login';
import Problems from '../views/Problems';
import Problem from '../components/Problem'

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
  ]

export default routes;