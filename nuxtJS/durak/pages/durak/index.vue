<template>

<div class="view__durak">
           


    <div class="mdl-card mdl-shadow--2dp">
        <button @click="randomizeCards(wildCardsArray)" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"> 
            <i class="material-icons">casino</i>
            Wildcards</button>                  

        <div class="dice-animation" :class="diceClasses">
            <div class="dice"></div>
            <div class="wild-card" v-for="(card, index) in randomCards">
                <i class="material-icons mdl-list__item-icon">filter_{{index + 1}}</i> {{ card }}
            </div>
        </div> 
    </div>

          
    <div class="mdl-card mdl-shadow--2dp">
       <button @click="randomizeCardsNachzieh(wildCardsNachziehArray)" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"> 
           <i class="material-icons">casino</i>
           Nachzieh Wildcards</button>

        <div class="dice-animation x--nachzieh" :class="nachziehClasses">
            <div class="silicon-valley"></div> 
            <div class="wild-card" v-for="(card, index) in wildCardsNachzieh">
                <i class="material-icons mdl-list__item-icon">filter_{{index + 1}}</i> {{ card }}
            </div>
        </div>  
    </div>
          
           
            


         


</div> 

</template>

<script>
    const EXCEPTIONAL_NO_RULE = "x-mal kein effekt !!!";

    export default {
        name: "Durak",
        data() {
            return {
                wildCardsArray: [
                    "gibt kein Trumpf",
                    "ersten drei karten zum ziehen offen",
                    "alle karten werden ausgeteilt",
                    "die letzte gezogene karte bestimmt trumpf, vorher kein trumpf",
                    "kein schieben",
                    "wenn mann stechen kann, muss man stechen",
                    "durak wird zuerst angegeriffen",
                    "durak greift zuerst an",
                    "doppel/tripple durak bekommt 2-3 karten mehr",
                    "doppelte Wertigkeit (Durak, Abwesenheit)",
                    "wenn man mit 7 angreift, dann wird der übernächste angegeriffen",
                    "wenn man mit 8 angreift, dann muss der angegriffene pro 8 eine ziehen",
                    "wenn man mit 9 angreift, dann muss der angegriffene pro 9 zwei ziehen",
                    "mehr als 15 karten und nicht verloren -> strich abziehen",
                    "lucky loser: alle außer der durak bekommen einen strich, man muss aber stechen wenn man kann",
                    "die die fehlen bekommen auto strich",
                    "jeder nur 1 karte, Nachziehanzahl wird ausgewürfelt oder ist 4",
                    "zwei trumpffarben nach skat reihenfolge bei trumpfstich",
                    "zwei trumpffarben gleichwertig bei trumpfstich",
                    "zwei trumpffarben nach skat reihenfolge, eine farbe ist komplett stärker",
                    "jemand darf sich regel aussuchen",
                    "Tausch-2, zum zeitpunkt der 2 trumpf aufnahme, einmalig im spiel, hand tauschen mit jemanden",
                    "am anfang dürfen drei karten mit nachziehstapel ausgetauscht werden, danach neu mischen",
                    "Kartenwertigkeit umgedreht",
                    "1 Runde Oma Round, blind erste Karte spielen, Durak fängt an",
                    "Andere Wildcard gilt nur bis Nachziehstapel alle ist",
                    "Andere Wildcard gilt erst ab Nachziehstapel alle ist",
                    "Wenn Nachziehstapel alle ist, noch eine Wildcard ziehen",
                    "Kartenanzahl 3 + 6er Würfelaugenzahl, Nachziehkartenzahl = 6",
                    "Falsches Zugeben / Nicht aufpassen wird mit Nachziehen bestraft",
                    "69 - wenn ein 6 mit einer 9 verteidigt wird, wird die Kartenwertigkeit rumgedreht (danach gilt die 96)",
                    EXCEPTIONAL_NO_RULE,
                    EXCEPTIONAL_NO_RULE,
                    EXCEPTIONAL_NO_RULE,
                    EXCEPTIONAL_NO_RULE,
                    EXCEPTIONAL_NO_RULE,
                    EXCEPTIONAL_NO_RULE,
                    EXCEPTIONAL_NO_RULE
                ],
                wildCardsArrayNew: [],
                randomCards: [],
                wildCardsNachzieh: [],
                wildCardsNachziehArray: [
                    "gibt kein Trumpf\nkein schieben",
                    "gibt kein Trumpf",
                    "kein schieben",
                    "wenn mann stechen kann, muss man stechen",
                    "doppelte Wertigkeit (Durak, Abwesenheit)",
                    "wenn man mit 7 angreift, dann wird der übernächste angegeriffen",
                    "wenn man mit 8 angreift, dann muss der angegriffene pro 8 eine ziehen",
                    "wenn man mit 9 angreift, dann muss der angegriffene pro 9 zwei ziehen",
                    "lucky loser: alle außer der durak bekommen einen strich, man muss aber stechen wenn man kann",
                    "die die fehlen bekommen auto strich",
                    "zwei trumpffarben nach skat reihenfolge bei trumpfstich",
                    "zwei trumpffarben gleichwertig bei trumpfstich",
                    "Kartenwertigkeit umgedreht",
                    "Karo Trumpf",
                    "Piek Trumpf",
                    "Herz Trumpf",
                    "Kreuz Trumpf"
                ]
            };
        },
        computed: {
            diceClasses() {
                return [
                    { [`x--roll`]: this.randomCards.length > 0 }
                ];
            },
              nachziehClasses() {
                return [
                    { [`x--roll`]: this.wildCardsNachzieh.length > 0 }
                ];
            }
        },
        methods: {
            randomizeCards(cards, amount = 2) {
                this.randomCards = [];

                setTimeout(() => {
                    const localCopy = [...cards];

                    for (let i = 0; i < amount; i++) {                     
                        let randomIndex = Math.floor(Math.random() * localCopy.length);
                        this.randomCards.push(...localCopy.splice(randomIndex, 1));
                    }

                }, 500)


            },
            randomizeCardsNachzieh(cards, amount = 1) {
                this.wildCardsNachzieh = [];

                setTimeout(() => {
                    const localCopy2 = [...cards];

                    for (let i = 0; i < amount; i++) {                     
                        let randomIndex = Math.floor(Math.random() * localCopy2.length);
                        this.wildCardsNachzieh.push(...localCopy2.splice(randomIndex, 1));
                    }

                }, 500)


            }
        }
    };
