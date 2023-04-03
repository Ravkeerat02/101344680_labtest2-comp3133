import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Launch {
  mission_name: string;
  launch_year: string;
  details: string;
  mission_patch_small: string;
}

@Component({
  selector: 'app-mission-list',
  template: `
    <div class="filters">
      <label for="year-input">Filter by Year:</label>
      <input type="number" id="year-input" [(ngModel)]="yearFilter" (input)="filterLaunches()">
    </div>
    <ul class="mission-list">
      <li *ngFor="let launch of filteredLaunches">
        <div class="mission-info">
          <img [src]="launch.mission_patch_small" alt="{{ launch.mission_name }} logo">
          <div class="details">
            <h3>{{ launch.mission_name }}</h3>
            <p><strong>Launch Year:</strong> {{ launch.launch_year }}</p>
            <p>{{ launch.details }}</p>
          </div>
        </div>
      </li>
    </ul>
  `,
  styles: [`
    .filters {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px 0;
    }

    .mission-list {
      list-style: none;
      padding: 0;
    }

    .mission-info {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      border: 1px solid #ccc;
      padding: 20px;
    }

    .mission-info img {
      height: 100px;
      margin-right: 20px;
    }

    .details h3 {
      margin: 0 0 10px 0;
    }

    .details p {
      margin: 0;
    }
  `]
})
export class MissionListComponent implements OnInit {
  launches: Launch[] | undefined;
  filteredLaunches: Launch[] | undefined;
  yearFilter: number | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Launch[]>('https://api.spacexdata.com/v3/launches')
      .subscribe(launches => {
        this.launches = launches;
        this.filteredLaunches = launches;
      });
  }

  filterLaunches() {
    if (this.yearFilter) {
      this.http.get<Launch[]>(`https://api.spacexdata.com/v3/launches?launch_year=${this.yearFilter}`)
        .subscribe(launches => {
          this.filteredLaunches = launches;
        });
    } else {
      this.filteredLaunches = this.launches;
    }
  }
}
