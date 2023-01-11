let selectedWitch; //ציור נבחר של מכשפה
let selectedView; // רקע נבחר
let selectedTime; //זמן משחק שנבחר
let num;//מגריל מספר בשביל תמונה לסלע בפונקציית  רנדום הר
let counter; //סופר את המספר הכולל של הארנבות ןמכשפות ביחד 
let rabbits; //כמה ארנבות היו
let witch; //כמה מכשפות היו
let x1; // האיקס שסוגר את המודל
let holes;  // רשימת הסלעים
let scoreBoard;  // המקום לנקודות לשחקן
let score; // מספר הנקודות לבינתיים
let moles; //רשימת ארנבות
let btnNext; //שחק שוב
let lastHole; // חור אחרון שארנבת הציצה
let timeUp; // האם הזמן עבר?
let modal; // הודעת ניצחון
let startBtn;//כפתור התחלה
let playerName; //שם שחקן
let toggle; //מוזיקה
let level;//רמת משחק
let inputName; //תיבת קלט של שם משתמש
let inputTime; // תיבת קלט של זמן
let levelPlace; // בו כתוב הרמה
let t; //המקום של השניות
let musicMode; //המקום בו רשום מה מצב המוזיקה
let modalP1;// הודעת ניצחון- מודל
let modalP2;// הודעת ניצחון- מודל
let modalP3;// הודעת ניצחון- מודל
let modalP4;// הודעת ניצחון- מודל
let modalP5;// הודעת ניצחון- מודל
let viewPictures; //מערך רקעים
let witchesPictures; //מערך תמונות מכשפות
let span;//טוליפ
//let lastHole1;
//let lastHole2;
let isOn;//מצב המשחק-פועל/דלוק

/*פונקצית התחלת משחק */
function startGame() {
    levelPlace.textContent = level;
    selectedTime = inputTime.value;
    inputTime.setAttribute('disabled', 'disabled');
    inputName = document.getElementById('playerName');
    playerName = inputName.value;
    inputName.setAttribute('disabled', 'disabled');
    inputName.setAttribute('disabled', 'disabled');
  
    time();
    setTimeout(() => timeUp = true, selectedTime * 1000)// כמה זמן יהיה המשחק
    if (level === 1)
        peep();
    else {
        peep2();
        peep2();
    }
}

/*בעת טעינת הדף*/
onload = () => {
    selectedWitch = "wi4";
    selectedView = "vi4";
    selectedTime = 10;
    addEvent();
    init();
    if (!localStorage.si) {
        localStorage.si = 0;
        localStorage.name = '';
    }
    isOn = false;
}

// פונקציה שמוסיפה אירועים
addEvent = () => {
    inputTime = document.getElementById('chooseTime');
    t = document.querySelector('#time');
    inputTime.addEventListener('click', () => {
        t.textContent = inputTime.value;
    });
    levelPlace = document.querySelector('#lev');
    scoreBoard = document.querySelector('.score');  // המקום לנקודות לשחקן
    holes = document.querySelectorAll('.hole');  // רשימת הסלעים
    randomRocks();
    toggle = document.getElementsByClassName('slider')[0]; //מצב מוזיקה
    toggle.addEventListener('click', music);
    moles = document.querySelectorAll('.mole'); //רשימת ארנבות
    moles.forEach(mole => mole.addEventListener('click', bonk));// לכל ארנבת אירוע של קליק
    btnNext = document.getElementById('next-level');//כפתור שחק שוב
    btnNext.addEventListener('click', nextClick);
    x1 = document.getElementById('x1'); //האיקס של המודל
    x1.addEventListener('click', closeX1);
    modal = document.getElementById('id01'); //הודעת ניצחון
    musicMode = document.querySelector('select + p > span');
    modalP1 = document.querySelector(".content-1");
    modalP2 = document.getElementById("points");
    modalP3 = document.getElementById("finalMove");
    modalP4 = document.getElementById("totalTime");
    modalP5 = document.getElementById("broke");
    viewPictures = document.querySelectorAll('.viewPic');
    viewPictures.forEach(viewPicture => viewPicture.addEventListener('click', chooseV));
    witchesPictures = document.querySelectorAll('.witchPic');
    witchesPictures.forEach(witchesPicture => witchesPicture.addEventListener('click', chooseW));
    span = document.querySelector('.tooltiptext');
    document.getElementsByClassName('startBtn')[0].addEventListener('click', playAgain); //כפתור התחלת משחק

}

