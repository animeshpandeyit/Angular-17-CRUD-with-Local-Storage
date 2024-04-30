import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Angular-17-CRUD-with-Local-Storage';

  condition: boolean = true;
  expression: boolean = false;
  constructor() {}
}
