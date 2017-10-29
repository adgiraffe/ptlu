// console.log($('[data-move="down"]'));
// console.log($$('[data-move]'));

//-----되돌리기를 위한 임시 기억 div
var memory={
    divBasic:[],
    index:0,
};
//-----------


var className={
    divWrap:"wrap",
    divBasic:"basic",
    sectionContent:"content",
    btn:"selBtn",
    btnA:"selBtn a",
    btnB:"selBtn b"
}


var dataSearch='[data-move]';
var dataMoveName={
    up:"up",
    down:"down",
    left:"left",
    right:"right",
    null:null,
}


var letters=['f6c9cc', 'a8c0c0', 'FEBF36', 'FF7238',
    '6475A0', 'acc7bf', '5e5f67', 'c37070',
    'eae160', 'bf7aa3', 'd7d967'];

var color='#';

var startDiv=document.querySelector('.wrap');
var qTitle=document.querySelector('.q-title');

console.log(qTitle);
start();

function start() {
    addHandler(startDiv,clickHandler());
    // clickHandler(".selBtn");
}

function chzBackgroundColor(ele) {
    var ranNum=Math.random()*10;
    var lettersNum=Math.floor(Math.random()*10);
    color+=letters[lettersNum];
    ele.style.backgroundColor=color;
    color="#";
}


function addBasicDiv (dataAttr,emNum){
    preventDefault(event);
    var direction=dataAttr;
    var divWrap=$('.wrap');
    var basic=document.createElement('div');

    basic.className=('basic');

    var divSection=document.createElement('section');
    divSection.className="content";
    var lrContent=document.createElement('div');
    lrContent.className="lrContent";

    var ol=document.createElement('ol');
    ol.className='story-slider';



    createLiDiv(ol,direction,emNum);
    lrContent.appendChild(ol);
    divSection.appendChild(lrContent);
    basic.appendChild(divSection);

    chzBackgroundColor(basic);


    if (dataAttr=='up'){
        var firstChildNode=divWrap.firstElementChild;
        divWrap.insertBefore(basic,firstChildNode);
        clickHandler(".selBtn");
    }else if(dataAttr=='down'){
        divWrap.appendChild(basic);
        clickHandler(".selBtn");
    // }else if(dataAttr=='right'){
    //     alert('클릭핸들러'+dataAttr);
    //     clickHandler(".selBtn");
    // }else if(dataAttr=='left'){
    //     alert('클릭핸들러'+dataAttr);
    //     clickHandler(".selBtn");
    }else if(dataAttr=='null'){

        addDataMove(btn1,moveDirection);
        addDataMove(btn2,moveDirection);

        btn1.innerHTML="YES";
        btn2.innerHTML="NO";

        divSection.appendChild(btn1);
        divSection.appendChild(empty);
        divSection.appendChild(btn2);

        basic.appendChild(divSection);
        divWrap.appendChild(basic);
        clickHandler(".selBtn");
    }else{
        console.log("nothins");
    }

}


function hiddenSection(dataArr,target,emNum) {
    if(dataArr=='left'){
        var parent=findParentClass(target,"story-slider");
        var firstElChild=parent.firstElementChild;
        // var div=document.createElement('div');

        insertLiDiv(parent,firstElChild,dataArr,emNum)
    }
    else if(dataArr=='right'){
        var parent=findParentClass(target,"story-slider");
        var li=document.createElement('li');
        li.className='liDiv';
        var resultDiv=document.createElement('div');
        resultDiv.className='result-div';
        addButtonDiv(resultDiv,dataArr,emNum);
        li.appendChild(resultDiv);
        chzBackgroundColor(li);

        parent.appendChild(li);

    }
    clickHandler('.selBtn');

}



function insertLiDiv(parent,firstElchild,direction,emNum) {
    var li=document.createElement('li');
    li.className='liDiv';
    var resultDiv=document.createElement('div');
    resultDiv.className='result-div';
    addButtonDiv(resultDiv,direction,emNum);
    li.appendChild(resultDiv);
    chzBackgroundColor(li);
    parent.insertBefore(li,firstElchild);
}



