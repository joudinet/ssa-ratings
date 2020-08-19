import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
    public lineChart: GoogleChartInterface = {
	chartType: 'LineChart',
	dataTable: [
	    [ 'Date', 'Score', {role: 'interval'} ],
	    ['2019-05-06', 300, 128]
	],
	// firstRowIsData: true,
	options: {
	    title: 'Historique du classement',
	    curveType: 'function',
	    intervals: { style: 'bars' }
	},
    };

    teams;
    team;

    constructor(private gamesService: GamesService,
		private route: ActivatedRoute) { }

    ngOnInit(): void {
	this.route.url.subscribe(url => {
	    if (url.length > 0 && url[0].path === "f") {
		this.gamesService.getFemTeams().subscribe(teams => {
		    this.route.paramMap.subscribe(params => {
			this.team = teams[+params.get('teamId')];
			this.team.results.reverse();
			let withoutIncertity = this.team.ratings.map(val => val.slice(0,-1));
			this.lineChart.dataTable = [[ 'Date', 'Score']].concat(withoutIncertity);
		    });
		});
	    }
	    else if (url.length > 0 && url[0].path === "x") {
		this.gamesService.getFemTeams().subscribe(teams => {
		    this.route.paramMap.subscribe(params => {
			this.team = teams[+params.get('teamId')];
			this.team.results.reverse();
			let withoutIncertity = this.team.ratings.map(val => val.slice(0,-1));
			this.lineChart.dataTable = [[ 'Date', 'Score']].concat(withoutIncertity);
		    });
		});
	    }
	    else {
		this.gamesService.getTeams().subscribe(teams => {
		    this.route.paramMap.subscribe(params => {
			this.team = teams[+params.get('teamId')];
			this.team.results.reverse();
			let withoutIncertity = this.team.ratings.map(val => val.slice(0,-1));
			this.lineChart.dataTable = [[ 'Date', 'Score']].concat(withoutIncertity);
		    });
		});
	    }
	});
  }

}
