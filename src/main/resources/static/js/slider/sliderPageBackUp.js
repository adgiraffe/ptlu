var imgSrc='../../images/sliderContentImg/';
var secctionContent0="민주노총 공공운수노조는 공공부문의 대표노조로 공공, 운수, 사회서비스 분야의 조합원 18만명이 가입한 우리나라 최대산별노조입니다";
var secctionContent1="공공운수노조에는 철도, 건강보험, 국민연금, 가스, 발전, 서울대병원 등 수많은 공공기관의 정규직 노동자들과 함께, 학교비정규직, 대학청소 노동자, 지자체 청소‧시설관리 노동자, 간접고용 노동자 등 비정규직 노동자들이 가입돼 있습니다. 공공운수노조는 정규직과 비정규직이 함께 하는 노조입니다.";
var secctionContent2="공공운수노조는 철도노조 민영화 반대투쟁, 홍익대 청소노동자투쟁, 학교비정규직노동자 투쟁 등 한국사회의 굵직한 투쟁을 함께해온 노조입니다. 당신이 약자일 때 공공운수노조가 옆에 있겠습니다.";
var secctionContent3="공공운수산하의 법률원과 사회공공연구원, 교육센터 ‘움’을 두고 공공부문 노동자에 대한 법률지원, 정책지원, 교육지원을 하고 있습니다. 노조를 고민하시나요? 바로 당신 곁에 생각보다 강한 힘, 공공운수노조가 있습니다.";
var secctionContent4="정규직 전환 대상이신가요? 노동자가 목소리를 내지 않으면 제대로 된 정규직 전환은 불가능합니다. 정부에 맡겨놓을 일이 아닙니다. 공공운수노조는 일하는 당신의 목소리만을 제대로 반영하는 노조입니다.";

var sliderContent={
    sectionMainTitle:'왜 공공운수노조인가?',
    sectionMainContent:'메인타이틀 내용',
    sectionCount:5,
    sectionTitle:['가장 큽니다','함께합니다','든든합니다','강력합니다','‘민주’노조입니다',],
    sectionContent:[secctionContent0,secctionContent1,secctionContent2,secctionContent3,secctionContent4],
    sectionImgSrc:[imgSrc+'1.jpg',imgSrc+'2.jpg',imgSrc+'3.jpg',imgSrc+'4.jpg',imgSrc+'5.jpg'],
}

var initSliderCount=0;

var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/);

if (isTouchDevice){
    createSliderMobileBasicConstucture();
    touchEvent()
    dotMobileNavClickEvent();
}

else{
    createSliderBasicConstucture();
    aroowClickEnvent();
    dotNavClickEvent();
}

//------------------------------------데스크탑 네비게이 ------------------------------------------------

function createSliderBasicConstucture() {
    var sliderParent=document.querySelectorAll('#slider');
    for(var i=0;i<sliderParent.length;i++){
        var parent=sliderParent[i];
        createSliderHeaderWrap(parent);
        createSliderContentWrap(parent);
        sliderArrowlNav(parent);
        sliderDotNav(parent);
    }
}


function createSliderHeaderWrap(parent) {
    var headerWrap=document.createElement('header');
    headerWrap.className='slider-header';

    var title=document.createElement('h1');
    title.className='slider-main-title';
    title.innerHTML=sliderContent.sectionMainTitle;


    var titleContent=document.createElement('p');
    titleContent.className='slider-main-content';
    titleContent.innerHTML=sliderContent.sectionMainContent;

    headerWrap.appendChild(title);
    headerWrap.appendChild(titleContent);
    parent.appendChild(headerWrap);
}

function createSliderContentWrap(parent) {
    var sliderContentWrap=document.createElement('div');
    sliderContentWrap.className='slider-contentWrap';
    var ol=document.createElement('ol');
    ol.className='slides';
    createSliderContentLi(ol,sliderContent.sectionCount);
    sliderContentWrap.appendChild(ol);
    parent.appendChild(sliderContentWrap);
}


function createSliderContentLi(parent,numCount){
    for(var i=0; i<numCount; i++){
        var li=document.createElement('li');
        li.className='cList';


        var title=document.createElement('div');
        var content=document.createElement('div');
        title.className='slider-content-title';
        content.className='slider-content';
        createSliderContentTitle(title,i);
        createSliderContentDiv(content,i);


        li.appendChild(title);
        li.appendChild(content);
        parent.appendChild(li);
    }
}

