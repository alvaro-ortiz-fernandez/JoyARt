import { bootstrapApplication } from '@angular/platform-browser';
import { initializeApp } from "firebase/app";;
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { decodeFireConfig } from './app/services/firebase';

/* =======================================================
 * ANGULAR
 * ==================================================== */
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

/* =======================================================
 * FIREBASE
 * https://console.firebase.google.com/u/0/project/joyart-c556a/settings/general
 * ==================================================== */
initializeApp({
  apiKey: decodeFireConfig("WVFieUthWXVCaXp2YlZbfHkgNVRRYiFpKlxJbG5ISigsIUh3XEFv"),
  authDomain: decodeFireConfig("cndheWpsNXstLS55Nn5xan16eWt9eWhoNnt3dQ=="),
  projectId: decodeFireConfig("cndheWpsNXstLS55"),
  storageBucket: decodeFireConfig("cndheWpsNXstLS55Nn5xan16eWt9a2x3anl/fTZ5aGg="),
  messagingSenderId: decodeFireConfig("Ky0pLCEuKC4hLg=="),
  appId: decodeFireConfig("KSIrLSksIS4oLiEuIm99eiJ6LyotKHkufC15Li8rKCB9LHsofnt8")
});