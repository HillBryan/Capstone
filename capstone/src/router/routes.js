import Home from '../views/Home';
import About from '../views/About';
import Classes from '../views/Classes';
import Login from '../views/Login';

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
  ]

export default routes;