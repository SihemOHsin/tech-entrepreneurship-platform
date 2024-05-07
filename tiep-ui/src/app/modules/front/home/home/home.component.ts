import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{


  slideIndex = 1;

  ngOnInit() {
    this.showDivs(this.slideIndex);
  }

  plusDivs(n:number) {
    this.slideIndex += n;
    this.showDivs(this.slideIndex);
  }

  showDivs(n:number) {
    let x = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
    if (n > x.length) { this.slideIndex = 1; }
    if (n < 1) { this.slideIndex = x.length; }
    for (let i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    x[this.slideIndex - 1].style.display = "block";
  }
}
