import { AfterViewInit, Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  count = 0;
  digits = ['0'];

  ngAfterViewInit(){
    fromEvent(document.querySelector('body'), 'click')
    .pipe(
      map(e => ({
        body: e.target.tagName
      }))
    )
    .subscribe(tag => {
      if(tag.body !== 'BUTTON'){
        this.updateElems();
      }
    })
  }

  updateElems() {
    this.count++;
    let stringifiedCount = this.count.toString();
    if(this.digits.length == 1 && this.digits[0] === '0'){
      this.digits = [];
    }
    if (stringifiedCount.length >= this.digits.length){
      this.digits = [];
      for (let i = 0; i < stringifiedCount.length; i++) {
        this.digits.push(stringifiedCount[i]);
      }
    }
  }

  resetCounter(){
    this.count = 0;
    this.digits = ['0'];
  }
}
