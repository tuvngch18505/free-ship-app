
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress-bar');
const progressBarFill = document.querySelector('.progress-bar-fill');
const urlApi = "/apps/freeship-proxy/config";

// function positionProgressBar() {
//   fetch(urlApi)
//     .then(response => response.json())
//     .then((booster) => {
//       console.log(booster.design.position);
//       const position = booster.design.position ? booster.design.position : "";
//       console.log(position);
//       if (position === "Top page") {
//         progressBarFill.style.top = 0;
//         progressBarFill.style.left = 0;
//       } else {
//         progressBarFill.style.bottom = 0;
//         progressBarFill.style.left = 0;
//       }
//     })
//     .catch(error => {
//       console.log(error);
//       // Set default position for progress bar
//       progressBar.style.top = 0;
//       progressBar.style.left = 0;
//     })
// }

// positionProgressBar();
/* Method 1*/
/* Get Booster*/

// function getBooster() {
//   fetch(urlApi)
//     .then((response) => response.json())
//     .then((booster) => {

//       updateProgressBar(booster);

//     })
//     .catch((error) => {
//       console.log(error);
//     })
// }

// function updateProgressBar(booster) {
//   fetch("cart.js" || "cart.json")
//     .then(response => response.json())
//     .then((data) => {
//       // caculator 
//       const totalCart = (data.total_price)/100;
//       console.log(totalCart);
//       const remainingAmount = booster.content.goal - totalCart;

//       const progressMessage = remainingAmount <= 0 ? booster.content.goalReachedMesage : booster.content.progressMessage.replace('{order-value-progress}', remainingAmount);
//       if (totalCart === 0) {
//         progressBarFill.textContent = booster.content.message.replace('{order-value}', booster.content.goal);
//       } else {
//         progressBarFill.textContent = progressMessage;
//       }

//       progressBarFill.style.backgroundColor = booster.design.backgroundColor;
//       progressBarFill.style.backgroundImage = `url(${booster.design.backgroundImage})`;
//       progressBarFill.style.fontFamily = booster.design.font;
//       progressBarFill.style.fontSize = booster.design.fontSize;
//       progressBarFill.style.color = booster.design.messageColor;
//       progressBarFill.style.width = "100%";

//     })
// }

// getBooster();


/* Method 2*/
/* Save Booster in localStorage*/

function getBooster() {
  const boosterData = localStorage.getItem('boosterData');
  if (boosterData) {
    // If the data already exists in local storage, use that data
    const booster = JSON.parse(boosterData);
    updateProgressBar(booster);
  } else {
    // If the data does not already exist in local storage, call the API to get the data from the db
    fetch(urlApi)
      .then((response) => response.json())
      .then((booster) => {
        // Save data to local storage
        localStorage.setItem('boosterData', JSON.stringify(booster));

        updateProgressBar(booster);
      })
      .catch((error) => {
        console.log(error);
      })
  }
}

function updateProgressBar(booster) {
  // console.log(Shopify);
  fetch("https://" + Shopify.shop + "/cart.js")
    .then(response => response.json())
    .then((data) => {
      // caculator 
      // Check free shipping bar top or bot
      console.log(booster.design.position);
      if (booster.design.position === "Top Page") {
        const totalCart = (data.total_price) / 100;
        console.log(totalCart);
        const remainingAmount = booster.content.goal - totalCart;

        const progressMessage = remainingAmount <= 0 ? booster.content.goalReachedMessage : booster.content.progressMessage.replace('{order-value-progress}', remainingAmount);
        if (totalCart === 0) {
          progressBarFill.textContent = booster.content.message.replace('{order-value}', booster.content.goal);
        } else {
          progressBarFill.textContent = progressMessage;
        }
        progressBarFill.style.position = "absolute";
        progressBarFill.style.top = "0";
        progressBarFill.style.left = "0";
        progressBarFill.style.transition = "width 0.3s ease";
        progressBarFill.style.backgroundColor = booster.design.backgroundColor;
        progressBarFill.style.backgroundImage = `url(${booster.design.backgroundImage})`;
        progressBarFill.style.fontFamily = booster.design.font;
        progressBarFill.style.fontSize = `${booster.design.fontSize}px`;
        progressBarFill.style.color = booster.design.messageColor;
        progressBarFill.style.width = "100%";
        progressBarFill.style.bottom = 0;
      } else {
        const totalCart = (data.total_price) / 100;
        console.log(totalCart);
        const remainingAmount = booster.content.goal - totalCart;

        const progressMessage = remainingAmount <= 0 ? booster.content.goalReachedMessage : booster.content.progressMessage.replace('{order-value-progress}', remainingAmount);
        if (totalCart === 0) {
          progressBarFill.textContent = booster.content.message.replace('{order-value}', booster.content.goal);
        } else {
          progressBarFill.textContent = progressMessage;
        }
        progressBarFill.style.position = "fixed";
        progressBarFill.style.zIndex = "1000"
        progressBarFill.style.backgroundColor = booster.design.backgroundColor;
        progressBarFill.style.backgroundImage = `url(${booster.design.backgroundImage})`;
        progressBarFill.style.fontFamily = booster.design.font;
        progressBarFill.style.fontSize = `${booster.design.fontSize}px`;
        progressBarFill.style.color = booster.design.messageColor;
        progressBarFill.style.width = "100%";
        progressBarFill.style.bottom = 0;
      }


    })
}



/***********************
 * Listen change cart
 ***********************/
const handleOpenRequest = window.XMLHttpRequest.prototype.open;
function discosOpenReplacement() {
  this.addEventListener("load", function () {
    let url = this._url;
    if (url) {
      if (
        url.includes("/cart/change") ||
        url.includes("/cart/update") ||
        url.includes("/cart/change.js") ||
        url.includes("/cart/update.js")
      ) {
        //update price progressbar
        getBooster();

      }
      if (url.includes("/cart/add") || url.includes("/cart/add.js")) {
        //update price progressbar
        getBooster();
      }
    }
  });
  return handleOpenRequest.apply(this, arguments);
}
window.XMLHttpRequest.prototype.open = discosOpenReplacement;

(function (ns, fetch) {
  if (typeof fetch !== "function") return;
  ns.fetch = function () {
    const response = fetch.apply(this, arguments);
    response.then(async (res) => {
      let url_path_name = res.url.replace(window.location.origin, "");
      if (res.url) {
        if (
          res.url.includes("/cart/update") ||
          res.url.includes("/cart/change") ||
          res.url.includes("/cart/update.js") ||
          res.url.includes("/cart/change.js")
        ) {
          //update price progressbar
          getBooster();

        }
        if (res.url.includes("/cart/add") || res.url.includes("/cart/add.js")) {
          //update price 
          getBooster();

        }
      }
    });
    return response;
  };
})(window, window.fetch);

getBooster();