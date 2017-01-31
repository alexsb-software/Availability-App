import { Component } from '@angular/core';
import { EventDataService } from './events/eventdata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EventDataService]
})

export class AppComponent {
  title = 'app works!';
}
