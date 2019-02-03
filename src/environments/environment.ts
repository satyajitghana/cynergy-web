// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBfMzMmWFY7gjzflod0cTyeuwPK4Z2q1ik',
    authDomain: 'cynergy-ruas.firebaseapp.com',
    databaseURL: 'https://cynergy-ruas.firebaseio.com',
    projectId: 'cynergy-ruas',
    storageBucket: '',
    messagingSenderId: '319069936084'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
