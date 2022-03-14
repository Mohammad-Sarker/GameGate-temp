const searchBtn = document.querySelector('button');
const searchBar = document.querySelector('.textbox');
const container = document.querySelector('.search-results');

searchBtn.addEventListener('click', () => {
    fetch('https://rocky-hamlet-24680.herokuapp.com/https://api.igdb.com/v4/games?fields=name,first_release_date&search=' + searchBar.value, {
    method: 'POST', // or 'PUT'
    headers: {
        'Client-ID': 'ADD CLIENT ID HERE',
        'Authorization': 'ADD BEARER + TOKEN HERE'
    }
    })
    .then(response => response.json())
    .then(data => {
        removeAllChildNodes(container);
        for(let i = 0; i < data.length; i++) {
            if(data[i]['first_release_date'] != undefined) {
                const searchResult = document.createElement('p');
                searchResult.textContent = `${data[i]['name']} (${timeConverter(data[i]['first_release_date'])})`;
                searchResult.classList.add('search-result');
                container.appendChild(searchResult);
                // console.log(data[i]['name'] + ' ' + timeConverter(data[i]['first_release_date']));
            }
        }
        // console.log('Success:', data);
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
  