function createLiDiv(parent,direction,emNum) {
    var li=document.createElement('li');
    li.className='liDiv';
    var resultDiv=document.createElement('div');
    resultDiv.className='result-div';

    addButtonDiv(resultDiv,direction,emNum);
    li.appendChild(resultDiv);
    parent.appendChild(li);
}



function addButtonDiv(parent,dataAttr,emNum) {

    console.log(emNum);
    var dataArray=releaseData(emNum);

    console.log(dataArray);

    var title=dataArray[1];

    console.log('title',title);
    qTitle.innerHTML=title;
    var moveDirection=dataAttr;
    var parent=parent;

    if(dataArray[4]==''){
        addTwoBtnDiv(parent,moveDirection,dataArray);

    }
    else if(dataArray[4]!=''){
        addThreeBtnDiv(parent,moveDirection,dataArray);
    }
}


function addThreeBtnDiv(parent,moveDirection,dataArray) {
    qTitle.style.top='20%';
    var btn1=document.createElement('button');
    var empty=document.createTextNode(' ');
    var btn2=document.createElement('button');
    var empty=document.createTextNode(' ');
    var btn3=document.createElement('button');

    // var btn1=document.createElement('div');
    // var btn2=document.createElement('div');
    // var btn3=document.createElement('div');

    btn1.className=className.btn;
    btn2.className=className.btn;
    btn3.className=className.btn;

    btn1.innerHTML="YES";
    btn2.innerHTML="NO";
    btn3.innerHTML="모름";

    var yesDiv=document.createElement('div');
    var noDiv=document.createElement('div');
    var unKnowDiv=document.createElement('div');

    var em=document.createElement('em');
    var em1=document.createElement('em');
    var em2=document.createElement('em');

    em.className='em-link';
    em1.className='em-link';
    em2.className='em-link';

    em.innerHTML=dataArray[2];
    em1.innerHTML=dataArray[3];
    em2.innerHTML=dataArray[4];


    var a=document.createElement('a');
    var a1=document.createElement('a');
    var a2=document.createElement('a');


    yesDiv.className='yes-div';
    noDiv.className='no-div';
    unKnowDiv.className='unknow-div';
    yesDiv.style.width='33%';
    noDiv.style.width='33%';
    unKnowDiv.style.width='33%';

    yesDiv.style.backgroundImage='url('+dataArray[5]+')';
    noDiv.style.backgroundImage='url('+dataArray[6]+')';
    unKnowDiv.style.backgroundImage='url('+dataArray[7]+')';

    var randomNum=Math.round(Math.random()*10);

    if(randomNum<5){
        addDataMove(btn1,moveDirection);
        addDataMove(btn2,randomDirection(moveDirection));
        addDataMove(btn3,randomDirection(moveDirection));

    }else{

        addDataMove(btn2,moveDirection);
        addDataMove(btn1,randomDirection(moveDirection));
        addDataMove(btn3,randomDirection(moveDirection));

    }

    a.appendChild(btn1);
    a.className='btn-aTag';
    a1.appendChild(btn2);
    a1.className='btn-aTag';
    a2.appendChild(btn3)
    a2.className='btn-aTag';

    yesDiv.appendChild(em);
    yesDiv.appendChild(a);

    noDiv.appendChild(em1);
    noDiv.appendChild(a1);

    unKnowDiv.appendChild(em2);
    unKnowDiv.appendChild(a2);

    parent.appendChild(yesDiv);
    parent.appendChild(noDiv);
    parent.appendChild(unKnowDiv);
}

