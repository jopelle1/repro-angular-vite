import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'repro';
  totalTime: string = "";

  private computeTotalData(dailyStats: any[]): any {
    return dailyStats.map((m) => ({...m}));
  }

  runTest() {
    const data: any[] = [];
    for (let k = 0; k < 200_000; k++) {
      data.push({abc1: 0});
    }

    const start = new Date();
    this.computeTotalData(data);
    const end = new Date();
    return end.getTime() - start.getTime();
  }

  ngOnInit() {
    const nbTests = 10;
    let totalTime = 0;
    for (let i = 0; i < nbTests; i++) {
      totalTime += this.runTest();
    }

    this.totalTime = `Average : ${totalTime / nbTests} ms`;
  }
}
