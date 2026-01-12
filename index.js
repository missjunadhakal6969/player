// SELECTORS
const controlButtons = document.querySelectorAll('.control-btn');
const video = document.getElementById('video');
const wrapper = document.getElementById('player-wrapper');
const playBtn = document.getElementById('btn-label');
const abcBtn = document.getElementById('abcBtn');


// control button active effect script
controlButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        controlButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});



// shaka player setup
shaka.polyfill.installAll();

if (!shaka.Player.isBrowserSupported()) {
    alert('Browser not supported');
    throw new Error('Browser not supported');
}


const player = new shaka.Player(video);

// Error logging
player.addEventListener('error', e => {
    console.error('Shaka error', e.detail);
});

// Load HLS
player.load(
    'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8'
);

// 🎯 Play / Pause toggle
playBtn.addEventListener('click', () => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
});

// 🎯 Double-click video to enter fullscreen
video.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        wrapper.requestFullscreen();
    }
});


// available video track display  
abcBtn.addEventListener('click', () => {

    /* 🎥 VIDEO + AUDIO TRACKS */
    const variants = player.getVariantTracks();

    console.log('Variant tracks:', variants);

    variants.forEach(track => {
        document.querySelector(".control-btn-data").innerHTML += `
		<p class="data-title">Video Tracks</p>
  <button>${track.width} X ${track.height} Active: ${track.active}</button>
  `
    });

    /* 📝 SUBTITLE TRACKS */
    const textTracks = player.getTextTracks();

    console.log('Text tracks:', textTracks);

    textTracks.forEach(track => {
        console.log(`
      ID: ${track.id}
      Language: ${track.language}
      Label: ${track.label}
      Active: ${track.active}
    `);
    });
});