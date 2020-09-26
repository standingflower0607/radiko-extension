let playerArea = document.getElementsByClassName("player-area__seek")[0];
let seekBar = document.getElementById("seekbar");

let innerPlayer = document.getElementsByClassName("player-area__inner")[0];
let streamPlayer = document.getElementById("stream-player");
let playerDetail = document.getElementById("player-detail");
let volumeSlider = document.getElementsByClassName("player-area__volume")[0];
let playButton = document.getElementById("play");
let pauseButton = document.getElementById("pause");
let buttons = document.createElement("div");

let timeSpent = document.getElementById("seek_val");
let timeLeft = document.getElementById("all_val");
let timeValue = document.getElementById("url");
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
const defaultSeekBarWidth = 201;
const playTime = (window.player.totm() - window.player.fttm()) / 1000;
(function init() {
    // window.hogeが読み込まれるまで待機
    if (typeof window.hoge === 'undefined') {
        return setTimeout(init, 1000);
    } else {
        console.log("ok");
    }
    // 実行する処理
    console.log("hi");
});

const change_time = (secs = 0) => {
    let knob = seekBar.getElementsByClassName("knob")[0];
    let secsWidth = defaultSeekBarWidth / playTime;
    var x = Math.round((parseFloat(knob.style.left.slice(0, -2)) + (secsWidth * secs)) * 100000) / 100000;
    console.log(x)
    console.log(parseFloat(knob.style.left.slice(0, -2)))
    if (x < 0) x = 0; //マイナスはバグる
    knob.style.left = String(x) + "px";
    window.$.Radiko.Player.View.seekBarView.onDragSeekKnob();

}

// add link
let iconLink = document.createElement("link");
iconLink.rel = "stylesheet";
iconLink.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
document.head.appendChild(iconLink);

// buttons
let newPlayButton = document.createElement("span");
let newPauseButton = document.createElement("span");
let skipTenButton = document.createElement("span");
let replayTenButton = document.createElement("span");
let skipThirtyButton = document.createElement("span");
let replayThirtyButton = document.createElement("span");
buttons.id = "buttons";
newPlayButton.style.display = "none";
newPlayButton.className = "material-icons";
newPauseButton.className = "material-icons";
skipTenButton.className = "material-icons";
replayTenButton.className = "material-icons";
skipThirtyButton.className = "material-icons";
replayThirtyButton.className = "material-icons";
newPlayButton.innerText = "play_arrow";
newPauseButton.innerText = "pause";
skipTenButton.innerText = "forward_10";
replayTenButton.innerText = "replay_10";
skipThirtyButton.innerText = "forward_30";
replayThirtyButton.innerText = "replay_30";

buttons.appendChild(replayThirtyButton);
buttons.appendChild(replayTenButton);
buttons.appendChild(newPlayButton);
buttons.appendChild(newPauseButton);
buttons.appendChild(skipTenButton);
buttons.appendChild(skipThirtyButton);

newPlayButton.onclick = () => {
    window.$.Radiko.Player.View.onPlay();
    newPauseButton.style.display = "block";
    newPlayButton.style.display = "none";
}

newPauseButton.onclick = () => {
    window.$.Radiko.Player.View.onPause();
    newPauseButton.style.display = "none";
    newPlayButton.style.display = "block";
}
skipTenButton.onclick = () => {
    change_time(10);
}
skipThirtyButton.onclick = () => {
    change_time(30);
}
replayTenButton.onclick = () => {
    change_time(-10)
}
replayThirtyButton.onclick = () => {
    change_time(-30)
}

// innerPlayer
volumeSlider.id = "volumeSlider";

innerPlayer.appendChild(buttons);
innerPlayer.appendChild(volumeSlider);
innerPlayer.id = "innerPlayer";

// hide playerArea and play/pause buttons
let timeshiftBalloon = playerDetail.getElementsByClassName("tooltip")[0];
let hiddenContainer = document.createElement("div");
hiddenContainer.id = "hiddenContainer"
// hiddenContainer.style.visibility = "none"
hiddenContainer.appendChild(playerArea);
hiddenContainer.appendChild(playButton);
hiddenContainer.appendChild(pauseButton);
// hiddenContainer.appendChild(timeshiftBalloon);
innerPlayer.appendChild(hiddenContainer);

// move time display
volumeSlider.appendChild(timeSpent);
volumeSlider.appendChild(timeLeft);


// create new seek bar
let newSeekArea = document.createElement("div");
let newSeekActiveBar = document.createElement("div");
let newSeekBar = document.createElement("div");
let newSeekKnob = document.createElement("span");
newSeekArea.id = "newSeekArea";
newSeekActiveBar.id = "newSeekActiveBar";
newSeekBar.id = "newSeekBar";
newSeekKnob.id = "newSeekKnob"
newSeekArea.style.cssText = "width : 100%; margin-top : -22px:"
newSeekBar.appendChild(newSeekKnob);
newSeekArea.appendChild(newSeekActiveBar);
newSeekArea.appendChild(newSeekBar);
streamPlayer.insertBefore(newSeekArea, innerPlayer);

newSeekBar.oninput = (e) => {
    let knob = seekBar.getElementsByClassName("knob")[0];
    let value = newSeekBar.value / 1000;
    knob.style.left = String(value) + "px"
    window.$.Radiko.Player.View.seekBarView.onDragSeekKnob();
}
let target = seekBar.getElementsByClassName("bar")[0];

const observer = new MutationObserver((mutations) => {
    let value = parseFloat(target.style.width.slice(0, -2));
    newSeekBar.value = value * 1000

});
const observerConfig = {
    attributes: true,
    attributeFilter: ["style"],
    childList: true, subtree: true
};

observer.observe(target, observerConfig);


// TODO
// スキップ
// activebar(inputをdivに)
// 再生ストップの切り替え(もともとの方を押したとき)



