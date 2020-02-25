import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
    gamesUrl = 'assets/games.json';
    ratingsUrl = 'assets/ratings.json';
    teamsUrl = 'assets/teams.json';
    femGamesUrl = 'assets/fem_games.json';
    femRatingsUrl = 'assets/fem_ratings.json';
    femTeamsUrl = 'assets/fem_teams.json';

    constructor(private http: HttpClient) { }

    getGames() {
	return this.http.get(this.gamesUrl);
    }

    getRatings() {
	return this.http.get(this.ratingsUrl);
    }

    getTeams() {
	return this.http.get(this.teamsUrl);
    }

    getFemGames() {
	return this.http.get(this.femGamesUrl);
    }

    getFemRatings() {
	return this.http.get(this.femRatingsUrl);
    }

    getFemTeams() {
	return this.http.get(this.femTeamsUrl);
    }
}