function addTwoBtnDiv(parent,moveDirection,dataArray) {
    qTitle.style.top='50%';
    if(dataArray[2]==''){
        var linkDiv=document.createElement('div');
        linkDiv.className='link-div';
        linkDiv.style.width='100%'
        // var btn1=document.createElement('button');
        var btn1=document.createElement('div');
        btn1.className=className.btn;

        var a=document.createElement('a');
        a.className='btn-aTag';

        if(dataArray[8]==''){
            qTitle.style.top='20%';
            // btn1.setAttribute('onclick','location.href='+'"'+dataArray[9]+'"');
            a.setAttribute('target','_blank')
            btn1.innerHTML='공공운수노조 가입하기'
            a.setAttribute('href',dataArray[9]);
            a.appendChild(btn1);
            // btn1.setAttribute('type','button');


        }else if(dataArray[8]!=''){
            qTitle.style.top='20%';
            // btn1.setAttribute('onclick','location.href='+'"'+dataArray[8]+'"');
            btn1.innerHTML='10억기금 링크'
            a.setAttribute('href',dataArray[8]);
            a.appendChild(btn1);

            // btn1.setAttribute('type','button');

        }

        a.appendChild(btn1);
        linkDiv.appendChild(a);
        parent.appendChild(linkDiv);


    } else{
        // var btn1=document.createElement('button');
        // var empty=document.createTextNode(' ');
        // var btn2=document.createElement('button');

        var btn1=document.createElement('div');
        var empty=document.createTextNode(' ');
        var btn2=document.createElement('div');

        btn1.className=className.btn;
        btn2.className=className.btn;

        btn1.innerHTML="YES";
        btn2.innerHTML="NO";

        var yesDiv=document.createElement('div');
        var noDiv=document.createElement('div');

        yesDiv.style.backgroundImage='url('+dataArray[6]+')';
        noDiv.style.backgroundImage='url('+dataArray[7]+')';

        var em=document.createElement('em');
        var em1=document.createElement('em');
        em.className='em-link';
        em1.className='em-link';

        em.innerHTML=dataArray[2];
        em1.innerHTML=dataArray[3];


        var a=document.createElement('a');
        var a1=document.createElement('a');

        yesDiv.className='yes-div';
        noDiv.className='no-div';

        var randomNum=Math.round(Math.random()*10);

        if(randomNum<5){
            addDataMove(btn1,moveDirection);
            addDataMove(btn2,randomDirection(moveDirection));

        }else{

            addDataMove(btn2,moveDirection);
            addDataMove(btn1,randomDirection(moveDirection));
        }
        a.appendChild(btn1);
        a.className='btn-aTag';
        a1.appendChild(btn2);
        a1.className='btn-aTag';


        yesDiv.appendChild(em);
        yesDiv.appendChild(a);

        noDiv.appendChild(em1);
        noDiv.appendChild(a1);

        parent.appendChild(yesDiv);
        parent.appendChild(empty);
        parent.appendChild(noDiv);
    }
}


function memoryDiv(){
    var memoryDiv=$$(".basic");
    memory.divBasic=memoryDiv;
}


function removeFirstDiv(elementName) {
    var elArray=$$(elementName);
    var flag=false;
    if(elArray.length>=3){
        var parentNode=elArray[0].parentNode;
        var selRemoveDiv=parentNode.firstChild;

        while (selRemoveDiv&&selRemoveDiv.nodeType!=1){
            selRemoveDiv=selRemoveDiv.nextSibling;
        }
        console.log("selRemoveDiv");
        console.log(selRemoveDiv);
        parentNode.removeChild(selRemoveDiv);

        flag=true;
    }

    return flag;
}


function removeFirstDiv(elementName) {
    var elArray=$$(elementName);
    var flag=false;

    console.log("리무브",elArray);
    if(elArray.length>=3){
        console.log('렝스길이',elArray.length);
        var parentNode=elArray[0].parentNode;
        var selRemoveDiv=parentNode.firstChild;

        while (selRemoveDiv&&selRemoveDiv.nodeType!=1){
            selRemoveDiv=selRemoveDiv.nextSibling;
        }
        console.log("selRemoveDiv");
        console.log(selRemoveDiv);
        parentNode.removeChild(selRemoveDiv);

        flag=true;
    }
    return flag;
}


