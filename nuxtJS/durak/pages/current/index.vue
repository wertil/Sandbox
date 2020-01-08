<template>
  <div class="container">
    <h4 v-if="hasStanding">{{ getTitle }}</h4>

    <table
      class="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp durak-table"
      v-if="hasStanding"
    >
      <thead>
        <tr>
          <th class="name">Name</th>
          <th class="standing">Standing</th>
          <th class="mia">MIA</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in durakStanding.Athletes" :key="item.id">
          <td :class="`name  ${hearts[item.Name]}  
		  				${item.IsSeasonChampion?'x--season-durak':''}
						${item.IsDurak?'x--durak':''}  
						  `">
            <span><div class="player">{{item.Name}}</div></span>
          </td>
          <td class="standing">I</td>
          <td class="mia">{{item.Absence}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import Durak from "~/pages/durak/index.vue";
import { fetchJsonData } from "../../utils/request";
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      durakStanding: false
    };
  },
  computed: {
    hasStanding() {
      return this.durakStanding;
    },
    getTitle() {
      return `${this.durakStanding.Season.Quarter} / ${this.durakStanding.Season.Year}`;
    },

    groupedAthletes() {
      const grouped = [];
      const step = 5;

      this.Athletes.forEach(Athlete => {
        const newTicks = [];
        const TotalTicks = [];

        //add absence ticks
        for (
          let i = 0;
          i < Math.floor(Athlete.Absence / this.Season.AbsenceDivider);
          i++
        ) {
          TotalTicks.push({ Type: "Single" });
        }

        // add game ticks
        const ticks = JSON.parse(JSON.stringify(Athlete.Ticks));
        for (let i = 0; i < ticks.length; i++) {
          TotalTicks.push(ticks[i]);
        }

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
      return grouped.sort((a, b) => {
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
  mounted() {
    fetchJsonData(
      "https://cors-anywhere.herokuapp.com/http://www.samasama.de/durak/DURAK.json"
    )
      .then(res => {
        this.durakStanding = res.Durak;
      })
      .catch(() => {
        this.durakStanding = null;
      });
  }
};
</script>

<style lang="scss">
.durak-table {
  width: 100%;

  .name {
    position: relative;
    text-align: left;
    text-indent: 0.6em;

    &:before {
      position: absolute;
      left: 3.2em;
      top: 0.2em;
      width: 1em;
      height: 1em;
      content: "";
      background: url("../../assets/heart.png") repeat-x;
      background-size: auto 100%;
	  overflow: hidden;
	  width: 0;
    }

    &.x--season-durak {
      span:before {
        position: absolute;
        left: -2.1em;
        top: -0.6em;
        width: 2em;
        height: 2em;
        content: "";
        background: url("../../static/icon.png") no-repeat;
		background-size: contain;
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
    }

    span {
      position: relative;
      display: inline-block;
      transform: translateY(0.3em);
	  font-weight: bold;
	}
	
	.player {
		font-size: 1.3em;
	}


  }

  .standing {
    text-align: left;
  }

  .mia {
    text-align: center;
  }
}
</style>
