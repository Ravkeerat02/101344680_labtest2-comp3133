import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Launch {
  mission_name: string;
  launch_year: string;
  details: string;
  links:{
    mission_patch_small: string;
    mission_patch: string;
  }
}

@Component({
  selector: 'app-mission-list',

  template: `
    <div class="container">
      <div class="header">
        <h1>Mission List</h1>
        <div class="filters">
          <label for="year-input">Filter by Year:</label>
          <input type="number" id="year-input" [(ngModel)]="yearFilter" (input)="filterLaunches()">
        </div>
      </div>
      <ul class="mission-list">
        <li *ngFor="let launch of filteredLaunches">
          <div class="mission-info">
            <div class="image-container">
              <img *ngIf="launch.links.mission_patch_small" [src]="launch.links.mission_patch_small" alt="{{ launch.mission_name }} logo">
            </div>
            <div class="details">
              <h3>{{ launch.mission_name }}</h3>
              <p><strong>Launch Year:</strong> {{ launch.launch_year }}</p>
              <p>{{ launch.details }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    h1 {
      font-size: 32px;
      font-weight: bold;
      margin: 0;
    }

    .filters {
      display: flex;
      align-items: center;
    }

    label {
      margin-right: 10px;
    }

    input {
      padding: 5px;
      border-radius: 5px;
      border: none;
      box-shadow: 0 2px 2px rgba(0,0,0,0.1);
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
      border-radius: 5px;
      box-shadow: 0 2px 2px rgba(0,0,0,0.1);
      transition: all 0.2s ease-in-out;
    }

    .mission-info:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 4px rgba(0,0,0,0.1);
    }

    .image-container {
      width: 150px;
      height: 150px;
      overflow: hidden;
      border-radius: 50%;
      margin-right: 20px;
      background-color: #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
    }

    .details h3 {
      margin: 0 0 10px 0;
      font-size: 24px;
      font-weight: bold;
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