function removeFirstDivA(target,elementName,removeDivName) {
    var dot=".";
    var parent=findParentClass(target,elementName);
    var elArray=parent.querySelectorAll(dot+removeDivName);
    var flag=false;

    console.log("리무브",elArray);
    if(elArray.length>=3){
        console.log('렝스길이',elArray.length);
        var parentNode=elArray[0].parentNode;
        var selRemoveDiv=parentNode.firstChild;

        while (selRemoveDiv&&selRemoveDiv.nodeType!=1){
            selRemoveDiv=selRemoveDiv.nextSibling;
        }
        console.log("selRemoveDiv");
        console.log(selRemoveDiv);
        parentNode.removeChild(selRemoveDiv);

        flag=true;
    }
    return flag;
}



function removeLastDiv(elementName) {
    var elArray=$$(elementName);
    var flag=false;
    if(elArray.length>=3){
        var parentNode=elArray[0].parentNode;
        var selRemoveDiv=parentNode.lastChild;

        while (selRemoveDiv&&selRemoveDiv.nodeType!=1){
            selRemoveDiv=selRemoveDiv.previousSibling;
        }
        console.log(selRemoveDiv);
        parentNode.removeChild(selRemoveDiv);
        flag=true;
    }
    return flag;
}


function removeLastDivA(target,elementName,removeDivName) {
    var dot=".";
    var parent=findParentClass(target,elementName);
    var elArray=parent.querySelectorAll(dot+removeDivName);
    var flag=false;

    console.log("리무브",elArray);
    if(elArray.length>=3){
        console.log('렝스길이',elArray.length);
        var parentNode=elArray[0].parentNode;
        var selRemoveDiv=parentNode.lastChild;

        while (selRemoveDiv&&selRemoveDiv.nodeType!=1){
            selRemoveDiv=selRemoveDiv.previousSibling;
        }
        console.log("selRemoveDiv");
        console.log(selRemoveDiv);
        parentNode.removeChild(selRemoveDiv);

        flag=true;
    }
    return flag;
}






function fixBrowser(flag) {
    if(flag==true){
        var translate3d = 'translate3d(0px, 0px, 0px)';
        var wrap=$('.wrap');
        wrap.style.transition='all 0ms';
        wrap.style.transform=translate3d;
    }
}


function downEvent(dataName) {
    if(dataName=='down'){
        addBasicDiv();
    }
}

function addHandler(element, method, normal, oldIE, firefox){
    if(element.addEventListener){
        element.addEventListener(normal, method, false); //IE9, Chrome, Safari, Oper

        if(typeof firefox !== 'undefined'){
            element.addEventListener(firefox, method, false); //Firefox
        }
    }else{
        element.attachEvent(oldIE, method);  //IE 6/7/8
    }
}




function  clickHandler() {
    var btnArray=$$('.selBtn');
    //버튼 배열


    console.log("클릭핸들러 실행");
    for (var i=0;i<btnArray.length;i++){
        btnArray[i].addEventListener('click',function (event){
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            var e = window.event || event || event.originalEvent;
            var target=e.target;
            var dataAttr=event.srcElement.getAttribute('data-move');
            var emNum=getEmNum(target);


            console.log(emNum);
            switch (dataAttr){
                case 'null':
                    memoryDiv();
                    addBasicDiv(dataAttr,emNum);
                    removeFirstDiv('.basic');
                    break;

                case 'up':
                    memoryDiv();
                    addBasicDiv(dataAttr,emNum);
                    // fixBrowser(removeLastDivA(target,'basic','basic'));
                    removeLastDiv('.basic')
                    upMovement();
                    break;

                case 'down':
                    memoryDiv();
                    addBasicDiv(dataAttr,emNum);
                    // fixBrowser(removeFirstDivA(target,'basic','basic'));
                    fixBrowser(removeFirstDiv('.basic'));
                    downMovement();
                    // alert(dataAttr)
                    break;

                case 'left':
                    memoryDiv();
                    hiddenSection(dataAttr,target,emNum);
                    leftMovement(target);
                    removeLastDivA(target,'basic','liDiv');
                    break;

                case 'right':
                    memoryDiv();
                    hiddenSection(dataAttr,target,emNum);
                    rightMovement(target);
                    // fixBrowser(removeFirstDiv('.liDiv'));
                    removeFirstDivA(target,'basic','liDiv');
                    break;
            }

        },false)
    }

}


