let songs = [
    {songName:'Dear Rosemary', bandName:'Foo Fighters', 
    src:'songs/Foo Fighters - Dear Rosemary.mp3', img:'pictures/ff.jpg'},
    {songName:'These are the Ways', bandName:'Red Hot Chili Peppers', 
    src:'songs/Red Hot Chili Peppers - These Are The Ways.mp3', img:'pictures/rhcp.png'},
    {songName:'Mr Jack', bandName:'System of a Down', 
    src:'songs/System OF A Down - Mr Jack.mp3', img:'pictures/soad.jpeg'}
];

let song = document.querySelector('audio');
let indexSong = 0;

let songDuration = document.querySelector('.end');
let image = document.querySelector('img');
let songName = document.querySelector('.description h2');
let artistName = document.querySelector('.description i');

renderSong(indexSong);

document.querySelector('.play').addEventListener('click', playSong);
document.querySelector('.pause').addEventListener('click', pauseSong);
song.addEventListener('timeupdate',stripeUpdate);
document.querySelector('.previous').addEventListener('click', ()=> {
    indexSong--;
    if(indexSong < 0) {
        indexSong = 2;
    }
    renderSong(indexSong);
});
document.querySelector('.next').addEventListener('click', ()=> {
    indexSong++;
    if(indexSong > 2){
        indexSong = 0;
    }
    renderSong(indexSong);
});

function renderSong(index) {
    song.setAttribute('src', songs[index].src);
    song.addEventListener('loadeddata', () => {
        songName.textContent = songs[index].songName;
        artistName.textContent = songs[index].bandName;
        image.src = songs[index].img;
        songDuration.textContent = secondToMinutes(Math.floor(song.duration));
    })

}

function playSong() {
    song.play();
    document.querySelector('.pause').style.display = 'block';
    document.querySelector('.play').style.display = 'none';
}
function pauseSong() {
    song.pause();
    document.querySelector('.pause').style.display = 'none';
    document.querySelector('.play').style.display = 'block';
}

function stripeUpdate() {
    let stripe = document.querySelector('progress');
    stripe.style.width = Math.floor((song.currentTime / song.duration) * 100) +'%';
    let timeElapsed = document.querySelector('.start');
    timeElapsed.textContent = secondToMinutes(Math.floor(song.currentTime));
}

function secondToMinutes(seconds) {
    let minutesField = Math.floor(seconds/60);
    let secondsField = seconds % 60;
    if(secondsField < 10) {
        secondsField = '0' + secondsField;
    }
    return minutesField+':'+secondsField;
}

