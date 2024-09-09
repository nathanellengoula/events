
const routes = [
  {
    path: '/',
    component: () => import('layouts/WelcomeLayout.vue'),
    children: [
      { path: '', name:"welcome", meta: {}, component: () => import('pages/WelcomeScreen.vue') },
      { path: '/login', name: "login", meta: {}, component: () => import('pages/LoginPage.vue') },
      { path: '/register', name: "register", meta: {}, component: () => import('pages/RegistrationPage.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requireAuth: true },
    children: [
      { path: '', name: "home", meta: { requireAuth: true }, component: () => import('pages/Index.vue')},
      { path: '/add-event/:id?', name:"add-event", meta: { requireAuth: true }, component: () => import('pages/AddEventPage.vue')},
      { path: '/settings', name:"settings", meta: { requireAuth: true }, component: () => import('pages/SettingsPage.vue')},
      { path: '/user/:id', name:"user", meta: { requireAuth: true }, component: () => import('pages/UserPage.vue')},
      { path: '/favourites', name:"favourites", meta: { requireAuth: true }, component: () => import('pages/FavouritesPage.vue')},
      { path: '/event/:id', name:"event", meta: { requireAuth: true }, component: () => import('pages/EventPage.vue')},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
