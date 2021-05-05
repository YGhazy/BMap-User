import { Component, OnInit } from '@angular/core';
import { langHelper } from '../../services/utilities/language-helper';

@Component({
  selector: 'app-credit-cards',
  templateUrl: './credit-cards.component.html',
  styleUrls: ['./credit-cards.component.scss']
})
export class CreditCardsComponent implements OnInit {

  currentLang;
  langVar;
  constructor(private langHelper: langHelper,) { }

  ngOnInit(): void {
    this.langVar = this.langHelper.initializeMode();
    this.currentLang = this.langHelper.currentLang;
  }

}
