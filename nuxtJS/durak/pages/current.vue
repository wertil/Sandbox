<template>
    <div class="container">
        <div class="buttons"
             v-if="hasStanding">
            <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
                    @click="previousSeason"
                    :disabled="isFirstSeason">
                <i class="material-icons">arrow_back</i>
            </button>

            <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
                    @click="nextSeason"
                    :disabled="isLastSeason">
                <i class="material-icons">arrow_forwardk</i>
            </button>
        </div>

        <h4 v-if="hasStanding">{{ getTitle }}</h4>

        <table class="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp durak-table"
               v-if="hasStanding">
            <thead>
                <tr>
                    <th class="name">Name</th>
                    <th class="standing">Result</th>
                    <th class="result"></th>
                    <th class="mia">MIA</th>
                </tr>
            </thead>
            <tbody>
                <!-- <tr v-for="athlete in groupedAthletes" :key="athlete.id">			 -->
                <tr v-for="athlete in groupedAthletes"
                    :key="athlete.id"  :class="`${athlete.IsDurak?'x--durak':''}`">
                    <td :class="getAthleteClass(athlete)">
                        <span>
                            <div class="player">{{athlete.Name}}</div>
                        </span>

                        <div class="season-champion"
                             v-if="athlete.SeasonChampionCount">
                            <span v-for="n in athlete.SeasonChampionCount"></span>
                        </div>
                    </td>
                    <td class="standing">
                        <div v-for="group in athlete.Ticks"
                             class="tick-group">
                            <span v-for="tick in group"
                                  :class="`tick ${tick.Type}` | lowercase">I</span>
                        </div>
                    </td>
                    <td class="result">{{athlete.Sum}}</td>
                    <td class="mia">{{athlete.Absence}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import Logo from "~/components/Logo.vue";
    import Durak from "~/pages/durak/index.vue";
    import { fetchJsonData } from "../utils/request";

    import { getDurakChannelName } from "../utils/helper";
    import { durakSeasons } from "../static/durak/seasons";

    export default {
        name: "DurakCurrent",
        components: {},
        data() {
            return {
                durakStanding: undefined,
                selectedSeason: undefined
            };
        },
        mounted() {
            this.fetchCurrentSeasonJson();
        },
        watch: {
            selectedSeason(season) {
                this.fetchSeasonJson(season);
            }
        },
        computed: {
            hasStanding() {
                return this.durakStanding;
            },
            getTitle() {
                return `${this.seasonIndex + 1}. Season ${
                    this.durakStanding.Season.Quarter
                } / ${this.durakStanding.Season.Year}`;
            },
            groupedAthletes() {
                const step = 5;

                const grouped = this.durakStanding.Athletes.map(Athlete => {
                    const newTicks = [];
                    let TotalTicks = [];

                    //add absence ticks
                    for (
                        let i = 0;
                        i <
                        Math.floor(
                            Athlete.Absence /
                                this.durakStanding.Season.AbsenceDivider
                        );
                        i++
                    ) {
                        TotalTicks.push({ Type: "Single" });
                    }

                    // add game ticks
                    const ticks = Athlete.Ticks;
                    for (let i = 0; i < ticks.length; i++) {
                        TotalTicks.push(ticks[i]);
                    }

                    // negative ticks (having more than 15 cards and not losing)
                    // count negative ticks

                    const negativeTicks = TotalTicks.filter(item => {
                        return item.Type === "Negative";
                    });
                    let negativeCount = negativeTicks.length;

                    // remove single ticks based on negative count
                    let removeCount = 0;

                    const ticksAfterNegative = TotalTicks.filter(item => {
                        if (item.Type === "Single" && removeCount < negativeCount) {
                            removeCount++;
                            return false;
                        }
                          return item.Type !== "Negative";
                    });

                    TotalTicks = ticksAfterNegative;

                    for (let i = 0; i < TotalTicks.length; i += step) {
                        const group = [];
                        for (
                            let j = i;
                            j < i + step && j < TotalTicks.length;
                            j++
                        ) {
                            group.push(TotalTicks[j]);
                        }
                        newTicks.push(group);
                    }

                    let DoubleCount = 0;
                    let TripleCount = 0;

                    for (let i = 0; i < TotalTicks.length; i++) {
                        if (TotalTicks[i].Type === "Double") DoubleCount++;
                        if (TotalTicks[i].Type === "Triple") TripleCount++;
                    }

                    return {
                        Name: Athlete.Name,
                        Ticks: newTicks,
                        Sum: TotalTicks.length,
                        DoubleSum: DoubleCount,
                        TripleSum: TripleCount,
                        Absence: Athlete.Absence,
                        IsSeasonChampion: Athlete.IsSeasonChampion,
                        IsDurak: Athlete.IsDurak,
                        SeasonChampionCount: Athlete.SeasonChampionCount
                    };
                });

                grouped.sort((a, b) => {
                    return b.Sum - a.Sum === 0
                        ? b.TripleSum - a.TripleSum === 0
                            ? b.DoubleSum - a.DoubleSum === 0
                                ? b.Absence - a.Absence === 0
                                    ? a.Name.toLowerCase().localeCompare(
                                          b.Name.toLowerCase()
                                      )
                                    : b.Absence - a.Absence
                                : b.DoubleSum - a.DoubleSum
                            : b.TripleSum - a.TripleSum
                        : b.Sum - a.Sum;
                });

                return grouped;
            },
            currentSeason() {
                return durakSeasons[durakSeasons.length - 1];
            },
            seasonIndex() {
                return durakSeasons.indexOf(this.selectedSeason);
            },
            isFirstSeason() {
                return this.seasonIndex === 0;
            },
            isLastSeason() {
                return (
                    durakSeasons.indexOf(this.selectedSeason) ===
                    durakSeasons.length - 1
                );
            }
        },
        methods: {
            getSelectedSeasonChannelName(season) {
                const { year, quarter } = season;
                return getDurakChannelName(year, quarter);
            },
            fetchSeasonJson(season) {
                fetchJsonData(
                    `/durak/durak/${this.getSelectedSeasonChannelName(season)}`
                    // "https://cors-anywhere.herokuapp.com/http://www.samasama.de/durak/durak/DURAK_JSON.json"
                )
                    .then(json => {
                        this.durakStanding = json.Durak;
                    })
                    .catch(() => {
                        this.durakStanding = undefined;
                    });
            },
            fetchCurrentSeasonJson() {
                this.selectedSeason = this.currentSeason;
                this.fetchSeasonJson(this.currentSeason);
            },
            previousSeason() {
                if (!this.isFirstSeason) {
                    this.selectedSeason = durakSeasons[this.seasonIndex - 1];
                }
            },
            nextSeason() {
                if (!this.isLastSeason) {
                    this.selectedSeason = durakSeasons[this.seasonIndex + 1];
                }
            },
            getAthleteHearts(athlete) {
                const absenceDivider = this.durakStanding.Season.AbsenceDivider;
                return absenceDivider - (athlete.Absence % absenceDivider);
            },
            getAthleteClass(athlete) {
                return [
                    "name",
                    `x--hearts-${this.getAthleteHearts(athlete)}`,
                    { "x--season-durak": athlete.IsSeasonChampion },
                    { "x--durak": athlete.IsDurak }
                ];
            }
        }
    };
</script>

<style lang="scss">
    .durak-table { 
        width: 100%;

		.x--durak {
			background: #ffe7e7;
		}

        td {
            padding: 0.5em;
        }

        .name {
            position: relative; 
            text-align: left;
            text-indent: 0.3em;

            &:before {
                position: absolute;
                left: 2.5m;
                top: 0.2em;
                width: 1em;
                height: 1em;
                content: "";
                background: url("../assets/heart.png") repeat-x;
                background-size: auto 100%;
                overflow: hidden;
                width: 0;
                transform: scale(0.8);
            }

            &.x--hearts-4 {
                &:before {
                    width: 4.85em;
                }
            }

            &.x--hearts-3 {
                &:before {
                    width: 3.65em;
                }
            }

            &.x--hearts-2 {
                &:before {
                    width: 2.45em;
                }
            }

            &.x--hearts-1 {
                &:before {
                    width: 1.25em;
                }
            }

            &.x--season-durak {
                > span:before {
                    position: absolute;
                    left: -2.1em;
                    top: -0.6em;
                    width: 2em;
                    height: 2em;
                    content: "";
                    background: url("../static/icon.png") no-repeat;
                    background-size: contain;
                }
            }

            > span {
                position: relative;
                display: inline-block;
                transform: translateY(0.3em);
                font-weight: bold;
            }

            .player {
                font-size: 1.3em;
            }

            .season-champion {
                position: absolute;
                left: 2.4em;
                bottom: 0.2em;
                display: flex;
                justify-content: flex-start;

                span {
                    display: inline-block;
                    width: 1em;
                    height: 1em;
                    background: url("../static/icon.png") no-repeat;
                    background-size: contain;
                }
            }
        }

        .result {
            text-align: center;
            max-width: 3em;
        }

        .standing {
            text-align: left;
            min-width: 20vw;
            white-space: normal;

            .tick-group {
                position: relative;
                display: inline-block;
                margin-right: 0.3em;
            }

            .tick {
                font-weight: bold;
                font-size: 1.9em;
                color: grey;

                &.double {
                    color: #ffc107;
                }

                &.triple {
                    color: #e91e63;
                }

                &:nth-child(5) {
                    position: absolute;
                    left: 0.35em;
                    transform: rotate(69deg) scaleY(1.8);
                }
            }
        }

        .mia {
            text-align: center;
        }

        tbody {
            .result {
                font-weight: bold;
                font-size: 1.5em;
            }
        }
    }
</style>
