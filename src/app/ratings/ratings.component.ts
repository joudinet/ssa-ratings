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
    hideUnreliable: boolean;
    teamA;
    teamB;
    winProba;

    constructor(
        private route: ActivatedRoute,
        private gamesService: GamesService) { }

    ngOnInit(): void {
        this.hideUnreliable = false;
        this.route.url.subscribe(url => {
            if (url.length > 0 && url[0].path === 'f') {
                this.gamesService.getFemTeams().subscribe(teams => {
                    this.teams = Object.values(teams)
                        .map(team => ({...team,
                                       reliable: this.isReliable(team)}));
                });
                this.gamesService.getFemGames().subscribe(games => {
                    this.games = Array.prototype.reverse.call(games);
                });
            } else if (url.length > 0 && url[0].path === 'x') {
                this.gamesService.getMixTeams().subscribe(teams => {
                    this.teams = Object.values(teams)
                        .map(team => ({...team,
                                       reliable: this.isReliable(team)}));
                });
                this.gamesService.getMixGames().subscribe(games => {
                    this.games = Array.prototype.reverse.call(games);
                });
            } else {
                this.gamesService.getTeams().subscribe(teams => {
                    this.teams = Object.values(teams)
                        .map(team => ({...team,
                                       reliable: this.isReliable(team)}));
                });
                this.gamesService.getGames().subscribe(games => {
                    this.games = Array.prototype.reverse.call(games);
                });
            }
        });
    }

    isReliable(team) {
        const opponents = new Set(team.results.map(res => res.versus));
        return team.results.length > 9 && opponents.size > 7;
    }

    ci95(variance) {
        return Math.round(1.96 * Math.sqrt(variance));
    }

    onChangeTeamA(team) {
        this.teamA = team;
        this.computeProba();
    }
    onChangeTeamB(team) {
        this.teamB = team;
        this.computeProba();
    }
    computeProba() {
        if (this.teamA && this.teamA.ratings &&
            this.teamB && this.teamB.ratings) {
            const scoreA = this.teamA.ratings[this.teamA.ratings.length - 1][1];
            const scoreB = this.teamB.ratings[this.teamB.ratings.length - 1][1];
            this.winProba =
                Math.round(100 / (1 + Math.pow(10, (scoreB - scoreA) / 400)));
        }
    }
}
