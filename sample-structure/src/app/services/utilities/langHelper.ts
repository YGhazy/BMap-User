import { Injectable } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class langHelper  {

  //Get current language variable from Local Storage
  currentLang=(/true/i).test(localStorage.getItem("lang"));

  constructor(private router: Router) {
  }

  ngOnInit() {
    //Define default language variable
    if (localStorage.getItem("lang") === null)
      localStorage.setItem("lang", "en")
    else
      //Set language
      this.currentLang = (/true/i).test(localStorage.getItem("lang"))
  }

  //Initialize language variables
  initializeMode() { 
    if (this.currentLang) {
      return {
        image: 'Image',
      }
    }
    else if (!this.currentLang) {
      return {
        image: 'صورة',
      }
    }
  }
}
