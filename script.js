const colorHistory = [];
const favoriteColors = [];
let autoFlipInterval;

function changeColor() {
  const randomColor = generateRandomColor();

  // Set background and display color code
  document.body.style.backgroundColor = randomColor;
  document.getElementById('color-code').innerText = randomColor.toUpperCase();

  // Update RGB code display
  const rgb = hexToRgb(randomColor);
  document.getElementById('rgb-code').innerText = `RGB: (${rgb.r}, ${rgb.g}, ${rgb.b})`;

  // Update color history and complementary color
  addColorToHistory(randomColor);
  updateComplementaryColor(randomColor);
}

function generateRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function copyColorCode() {
  const colorCode = document.getElementById('color-code').innerText;
  navigator.clipboard.writeText(colorCode).then(() => {
    alert(`Color code ${colorCode} copied to clipboard!`);
  });
}

function saveFavoriteColor() {
  const color = document.getElementById('color-code').innerText;
  if (!favoriteColors.includes(color)) {
    favoriteColors.push(color);
    updateFavoriteColorsDisplay();
  }
}

function addColorToHistory(color) {
  if (colorHistory.length >= 5) {
    colorHistory.shift();
  }
  colorHistory.push(color);
  updateColorHistoryDisplay();
}

function updateColorHistoryDisplay() {
  const historyContainer = document.getElementById('color-history');
  historyContainer.innerHTML = '';
  colorHistory.forEach(color => {
    const colorDiv = document.createElement('div');
    colorDiv.className = 'color-history-item';
    colorDiv.style.backgroundColor = color;
    colorDiv.title = color;
    colorDiv.addEventListener('click', () => {
      applyColor(color);
    });
    historyContainer.appendChild(colorDiv);
  });
}

function updateFavoriteColorsDisplay() {
  const favoritesContainer = document.getElementById('favorite-colors');
  favoritesContainer.innerHTML = '';
  favoriteColors.forEach(color => {
    const colorDiv = document.createElement('div');
    colorDiv.className = 'favorite-color-item';
    colorDiv.style.backgroundColor = color;
    colorDiv.title = color;
    colorDiv.addEventListener('click', () => {
      applyColor(color);
    });
    favoritesContainer.appendChild(colorDiv);
  });
}

function applyColor(color) {
  document.body.style.backgroundColor = color;
  document.getElementById('color-code').innerText = color.toUpperCase();
  const rgb = hexToRgb(color);
  document.getElementById('rgb-code').innerText = `RGB: (${rgb.r}, ${rgb.g}, ${rgb.b})`;
  updateComplementaryColor(color);
}

function updateComplementaryColor(color) {
  const rgb = hexToRgb(color);
  const compColor = `rgb(${255 - rgb.r}, ${255 - rgb.g}, ${255 - rgb.b})`;
  const compDiv = document.getElementById('complementary-color');
  compDiv.style.backgroundColor = compColor;
}

function toggleAutoFlip() {
  const autoFlipCheckbox = document.getElementById('auto-flip');
  if (autoFlipCheckbox.checked) {
    autoFlipInterval = setInterval(changeColor, 2000);
  } else {
    clearInterval(autoFlipInterval);
  }
}
