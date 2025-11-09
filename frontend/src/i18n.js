import { createI18n } from 'vue-i18n'

function loadLocale() {
  const locale = localStorage.getItem('lang')
  return locale ? locale : 'pl'
}

const messages = {
  pl: {
    nav: {
      map: 'Mapa',
      panel: 'Panel',
      profile: 'Profil',
      logout: 'Wyloguj',
    },
    editProfile: {
      title: 'Edytuj swój profil',
      name: 'Imie',
      surname: 'Nazwisko',
      email: 'Email',
      birthday: 'Data urodzenia',
      cancel: 'Anuluj',
      save: 'Zapisz zmiany',
      saving: 'Zapisywanie...',
    },
  },
  en: {
    nav: {
      map: 'Map',
      panel: 'Dashboard',
      profile: 'Profile',
      logout: 'Log out',
    },
    editProfile: {
      title: 'Edit your profile',
      name: 'First name',
      surname: 'Surname',
      email: 'Email',
      birthday: 'Birthday',
      cancel: 'Cancel',
      save: 'Save changes',
      saving: 'Saving...',
    },
  },
}

const i18n = createI18n({
  legacy: false, // WAŻNE! Używaj trybu Composition API (Vue 3)
  locale: loadLocale(), // Ustaw domyślny język
  fallbackLocale: 'en', // Język, na który przełączy się, gdy brakuje tłumaczenia
  messages, // Załaduj nasze tłumaczenia
  globalInjection: true, // Pozwala na dostęp do $t w starym Options API
})

export default i18n