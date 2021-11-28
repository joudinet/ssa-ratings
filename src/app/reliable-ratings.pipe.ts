import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'reliableRatings' })
export class ReliableRatingsPipe implements PipeTransform {
    transform(allTeams: any[], filter: boolean) {
        if (!filter) {
            return allTeams;
        }
        return allTeams.filter(team => {
            const opponents = new Set(team.results.map(res => res.versus));
            return team.results.length > 9 && opponents.size > 7;
        });
    }
}
