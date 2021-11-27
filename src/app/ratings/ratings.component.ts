import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {
    games;
    ratings;
    teams;
    hideUnreliable:boolean;

    constructor(
        private route: ActivatedRoute,
        private gamesService: GamesService) { }

    ngOnInit(): void {
        this.hideUnreliable = false;
        this.route.url.subscribe(url => {
            if (url.length > 0 && url[0].path === "f") {
                this.teams = this.gamesService.getFemTeams();
                this.gamesService.getFemGames().subscribe(games => {
                    this.games = Array.prototype.reverse.call(games);
                });
            }
            else if (url.length > 0 && url[0].path === "x") {
                this.teams = this.gamesService.getMixTeams();
                this.gamesService.getMixGames().subscribe(games => {
                    this.games = Array.prototype.reverse.call(games);
                });
            }
            else {
                this.teams = this.gamesService.getTeams();
                this.gamesService.getGames().subscribe(games => {
                    this.games = Array.prototype.reverse.call(games);
                });
            }
        });
    }
}
