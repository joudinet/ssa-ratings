#! /bin/python3

import json
from whr import whole_history_rating
from datetime import datetime, timedelta

def days_between(d1, d2):
    d1 = datetime.strptime(d1, "%Y-%m-%d")
    d2 = datetime.strptime(d2, "%Y-%m-%d")
    return abs((d2 - d1).days)

def add_game(whr, day, team1, team2, win):
    if win == 1:
        print("On day", day, ":", team1, "win against", team2)
        whr.create_game(team1, team2, "B", days_between(day, first_day), 0)
    else:
        print("On day", day, ":", team1, "lost to", team2)
        whr.create_game(team1, team2, "W", days_between(day, first_day), 0)

def nb_games(games, team):
    n = 0
    for game in games:
        if team == game['teamA'].upper() or team == game['teamB'].upper():
            n += 1
    return n

def save_ratings(whr, games, output_file):
    whr.auto_iterate(time_limit = 10, precision = 10E-3)
    # whr.print_ordered_ratings(current = True)
    players = whr.get_ordered_ratings(current = True, compact = False)
    data = []
    for i in reversed(range(len(players))):
        data.append({
            'rank': len(players)-i,
            'name': players[i][0].upper(),
            'elo': round(players[i][1]),
            'games': nb_games(games, players[i][0].upper())
            })
    with open(output_file, 'w') as json_file:
        json.dump(data, json_file)

def save_teams(whr, games, output_file):
    players = whr.get_ordered_ratings(current = True, compact = False)
    data = []
    for i in reversed(range(len(players))):
        ratings = []
        for hist in whr.ratings_for_player(players[i][0]):
            date = datetime.strptime(first_day, "%Y-%m-%d")
            date += timedelta(days=hist[0])
            ratings.append([ str(date.date()), hist[1], hist[2]])
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

if __name__ == "__main__":
    # Masculin
    whr = whole_history_rating.Base({'w2': 14, 'uncased': True})
    with open('src/assets/games.json') as f:
        games = json.load(f)
        if len(games) >= 1:
            first_day = games[0]['day']
            for game in games:
                add_game(whr, game['day'], game['teamA'], game['teamB'], game['win'])
                save_ratings(whr, games, 'src/assets/ratings.json')
                save_teams(whr, games, 'src/assets/teams.json')
    # Feminin
    whr = whole_history_rating.Base({'w2': 14, 'uncased': True})
    with open('src/assets/fem_games.json') as f:
        games = json.load(f)
        if len(games) >= 1:
            first_day = games[0]['day']
            for game in games:
                add_game(whr, game['day'], game['teamA'], game['teamB'], game['win'])
                save_ratings(whr, games, 'src/assets/fem_ratings.json')
                save_teams(whr, games, 'src/assets/fem_teams.json')
    # Mixte
    whr = whole_history_rating.Base({'w2': 14, 'uncased': True})
    with open('src/assets/mix_games.json') as f:
        games = json.load(f)
        first_day = games[0]['day']
    for game in games:
        add_game(whr, game['day'], game['teamA'], game['teamB'], game['win'])
    save_ratings(whr, games, 'src/assets/mix_ratings.json')
    save_teams(whr, games, 'src/assets/mix_teams.json')


# whr.probability_future_match("HELENE / MIGUEL", "ALEXANDRA / VINCENT")
# elo1 = whr.ratings_for_player("HELENE / MIGUEL", current = True)[0]
# elo2 = whr.ratings_for_player("ALEXANDRA / VINCENT", current = True)[0]
#proba = 1 / (1 + 10 ** ((elo2 - elo1)/400))
#print(f"win probability of HELENE / MIGUEL ({elo1}) against ALEXANDRA / VINCENT ({elo2}): {proba:.2f}")
