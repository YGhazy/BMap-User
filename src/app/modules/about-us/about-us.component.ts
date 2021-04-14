import { Component, OnInit } from '@angular/core';
import { langHelper } from '../../services/utilities/language-helper';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  langVar;
  constructor(private langHelper: langHelper) { }

  ngOnInit(): void {
    this.langVar = this.langHelper.initializeMode()

  }

}
