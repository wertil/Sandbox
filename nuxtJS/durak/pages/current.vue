<template>
  <div class="container">
    <div class="buttons" v-if="hasStanding">
      <button
        class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
        @click="previousSeason"
      >
        <i class="material-icons">arrow_back</i>
      </button>

      <button
        class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
        @click="nextSeason"
      >
        <i class="material-icons">arrow_forwardk</i>
      </button>
    </div>

    <h4 v-if="hasStanding">{{ getTitle }}</h4>

    <table
      class="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp durak-table"
      v-if="hasStanding"
    >
      <thead>
        <tr>
          <th class="name">Name</th>
          <th class="standing">Result</th>
          <th class="result"></th>
          <th class="mia">MIA</th>
        </tr>
      </thead>
      <tbody>
        <!-- <tr v-for="item in grouped" :key="item.id">			 -->
        <tr v-for="item in local" :key="item.id">
          <td
            :class="`name  ${hearts[item.Name]}  
		  				${item.IsSeasonChampion?'x--season-durak':''}
						${item.IsDurak?'x--durak':''}   
						  `"
          >
            <span>
              <div class="player">{{item.Name}}</div>
            </span>

            <div class="season-champion" v-if="item.SeasonChampionCount">
              <span v-for="n in item.SeasonChampionCount"></span>
            </div>
          </td>
          <td class="standing">
            <div v-for="group in item.Ticks" class="tick-group">
              <span v-for="tick in group" :class="`tick ${tick.Type}` | lowercase">I</span>
            </div>
          </td>
          <td class="result">{{item.Sum}}</td>
          <td class="mia">{{item.Absence}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import Durak from "~/pages/durak/index.vue";
import { fetchJsonData } from "../utils/request";
import axios from "axios";

export default {
  name: "DurakCurrent",
  components: {},
  data() {
    return {
      durakStanding: false,
      grouped: false,
      seasons: [
        { Season: "4/2018", Json: "DURAK_2018_4_JSON.json" },
        { Season: "1/2019", Json: "DURAK_2019_1_JSON.json" },
        { Season: "2/2019", Json: "DURAK_2019_2_JSON.json" },
        { Season: "3/2019", Json: "DURAK_2019_3_JSON.json" },
        { Season: "4/2019", Json: "DURAK_2019_4_JSON.json" },
        { Season: "1/2020", Json: "DURAK_JSON.json" }
      ],
      currentSeason: undefined,
      selectedSeason: undefined,
      local: [
        {
          Name: "Alex",
          Ticks: [
            [
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" }
            ],
            [
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" }
            ],
            [
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" }
            ],
            [
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single", wildcard: true },
              { Type: "Single", wildcard: true },
              { Type: "Single", wildcard: true }
            ]
          ],
          Sum: 20,
          DoubleSum: 0,
          TripleSum: 0,
          Absence: 48,
          IsSeasonChampion: undefined,
          IsDurak: false,
          SeasonChampionCount: undefined
        },
        {
          Name: "Sven",
          Ticks: [
            [
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" }
            ],
            [
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" }
            ],
            [
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Double" },
              { Type: "Single" },
              { Type: "Single" }
            ],
            [
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" }
            ]
          ],
          Sum: 19,
          DoubleSum: 1,
          TripleSum: 0,
          Absence: 4,
          IsSeasonChampion: undefined,
          IsDurak: true,
          SeasonChampionCount: 1
        },
        {
          Name: "Jojo",
          Ticks: [
            [
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" }
            ],
            [
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" }
            ],
            [
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" }
            ],
            [{ Type: "Single" }]
          ],
          Sum: 16,
          DoubleSum: 0,
          TripleSum: 0,
          Absence: 24,
          IsSeasonChampion: undefined,
          IsDurak: false,
          SeasonChampionCount: undefined
        },
        {
          Name: "Tilo",
          Ticks: [
            [
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" }
            ],
            [
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" }
            ],
            [{ Type: "Double" }, { Type: "Single" }, { Type: "Single" }]
          ],
          Sum: 13,
          DoubleSum: 1,
          TripleSum: 0,
          Absence: 10,
          IsSeasonChampion: false,
          IsDurak: false,
          SeasonChampionCount: 2
        },
        {
          Name: "Johannes",
          Ticks: [
            [
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" }
            ],
            [
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" }
            ],
            [{ Type: "Single" }, { Type: "Single" }, { Type: "Single" }]
          ],
          Sum: 13,
          DoubleSum: 0,
          TripleSum: 0,
          Absence: 17,
          IsSeasonChampion: true,
          IsDurak: false,
          SeasonChampionCount: 3
        },
        {
          Name: "Basti",
          Ticks: [
            [
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Double" },
              { Type: "Single" }
            ],
            [
              { Type: "Double" },
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" }
            ],
            [{ Type: "Single" }]
          ],
          Sum: 11,
          DoubleSum: 2,
          TripleSum: 0,
          Absence: 4,
          IsSeasonChampion: undefined,
          IsDurak: false,
          SeasonChampionCount: undefined
        },
        {
          Name: "Felix",
          Ticks: [
            [
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" },
              { Type: "Single" }
            ],
            [{ Type: "Single" }, { Type: "Single" }]
          ],
          Sum: 7,
          DoubleSum: 0,
          TripleSum: 0,
          Absence: 6,
          IsSeasonChampion: undefined,
          IsDurak: false,
          SeasonChampionCount: undefined
        }
      ]
    };
  },
  mounted() {
    fetchJsonData(
      "/durak/durak/DURAK_JSON.json"
      //   "https://cors-anywhere.herokuapp.com/http://www.samasama.de/durak/durak/DURAK_JSON.json"
    )
      .then(res => {
        this.durakStanding = res.Durak;
        this.currentSeason = this.seasons.length - 1;
        this.selectedSeason = this.seasons.length - 1;
      })
      .catch(() => {
        this.durakStanding = null;
      });
  },
  watch: {
    selectedSeason(value) {
      fetchJsonData(`/durak/durak/${this.seasons[value].Json}`)
        .then(res => {
          this.durakStanding = res.Durak;
        })
        .catch(() => {
          this.durakStanding = null;
        });
    }
  },
  computed: {
    hasStanding() {
      return this.durakStanding;
    },
    getTitle() {
      return `Season ${this.durakStanding.Season.Quarter} / ${this.durakStanding.Season.Year}`;
    },

    groupedAthletes2() {
      const grouped = [];
      const step = 5;

      this.durakStanding.Athletes.forEach(Athlete => {
        const newTicks = [];
        let TotalTicks = [];

        //add absence ticks
        for (
          let i = 0;
          i <
          Math.floor(
            Athlete.Absence / this.durakStanding.Season.AbsenceDivider
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
          return item.Type === "Single";
        });

        TotalTicks = ticksAfterNegative;

        for (let i = 0; i < TotalTicks.length; i += step) {
          const group = [];
          for (let j = i; j < i + step && j < TotalTicks.length; j++) {
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

        grouped.push({
          Name: Athlete.Name,
          Ticks: newTicks,
          Sum: TotalTicks.length,
          DoubleSum: DoubleCount,
          TripleSum: TripleCount,
          Absence: Athlete.Absence,
          IsSeasonChampion: Athlete.IsSeasonChampion,
          IsDurak: Athlete.IsDurak,
          SeasonChampionCount: Athlete.SeasonChampionCount
        });
      });

      this.grouped = grouped.sort((a, b) => {
        return b.Sum - a.Sum === 0
          ? b.TripleSum - a.TripleSum === 0
            ? b.DoubleSum - a.DoubleSum === 0
              ? b.Absence - a.Absence === 0
                ? a.Name.toLowerCase().localeCompare(b.Name.toLowerCase())
                : b.Absence - a.Absence
              : b.DoubleSum - a.DoubleSum
            : b.TripleSum - a.TripleSum
          : b.Sum - a.Sum;
      });

      this.grouped = grouped;
    },

    hearts() {
      const hearts = {};
      this.durakStanding.Athletes.forEach(Athlete => {
        hearts[Athlete.Name] = `x--hearts-${this.durakStanding.Season
          .AbsenceDivider -
          (Athlete.Absence % this.durakStanding.Season.AbsenceDivider)}`;
      });
      return hearts;
    }
  },
  methods: {
    previousSeason() {
      if (this.selectedSeason > 0) {
        this.selectedSeason--;
      } else {
        this.selectedSeason = this.seasons.length - 1;
      }
    },

    nextSeason() {
      if (this.selectedSeason + 1 < this.seasons.length) {
        this.selectedSeason++;
      } else {
        this.selectedSeason = 0;
      }
    }
  }
};
</script>

<style lang="scss">
.durak-table {
  width: 100%;

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
