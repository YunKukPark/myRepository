const body = document.querySelector("body");
const IMG_NUMBER = 3;

function handleImgLoad(){
    console.log("이미지 로딩 끝~");
}

function paintImg(imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
}

function genRandom(){
    const number = Math.floor(Math.random() * 3);
    return number;
}

function init(){
    const radomNumber = genRandom();
    paintImg(radomNumber);
};

init();