function createSliderContentDiv(parent,idxNum) {
    var p=document.createElement('p');
    p.innerHTML=sliderContent.sectionContent[idxNum];
    parent.appendChild(p);
}


function createSliderContentTitle(parent,idxNum) {
    createSliderContentTitleImg(parent,idxNum);
    createSliderContentTitleText(parent,idxNum);
}


function createSliderContentTitleImg(parent,idxNum) {

    var emNo=idxNum+1;
    var em=document.createElement('em');
    var figure=document.createElement('figure');
    var img=document.createElement('img');
    img.setAttribute('src',sliderContent.sectionImgSrc[idxNum]);
    em.innerHTML=emNo;
    figure.appendChild(img);
    parent.appendChild(em);
    parent.appendChild(figure);
}

function createSliderContentTitleText(parent,idxNum) {
    var h1=document.createElement('div');
    h1.innerHTML=sliderContent.sectionTitle[idxNum];
    parent.appendChild(h1);
}




function sliderArrowlNav(parent) {
    var controlArrowNav=document.createElement('ul');
    var arrowSpanLeft=document.createElement('span');
    var arrowSpanRight=document.createElement('span');

    arrowSpanLeft.className="spanLeft";
    arrowSpanRight.className='spanRight';

    controlArrowNav.className='arrow-nav';

    var aLeft=document.createElement('a');
    var aRight=document.createElement('a');
    var liLeft=document.createElement('li');
    var liRight=document.createElement('li');

    liLeft.className='li-arrow-left';
    liRight.className='li-arrow-right';

    aLeft.appendChild(arrowSpanLeft);
    liLeft.appendChild(aLeft);


    var leftArrow=document.createElement('div');
    var rightArrow=document.createElement('div');
    leftArrow.className='left-arrow';
    rightArrow.className='right-arrow';

    aLeft.appendChild(arrowSpanLeft);
    aRight.appendChild(arrowSpanRight);


    liLeft.appendChild(leftArrow);
    liRight.appendChild(rightArrow);
    liLeft.appendChild(aLeft);
    liRight.appendChild(aRight);


    // controlArrowNav.appendChild(liLeft);
    // controlArrowNav.appendChild(liRight);


    controlArrowNav.appendChild(liLeft);
    controlArrowNav.appendChild(liRight);

    parent.appendChild(controlArrowNav);
}

function sliderDotNav(parent) {
    var dotNav=document.createElement('ol');
    dotNav.className='dot-nav';
    dotNavLi(dotNav);
    parent.appendChild(dotNav);
    var liActive=document.querySelectorAll('.dot-nav');
    var liFirstchild=liActive[0].firstElementChild;
    liFirstchild.firstElementChild.className='active'

}

function dotNavLi(parent) {
    var dotLiNum=Math.floor(sliderContent.sectionCount/2);
    for(var i=0;i<dotLiNum;i++){
        var li=document.createElement('li');
        var a=document.createElement('a');
        a.innerHTML=i+1;
        li.appendChild(a);
        parent.appendChild(li);
    }
}



function dotNavClickEvent() {
    var dotNav=document.querySelector('.dot-nav');
    var li=dotNav.querySelectorAll('li');

    for(var i=0;i<li.length;i++){
        li[i].firstChild.addEventListener('click',dotNavClick);
    }
}

function dotNavClick(event) {

    var aCount=parseInt(this.innerHTML);

    var linkNum=-2;

    for(var i=0; i<aCount; i++){
        linkNum=linkNum+1;
    }
    var findList=aCount+linkNum;


    var cList=document.querySelectorAll('.cList');
    var slides=document.querySelector('.slides');

    var moveValue=cList[findList].offsetLeft;



    slides.style.transform='translate3d(-'+moveValue+'px, 0px, 0px)';
    initSliderCount=findList;

    activeDotNav();
}

function aroowClickEnvent() {
    rightArrowClick();
    leftArroClick();
}

function rightArrowClick() {
    var rightArrow=document.querySelector('.li-arrow-right');
    rightArrow.addEventListener('click',moveRight);
}

