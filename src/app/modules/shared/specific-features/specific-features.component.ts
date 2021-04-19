import { Component, OnInit } from '@angular/core';
import { langHelper } from 'src/app/services/utilities/language-helper';

@Component({
  selector: 'app-specific-features',
  templateUrl: './specific-features.component.html',
  styleUrls: ['./specific-features.component.scss']
})
export class SpecificFeaturesComponent implements OnInit {

  langVar;
  constructor(private langHelper: langHelper) { 
    this.langVar = this.langHelper.initializeMode();
  }

  ngOnInit(): void {
  }

}