/*אתחול משתנים למשחק חדש*/
init = () => {
    level = 1;
    counter = 1;//סופר את המספר הכולל של הארנבות ומכשפות ביחד
    rabbits = 0;
    witch = 0;
    score = 0; // מספר הנקודות לבינתיים
    scoreBoard.textContent = score;
    timeUp = false; // האם הזמן עבר?
    musicMode.textContent = 'כבוי';
    btnNext.id = 'next-level';// התחול המודל
    btnNext.textContent = 'שלב הבא 😄';
    modalP5.textContent = "";
}


// מגריל זמן שבו הארנבת תציץ
function randomTime(min, max) { 
    return Math.round(Math.random() * (max - min) + min);
}

// מגריל סלע שבו הארנבת תציץ שלב 1
function randomHole1(holes) {  
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) { // אם זה כמו המיקום האחרון תחפש חור חדש
        return randomHole1(holes);
    }
    lastHole = hole;
    return idx;
}
//function randomHole2() {  // מגריל סלע שבו הארנבת תציץ2
//    const idx = Math.floor(Math.random() * holes.length);
//    const hole = holes[idx];
//    if (hole === lastHole1 || hole === lastHole2) { // אם זה כמו המיקום האחרון תחפש חור חדש
//        return randomHole2(holes);
//    }
//    lastHole1 = hole;
//    return idx;
//}
//function randomHole3(secondRabbit) {  //3 מגריל סלע שבו הארנבת תציץ
//    const idx = Math.floor(Math.random() * holes.length);
//    const hole = holes[idx];
//    if (hole === lastHole1 || hole === lastHole2 || hole === secondRabbit) { // אם זה כמו המיקום האחרון תחפש חור חדש
//        return randomHole3(holes);
//    }
//    lastHole2 = hole;
//    return idx;
//}

 // פונקצייה שגורמת לארנבות להציץ במרווחים של זמן שלב 1
function peep() { 
    const time = randomTime(500, 1200); // הגרלת שניות לארנב
    const index = randomHole1(holes); // הגרלת חור
    const m = moles[index];
    m.style.background = "";
    const h = holes[index];
    let num = randomTime(1, 3)
    counter += 1;
    if (counter % 7 === 0) {
        m.addEventListener('mouseover', bonk);
        m.style.background = `url('pics/widches/${selectedWitch}.png') bottom center no-repeat`;
        //flagWitch = true;
    }
    else {
        m.style.background = `url('pics/rabbits/ra${num}.png') bottom center no-repeat`;
    }
    h.classList.add('up');

    setTimeout(() => {
        m.removeEventListener('mouseover', bonk);
        h.classList.remove('up');
        if (!timeUp)
            peep(); // ואם התנאי לא מתקיים נגמר המשחק
        else {
            massage();
        }
    }, time);

}

/*הדפסת הודעת נצחון*/ 
function massage() {
    if (level === 2 && score > localStorage.si) {
        modalP5.textContent = `כל הכבוד!!! שברת את השיא הקודם שעמד על: ${localStorage.si}`;
        if (playerName != "" && playerName !== undefined) {
            modalP5.textContent += ` והושג ע"י ${localStorage.name}`;
        }
        modalP5.textContent += ` השיא שלך הוא: ${score}`;
        localStorage.si = score;
        localStorage.name = playerName;

    }
    modalP1.textContent = `כל הכבוד ${playerName + " "}ניצחת! 🎉🎉`;
    modalP2.textContent = `עכשיו יש לך ${score} נקודות!!`;
    modalP3.textContent = `בשלב ${level} תפסת ${rabbits} ארנבות ו ${witch} מכשפות`;
    modalP4.textContent = `תוך ${selectedTime} שניות`;
    modal.style.display = 'block';
}

 // פונקצייה שגורמת לארנבות להציץ במרווחים של זמן שלב 2
function peep2() {  // פונקצייה שגורמת לארנבות להציץ במרווחים של זמן

    const time = randomTime(500, 1200); // הגרלת שניות לארנב
    const index = randomHole1(holes); // הגרלת חור
    const m = moles[index];
    m.style.background = "";
    const h = holes[index];
    let num = randomTime(1, 4)
    counter += 1;
    if (counter % 7 === 0) {
        m.addEventListener('mouseover', bonk);
        m.style.background = `url('pics/widches/${selectedWitch}.png') bottom center no-repeat`;
    }
    else {
        m.style.background = `url('pics/rabbits/ra${num}.png') bottom center no-repeat`;
    }
    h.classList.add('up');

    setTimeout(() => {
        m.removeEventListener('mouseover', bonk);
        h.classList.remove('up');
        if (!timeUp)
            peep2(); // ואם התנאי לא מתקיים נגמר המשחק
        else {

            massage();
        }
    }, time);

}

