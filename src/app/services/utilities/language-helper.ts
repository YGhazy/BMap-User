import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class langHelper {

  currentLang: any; // Language Code

  constructor(private router: Router) {
    if (localStorage.getItem("Language") === null) {
      localStorage.setItem("Language", "en")
      this.currentLang = 'en'
    }
    else
    //Set language
    {
      this.currentLang = localStorage.getItem("Language")
    }
  }

  ngOnInit() {
  }


  // Set translation variables
  initializeMode() {
    if (this.currentLang == 'en') {
      return {
        dir: "ltr",
        lang: "العربية",
        benefits: "Benefits & Features",
        textAlign: "text-left",
        rowReverse: "",
        menuStyle: "",
        menuCloseStyle: "",
        navFloat: "float-right",
        quickLinks: "Quick Links",
        followUs: "Follow Us",
        copyRights1: "Copyright © 2021, All rights reserved",

        send: "Send",
        subscribeNw:"Subscribe Now"

      }
    }
    else {
      return {
        dir: "rtl",
        lang: "English",
        font:"cairoFont",
        navFloat: "",
        rowReverse: "row-reverse",
        menuStyle: "arabicMenu",
        menuCloseStyle: "arabicCloseButton",
        textAlign: "text-right",
        flexDIr: "flex-row-reverse",
        subscribeNw:"اشترك الان",
        send:"ارسال"



      }
    }
  }

  switchLanguage() {
    this.currentLang == "en" ? this.currentLang = "ar" : this.currentLang = "en"
    localStorage.setItem('Language', this.currentLang);
  }
}