function leftArroClick() {
    var leftArrow=document.querySelector('.li-arrow-left');
    leftArrow.addEventListener('click',moveLeft);
}




function moveLeft() {
    var cList=document.querySelectorAll('.cList');
    var cListLength=cList.length;

    if(initSliderCount<cListLength){
        initSliderCount=initSliderCount-2;


        if(initSliderCount<0){
            if(sliderContent.sectionCount%2==0){
                initSliderCount=cListLength-2;

                var moveRightValue=cList[initSliderCount].offsetLeft;
                var slides=document.querySelector('.slides');



                slides.style.transform='translate3d(-'+moveRightValue+'px, 0px, 0px)';
                activeDotNav();

            }

            else{

                initSliderCount=cListLength-3;

                var moveRightValue=cList[initSliderCount].offsetLeft;
                var slides=document.querySelector('.slides');


                slides.style.transform='translate3d(-'+moveRightValue+'px, 0px, 0px)';

                activeDotNav();

            }

        }else if(initSliderCount>=0){
            var moveRightValue=cList[initSliderCount].offsetLeft;
            var slides=document.querySelector('.slides');


            slides.style.transform='translate3d(-'+moveRightValue+'px, 0px, 0px)';

            activeDotNav();
        }
    }

}


function moveRight() {
    var cList=document.querySelectorAll('.cList');
    var cListLength=cList.length;
    if(initSliderCount<cListLength){
        initSliderCount=initSliderCount+2;

        if(initSliderCount>=cListLength-1){

            initSliderCount=0;
            var moveRightValue=cList[initSliderCount].offsetLeft;
            var slides=document.querySelector('.slides');


            slides.style.transform='translate3d(-'+moveRightValue+'px, 0px, 0px)';

            activeDotNav();


        } else if(initSliderCount<cListLength-1){
            var moveRightValue=cList[initSliderCount].offsetLeft;
            var slides=document.querySelector('.slides');

            slides.style.transform='translate3d(-'+moveRightValue+'px, 0px, 0px)';

            activeDotNav();
        }
    }
}

function activeDotNav() {

    var dotNav=document.querySelector('.dot-nav');
    var li=dotNav.querySelectorAll('li');


    var dotCount=(initSliderCount+2)/2;

    for(var i=0;i<li.length;i++){
        var a=li[i].firstElementChild;

        var aInNum=a.innerHTML;
        var aClass=a.getAttribute('class');


        if(aClass){
            removeClass(a,'active');
        }

        if(aInNum==dotCount){
            a.className='active';
        }
    }


}
//------------------------------------모바일 네비게인션 ------------------------------------------------


function createSliderMobileBasicConstucture() {
    var sliderParent=document.querySelectorAll('#slider');
    for(var i=0;i<sliderParent.length;i++){
        var parent=sliderParent[i];
        createSliderMobileHeaderWrap(parent);
        createSliderMobileContentWrap(parent);
        sliderMobileDotNav(parent);
    }
}

function createSliderMobileHeaderWrap(parent) {
    var headerWrap=document.createElement('header');
    headerWrap.className='slider-header';

    var title=document.createElement('h1');
    title.className='slider-main-title';
    title.innerHTML=sliderContent.sectionMainTitle;


    var titleContent=document.createElement('p');
    titleContent.className='slider-main-content';
    titleContent.innerHTML=sliderContent.sectionMainContent;

    headerWrap.appendChild(title);
    headerWrap.appendChild(titleContent);
    parent.appendChild(headerWrap);
}

function createSliderMobileContentWrap(parent) {
    var sliderContentWrap=document.createElement('div');
    sliderContentWrap.className='slider-contentWrap';
    var ol=document.createElement('ol');
    ol.className='slides';
    createSliderContentLi(ol,sliderContent.sectionCount);
    sliderContentWrap.appendChild(ol);
    parent.appendChild(sliderContentWrap);
}


function touchEvent() {
    // var li = document.querySelector('.cList');
    var sliderWrap = document.querySelector('.slider-contentWrap');
    // for(var i=0;i<li.length;i++){
    //     li[i].addEventListener('touchstart',touchStartEvent,false);
    //     li[i].addEventListener('touchmove',touchMoveEvent,false);
    //     li[i].addEventListener('touchend',touchEndEvent);
    // }
        sliderWrap.addEventListener('touchstart',touchStartEvent);
        sliderWrap.addEventListener('touchmove',touchMoveEvent);
        sliderWrap.addEventListener('touchend',touchEndEvent);

}