/*פונקציה שמןפעלת בעת לחיצה על ארנב*/
function bonk(e) {
    if (e.currentTarget.style.background === `url(\"pics/widches/${selectedWitch}.png\") center bottom no-repeat`) {
        let audio1 = document.getElementsByClassName('au2')[0];
        audio1.currentTime = 0;
        audio1.play();
        //flagWitch = false;
        score -= 20;
        witch += 1;
        toolip("20- נקודות");
    }

    else {
        if (e.currentTarget.style.background === `url(\"pics/rabbits/ra4.png\") center bottom no-repeat`) {
            let audio2 = document.getElementsByClassName('au3')[0];
            audio2.currentTime = 0;
            audio2.play();
            score += 30;
            toolip("30+ נקודות");

        }
        else {
            let audio3 = document.getElementsByClassName('au1')[0];
            audio3.currentTime = 0;
            audio3.play();
            score += 10;
            toolip("10+ נקודות");
        }
        rabbits += 1;

    }

    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;

}

//הודעת נקודות 
function toolip(text) {

    span.textContent = text;
    span.classList.add("v");
    setTimeout(() => span.classList.remove("v"), 600)
}

//כפתור שלב הבא או משחק חדש
function nextClick() {
    closeX1();
    if (btnNext.id === "next-level") {
        timeUp = false;
        rabbits = 0;
        witch = 0;
        level = 2;
        startGame();
        btnNext.id = 'play-again';
        btnNext.textContent = 'שחק שוב 😄';

    }
    else {
        btnNext.id = 'next-level';
        btnNext.textContent = 'שלב הבא 😄';
        playAgain();
    }

}
// בעת לחיצה על כפתור שחק 
function playAgain() {
    if (isOn === true) 
        return; 
    modal.style.display = 'none';
    isOn = true;
    init();
    startGame();
}

/* סוגר את הודעת נצחון*/
function closeX1() {
    isOn = false;
    modal.style.display = 'none';
    inputTime.removeAttribute("disabled");
    inputName.removeAttribute("disabled");
    document.getElementsByClassName('startBtn')[0].addEventListener('click', playAgain); //כפתור התחלת משחק


}

/*פונקציה שמרנדמת סוג סלע*/
function randomAr(last) {

    num = randomTime(1, 7);
    if (last === num)
        return randomAr(last);
    else
        return num;
}

/* רינדום באיזה סלע הארנב יקפוץ*/
function randomRocks() {
    let lastRock = 10;
    let numRock;
    let style = document.createElement('style');
    for (let i = 0; i < 9; i++) {
        numRock = randomAr(lastRock);
        lastRock = numRock;
        style.textContent += `.hole${i + 1}:after{background: url('pics/rocks/ro${numRock}.GIF') bottom center no-repeat;}`;
    }
    document.body.append(style);
}


/*בחירת מכשפה בהגדרות*/
function chooseW(e) {
    document.querySelector(`#${selectedWitch}`).classList.remove('selected');
    selectedWitch = e.target
        .id;
    document.querySelector(`#${selectedWitch}`).classList.add('selected');

}


//בחירת רקע
function chooseV(e) {
    document.querySelector(`#${selectedView}`).classList.remove('selected');
    selectedView = e.target.id;
    document.querySelector('html').style.backgroundImage = `url('pics/views/${selectedView}.png')`;
    document.querySelector(`#${selectedView}`).classList.add('selected');
}

//שעון עצר
function time() { 
    let selectedTime2 = selectedTime;
    t.textContent = selectedTime2--;
    let funcTime = setInterval(() => {
        t.textContent = selectedTime2--;
        if (selectedTime2 === -1)
            clearInterval(funcTime);
    }, 1000);
}

/* מפעיל מוזיקת רקע*/
function music() {
    let audio = document.getElementsByClassName('music')[0];

    if (toggle.classList.contains('off')) {
        toggle.classList.remove('off');
        toggle.classList.add('on');
        audio.currentTime = 0;
        audio.play();
        musicMode.textContent = 'דלוק';
    }
    else {
        toggle.classList.remove('on');
        toggle.classList.add('off');
        audio.pause();
        musicMode.textContent = 'כבוי';
    }
}

/* פתיחת וסגירת חלון הגדרות*/
function openNav1() {
    document.getElementById("mySidenav").style.left = "0px";
}
function openNav2() {
    document.getElementById("mySidenav2").style.left = "0px";
}

function closeNav() {
    document.getElementById("mySidenav").style.left = "-340px";
}

function closeNav2() {
    document.getElementById("mySidenav2").style.left = "-340px";
}
