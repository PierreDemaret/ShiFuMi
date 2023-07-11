'use strict';
const energetic = 'energetic';
const psychic = 'psychic';
const tentacle = 'tentacle';
let computerChoice = 'computerChoice';
let userChoice = 'userChoice';
const selectedImages = document.querySelectorAll('.selected-image');
const result = document.querySelector('#result');
const audio = document.createElement('AUDIO');
const startBtn = document.getElementById('start-btn');
const computerCount = document.querySelector('#computerCount');
let cCount = 0;
const userCount = document.querySelector('#userCount');
let uCount = 0;
const resetBtn = document.querySelector('#reset-btn');
const userImgDiv = document.querySelector('#userImgDiv');
const energeticSrc = '../img/energetic.jpg';
const psychicSrc = '../img/psychic.jpg';
const tentacleSrc = '../img/tentacle.jpg';
const computerImgDiv = document.querySelector('#computerImgDiv');
const average = document.querySelector('#average');

// zoom fx
function zoomImg(imgDiv) {
  let id = null;
  let pos = 0;
  clearInterval(id);
  id = setInterval(frame, 20);
  function frame() {
    if (pos > 1.3) {
      clearInterval(id);
    } else {
      pos = pos + 0.05;
      imgDiv.childNodes[0].style.scale = pos;
    }
  }
}

// user selection of item
const selectImage = (event) => {
  userChoice = event.target.id;
  selectedImages.forEach((selectImage) => {
    if (userChoice == selectImage.id) {
      selectImage.classList.add('select');
      userImgDiv.childNodes[0].src = selectImage.src;
      userImgDiv.classList.remove('d-none');
      zoomImg(userImgDiv);
    } else {
      selectImage.classList.remove('select');
    }
  });
  return userChoice;
};
// randomizer choice computer
const getComputerChoice = () => {
  let computerValue = Math.floor(Math.random() * 3);
  computerImgDiv.classList.remove('d-none');
  switch (computerValue) {
    case 0:
      computerChoice = 'energetic';
      computerImgDiv.childNodes[0].src = energeticSrc;
      break;
    case 1:
      computerChoice = 'psychic';
      computerImgDiv.childNodes[0].src = psychicSrc;
      break;
    case 2:
      computerChoice = 'tentacle';
      computerImgDiv.childNodes[0].src = tentacleSrc;
      break;
  }
  return computerChoice;
};

// compare two results
const compareResult = (userChoice, computerChoice) => {
  if (userChoice == computerChoice) {
    result.textContent = 'égalité !';
    return 'égalité';
  } else {
    if ((userChoice == energetic && computerChoice == psychic) || (userChoice == psychic && computerChoice == tentacle) || (userChoice == tentacle && computerChoice == energetic)) {
      result.textContent = 'Gagné !';
      audio.src = 'assets/ressource/suuuuui.mp3';
      audio.play();
      uCount++;
      userCount.textContent = 'Victoire : ' + uCount;
      return 'Win';
    } else {
      result.textContent = 'Perdu !';
      audio.src = 'assets/ressource/ha.mp3';
      audio.play();
      cCount++;
      computerCount.textContent = 'Victoire : ' + cCount;
      return 'Loose';
    }
  }
};

//reset results
const reset = () => {
  uCount = 0;
  userCount.textContent = 'Victoire : ' + uCount;
  cCount = 0;
  computerCount.textContent = 'Victoire : ' + cCount;
};

// vibration fx
function vibration(imgDiv, imgDiv1) {
  let id = null;
  let pos = 0;
  clearInterval(id);
  id = setInterval(frame, 5);
  function frame() {
    if (pos == 30) {
      imgDiv.childNodes[0].style.transform = 'skew(0deg, 0deg)';
      imgDiv1.childNodes[0].style.transform = 'skew(0deg, 0deg)';
      clearInterval(id);
    } else {
      if (pos % 2 == 0) {
        imgDiv.childNodes[0].style.transform = 'skew(5deg, 0deg)';
        imgDiv1.childNodes[0].style.transform = 'skew(5deg, 0deg)';
      } else {
        imgDiv.childNodes[0].style.transform = 'skew(-5deg, 0deg)';
        imgDiv1.childNodes[0].style.transform = 'skew(-5deg, 0deg)';
      }
      pos += 1;
    }
  }
}
let winRate = 0;
// win Rate
const calculerWinRate = (victoires, total) => {
  // Vérification pour éviter une division par zéro
  if (total === 0) {
    return 0;
  }

  // Calcul du taux de victoire
  let winRate = (victoires / total) * 100;
  console.log(typeof winRate);
  return winRate;
};

// match
const shifumi = () => {
  let resultComputerChoice = getComputerChoice();
  zoomImg(computerImgDiv);
  setTimeout(() => {
    vibration(userImgDiv, computerImgDiv);
  }, 600);
  let resultGame = compareResult(userChoice, resultComputerChoice);
  console.log(resultGame);

  const victoires = uCount;
  const totalParties = uCount + cCount;
  console.log(victoires, totalParties);
  winRate = calculerWinRate(victoires, totalParties);
  average.innerHTML = 'Winrate :' + winRate.toFixed(2) + '%';
};

// select item
selectedImages.forEach((selectedImage) => {
  selectedImage.addEventListener('click', selectImage);
});

startBtn.addEventListener('click', shifumi);
resetBtn.addEventListener('click', reset);
