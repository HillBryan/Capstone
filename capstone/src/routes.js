import Home from './components/Home.vue';
import About from './components/About.vue';
import Classes from './components/Classes.vue';
import Login from './components/Login.vue';

const routes = [
    {path: '/', component: Home},
    {path: '/about', component: About},
    {path: '/Classes', component: Classes},
    {path: '/Login', component: Login},
];

export default routes;