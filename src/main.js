function changeEnvironment(environment) {
  var sunset = document.getElementById("sunset");
  var ocean = document.getElementById("ocean");
  if (environment == "ocean") {
    sunset.classList.add("paused");
    ocean.classList.remove("paused");
  }
  if (environment == "sunset") {
    sunset.classList.remove("paused");
    ocean.classList.add("paused");
  }
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
