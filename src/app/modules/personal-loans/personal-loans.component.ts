import { Component, OnInit } from '@angular/core';
import { langHelper } from '../../services/utilities/language-helper';

@Component({
  selector: 'app-personal-loans',
  templateUrl: './personal-loans.component.html',
  styleUrls: ['./personal-loans.component.scss']
})
export class PersonalLoansComponent implements OnInit {

  currentLang;
  langVar;
  constructor(private langHelper: langHelper,) { }

  ngOnInit(): void {
    this.langVar = this.langHelper.initializeMode();
    this.currentLang = this.langHelper.currentLang;
  }
}