function getEmNum(target) {
    var a=target.parentNode;
    var div=a.parentNode;
    var em=div.querySelector('em');
    console.log("EM",em);
    console.log("EM 숫자 ",num);
    if(em!=null){
        var num=em.innerHTML;
        return num;
    }
}



function findParentClass(target,parentClsname) {
    var parentName=parentClsname;
    var getClass=target.getAttribute('class');
    var parent=target.parentNode;
    while (getClass==null||getClass!=parentName){
        parent=parent.parentNode;
        getClass=parent.getAttribute('class');
    }

    return parent;
}

function addDataMove(element,dataName) {
    if(element && !hasDataAttr(element,dataName) ){
        console.log(element.dataset);
        element.dataset.move=dataName;
    }

    else if(element && hasDataAttr(element,dataName) ){
        console.log(element.dataset);
        element.dataset.move=dataName;
    }

}

function randomDirection(dataName) {
    var direction="";
    if(dataName=="up"||dataName=="down"){
        var numDirection=Math.round(Math.random()*10);
        if(numDirection<=5){
            direction='left';
        }else if(numDirection>5){
            direction='right';
        }
    }
    else if(dataName=="left"||dataName=="right"){
        var numDirection=Math.round(Math.random()*10);
        if(numDirection<=5){
            direction='up';
        }else if(numDirection>5){
            direction='down';
        }
    }

    return direction;
}


function upMovement() {
    var wrap=$('.wrap');
    var currentBasic=next($('.basic'));
    console.log("배이직 섹션",currentBasic);

    var cHeight=currentBasic.offsetTop;
    var basic=wrap.firstElementChild;


    console.log('업 베이직',basic);
    console.log("현재높이 기억"+cHeight);

    var height=basic.offsetTop;


    window.scrollTo(0,cHeight);
    console.log("추가높이 기억"+height);

    var translate3d = 'translate3d(0px, -' + cHeight + 'px, 0px)';
    console.log(translate3d);
    wrap.style.transform=translate3d;
    wrap.style.transition='all 00ms ease';

    setTimeout(moveDirection,1);
    function moveDirection() {
        var translate3d = 'translate3d(0px, -' + height + 'px, 0px)';
        console.log(translate3d);
        wrap.style.transform=translate3d;
        wrap.style.transition='all 700ms ease';
    }
}

function downMovement() {
    var wrap=$('.wrap');
    // var basic= $('.basic');
    // var dLevelBasic=next(basic);
    // console.log("dLevelBasic");
    // console.log(dLevelBasic);
    var lastChild=wrap.lastChild;
    while(lastChild && lastChild.nodeType != 1) {
        lastChild = lastChild.previousSibling;
    }
    var height=lastChild.offsetTop;
    console.log("오프셋 탑"+height);

    var translate3d = 'translate3d(0px, -' + height + 'px, 0px)';
    console.log(translate3d);
    var wrap=$('.wrap');
    wrap.style.transform=translate3d;
    wrap.style.transition='all 700ms ease';
}

