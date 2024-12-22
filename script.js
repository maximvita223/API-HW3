const apiKey = 'XWdelws6kKqRUkIaiN6bPYI2CJxHmyCLOgIF8ojQn00';
const photoContainer = document.getElementById('photo-container');
const photo = document.getElementById('photo');
const photographerName = document.getElementById('photographer-name');
const likeCountElement = document.getElementById('like-count');

let likeCount = 0;

// Функция для получения случайного изображения из Unsplash
async function fetchRandomPhoto() {
    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${apiKey}`);
    const data = await response.json();
    return data;
}

// Функция для отображения изображения и информации о фотографе
async function displayPhoto() {
    const photoData = await fetchRandomPhoto();
    photo.src = photoData.urls.regular;
    photographerName.textContent = `Photo by ${photoData.user.name}`;
    savePhotoHistory(photoData);
}

// Функция для увеличения счетчика лайков
function incrementLike() {
    likeCount++;
    likeCountElement.textContent = likeCount;
    localStorage.setItem('likeCount', likeCount);
}

// Загрузка сохраненного количества лайков из локального хранилища
function loadLikeCount() {
    const savedLikeCount = localStorage.getItem('likeCount');
    if (savedLikeCount) {
        likeCount = parseInt(savedLikeCount, 10);
        likeCountElement.textContent = likeCount;
    }
}

// Инициализация при загрузке страницы
window.onload = function () {
    displayPhoto();
    loadLikeCount();
};

// Функция для сохранения истории просмотров
function savePhotoHistory(photoData) {
    let photoHistory = JSON.parse(localStorage.getItem('photoHistory')) || [];
    photoHistory.push(photoData);
    localStorage.setItem('photoHistory', JSON.stringify(photoHistory));
}

// Функция для отображения истории просмотров
function displayPhotoHistory() {
    const photoHistory = JSON.parse(localStorage.getItem('photoHistory')) || [];
    const historyContainer = document.createElement('div');
    historyContainer.id = 'history-container';

    photoHistory.forEach(photoData => {
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        historyItem.innerHTML = `
            <img src="${photoData.urls.regular}" alt="History Photo">
            <p>Photo by ${photoData.user.name}</p>
        `;
        historyContainer.appendChild(historyItem);
    });

    document.body.appendChild(historyContainer);
}

// Инициализация при загрузке страницы
window.onload = function () {
    displayPhoto();
    loadLikeCount();
    displayPhotoHistory();
};
