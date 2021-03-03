document.addEventListener("DOMContentLoaded", function (event) {

    const arr = [
        {name: "LinkedIn", link: "https://www.linkedin.com/learning/mastering-web-developer-interview-code"},
        {name: "Blog", link: "https://parceljs.org/"},
        {name: "Twitter", link: "https://pwa.nuxtjs.org/setup"},
    ]

    const myLinks = document.querySelector("#myLinks");

    const html = arr.map(link => `<li><a href="${link.link}">${link.name}</a></li>`).join("")


    myLinks.innerHTML = html;


    // Countries
    const getCountryInfo = country => {
        fetch(`https://restcountries.eu/rest/v2/name/${country}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                document.querySelector(".country h1").innerHTML = data[0]?.name
                const neighbours = data[0].borders
                console.log(`https://restcountries.eu/rest/v2/alpha?codes=${neighbours.join(";")}`);
                return fetch(`https://restcountries.eu/rest/v2/alpha?codes=${neighbours.join(";")}`)
            })
            .then( response => response.json())
            .then(data => {
                const html = data.map(country => country.name + ", ").join("")
                document.querySelector(".neighbours").innerHTML = html
            })

    }

    getCountryInfo("Germany")

});


