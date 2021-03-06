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


// var yesLetters=['56B9D0', 'FBBA42', 'F24C27', '3B3F42'];
//     // 'D74B32', 'AF0064', '55237D', '004696',
//     // 'eae160', 'bf7aa3', 'd7d967'];

var yesLetters=['2E3840','4481A6','589FBF','82C5D9','CEEBF2'];
var noLetters=['2E112D','F14057','FFB61D','540032','F0433A','C9283E','820333'];

var color='#';

var startDiv=document.querySelector('.wrap');
var qTitle=document.querySelector('.q-title');
var titleContent=document.querySelector('.title-content');
var titleImg=document.querySelector('.bg-img');

console.log(qTitle);
start();

function start() {
    addHandler(startDiv,clickHandler());
    // clickHandler(".selBtn");
}

function chzBackgroundColor(ele) {
    var qDiv=ele;
    console.log('넘어온 객체',qDiv);
    var cls=qDiv.getAttribute('class');
    console.log('클래스 이름',cls);


    if(cls=='qDiv yes'){
        var ranNum=Math.random()*5;
        var lettersNum=Math.floor(Math.random()*5);
        color+=yesLetters[lettersNum];
        qDiv.style.backgroundColor=color;
        color="#";
    }else if(cls=='qDiv no'){
        var ranNum=Math.random()*7;
        var lettersNum=Math.floor(Math.random()*7);
        color+=noLetters[lettersNum];
        qDiv.style.backgroundColor=color;
        color="#";
    }


    // for(var i=0;i<qDiv.length;i++){
    //     var cls=qDiv[i].getAttribute('class');
    //     console.log('클래스 확인 ',cls);
    //
    //     if(cls=='qDiv yes'){
    //         var ranNum=Math.random()*4;
    //         var lettersNum=Math.floor(Math.random()*4);
    //         color+=yesLetters[lettersNum];
    //         qDiv[i].style.backgroundColor=color;
    //         color="#";
    //     }else if(cls=='qDiv no'){
    //         var ranNum=Math.random()*4;
    //         var lettersNum=Math.floor(Math.random()*4);
    //         color+=noLetters[lettersNum];
    //         qDiv[i].style.backgroundColor=color;
    //         color="#";
    //     }
    // }


    // var colorCode=Math.round(Math.random()*0xffffff).toString(16);
    // ele.style.backgroundColor=color+colorCode;
    // console.log('색깔',colorCode);
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

    // chzBackgroundColor(basic);


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
        // chzBackgroundColor(li);

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
    // chzBackgroundColor();
    // chzBackgroundColor(li);
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

    var dataArray=releaseData(emNum);
    var moveDirection=dataAttr;
    var parent=parent;

    addTwoBtnDiv(parent,moveDirection,dataArray);

    // if(dataArray[4]==''){
    //     addTwoBtnDiv(parent,moveDirection,dataArray);
    //
    // }
    // else if(dataArray[4]!=''){
    //     addThreeBtnDiv(parent,moveDirection,dataArray);
    // }
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

    yesDiv.className='qDiv yes';

    var a=yesDiv.className;
    console.log('클래스 네임은 ',a);
    // chzBackgroundColor(yesDiv);

    noDiv.className='qDiv np';

    var b=noDiv.getAttribute('class');
    console.log(a);
    // chzBackgroundColor(noDiv);


    // chzBackgroundColor(unKnowDiv);
    unKnowDiv.className='qDiv unknown';
    yesDiv.style.width='33.3333%';
    noDiv.style.width='33.3333%';
    unKnowDiv.style.width='33.3333%';

    yesDiv.style.backgroundImage='url('+dataArray[5]+')';
    noDiv.style.backgroundImage='url('+dataArray[6]+')';
    unKnowDiv.style.backgroundImage='url('+dataArray[7]+')';

    // var randomNum=Math.round(Math.random()*10);

    // if(randomNum<5){
    //     addDataMove(btn1,moveDirection);
    //     addDataMove(btn2,randomDirection(moveDirection));
    //     addDataMove(btn3,randomDirection(moveDirection));
    //
    // }else{
    //
    //     addDataMove(btn2,moveDirection);
    //     addDataMove(btn1,randomDirection(moveDirection));
    //     addDataMove(btn3,randomDirection(moveDirection));
    //
    // }


    addDataMove(btn1,'up');
    addDataMove(btn2,'down');
    addDataMove(btn3,'right');


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
    // chzBackgroundColor();
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
        a.className='final';


        if(dataArray[8]==''){
            qTitle.style.top='25%';
            // btn1.setAttribute('onclick','location.href='+'"'+dataArray[9]+'"');
            constructQtitle(dataArray)
            a.setAttribute('target','_blank')
            btn1.innerHTML='공공운수노조 가입하기'
            a.setAttribute('href',dataArray[9]);
            a.appendChild(btn1);
            // btn1.setAttribute('type','button');


        }else if(dataArray[8]!=''){
            qTitle.style.top='20%';
            constructQtitle(dataArray)
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



        // constructQtitle(dataArray)

        // var title=dataArray[1];
        // titleContent.innerHTML=title;

        constructQtitle(dataArray);

        var btn1=document.createElement('div');
        var empty=document.createTextNode(' ');
        var btn2=document.createElement('div');

        btn1.className=className.btn;
        btn2.className=className.btn;

        btn1.innerHTML="YES";
        btn2.innerHTML="NO";

        var yesDiv=document.createElement('div');

        var noDiv=document.createElement('div');
        yesDiv.className='qDiv yes';
        noDiv.className='qDiv no';
        chzBackgroundColor(yesDiv);
        chzBackgroundColor(noDiv);
        // yesDiv.style.backgroundImage='url('+dataArray[6]+')';
        // noDiv.style.backgroundImage='url('+dataArray[7]+')';

        var eventDiv=document.createElement('div');
        eventDiv.className='event-div';

        var eventDiv1=document.createElement('div');
        eventDiv1.className='event-div';


        var em=document.createElement('em');
        var em1=document.createElement('em');
        em.className='em-link';
        em1.className='em-link';

        em.innerHTML=dataArray[2];
        em1.innerHTML=dataArray[3];


        var a=document.createElement('a');
        var a1=document.createElement('a');

        var circle=document.createElement('div');
        var x=document.createElement('div');

        circle.className='figure circle';
        x.className='figure x';



        // chzBackgroundColor(yesDiv);
        // chzBackgroundColor(noDiv);
        // var randomNum=Math.round(Math.random()*10);
        // if(moveDirection=='up'){
        //     addDataMove(btn1,moveDirection);
        // }
        // if(randomNum<5){
        //     addDataMove(btn1,moveDirection);
        //     addDataMove(btn2,randomDirection(moveDirection));
        //
        // }else{
        //
        //     addDataMove(btn2,moveDirection);
        //     addDataMove(btn1,randomDirection(moveDirection));
        // }

        addDataMove(btn1,'up');
        addDataMove(btn2,'down');

        // circle.appendChild(btn1);
        // x.appendChild(btn2);



        a.appendChild(btn1);
        a.className='btn-aTag';
        a1.appendChild(btn2);
        a1.className='btn-aTag';

        eventDiv.appendChild(circle);
        eventDiv.appendChild(a);

        eventDiv1.appendChild(x);
        eventDiv1.appendChild(a1);

        yesDiv.appendChild(em);
        yesDiv.appendChild(eventDiv);

        noDiv.appendChild(em1);
        noDiv.appendChild(eventDiv1);

        parent.appendChild(yesDiv);
        parent.appendChild(empty);
        parent.appendChild(noDiv);
    }
}

