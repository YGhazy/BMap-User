import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { langHelper } from 'src/app/services/utilities/language-helper';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  langVar;
  currentLang;
  constructor(private router: Router, private langHelper: langHelper) { }
  ngOnInit(): void {
    this.langVar = this.langHelper.initializeMode();
    this.currentLang = this.langHelper.currentLang;
  }
  route(url) {

    if (url == this.router.url)
      window.scrollTo(0, 0)
    else
      this.router.navigateByUrl(url)
  }
  changeLanguage() {
    this.langHelper.switchLanguage()
    this.langVar = this.langHelper.initializeMode();
    window.location.reload()
  }
}
