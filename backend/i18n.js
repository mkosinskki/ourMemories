import i18next from 'i18next';
import middleware from 'i18next-http-middleware';

const resources = {
  en: {
    translation: {
      emailRequired: "Email address is required",
      emailInvalid: "Please enter a valid email: example@mail.com",
      passwordRequired: "Password is required",
      passwordMinLength: "Password must be at least 8 characters",
      firstNameRequired: "First name is required",
      nameOnlyLetters: "Name can contain only letters",
      nameMinLength: "Name should be at least 3 characters",
      surnameRequired: "Surname is required",
      surnameOnlyLetters: "Surname can contain only letters",
      surnameMinLength: "Surname should be at least 3 characters",
      dobRequired: "Date of birth is required",
      dobNoFuture: "Date of birth cannot be in the future",
      locationRequired: "Location is required",
      eventDateRequired: "Event date is required",
      descriptionRequired: "Description is required",
      photoRequired: "At least one photo is required",
      memoryOwnerRequired: "Owner of memory is required",
      coordinatesRequired: "'lng' and 'lat' are required.",
      coordinatesBadFormat: "Bad format: 'lng' or 'lat'.",
      registerSuccess: "Register successful",
      incorrectLoginPassword: "Incorrect login or password",
      internalServerError: "Internal server error",
      enterEmailAndPassword: "Enter your email and password.",
      profilUpdatedSuccess: "Profile updated successfully",
      userNotFound: "User not found",
      emailExists: "User with this email exists.",
      badId: "Incorrect id format.",
      allFieldsRequired: "All fields are required.",
      noToken: "No token, access denied",
      userNotExist: "User belonging to this token does no longer exist",
      tokenExpired: "Token expired.",
      forbiddenAccess: "Forbidden: You do not have permission to access this resource.",
      tokenInvalid: "Invalid token.",
      fileTypeInvalid: "Only image files are allowed.",
      LIMIT_FILE_SIZE: "File is too large. Maximum size is 10MB.",
      LIMIT_UNEXPECTED_FILE: "You can upload a maximum of 10 photos.",
    }
  },
  pl: {
    translation: {
      emailRequired: "Adres email jest wymagany",
      emailInvalid: "Wprowadź poprawny adres email: przykład@mail.com",
      passwordRequired: "Hasło jest wymagane",
      passwordMinLength: "Hasło musi mieć co najmniej 8 znaków",
      firstNameRequired: "Imię jest wymagane",
      nameOnlyLetters: "Imię może zawierać tylko litery",
      nameMinLength: "Imię musi mieć co najmniej 3 znaki",
      surnameRequired: "Nazwisko jest wymagane",
      surnameOnlyLetters: "Nazwisko może zawierać tylko litery",
      surnameMinLength: "Nazwisko musi mieć co najmniej 3 znaki",
      dobRequired: "Data urodzenia jest wymagana",
      dobNoFuture: "Data urodzenia nie może być z przyszłości",
      locationRequired: "Lokalizacja jest wymagana",
      eventDateRequired: "Data wydarzenia jest wymagana",
      descriptionRequired: "Opis jest wymagany",
      photoRequired: "Dodaj przynajmniej jedno zdjęcie",
      memoryOwnerRequired: "Właściciel wspomnienia jest wymagany",
      coordinatesRequired: "'lng' i 'lat' są wymagane.",
      coordinatesBadFormat: "Zły format: 'lng' lub 'lat'.",
      registerSuccess: "Rejestracja zakończona pomyślnie",
      incorrectLoginPassword: "Niepoprawny login lub hasło",
      internalServerError: "Wewnętrzny błąd serwera",
      enterEmailAndPassword: "Podaj swój email i hasło",
      profilUpdatedSuccess: "Profil zaktualizowany pomyślnie",
      userNotFound: "Nie znaleziono użytkownika",
      emailExists: "Użytkownik z podanym emailem już istnieje.",
      badId: "Niepoprawny format ID.",
      allFieldsRequired: "Wszystkie pola są wymagane.",
      noToken: "Brak tokenu, dostęp zabroniony.",
      userNotExist: "Użytkownik przypisany do tego tokenu nie istnieje.",
      tokenExpired: "Token wygasł.",
      forbiddenAccess: "Zabronione: Nie masz uprawnień do wyświetlania tej zawartości.",
      tokenInvalid: "Nieprawdiłowy token.",
      fileTypeInvalid: "Dozwolone są tylko pliki graficzne.",
      LIMIT_FILE_SIZE: "Plik jest za duży. Maksymalny rozmiar to 10MB.",
      LIMIT_UNEXPECTED_FILE: "Możesz dodać maksymalnie 10 zdjęć.",
    }
  }
};

i18next
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    resources,
    detection: {
      order: ['header', 'querystring', 'cookie'],
      caches: ['cookie']
    }
  });

export default i18next;