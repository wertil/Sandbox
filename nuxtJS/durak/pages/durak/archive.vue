<template>
  <div class="view__durak-archive">
    <div class="buttons">
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

    <div
      class="mdl-card mdl-shadow--2dp"
      :style="`background-image: url('../../durak/${seasons[selectedSeason].file}.png');`"
    ></div>
  </div>
</template>

<script>
export default {
  name: "Durak Archive",
  data() {
    return {
      seasons: [
        { season: "Season 2018/3", file: "DURAK_2018_4" },
        { season: "Season 2019/1", file: "DURAK_2019_1" },
        { season: "Season 2019/2", file: "DURAK_2019_2" },
        { season: "Season 2019/3", file: "DURAK_2019_3" },
        { season: "Season 2019/4", file: "DURAK_2019_4" }
      ],
      currentSeason: 4,
      selectedSeason: 4
    };
  },
  mounted() {
    this.currentSeason = this.seasons.length - 1;
    this.selectedSeason = this.seasons.length - 1;
  },
  computed: {},
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
.view__durak-archive {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;

  .buttons {
    width: 100%;
    margin-bottom: 1em;
    display: flex;
    justify-content: space-evenly;
  }

  .mdl-card {
    height: 100%;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
}
</style> 