</script>

<style lang="scss">

.view__durak {
    padding: 1em;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    button {
        margin-bottom: 1em;
    }

    .mdl-card { 
        margin-bottom: 1em;
    }

}
.dice-animation {
            position: relative;
            background-size: 100% auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 0;
            overflow: hidden;
            transition: all 0.3s ease;

            @keyframes dice {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(300%);
                    opacity: 0;
                }
            }
            @keyframes wildcard {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }

            &.x--roll {
                height: 146px;

                .dice {
                    opacity: 1;
                    animation: dice 0.2s ease 4.1s forwards;
                }

                .wild-card {
                    animation: wildcard 0.6s ease 4.1s forwards;
                }

                &.x--nachzieh {
                    .silicon-valley { 
                        opacity: 1;
                        animation: dice 0.2s ease 3.3s forwards;
                    } 
                 }

            }

            .dice {
                position: absolute;
                width: 200px;
                height: 146px;
                background-size: 100% auto;
                background-image: url("../../assets/dice.gif");
                opacity: 0;
            }

            .silicon-valley {
                position: absolute;
                width: 200px;
                height: 146px;
                background-size: 100% auto;
                background-image: url("../../assets/silicon-valley.gif");
                opacity: 0;
            }

            .wild-card {
                font-weight: bold;
                font-size: 1.1em;
                padding: 0.3em;
                margin: 0.3em;
                opacity: 0;
                display: flex;

                i {
                    margin-right: 0.3em
                } 

            }

        }
</style> 

