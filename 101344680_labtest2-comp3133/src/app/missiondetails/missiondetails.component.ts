import { Component, Input } from '@angular/core';
import { Mission } from '../shared/mission.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mission-details',
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css']
})
export class MissionDetailsComponent {
  @Input() mission: Mission | undefined;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if (params['flightNumber']) {
        // Call API to get details for specified mission
      }
    });
  }
}
