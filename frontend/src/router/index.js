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
        title: 'OM - Login',
      },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
      meta: {
        title: 'OM - Register',
      },
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: Unauthorized,
      meta: {
        title: 'OM - Unauthorized',
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage,
      meta: {
        title: 'OM - Profile',
        requiresAuth: true,
      },
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
      meta: {
        title: 'OM - test',
        requiresAuth: true,
        roles: [1],
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFound,
      meta: {
        title: 'OM - Page not found',
      },
    },
  ],
})

async function verifyTokenAndGetUser(token) {
  try {
    const response = await fetch('http://localhost:6969/api/user/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) {
      return null
    }
    return await response.json()
  } catch (error) {
    console.error('Token verification error:', error)
    return null
  }
}

function clearAuthData() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

router.beforeEach(async (to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'Our memories'
  }

  const token = localStorage.getItem('token')
  const requiresAuth = to.meta.requiresAuth
  const requiredRoles = to.meta.roles

  if (to.name === 'login' || to.name === 'register') {
    if (token) {
      const user = await verifyTokenAndGetUser(token)
      if (user) {
        return next({ name: 'profile' })
      } else {
        clearAuthData()
        return next()
      }
    }
    return next()
  }

  if (requiresAuth) {
    if (!token) {
      return next({ name: 'login' })
    }

    const user = await verifyTokenAndGetUser(token)

    if (!user) {
      clearAuthData()
      return next({ name: 'login' })
    }

    if (requiredRoles && !requiredRoles.includes(user.role)) {
      return next({ name: 'unauthorized' })
    }
    return next()
  }
  next()
})

export default router
