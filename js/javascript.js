const windowcon = document.querySelector(".mainBanner");
const v_slideList = document.querySelector('.slideBox');
let v_slideContents = document.querySelectorAll('.slideBox>li');
// const v_slideBtnPrev = document.querySelector('.prev');
// const v_slideBtnNext = document.querySelector('.next');
const v_slideLen = v_slideContents.length;
let v_slideWidth = v_slideContents[0].clientWidth;
// const dots = document.querySelectorAll('.dots>span');

const v_slideSpeed = 1000;
const v_startNum = 0;

//브라우저 resize 처리
window.addEventListener('resize', e=>{
    let m_w = document.body.clientWidth;
    v_slideWidth = m_w;

    v_slideList.style.width=m_w*(v_slideLen+1)+'px';
    v_slideList.style.left = -m_w*(curIndex+1)+'px';
    v_slideList.style.transition='0ms';

    
})

v_slideList.style.width = v_slideWidth*(v_slideLen+1)+'px';

let firstChild = v_slideList.firstElementChild;
let lastChild = v_slideList.lastElementChild;

let cloneFirst = firstChild.cloneNode(true);
let cloneLast = lastChild.cloneNode(true);

v_slideList.appendChild(cloneFirst);
v_slideList.insertBefore(cloneLast, v_slideList.firstElementChild);

v_slideList.style.left = -v_slideWidth*(v_startNum+1)+'px';

let curIndex = v_startNum;
let curSlide = v_slideContents[curIndex];
// curSlide.classList.add('slide_active');