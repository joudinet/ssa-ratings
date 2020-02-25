#! /bin/sh -eu

CSV=$1
JSON_GAMES=${2-src/assets/games.json}

export_results() {
    local csv="$1" out="$2"

    {
	echo "["
	grep '[01][[:space:]]*$' "$csv" |
	    sed -rne 's#^([^,]*),([^,]*),([^,]*),([^[:space:]]*)[[:space:]]*$#{"day": "\1", "teamA":"\2", "teamB":"\3", "win":\4},#pg' |
	    sed '$ s#.$#\]#'
    } | jq . >"$out"
}

export_results "$CSV" "$JSON_GAMES"