var touchStart=0;
var touchEnd=0;
//누적
var distance=0;


var cList=document.querySelector('.cList');
var width=cList.offsetWidth;

var halfWidth=width/2;

console.log(halfWidth);

var nextSiblingWidth=0;
var prevSiblingWidth=0;
var origin=0;
var moveValue=0;


function touchMoveEvent(event) {
        var e = window.event || event || event.originalEvent;
        e.preventDefault();
        var slides = document.querySelector('.slides');
        var touchMoveValue= Math.ceil(e.touches[0].pageX);

        moveValue=Math.ceil((touchStart - touchMoveValue));
        distance=touchEnd+(Math.ceil((touchStart - touchMoveValue)));

        slides.style.transition='all 0.0s';
        slides.style.transform = 'translate3d(' +(-distance)+'px, 0px, 0px)';;
        var target=e.target;

    if(moveValue<0){
        moveValue=Math.abs(moveValue);
        if(moveValue>halfWidth-100){
            console.log('슬라이더 움직임 이동 ',moveValue);
            distance=prevSiblingWidth;
            slides.style.transition='all 0.6s'
            slides.style.transform = 'translate3d(' +(-distance)+'px, 0px, 0px)';
            getEmInnerHtmlLeft(target,'cList');
        }
    }

    else if(moveValue>0) {
        moveValue = Math.abs(moveValue-100);
        if (moveValue > halfWidth) {
            console.log('슬라이더 움직임 이동 ',moveValue);
            distance = nextSiblingWidth;
            slides.style.transition = 'all 0.6s'
            slides.style.transform = 'translate3d(' + (-distance) + 'px, 0px, 0px)';
            getEmInnerHtmlRight(target,'cList');
            activeMobileDotNav();
        }
    }


}

function touchStartEvent(event) {
    var e = window.event || event || event.originalEvent;
    console.log('터치시',e);
    touchStart=e.touches[0].pageX;
    console.log('터치지점',touchStart);
    var target=e.target;

    console.log("타겟 ",target);
    findNextParentLi(target,'cList');
    findPrevParentLi(target,'cList');
}


function touchEndEvent(event) {
    var e = window.event || event || event.originalEvent;
    touchEnd=distance;

    console.log('터치 끝 지점',touchEnd);
    var slides = document.querySelector('.slides');

    if(moveValue<halfWidth) {
        distance=origin;
        slides.style.transition = 'all 0.6s'
        slides.style.transform = 'translate3d(' + (-distance) + 'px, 0px, 0px)';
        console.log('오리진', origin);
        console.log('이동거리', moveValue);
        touchEnd=distance;
    }
    var target=e.target;
}

function findNextParentLi(target,parentClsName) {
    var parentName=parentClsName;
    var getClass=target.getAttribute('class');
    var parent=target.parentNode;
    while(getClass==null||getClass!=parentName){
        parent=parent.parentNode;
        getClass=parent.getAttribute('class');
    }
    var nextSibling=parent.nextElementSibling;

    if(nextSibling==null){
        nextSiblingWidth=parent.offsetWidth;
        console.log('오른쪽 형제 null',nextSibling);
        nextSiblingWidth=0;
        console.log("오른쪽 거리 null",nextSiblingWidth);
    } else{
        console.log('오른쪽 형제',nextSibling);
        nextSiblingWidth=nextSibling.offsetLeft;
        console.log("오른쪽 거리",nextSiblingWidth);
    }


    origin=parent.offsetLeft;
}


function findPrevParentLi(target,parentClsName) {
    var parentName=parentClsName;
    var getClass=target.getAttribute('class');
    var parent=target.parentNode;
    while(getClass==null||getClass!=parentName){
        parent=parent.parentNode;
        getClass=parent.getAttribute('class');
    }
    var prevSibling=parent.previousElementSibling;

    if(prevSibling==null)
    {
        prevSiblingWidth=parent.offsetWidth;
        console.log('왼쪽 형제 null',prevSibling);
        console.log(parent.parentNode.lastChild);
        prevSiblingWidth=parent.parentNode.lastElementChild.offsetLeft;
        console.log("왼쪽 거리 null",prevSiblingWidth);
    }
    else{
        console.log('왼쪽 형제',prevSibling);
        prevSiblingWidth=prevSibling.offsetLeft;
        console.log("왼쪽거리",prevSiblingWidth);
    }


    origin=parent.offsetLeft;
}



