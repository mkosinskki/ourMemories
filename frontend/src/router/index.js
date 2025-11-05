import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import Test from '@/views/Test.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import Unauthorized from '@/views/Unauthorized.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: {
        title: 'OM - Login'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
      meta: {
        title: 'OM - Register'
      }
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: Unauthorized,
      meta: {
        title: 'OM - Unauthorized'
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage,
      meta: {
        title: 'OM - Profile',
        requiresAuth: true
      }
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
      meta: {
        title: 'OM - test',
        requiresAuth: true,
        roles: [1] 
      }
    },
    {
      path: '/:pathMatch(.*)*', 
      name: 'notFound',
      component: NotFound,
      meta: {
        title: 'OM - Page not found'
      }
    }
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = 'Our memories'; 
  }

  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');
  let user = null;

  if (userString) {
    user = JSON.parse(userString);
  }

  const requiresAuth = to.meta.requiresAuth;
  const requiredRoles = to.meta.roles;

  if (requiresAuth && !token) {
    return next({ name: 'login' });
  }

  if (requiresAuth && requiredRoles && user) {
    if (!requiredRoles.includes(user.role)) {
      return next({ name: 'unauthorized' });
    }
  }

  if ((to.name === 'login' || to.name === 'register') && token) {
     return next({ name: 'profile' });
  }
  next();
})

export default router
