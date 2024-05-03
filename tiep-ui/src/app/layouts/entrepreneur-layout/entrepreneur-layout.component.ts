import { Component } from '@angular/core';

@Component({
  selector: 'app-entrepreneur-layout',
  templateUrl: './entrepreneur-layout.component.html',
  styleUrls: ['./entrepreneur-layout.component.scss']
})
export class EntrepreneurLayoutComponent {
  logout(){
//localStorage.clear();
    localStorage.removeItem("token");
    window.location.reload();
  }
}
