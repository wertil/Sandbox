
// import {leafletMap} from './modules/maps';
// leafletMap();   


// import Search from './modules/search.js';
// const search = new Search();

const channels = [
    { name: 'HBO', premium: true },
    { name: 'LIFE', premium: false },
    { name: 'Max', premium: true },
    { name: 'Cooking channel', premium: false },
    { name: 'WOBI', premium: false }
];
const user = {
    name: 'Francis',
    premium: true,
    premiumChannels: function () {
        // GET THE PREMIUM CHANNELS IS "PREMIUM" IS true
        if (this.premium) {
            return channels.filter((channel) => {
                return channel.premium;
            })
        }

    },
    channels: function () {
        // GET THE NON-PREMIUM CHANNELS
        return channels.filter((channel) => {
            return !channel.premium;
        })
    }
}
console.log(user.premiumChannels())
// brings HBO and MAX
console.log(user.channels())
 // brings LIFE, COOCKING CHANNEL AND WOBI


// document.body.insertAdjacentHTML('beforeend', premiumChannels);
