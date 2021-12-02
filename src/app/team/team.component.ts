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
        // dataTable: [
        //     [ 'Date', 'Score',
        //       {id: 'min', type: 'number', role: 'interval'},
        //       {id: 'mmax', type: 'number', role: 'interval'}],
        //     ['2019-05-06', 300, 228, 378]
        // ],
        // firstRowIsData: true,
        options: {
            title: 'Historique du classement',
            curveType: 'function',
            intervals: { style: 'sticks' }
        },
    };

    teams;
    team;

    constructor(private gamesService: GamesService,
                private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.url.subscribe(url => {
            if (url.length > 0 && url[0].path === 'f') {
                this.gamesService.getFemTeams().subscribe(teams => {
                    this.route.paramMap.subscribe(params => {
                        this.team = teams[+params.get('teamId')];
                        this.team.results.reverse();
                        this.lineChart.dataTable = [
                            [ 'Date', 'Score',
                              {id: 'min', type: 'number', role: 'interval'},
                              {id: 'max', type: 'number', role: 'interval'}]
                        ].concat(this.team.ratings.map(r => {
                            const score = r[1];
                            const variance = r[2];
                            const ci95 = Math.round(1.96 * Math.sqrt(variance));
                            const res = [ r[0], r[1] ];
                            res.push(score - ci95);
                            res.push(score + ci95);
                            return res;
                        }));
                    });
                });
            } else if (url.length > 0 && url[0].path === 'x') {
                this.gamesService.getMixTeams().subscribe(teams => {
                    this.route.paramMap.subscribe(params => {
                        this.team = teams[+params.get('teamId')];
                        this.team.results.reverse();
                        this.lineChart.dataTable = [
                            [ 'Date', 'Score',
                              {id: 'min', type: 'number', role: 'interval'},
                              {id: 'max', type: 'number', role: 'interval'}]
                        ].concat(this.team.ratings.map(r => {
                            const score = r[1];
                            const variance = r[2];
                            const ci95 = Math.round(1.96 * Math.sqrt(variance));
                            const res = [ r[0], r[1] ];
                            res.push(score - ci95);
                            res.push(score + ci95);
                            return res;
                        }));
                    });
                });
            } else {
                this.gamesService.getTeams().subscribe(teams => {
                    this.route.paramMap.subscribe(params => {
                        this.team = teams[+params.get('teamId')];
                        this.team.results.reverse();
                        this.lineChart.dataTable = [
                            [ 'Date', 'Score',
                              {id: 'min', type: 'number', role: 'interval'},
                              {id: 'max', type: 'number', role: 'interval'}]
                        ].concat(this.team.ratings.map(r => {
                            const score = r[1];
                            const variance = r[2];
                            const ci95 = Math.round(1.96 * Math.sqrt(variance));
                            const res = [ r[0], r[1] ];
                            res.push(score - ci95);
                            res.push(score + ci95);
                            return res;
                        }));
                    });
                });
            }
        });
  }

}
