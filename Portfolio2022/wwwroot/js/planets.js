const planets = document.getElementsByClassName("info-planet");
console.log(planets);

for (let planet of planets) {
    console.log(planet);
    planet.style.top = Math.floor(Math.random() * (window.innerHeight - 75)) + "px";
    planet.style.left = Math.floor(Math.random() * (window.innerWidth - 75)) + "px";
}