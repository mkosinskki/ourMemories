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
      errorDate: 'Błąd formatowania daty:',
      errorUpdate: 'Błąd zapisu profilu.',
      unexpectedError: 'Nieoczekiwany błąd.',
      responseError: 'Błąd odpowiedzi, sprawdź połączenie internerowe.',
      changePhoto: 'Zmień zdjęcie',
    },

    notFound: {
      notFound: '404 - Nie znaleziono strony.',
    },

    unauthorized: {
      unauthorized: '401 - Dostęp nieautoryzowany.'
    },

    loginPage: {
      title: 'Cześć Natifilip4',
      info: 'Zaloguj się na swoje konto by oglądać wspomnienia.',
      email: 'Email',
      password: 'Hasło',
      loginButton: 'Zaloguj się',
      loginProgress: 'Logowanie...',
      passReset: 'Nie pamiętasz hasła?',
      passResetLink: 'Zresetuj je.',
      register: 'Nie masz jeszcze konta?',
      registerLink: 'Zarejestruj się.',
      formCompletionError: 'Musisz podać email i hasło.',
      serverError: 'Błąd serwera, spróbuj później.',
      responseError: 'Błąd odpowiedzi, sprawdź połączenie internerowe.',
      unexpectedError: 'Nieoczekiwany błąd.',
    },

    registerPage: {
      title: 'Zarejestruj się',
      info: 'Utwórz konto i przejrzyj nasze wspomnienia!',
      name: 'Imie',
      surname: 'Nazwisko',
      birthday: 'Data urodzenia',
      email: 'Email',
      password: 'Hasło',
      reenterPassword: 'Powtórz hasło',
      register: 'Zarejestruj się',
      registration: 'Rejestrowanie...',
      loginInfo: 'Masz już konto?',
      login: 'Zaloguj się.',
      nameError: 'Musisz podać imię.',
      surnameError: 'Musisz podać nazwisko.',
      birthdayError: 'Musisz podać datę urodzenia.',
      emailError: 'Musisz podać email.',
      passwordError: 'Musisz podać hasło.',
      reenterPasswordError: 'Powtórz hasło.',
      differentPasswordsError: 'Podane hasła różnią się od siebie.',
      serverError: 'Błąd serwera, spróbuj później.',
      responseError: 'Błąd odpowiedzi, sprawdź połączenie internerowe.',
      unexpectedError: 'Nieoczekiwany błąd.',
    },

    profilePage: {
      editProfileButton: 'Edytuj profil',
      statistics: 'Statystyki',
      expiredTokenError: 'Nieautoryzowany dostęp, możliwe wygaśnięcie tokenu.',
      formatingDateError: 'Błąd formatowania daty ',
      fetchError: 'Błąd pobierania użytkownika.',
      addedMemory: 'Dodane wspomnienia',
      visitedLocations: 'Odwiedzone lokacje',
      firstMemory: 'Pierwsze wspomnienie dodane',
      responseError: 'Błąd odpowiedzi, sprawdź połączenie internerowe.',
      unexpectedError: 'Nieoczekiwany błąd.',
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
      errorDate: 'Failed to format date:',
      errorUpdate: 'Failed to update profile.',
      unexpectedError: 'Unexpected error.',
      responseError: 'Response error, check your connection.',
      changePhoto: 'Change photo',
    },

    notFound: {
      notFound: '404 - Page not found.',
    },
    
    unauthorized: {
      unauthorized: '401 - Unauthorized.'
    },

    loginPage: {
      title: 'Hello Natifilip4',
      info: 'Login to see your memories',
      email: 'Email',
      password: 'Password',
      loginButton: 'Sign in',
      loginProgress: 'Signing in...',
      passReset: 'Do not remeber passwod?',
      passResetLink: 'Reset it.',
      register: 'Do not have account yet?',
      registerLink: 'Register.',
      formCompletionError: 'You have to enter email and password.',
      serverError: 'Server error, try later.',
      responseError: 'Response error, check your connection.',
      unexpectedError: 'Unexpected error.',
    },

    registerPage: {
      title: 'Register',
      info: 'Create an account and browse our memories!',
      name: 'First name',
      surname: 'Surname',
      birthday: 'Birthday',
      email: 'Email',
      password: 'Password',
      reenterPassword: 'Retype password',
      register: 'Register',
      registration: 'Registration...',
      loginInfo: 'You already have an account?',
      login: 'Log in.',
      nameError: 'You have to enter first name.',
      surnameError: 'You have to enter surname.',
      birthdayError: 'You have to enter date of birth.',
      emailError: 'You have to enter email.',
      passwordError: 'You have to enter password.',
      reenterPasswordError: 'You have to retype password.',
      diffrentPasswordsError: 'Passwords given are not the same.',
      serverError: 'Server error, try later.',
      responseError: 'Response error, check your connection.',
      unexpectedError: 'Unexpected error.',
    },

    profilePage: {
      editProfileButton: 'Edit profile',
      statistics: 'Statistics',
      expiredTokenError: 'Unauthorized, maybe token expired.',
      formatingDateError: 'Error while formating date',
      fetchError: 'Failed to fetch user data.',
      addedMemory: 'Memories added',
      visitedLocations: 'Visited locations',
      firstMemory: 'First memory added',
      responseError: 'Response error, check your connection.',
      unexpectedError: 'Unexpected error.',
    },
  },
}

const i18n = createI18n({
  legacy: false,
  locale: loadLocale(),
  fallbackLocale: 'pl',
  messages,
  globalInjection: true,
})

export default i18n