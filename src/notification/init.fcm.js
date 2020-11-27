import firebase from "firebase/app";
import "firebase/messaging";
import { firebaseConfig, apidKey } from './firebaseConfig';

const initializedFirebaseApp = firebase.initializeApp(firebaseConfig);

const messaging = initializedFirebaseApp.messaging();

messaging.usePublicVapidKey(apidKey.API_KEY);

export { messaging };