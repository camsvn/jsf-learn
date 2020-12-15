// import { ajax } from 'rxjs/ajax';
// import { map, catchError } from 'rxjs/operators';
// import { of } from 'rxjs';

export function generateUUID() {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

// export function getSchema(fileName: string) {
//     const fileURL = `../../../assets/schemas/${fileName}.json`;
//     console.log('fileName',fileURL);
//     ajax('https://json.extendsclass.com/bin/23a15b5ff02e').pipe(
//         map(userResponse => console.log('schema: ', userResponse)),
//         catchError(error => {
//             console.log('error: ', error);
//             return of(error);
//         })
//     );
// };

export function getSchema(fileName: string): Promise<string> {
  return new Promise ((resolve, reject) => {
    const fileURL = `../../../assets/schemas/${fileName}.json`;
    var xhttp = new XMLHttpRequest();
    // opening the catlog async as true//
    xhttp.open("GET", fileURL, true);
    xhttp.send();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          resolve(this.response);
        } 
        if (this.readyState == 4 && this.status !== 200) {
          reject(`${fileName}.json Not Found`)
        }
      };  
    })
  }

// export function getSchema(fileName: string) {
//     const fileURL = `assets/schemas/${fileName}.json`;
//     ajax.getJSON(fileURL).pipe(
//         map(userResponse => console.log('schema: ', userResponse)),
//         catchError(error => {
//             console.log('error: ', error);
//             return of(error);
//         })
//     );
// }