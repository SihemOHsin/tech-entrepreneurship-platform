import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {

  logout(){
//localStorage.clear();
    localStorage.removeItem("token");
    window.location.reload();
  }

}