function leftMovement(target) {
    var target=target;
    var storySlider=findParentClass(target,'story-slider');

    var firstChild=storySlider.firstElementChild;

    var brotherChild=firstChild.nextElementSibling;
    var cOffsetLeft=brotherChild.offsetLeft;
    var leftOffsetLeft=firstChild.offsetLeft;


    var translate3d = 'translate3d('+'-'+cOffsetLeft+'px, 0px, 0px)';
    storySlider.style.transform=translate3d;
    storySlider.style.transition='all 0ms ease';


    setTimeout(moveDirection,1);
    function moveDirection() {
        var translate3d = 'translate3d('+'-'+leftOffsetLeft+'px, 0px, 0px)';
        storySlider.style.transform=translate3d;
        storySlider.style.transition='all 700ms ease';
    }
}

function rightMovement(target) {
    var target=target;
    var storySlider=findParentClass(target,'story-slider');

    var firstChild=storySlider.firstElementChild;
    var brotherChild=firstChild.nextElementSibling;


    var cOffsetLeft=brotherChild.offsetLeft;
    var leftOffsetLeft=firstChild.offsetLeft;
    console.log("원 점",leftOffsetLeft);
    console.log('이동 ',cOffsetLeft);


    var translate3d = 'translate3d('+'-'+leftOffsetLeft+'px, 0px, 0px)';
    storySlider.style.transform=translate3d;
    storySlider.style.transition='all 0ms ease';

    setTimeout(moveDirection,1);
    function moveDirection() {
        var translate3d = 'translate3d('+'-'+cOffsetLeft+'px, 0px, 0px)';
        storySlider.style.transform=translate3d;
        storySlider.style.transition='all 700ms ease';
    }

}







function prev(element){
    var prevSibling = element.previousSibling;

    while(prevSibling && prevSibling.nodeType != 1) {
        prevSibling = prevSibling.previousSibling;
    }

    return prevSibling;
}

function next(element){
    var nextSibling = element.nextSibling;

    while(nextSibling && nextSibling.nodeType != 1) {
        nextSibling = nextSibling.nextSibling;
    }

    return nextSibling;
}



//---------Basic function---------------

function $(selector,context) {
    context = context || document;
    return context.querySelector(selector);
}


function $$(selector,context){
    context=context||document;
    return context.querySelectorAll(selector);
}

function hasClass(ele,cls) {
    //return !! Boolean으로 형변환 할때 쓴다.
    //!! 이중부정이므로 긍정 true
    return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
    // 클래스 이름이 빈공간+className+빈공간 이면 ture를 리턴하고 아니면 false 리턴
}

function hasDataAttr(ele,dataName) {
    //return !! Boolean으로 형변환 할때 쓴다.
    //!! 이중부정이므로 긍정 true
    if(dataName==null){
        return false;
    } else if(dataName){
        // var dataName=ele.dataset.move;
        var dataName=dataName;
        return !!dataName.match(new RegExp('(\\s|^)'+dataName+'(\\s|$)'));
    }
    // 클래스 이름이 빈공간+className+빈공간 이면 ture를 리턴하고 아니면 false 리턴
}



function removeClass(element, className) {
    if (element && hasClass(element,className)) {
        //만약 엘리먼트가 있고 엘리먼트가 클래스를 가지고 있다면
        var reg = new RegExp('(\\s|^)'+className+'(\\s|$)');
        //빈공+className+빈공간
        element.className=element.className.replace(reg,'');
        //클래스이름을 빈공간으로 만든다
    }
}

function addClass(element, className) {
    if (element && !hasClass(element,className)) {
        //엘리먼트가 클래스를 가지고 잊지 않으면
        console.log("className :");
        console.log(element.className);
        element.className += ' '+className;
        //엘리먼트에 클래스 이름을 넣는다
    }
}




function getById(element){
    return document.getElementById(element);
}

function getByTag(element){
    return document.getElementsByTagName(element)[0];
}

function preventDefault(event){
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
}

function css( el, props ) {
    var key;
    for ( key in props ) {
        if ( props.hasOwnProperty(key) ) {
            if ( key !== null ) {
                el.style[key] = props[key];
            }
        }
    }
    return el;
}
