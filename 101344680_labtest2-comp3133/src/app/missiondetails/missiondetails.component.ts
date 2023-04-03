import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MissionService } from '../shared/mission.service';

@Component({
  selector: 'app-missiondetails',
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css']
})
export class MissiondetailComponent implements OnInit {
  // @Input() mission: Mission;
  launch: any;
  mission: any;
  flight_number: number | undefined;
  constructor(private route: ActivatedRoute, private apiService: MissionService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const flight_number = params.get('flight_number');
      this.apiService.getLaunchByFlightNumber('flight_number').subscribe(data => {
        this.launch = data;
      });
    });
  }
}
