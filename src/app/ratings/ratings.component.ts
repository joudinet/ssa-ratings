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

    constructor(
	private route: ActivatedRoute,
	private gamesService: GamesService) { }

    ngOnInit(): void {
	this.route.url.subscribe(url => {
	    if (url.length > 0 && url[0].path === "f") {
		this.ratings = this.gamesService.getFemRatings();
		this.gamesService.getFemGames().subscribe(games => {
		    this.games = Array.prototype.reverse.call(games);
		});
	    }
	    else {
		this.ratings = this.gamesService.getRatings();
		this.gamesService.getGames().subscribe(games => {
		    this.games = Array.prototype.reverse.call(games);
		});
	    }
	});
    }
}
