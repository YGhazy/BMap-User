import { Component, OnInit } from '@angular/core';
import { langHelper } from '../../services/utilities/language-helper';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  currentLang;
  langVar;
  constructor(private langHelper: langHelper,) { }

  ngOnInit(): void {
    this.langVar = this.langHelper.initializeMode();
    this.currentLang = this.langHelper.currentLang;
  }
}
