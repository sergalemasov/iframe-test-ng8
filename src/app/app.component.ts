import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('sidebar', {static: true}) private sidebar: ElementRef;

  isSidebarOpened = false;

  ngAfterViewInit() {
    this.subscribeToIframeMousemove();
    this.subscribeToSidebarEvents();
  }

  private subscribeToSidebarEvents() {
    fromEvent(this.sidebar.nativeElement, 'mouseenter')
      .subscribe(() => console.log('entered on sidebar'));

    fromEvent(this.sidebar.nativeElement, 'mouseout')
      .subscribe(() => {
        this.isSidebarOpened = false;
        console.log('moved out from sidebar');
      });
  }

  private subscribeToIframeMousemove() {
    fromEvent(window, 'message')
      .subscribe((e: any) => {
        let coords: {x: number, y: number};

        try {
          coords = JSON.parse(e.data);
        } catch(e) {
          return;
        }

        if (coords.x <= 80) {
          this.isSidebarOpened = true;
        }
      });
  }
}
