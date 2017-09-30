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


start();

function start() {
    addHandler(startDiv,clickHandler());
    // clickHandler(".selBtn");
}

function chzBackgroundColor(ele) {
    console.log("랜덤 색상 실행");
    var ranNum=Math.random()*10;
    console.log("ransNum+"+ranNum);
    var lettersNum=Math.floor(Math.random()*10);
    console.log("lettersNum"+lettersNum);
    color+=letters[lettersNum];
    console.log("color : "+color);

    ele.style.backgroundColor=color;
    color="#";
}


function addBasicDiv (dataAttr){
    preventDefault(event);
    console.log(memory.divBasic );
    var direction=dataAttr;

    var divWrap=$('.wrap');
    var div=document.createElement('div');

    div.className=('basic');

    var divSection=document.createElement('section');
    divSection.className="content";


    console.log("direction :"+direction);
    divSection=addButtonDiv(divSection,direction);
    div.appendChild(divSection);
    chzBackgroundColor(div);
    // div.style.backgroundColor=color;

    if (dataAttr=='up'){
        var firstChildNode=divWrap.firstChild;
        divWrap.insertBefore(div,firstChildNode);
        clickHandler(".selBtn");

    }else if(dataAttr=='down'){
        divWrap.appendChild(div);
        clickHandler(".selBtn");

    }else if(dataAttr=='null'){

        addDataMove(btn1,moveDirection);
        addDataMove(btn2,moveDirection);

        btn1.innerHTML="A";
        btn2.innerHTML="B";

        divSection.appendChild(btn1);
        divSection.appendChild(empty);
        divSection.appendChild(btn2);

        div.appendChild(divSection);
        divWrap.appendChild(div);
        clickHandler(".selBtn");
    }

}

function addButtonDiv(element,dataAttr) {
    var moveDirection=dataAttr;
    var ele=element;
    var btn1=document.createElement('button');
    var empty=document.createTextNode(' ');
    var btn2=document.createElement('button');

    btn1.className=className.btn;
    btn2.className=className.btn;

    btn1.innerHTML="A";
    btn2.innerHTML="B";

    var randomNum=Math.round(Math.random()*10);
    console.log("addButtonDiv : "+randomNum);
    if(randomNum<5){
        addDataMove(btn1,moveDirection);
        addDataMove(btn2,randomDirection(moveDirection));
    }else{
        addDataMove(btn2,moveDirection);
        addDataMove(btn1,randomDirection(moveDirection));
    }

    ele.appendChild(btn1);
    ele.appendChild(empty);
    ele.appendChild(btn2);

    return ele;
}




function memoryDiv(){
    var memoryDiv=$$(".basic");
    memory.divBasic=memoryDiv;
}


function removeFisrtDiv(elementName) {
    var elArray=$$(elementName);
    console.log("length : "+elArray.length);

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

function removeLastDiv(elementName) {
    var elArray=$$(elementName);
    var parentNode=elArray[0].parentNode;
    var selRemoveDiv=parentNode.lastChild;

    while (selRemoveDiv&&selRemoveDiv.nodeType!=1){
        selRemoveDiv=selRemoveDiv.previousSibling;
    }
    console.log(selRemoveDiv);
    parentNode.removeChild(selRemoveDiv);
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
            var dataAttr=event.srcElement.getAttribute('data-move');

            switch (dataAttr){
                case 'null':
                    memoryDiv();
                    addBasicDiv(dataAttr);
                    removeFisrtDiv('.basic')
                    alert(dataAttr)
                    break;

                case 'up':
                    memoryDiv();
                    addBasicDiv(dataAttr);
                    upMovement();
                    alert(dataAttr)
                    break;

                case 'down':
                    memoryDiv();
                    addBasicDiv(dataAttr);
                    fixBrowser(removeFisrtDiv('.basic'));
                    downMovement();
                    // alert(dataAttr)
                    break;

                case 'left':
                    memoryDiv();
                    // alert(dataAttr)
                    break;

                case 'right':
                    memoryDiv();
                    // alert(dataAttr)
                    break;
            }

        },false)
    }


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
        if(numDirection<5){
            direction='left';
        }else if(numDirection>5){
            direction='right';
        }
    }
    else if(dataName=="left"||dataName=="right"){
        var numDirection=Math.round(Math.random()*10);
        if(numDirection<5){
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
    var cHeight=currentBasic.offsetTop;
    var basic=wrap.firstChild;

    console.log("현재높이 기억"+cHeight);

    var height=basic.offsetTop;
    window.scrollTo(0,cHeight);
    console.log("추가높이 기억"+height);
    var translate3d = 'translate3d(0px, -' + height + 'px, 0px)';

    console.log(translate3d);
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

function preventTranslated3d() {
    
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
