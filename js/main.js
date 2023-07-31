//Song data

const songList = [
    {
        title: "Leave It All Behind",
        file: "leave-it-all-behind.mp3",
        cover: "cult-to-follow.jpg"
    },

    {
        title: "Vacant Surrender",
        file: "vacant-surrender.mp3",
        cover: "vacant-surrender.jpg"
    },

    {
        title: "Is This Hapiness?",
        file: "is-this-hapiness.mp3",
        cover: "is-this-hapiness.jpg"
    }
]

// Canción Actual
let actualSong = null;

// Capturar elementos del DOM para trabajar en JS

const songs = document.getElementById("songs");
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");

const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");

// Escuchar click de la barra de progreso
progressContainer.addEventListener("click", setProgress);

// Escuchar el elemento Audio
audio.addEventListener("timeupdate", updateProgress);

// Escuchar clicks en los controles
play.addEventListener("click", () => {
    // Si el audio está pausado
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
})

next.addEventListener("click", () => nextSong());
prev.addEventListener("click", () => prevSong());

// Cargar canciones y mostrar el listado
function loadSongs() {
    // Recorrer las canciones del arreglo
    songList.forEach((song, index) => {
        // Crear li
        const li = document.createElement("li");
        // Crear a
        const link = document.createElement("a");
        // Hidratar a
        link.textContent = song.title;
        link.href = "#";
        // Escuchar clicks
        link.addEventListener("click", () => loadSong(index))
        // Añadir a li
        li.appendChild(link);
        // Añadir li a ul
        songs.appendChild(li);
    });
}

// Cargar canción seleccionada
function loadSong (songIndex) {
    // Si el indice de la canción es diferente a la canción actual que tiene el indice
    if(songIndex != actualSong) {
        // Se pasa el indice de la canción actual y el indice nuevo al hacer click en el elemento a
        // actualSong = lastIndex -> ultima canción
        // songIndex = newIndex -> nueva canción al hacer click
        changeActiveClass(actualSong, songIndex);
        actualSong = songIndex //Guardar el nuevo indice a la canción actual
        audio.src = "./audio/" + songList[songIndex].file;
        playSong();
        changeCover(songIndex);
        changeSongTitle(songIndex);
        
    }    
}

// Actualizar barra de progreso de la canción
function updateProgress(event) {
    // Total y el actual
    const {duration, currentTime} = event.srcElement
    // Sacar el porcentaje del (tiempo actual reproducido / duracion total de la canción)
    const percent = (currentTime / duration) * 100;
    
    // Actualizar el ancho de la barra de progreso en %
    //Ese ancho indicara tambien el tiempo actual del audio
    progress.style.width = percent + "%";
    
}

// Hacer la barra de progreso clickcable
function setProgress(event){
    // Obtener el ancho total de la barra de progreso
    const totalWidth = this.offsetWidth;
    // Obtener el eje X del ancho de la barra de progreso
    const progressWidth = event.offsetX;
    // Obtener el tiempo del audio con (el ancho de la barra clickeado / ancho total de la barra) Por la duracion del audio
    const current = (progressWidth / totalWidth) * audio.duration;
    
    audio.currentTime = current
}

// Actualizar controles
function UpdateControls(){
    // Si el audio está pausado
    if(audio.paused){
        play.classList.remove("fa-pause");
        play.classList.add("fa-play");
    } else {
        // Si el audio está reproduciendo
        play.classList.add("fa-pause");
        play.classList.remove("fa-play");
    }
}

/**
 * Reproducir canción
 */
function playSong() {
    // Si hay una canción seleccionada
    if(actualSong != null) {
        audio.play()
        UpdateControls();
    }
}

// Pausar canción
function pauseSong() {
    audio.pause()
    UpdateControls();
}

//  Cambiar clase activa 
function changeActiveClass(lastIndex, newIndex){
    // Seleccionar elementos a
    const links = document.querySelectorAll("a");
    // Si el ultimo indice no es nulo, es decir que si tiene guardado un indice
    if( lastIndex != null){
        // Remover ese indice, es decir, canción seleccionado el activo
        links[lastIndex].classList.remove("active");
    }

    // En caso de que sea nulo, es decir, no tiene guardado indice
    // Ponerlo activo ya que sera un nuevo indice, es decir, cuando se seleccione la primera canción

    // Pero de igual forma, al seleccionar otra canción, ponerle la clase activa
    links[newIndex].classList.add("active");
}

// Cambiar el cover de la canción
function changeCover(songIndex) {
    // Mostrar el cover
    cover.src = "./img/" + songList[songIndex].cover;
}

// Cambiar el titulo de la canción
function changeSongTitle(songIndex){
    title.innerText = songList[songIndex].title;
}

// Anterior canción
function prevSong(){
    // Si no está en la primer canción, es decir, en el primer indice
    if (actualSong > 0){
        // Reduce el indice que indica a la siguiente canción
        loadSong(actualSong - 1);
    } else {
        
        loadSong(songList.length -1);
    }
}

// Siguiente canción
function nextSong(){
    // Si el indice actual song no sobrepasa el limite de la cantidad de canciones del arreglo songList
    if (actualSong < songList.length - 1){
        // Aumenta el indice que indica a la siguiente canción
        loadSong(actualSong + 1);
    } else {
        // Si sobrepasa, es decir, si está en la ultima canción, reiniciar el indice
        loadSong(0);
    }
}

// Lanzar siguiente canción cuando se acaba la actual
audio.addEventListener("ended", () => nextSong())

// Iniciar!
loadSongs();