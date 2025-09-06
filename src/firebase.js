import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC6Zzp_ITxhbPjkulziqAbcR_pRXChquaM",
  authDomain: "jornada-milhas-4940b.firebaseapp.com",
  projectId: "jornada-milhas-4940b",
  storageBucket: "jornada-milhas-4940b.firebasestorage.app",
  messagingSenderId: "952081829533",
  appId: "1:952081829533:web:484e5c67eb65eef8528e74"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging();

export const requestToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: "BE8Lv2FDk6A4Jpa7DAbQ0vxUUK-0FpAOfB9aSSpEGSJHWQcdpVbL46bRx7Y7LKmgb1FQTvySH7dcqrvkAvUJ-ZM"
    })
    if (currentToken) {
      console.log(currentToken);
    } else {
      console.log("Nenhum token recebido");
    }
  } catch (err) {
    console.log(err);
  }
}

export const onMessageListener = () => {
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Notificação em primeiro plano", payload);
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body
      }
      new Notification(notificationTitle, notificationOptions);
      resolve(payload);
    });
  });
}

