#! /bin/python3

import json
from whr import whole_history_rating
from datetime import datetime, timedelta

def days_between(d1, d2):
    d1 = datetime.strptime(d1, "%Y-%m-%d")
    d2 = datetime.strptime(d2, "%Y-%m-%d")
    return abs((d2 - d1).days)

def add_game(whr, day, team1, team2, win, first_day):
        whr.create_game(team1, team2, "B" if win == 1 else "W",
                        days_between(day, first_day), 0)

def nb_games(games, team):
    n = 0
    for game in games:
        if team == game['teamA'].upper() or team == game['teamB'].upper():
            n += 1
    return n

def save_teams(whr, games, output_file):
    first_day = games[0]['day']
    whr.auto_iterate(time_limit = 60, precision = 10E-3)
    players = whr.get_ordered_ratings(current = True, compact = False)
    data = []
    for i in reversed(range(len(players))):
        ratings = []
        for hist in whr.ratings_for_player(players[i][0]):
            date = datetime.strptime(first_day, "%Y-%m-%d")
            date += timedelta(days=hist[0])
            ratings.append([ str(date.date()), hist[1] + 1500, hist[2]])
        results = []
        for game in games:
            if game['teamA'].upper() == players[i][0].upper():
                results.append({
                    'date': game['day'],
                    'win': game['win'],
                    'versus': game['teamB']
                })
            elif game['teamB'].upper() == players[i][0].upper():
                results.append({
                    'date': game['day'],
                    'win': 0 if game['win'] == 1 else 1,
                    'versus': game['teamA']
                })
        data.append({
            'name': players[i][0].upper(),
            'ratings': ratings,
            'results': results
        })
    with open(output_file, 'w') as json_file:
        json.dump(data, json_file)

def run_whr(category, input_file, output_file):
    whr = whole_history_rating.Base({'w2': 14, 'uncased': True})
    with open(input_file) as f:
        games = json.load(f)
        print("Last", category, "game played on", games[-1]['day'], ":",
              games[-1]['teamA'],
              "won against" if games[-1]['win'] else "lost to",
              games[-1]['teamB'])
        if len(games) >= 1:
            first_day = games[0]['day']
            for game in games:
                add_game(whr, game['day'], game['teamA'],
                         game['teamB'], game['win'], first_day)
            save_teams(whr, games, output_file)

if __name__ == "__main__":
    # Masculin
    run_whr('men', 'src/assets/games.json', 'src/assets/teams.json');
    # Feminin
    run_whr('women', 'src/assets/fem_games.json', 'src/assets/fem_teams.json');
    # Mixte
    run_whr('mixt', 'src/assets/mix_games.json', 'src/assets/mix_teams.json');

# whr.probability_future_match("HELENE / MIGUEL", "ALEXANDRA / VINCENT")
# elo1 = whr.ratings_for_player("HELENE / MIGUEL", current = True)[0]
# elo2 = whr.ratings_for_player("ALEXANDRA / VINCENT", current = True)[0]
#proba = 1 / (1 + 10 ** ((elo2 - elo1)/400))
#print(f"win probability of HELENE / MIGUEL ({elo1}) against ALEXANDRA / VINCENT ({elo2}): {proba:.2f}")
