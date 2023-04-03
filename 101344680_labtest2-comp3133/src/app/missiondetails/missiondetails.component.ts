import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Mission } from '../shared/mission.interface';


@Component({
  selector: 'app-missiondetails',
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css']
})

export class MissionDetailsComponent implements OnInit {
  mission: Mission | undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    const flightNumber = this.route.snapshot.paramMap.get('flight_number');
    const url = `https://api.spacexdata.com/v3/launches/${flightNumber}`;
    this.http.get<Mission>(url).subscribe(mission => this.mission = mission);
  }
}