function sliderMobileDotNav(parent) {
    var dotNav=document.createElement('ol');
    dotNav.className='dot-nav';
    dotMobileNavLi(dotNav);
    parent.appendChild(dotNav);
    var liActive=document.querySelectorAll('.dot-nav');
    var liFirstchild=liActive[0].firstElementChild;
    liFirstchild.firstElementChild.className='active'
}


function dotMobileNavLi(parent) {
    var dotLiNum=Math.floor(sliderContent.sectionCount);
    for(var i=0;i<dotLiNum;i++){
        var li=document.createElement('li');
        var a=document.createElement('a');
        a.innerHTML=i+1;
        li.appendChild(a);
        parent.appendChild(li);
    }
}

function dotMobileNavClickEvent() {
    var dotNav=document.querySelector('.dot-nav');
    var li=dotNav.querySelectorAll('li');

    for(var i=0;i<li.length;i++){
        li[i].firstChild.addEventListener('click',dotMobileNavClick);
    }
}

function dotMobileNavClick(event) {

    var aCount=parseInt(this.innerHTML);

    // var linkNum=-2;

    // for(var i=0; i<aCount; i++){
    //     linkNum=linkNum+1;
    // }

    var findList=aCount-1;


    var cList=document.querySelectorAll('.cList');
    var slides=document.querySelector('.slides');

    var moveValue=cList[findList].offsetLeft;

    slides.style.transform='translate3d(-'+moveValue+'px, 0px, 0px)';
    initSliderCount=findList;

    activeMobileDotNav();
}

function activeMobileDotNav() {

    var dotNav=document.querySelector('.dot-nav');
    var li=dotNav.querySelectorAll('li');


    // var dotCount=(initSliderCount+2)/2;
    var dotCount=initSliderCount+1;

    console.log('모바일 닷 카운트',dotCount);

    for(var i=0;i<li.length;i++){
        var a=li[i].firstElementChild;

        var aInNum=a.innerHTML;
        var aClass=a.getAttribute('class');


        if(aClass){
            removeClass(a,'active');
        }

        if(aInNum==dotCount){
            a.className='active';
        }
    }
    console.log(initSliderCount);

}


function getEmInnerHtmlRight(target,parentClsName) {

    var parentName=parentClsName;
    var getClass=target.getAttribute('class');
    var parent=target.parentNode;

    while(getClass==null||getClass!=parentName){
        parent=parent.parentNode;
        getClass=parent.getAttribute('class');
    }


    var em=parent.getElementsByTagName('em');
    console.log(em);
    var numCo=parseInt(em[0].innerHTML);

    console.log("라이트 넘코",numCo);


    if(numCo>=5){
        numCo=0;
        initSliderCount=numCo;
    }
    else{
        initSliderCount=numCo;
    }
    activeMobileDotNav();
}


function getEmInnerHtmlLeft(target,parentClsName) {

    var parentName=parentClsName;
    var getClass=target.getAttribute('class');
    var parent=target.parentNode;

    while(getClass==null||getClass!=parentName){
        parent=parent.parentNode;
        getClass=parent.getAttribute('class');
    }


    var em=parent.getElementsByTagName('em');
    console.log(em);
    var numCo=parseInt(em[0].innerHTML);

    console.log("레프트 넘코",numCo);
    if(numCo<=1){
        numCo=6;
        initSliderCount=numCo-2;
    }
    else{
        initSliderCount=numCo-2;

    }
     activeMobileDotNav();
}

//------------------------------------------------------------------------------------------------
function hasClass(ele,cls) {
    return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function removeClass(element, className) {
    if (element && hasClass(element,className)) {
        var reg = new RegExp('(\\s|^)'+className+'(\\s|$)');
        element.className=element.className.replace(reg,'');
    }
}

function addClass(element, className) {
    if (element && !hasClass(element,className)) {
        element.className += ' '+className;
    }
}


