import firebase from 'firebase';

export const initializeFirebase = () => {
    firebase.initializeApp({
        messagingSenderId: '657437643795'
    })

    navigator.serviceWorker
    .register('/sw.js')
    .then((registration) => {
        firebase.messaging().useServiceWorker(registration);
    });
}

export const pedirPermissaoParaReceberNotificacoes = async () => {
    try {
      const messaging = firebase.messaging();
      await messaging.requestPermission();
      const token = await messaging.getToken();
      console.log('token do usuário:', token);
      return token;
    } catch (error) {
      console.error(error);
    }
  }