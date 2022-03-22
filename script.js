const body = document.querySelector('.fordarklight');
const parentContainer = document.querySelector('.parent_container');
const searchBtn = document.querySelector('button');
const searchBar = document.querySelector('.textbox');
const container = document.querySelector('.search-results');

let myHeaders = new Headers();
myHeaders.append("Client-ID", "CLIENT ID HERE");
myHeaders.append("Authorization", "BEARER TOKEN HERE");
myHeaders.append("Content-Type", "text/plain");

searchBtn.addEventListener('click', () => {

    let raw = `search \"${searchBar.value}\";fields name,first_release_date,genres.name,cover.url,platforms.name,summary;`;

    let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://rocky-hamlet-24680.herokuapp.com/https://api.igdb.com/v4/games", requestOptions)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        removeAllChildNodes(container);
        for(let i = 0; i < data.length; i++) {
            if(data[i]['first_release_date'] != undefined) {
                const searchResult = document.createElement('p');
                const releaseDate = timeConverter(data[i]['first_release_date']);
                searchResult.textContent = `${data[i]['name']} (${timeConverter(data[i]['first_release_date'])})`;
                searchResult.classList.add('search-result');
                searchResult.addEventListener('click', () => {
                    body.removeChild(parentContainer);
                    const gameDiv = document.createElement('div');
                    gameDiv.classList.add('new-parent');
                    const secondDiv = document.createElement('div');
                    secondDiv.classList.add('new-child');
                    const coverTitle = document.createElement('div');
                    coverTitle.classList.add('coverTitleContainer');
                    const coverImage = document.createElement('img');
                    coverImage.classList.add('coverArt');
                    let arr = (data[i].cover.url).split('/');
                    arr[6] = 't_cover_big';
                    const newUrl = arr.join('/');
                    console.log(newUrl);
                    coverImage.src = "https:" + newUrl;
                    coverImage.alt = "Game cover art";
                    coverTitle.appendChild(coverImage);
                    const x = document.createElement("HR");
                    x.classList.add('rounded');
                    const gameDesc = document.createElement('div');
                    gameDesc.classList.add('gameDescrip');
                    const titleYear = document.createElement('h1');
                    titleYear.textContent = `${data[i].name} (${releaseDate})`;
                    const genres = document.createElement('p');
                    const genreArr = [];
                    for(let j = 0; j < data[i].genres.length; j++) {
                        genreArr.push(data[i].genres[j].name);
                    }
                    genres.textContent = 'Genres: ' + genreArr.join(', ');
                    const platforms = document.createElement('p');
                    const platArr = [];
                    for(let j = 0; j < data[i].platforms.length; j++) {
                        platArr.push(data[i].platforms[j].name);
                    }
                    platforms.textContent = 'Platforms: ' + platArr.join(', ');
                    const description = document.createElement('p');
                    description.textContent = data[i].summary;
                    gameDesc.append(titleYear, platforms, description, genres);
                    secondDiv.append(coverTitle, x, gameDesc);
                    gameDiv.appendChild(secondDiv);
                    body.appendChild(gameDiv);
                })
                container.appendChild(searchResult);
            }
        }
    })
    .catch((error) => {
    console.error('Error:', error);
    });
})

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return year;
  }
  


