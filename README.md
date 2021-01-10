# SsaRatings

A website to manage beach volley team ratings at Sand System based on
Rémi Coulom's Whole-History Rating (WHR) algorithm.

## Generate assets

Use the following script to generate the results assets from a list of
results in CSV format:
- For men results:
  `./resultats2json.sh PATH/TO/MEN_RESULTS.csv src/assets/games.json`
- For women results:
  `./resultats2json.sh PATH/TO/WOMEN_RESULTS.csv src/assets/fem_games.json`
- For mixed results:
  `./resultats2json.sh PATH/TO/MIX_RESULTS.csv src/assets/mix_games.json`

Then use the python scripts to compute the WKR according to these results:
`python3 compute_whr.py`

NOTE: This script requires the whole_history_rating python library:
https://github.com/pfmonville/whole_history_rating

## Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