function constructQtitle(dataArray) {
    var lineArray=titleContent.querySelectorAll('.qTitle-line');

    for(var i=0;i<lineArray.length;i++){
        titleContent.removeChild(lineArray[i]);
    }

    var dataTwoArr=dataArray[1].split('/');
    console.log(dataTwoArr);
    titleImg.style.backgroundImage=dataArray[5];

    for(var i=0;i<dataTwoArr.length;i++){
        var divLine=document.createElement('div');
        divLine.className='qTitle-line';
        divLine.innerHTML=dataTwoArr[i];

        if(divLine.innerHTML!="undefined"){
            titleContent.appendChild(divLine);
        }
    }

}


function memoryDiv(){
    var memoryDiv=$$(".basic");
    memory.divBasic=memoryDiv;
}



function removeFirstDiv(elementName) {
    setTimeout(remove,700)
    function remove() {
        var elArray=$$(elementName);
        var flag=false;

        console.log("리무브",elArray);
        if(elArray.length>=2){
            console.log('렝스길이',elArray.length);
            var parentNode=elArray[0].parentNode;
            var selRemoveDiv=parentNode.firstChild;

            while (selRemoveDiv&&selRemoveDiv.nodeType!=1){
                selRemoveDiv=selRemoveDiv.nextSibling;
            }
            console.log("selRemoveDiv");
            console.log(selRemoveDiv);
            parentNode.removeChild(selRemoveDiv);
            fixZeroPoint();
            flag=true;
        }
        return flag;
    }
}


