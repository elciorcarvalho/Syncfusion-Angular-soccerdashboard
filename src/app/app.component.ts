import { Component } from '@angular/core';

import { faFutbol } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './views/Main.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  faFutbol = faFutbol

  title = 'Soccer Dashboard';

}
