import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'reliableRatings' })
export class ReliableRatingsPipe implements PipeTransform {
    transform(allTeams: any[], filter: boolean) {
        if (!filter) {
            return allTeams;
        }
        return allTeams.filter(team => team.reliable);
    }
}