function fixZeroPoint() {
    var currentBasic=$('.basic');
    var cHeight=currentBasic.offsetTop;

    var translate3d = 'translate3d(0px, -' + cHeight + 'px, 0px)';
    console.log(translate3d);
    var wrap=$('.wrap');
    wrap.style.transform=translate3d;
    wrap.style.transition='all 00ms ease';

    // setTimeout(moveDirection,1);
    // function moveDirection() {
    //     var translate3d = 'translate3d(0px, -' + height + 'px, 0px)';
    //     console.log(translate3d);
    //     wrap.style.transform=translate3d;
    //     wrap.style.transition='all 700ms ease';
    // }
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
    setTimeout(remove,700);
    function remove() {
        var elArray=$$(elementName);
        var flag=false;
        if(elArray.length>=2){
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
}


function removeLastDivA(target,elementName,removeDivName) {
    var dot=".";
    var parent=findParentClass(target,elementName);
    var elArray=parent.querySelectorAll(dot+removeDivName);
    var flag=false;

     if(elArray.length>=3){

        var parentNode=elArray[0].parentNode;
        var selRemoveDiv=parentNode.lastChild;

        while (selRemoveDiv&&selRemoveDiv.nodeType!=1){
            selRemoveDiv=selRemoveDiv.previousSibling;
        }

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
    var btnArray=$$('.event-div');
    //버튼 배열

    for (var i=0;i<btnArray.length;i++){
        btnArray[i].addEventListener('click',function (event){
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            var e = window.event || event || event.originalEvent;
            var target=e.target;
            var eventParent=event.srcElement.parentNode;
            var selBtn=eventParent.querySelector('.selBtn');

            var dataAttr=selBtn.getAttribute('data-move');

            var emNum=getEmNum(target,'qDiv');



            switch (dataAttr){
                case 'null':
                    memoryDiv();
                    addBasicDiv(dataAttr,emNum);
                    removeFirstDiv('.basic');
                    break;

                case 'up':
                    memoryDiv();
                    addBasicDiv(dataAttr,emNum);
                    removeLastDiv('.basic')
                    upMovement();

                    // fixBrowser(removeLastDivA(target,'basic','basic'));

                    break;

                case 'down':
                    memoryDiv();
                    addBasicDiv(dataAttr,emNum);
                    removeFirstDiv('.basic');
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


function getEmNum(target,parentClsName) {
    var clsName=parentClsName;
    console.log("clsName",clsName);
    var getClass=target.getAttribute('class');
    console.log("getClass",getClass);
    var parent=target;
    console.log("parent",parent);

    // var d=target.parentNode;
    // console.log("d",d);
    //
    // var f=parent.parentNode;
    // console.log("f",f);

    var arr=getClass.split(' ');
    getClass=arr[0];
    console.log('조각 내기',getClass);

    while(getClass==null||getClass!=clsName){
        parent=parent.parentNode;
        console.log('와일문 부모 찾기 ',parent);
        getClass=parent.getAttribute('class');
        arr=getClass.split(' ');
        getClass=arr[0];
    }

    var em=parent.querySelector('em');
    console.log("EM",em);

    if(em!=null){
        var num=em.innerHTML;
        console.log("EM 숫자 ",num);
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

    var currentBasic=$('.basic');
    console.log("배이직 섹션",currentBasic);

    var cHeight=currentBasic.offsetTop;
    var basic=wrap.lastElementChild;

    var height=basic.offsetTop;

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
