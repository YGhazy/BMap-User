import { Component } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sample-structure';
  ngOnInit(): void {

    AOS.init({
      offset: 200,
      duration: 600,
      delay: 100,
      disable: true, 

      });

  }
}
