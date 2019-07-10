// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAt6WYuYNTTON6chmCnP-RtUFE4rRsGsPI',
    authDomain: 'ats-files.firebaseapp.com',
    databaseURL: 'https://ats-files.firebaseio.com',
    projectId: 'ats-files',
    storageBucket: 'ats-files.appspot.com',
    messagingSenderId: '43539754470',
    appId: '1:43539754470:web:7a1e5b74ebc710df'}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

export const universitiesList = [
    '-',
    'Ajloun National Private University',
    'Al al-Bayt University',
    'Al Hussein Technical University',
    'Al-Ahliyya Amman University',
    'Al-Balqa\' Applied University',
    'Al-Hussein Bin Talal University',
    'Al-Zaytoonah University of Jordan',
    'American University of Madaba',
    'Amman Arab University',
    'Ammon Applied University College',
    'Applied Science Private University',
    'Aqaba University of Technology',
    'Arab Academy for Management, Banking and Financial Sciences',
    'German Jordanian University',
    'Irbid National University',
    'Isra University',
    'Jadara University',
    'Jerash Private University',
    'Jordan Academy of Music',
    'Jordan University of Science and Technology',
    'Middle East University, Jordan',
    'Mutah university',
    'Philadelphia University',
    'Princess Sumaya University for Technology',
    'Tafila Technical University',
    'The Hashemite University',
    'The World Islamic Sciences and Education University',
    'University of Jordan',
    'University of Petra',
    'Yarmouk University',
    'Zarqa University',
    'Other'
];

export const technologiesList = [
    'java',
    'python',
    'php' ,
    'C#',
    '.net core',
    'angular',
    'flutter',
    'docker',
    'javaScript',
    'ionic'
];

export const randomNumber = 15752961;
// Math.pow(Math.ceil(Math.ceil(Math.random() * Math.floor(30)) * Math.ceil(Math.random() * Math.floor(25))), 4);
