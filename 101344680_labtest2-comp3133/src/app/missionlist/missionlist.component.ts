import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Mission} from '../shared/mission.interface';

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

  .filters {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    justify-content:flex-end;
  }
  
  label {
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
  }
  
  input[type="number"] {
    width: 100px;
    height: 30px;
    border: 2px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    font-size: 16px;
  }
  
  input[type="number"]:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  .mission-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    grid-gap: 20px;
    list-style: none;
    padding: 0;
    margin-top:75px;
  }
  
  .mission-info {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease-in-out;
  }
  
  .mission-info:hover {
    transform: translateY(-5px);
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  }
  
  .image-container {
    position: absolute;
    top: -50px;
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 50%;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  
  .details {
    margin-top: 50px;
    text-align: center;
  }
  
  .details h3 {
    margin: 0 0 10px;
    font-size: 24px;
    font-weight: bold;
    color: #333333;
  }
  
  .details p {
    margin: 0;
    font-size: 16px;
    color: #666666;
  }
  `]
})
export class MissionListComponent implements OnInit {
  launches: Launch[] | undefined;
  filteredLaunches: Launch[] | undefined;
  yearFilter: number | undefined;
  mission: Mission[] = [] ;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Launch[]>('https://api.spacexdata.com/v3/launches')
      .subscribe(launches => {
        this.launches = launches;
        this.filteredLaunches = launches;
      });
  }

  // selectMission(id: string) {
  //   this.router.navigate(['/mission', id], { relativeTo: this.route });
  // }

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