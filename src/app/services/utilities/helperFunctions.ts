import { Injectable } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { read } from 'fs';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class helperFunctions {
  currentImg;
  numbersObject: { [x: string]: string } = {
    '1': '١',
    '2': '٢',
    '3': '٣',
    '4': '٤',
    '5': '٥',
    '6': '٦',
    '7': '٧',
    '8': '٨',
    '9': '٩',
    '0': '٠',
    'AM': 'ص',
    'am': 'ص',
    'PM': 'م',
    'pm': 'م',
  };

  numbersObject2: { [x: string]: string } = {
    '١': '1',
    '٢': '2',
    '٣': '3',
    '٤': '4',
    '٥': '5',
    '٦': '6',
    '٧': '7',
    '٨': '8',
    '٩': '9',
    '٠': '0',
  };

  constructor() {

  }

  addDash(e: string) {
    if (e != undefined) {
      let ele = e.split('-').join('');    // Remove dash (-) if mistakenly entered.
      let updateID = ele.match(/.{1,4}/g).join('-'); //insert - after every 4 digits
      return updateID
    }
  }

  //translate numbers
  transform(e): string {
    if (e === null || e === undefined) return '';
    let n = e + ''; // to make it a string if it was a number 
    let newString = '';
    for (let i = 0; i < n.length; i++) {
      if (this.numbersObject[n.charAt(i)])
        newString += this.numbersObject[n.charAt(i)];
      else
        newString += n.charAt(i);
    }
    return newString;
  }

  transformBack(e): string {
    if (e === null || e === undefined) return '';

    let n = e + ''; // to make it a string if it was a number 
    let newString = '';
    for (let i = 0; i < n.length; i++) {
      if (this.numbersObject2[n.charAt(i)])
        newString += this.numbersObject2[n.charAt(i)];
      else
        newString += n.charAt(i);
    }
    //console.log(newString)
    return newString;
  }

  //handling selet image and convert to base 64
  handleFileSelect(e){
    //this.currentImg = e.target.files[0];
    var files = e.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.currentImg = "data:image/jpeg;base64," + btoa(binaryString);
  }

}
