import { Component, OnInit } from '@angular/core';
import { langHelper } from '../../services/utilities/language-helper';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {
  currentLang;
  langVar;
  constructor(private langHelper: langHelper,) { }

  ngOnInit(): void {
    this.langVar = this.langHelper.initializeMode();
    this.currentLang = this.langHelper.currentLang;
  }

}
