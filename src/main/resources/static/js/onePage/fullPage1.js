
var fullpage;

//CONSTANTS

// keeping central set of classnames and selectors
var WRAPPER =               'wrapper';
var WRAPPER_SEL =           '.' + WRAPPER;

// util
var RESPONSIVE =            'responsive';
var NO_TRANSITION =         'notransition';
var DESTROYED =             'destroyed';
var ENABLED =               'enabled';
var VIEWING_PREFIX =        'viewing';
var ACTIVE =                'active';
var ACTIVE_SEL =            '.' + ACTIVE;

// section
var SECTION_DEFAULT_SEL =   '.section';
var SECTION =               'section';
var SECTION_SEL =           '.' + SECTION;
var SECTION_ACTIVE_SEL =    SECTION_SEL + ACTIVE_SEL;

// section nav
var SECTION_NAV =           'nav';
var SECTION_NAV_SEL =       '#' + SECTION_NAV;
var SECTION_NAV_TOOLTIP =   'tooltip';
var SHOW_ACTIVE_TOOLTIP =   'show-active';

// slide
var SLIDE_DEFAULT_SEL =     '.slide';
var SLIDE =                 'fp-slide';
var SLIDE_SEL =             '.' + SLIDE;
var SLIDE_ACTIVE_SEL =      SLIDE_SEL + ACTIVE_SEL;
var SLIDES_WRAPPER =        'fp-slides';
var SLIDES_WRAPPER_SEL =    '.' + SLIDES_WRAPPER;
var SLIDES_CONTAINER =      'fp-slidesContainer';
var SLIDES_CONTAINER_SEL =  '.' + SLIDES_CONTAINER;
var TABLE =                 'fp-table';

// slide nav
var SLIDES_NAV =            'fp-slidesNav';
var SLIDES_NAV_SEL =        '.' + SLIDES_NAV;
var SLIDES_NAV_LINK_SEL =   SLIDES_NAV_SEL + ' a';
var SLIDES_ARROW =          'fp-controlArrow';
var SLIDES_ARROW_SEL =      '.' + SLIDES_ARROW;
var SLIDES_PREV =           'fp-prev';
var SLIDES_PREV_SEL =       '.' + SLIDES_PREV;
var SLIDES_ARROW_PREV =     SLIDES_ARROW + ' ' + SLIDES_PREV;
var SLIDES_ARROW_PREV_SEL = SLIDES_ARROW_SEL + SLIDES_PREV_SEL;
var SLIDES_NEXT =           'fp-next';
var SLIDES_NEXT_SEL =       '.' + SLIDES_NEXT;
var SLIDES_ARROW_NEXT =     SLIDES_ARROW + ' ' + SLIDES_NEXT;
var SLIDES_ARROW_NEXT_SEL = SLIDES_ARROW_SEL + SLIDES_NEXT_SEL;

//globals
var options;
var slideMoving = false;
var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/);
var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0) || (navigator.maxTouchPoints));
var windowsHeight = getWindowHeight();
var isResizing = false;
var lastScrolledDestiny;
var lastScrolledSlide;
var canScroll = true;
var scrollings = [];
var nav;
var activeAnimation;
var originals;
var container;


var customOptions={};


// Create some defaults, extending them with any options that were provided
var defaults = {
    //navigation
    menu: false,
    anchors:[],
    // navigation: false,
    navigation: true,
    navigationPosition: 'right',
    navigationColor: '#000',
    navigationTooltips: [],
    showActiveTooltip: false,
    slidesNavigation: false,
    slidesNavPosition: 'bottom',
    scrollBar: false,

    //scrolling
    css3: true,
    scrollingSpeed: 700,
    autoScrolling: true,
    fitToSection: true,
    fitToSectionDelay: 1000,
    easingcss3: 'ease-in-out',
    loopHorizontal: true,
    touchSensitivity: 5,

    //Accessibility
    keyboardScrolling: true,
    recordHistory: true,

    //design
    controlArrows: true,

    //Custom selectors
    sectionSelector: SECTION_DEFAULT_SEL,
    slideSelector: SLIDE_DEFAULT_SEL,


    //events
    afterLoad: null,
    onLeave: null,
    afterRender: null,
    afterResize: null,
    afterReBuild: null,
    afterSlideLoad: null,
    onSlideLeave: null
};

options = extend(defaults, customOptions);
container = $("#scrollBody");

options.anchors.push('1');
options.anchors.push('2');
options.anchors.push('3');
options.anchors.push('4');
options.anchors.push('5');
options.navigation=true;
//easeInOutCubic animation included in the plugin
Math.easeInOutCubic = function (t, b, c, d) {
    if ((t/=d/2) < 1) {
        return c/2*t*t*t + b;}
    else{
        return c/2*((t-=2)*t*t + 2) + b;
    }
};


//---------------------

removeClass(container,DESTROYED);
displayWarnings();
setMouseWheelScrolling(true);

if(options.css3){
    options.css3=support3d();
}


if(container !== null){
    css(container, {
        'height': '100%',
        'position': 'relative'
    });

    //adding a class to recognize the container internally in the code
    addClass(container, WRAPPER);
    addClass($('html'), ENABLED);
}
//trying to use fullpage without a selector?
else{
    showError('error', 'Error! Fullpage.js needs to be initialized with a selector. For example: fullpage(\'#fullpage\');');
}

setMouseWheelScrolling(true);
var originalSections = $$(options.sectionSelector);
for (i = 0; i < originalSections.length; ++i) {
    addClass(originalSections[i], SECTION);
}

//creating the navigation dots
if (options.navigation) {
    addVerticalNavigation();
}

var sections = $$(SECTION_SEL);
for(var i = 0; i<sections.length; i++){
    var index = i;
    var section = sections[i];
    var that = section;
    //if no active section is defined, the 1st one will be the default one
    if(!index && $(SECTION_ACTIVE_SEL) === null) {
        addClass(section, ACTIVE);
    }

    if (typeof options.anchors[index] !== 'undefined') {
        section.setAttribute('data-anchor', options.anchors[index]);

        //activating the menu / nav element on load
        if(hasClass(section, ACTIVE)){
            activateMenuAndNav(options.anchors[index], index);
        }
    }

}


if(options.navigation){
    console.log("afterRommReady nav:");
    console.log(nav)

    setCss(nav, 'margin-top', '-' + (nav.offsetHeight/2) + 'px');

    var activeLi = $$('li', nav)[getNodeIndex($(SECTION_ACTIVE_SEL))];

    addClass( $('a', activeLi), ACTIVE);
}

var value =  window.location.hash.replace('#', '').split('/');
var destiny = value[0];
console.log("destiny");
console.log(destiny);


if(destiny.length){
    var section = $('[data-anchor="'+destiny+'"]');
    if(!options.animateAnchor && section.length){

        if(options.autoScrolling){
            silentScroll(section.offsetTop);
        }
        else{
            silentScroll(0);
            setBodyClass(destiny);

            //scrolling the page to the section with no animation
            var scrollSettings = getScrollSettings(section.offsetTop);
            scrollTo(scrollSettings.element, scrollSettings.options, 0);
        }

        activateMenuAndNav(destiny, null);

        isFunction( options.afterLoad ) && options.afterLoad.call( section, destiny, (getNodeIndex(section) + 1));

        //updating the active class
        removeClass(activeSection, ACTIVE);
        addClass(section, ACTIVE);
    }
}


setBodyClass();



//-----------------


/**
 * Adds or removes the possiblity of scrolling through sections by using the mouse wheel or the trackpad.
 * 마우스 휠을 통해 섹션간 이동 할 수 있게 할 것인지를 설정 한다.
 */
function setMouseWheelScrolling(value){
    if(value){
        //1.addMouseWheelHanler 실행
        addMouseWheelHandler();
    }else{
        removeMouseWheelHandler();
    }
}


/**
 * Adds the auto scrolling action for the mouse wheel and trackpad.
 * After this function is called, the mousewheel and trackpad movements will scroll through sections
 */
function addMouseWheelHandler(){
    addHandler($(WRAPPER_SEL), MouseWheelHandler, 'mousewheel', 'onmousewheel', 'wheel');
}


/**
 * Detecting mousewheel scrolling
 *
 * http://blogs.sitepointstatic.com/examples/tech/mouse-wheel/index.html
 * http://www.sitepoint.com/html5-javascript-mouse-wheel/
 */
var prevTime = new Date().getTime();

function MouseWheelHandler(e) {
    var curTime = new Date().getTime();
    // console.log("현재 시간 : "+curTime);
    if(options.autoScrolling){
        // cross-browser wheel delta
        e = window.event || e || e.originalEvent;

        var value = e.wheelDelta || -e.deltaY || -e.detail;
        var delta = Math.max(-1, Math.min(1, value));
        //휠 업다운 판단 up이면 1, down이면 -1을 가진다

        //Limiting the array to 150 (lets not waist memory!)
        if(scrollings.length > 149){
            scrollings.shift();
        }

        //keeping record of the previous scrollings
        scrollings.push(Math.abs(value));
        //절대갓을 이요해서 음수,양수에 관련 없이 휠동작을 저장


        //preventing to scroll the site on mouse wheel when scrollbar is present
        if(options.scrollBar){
            preventDefault(e);
        }

        var timeDiff = curTime-prevTime;
        prevTime = curTime;

        //haven't they scrolled in a while?
        //(enough to be consider a different scrolling action to scroll another section)
        if(timeDiff > 200){
            //emptying the array, we dont care about old scrollings for our averages
            scrollings = [];
        }

        if(canScroll){//if theres any #
            // console.log("scolling[] : "+scrollings);

            var averageEnd = getAverage(scrollings, 10);
            // console.log("휠 마직막 평균값 :"+averageEnd);


            var averageMiddle = getAverage(scrollings, 70);
            // console.log("휠 중간 평균값 :"+averageMiddle);
            var isAccelerating = averageEnd >= averageMiddle;

            //a>=b a가 b보다 크거나 같으면 true.
            //휠의 마지막 평균값과 중간값을 비교해서 마지막값이 중간값보다 크거나 같으면 섹션이동이 동작.
            //스크롤 동작 시작 시 스크롤이 작동(true 반환) 동작이 멈추거나 동작 중일 떄는 false
            //곧 동작을위해 휠의 평균값들을 구해서 중간값과 마지막값을 비교
            // console.log("isAccelertating >= :"+isAccelerating);

            if(isAccelerating){
                //휠의 움직임이 있고
                if (delta < 0) {
                    //휠의 델타값이 0보다 작으면 down
                    scrolling('down');

                    //scrolling up?
                }else {
                    scrolling('up');
                }
            }
        }

        return false;
    }

    if(options.fitToSection){
        //stopping the auto scroll to adjust to a section
        activeAnimation = false;
    }
}




// function addResizeHandler(){
//     addHandler(window, resizeHandler, 'resize', 'onresize');
// }
//
// function addScrollHandler(){
//     addHandler(window, scrollHandler, 'scroll', 'onscroll', 'onscroll');
// }

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



function scrolling(type){
    if(type == 'down'){
        moveSectionDown();
    }else{
        moveSectionUp();
    }
}


// //Gets siblings
// function getAllSiblings(n) {
//     return getChildren(n.parentNode.firstChild, n);
// }

function next(element){
    // console.log("---next 함수 전달 받은 노드---");
    // console.log(element);
    var nextSibling = element.nextSibling;
    // sibling뜻 형제동기
    // nextSibling 같은 부모속에 있는 다음 형제 객체를 반환한다

    //-------------------nodeType----------------------
    // 노드가 요소 노드 인 경우, nodeType에 속성은 1을 반환합니다
    // 노드가 속성 노드 인 경우, nodeType에 속성은 2를 반환합니다.
    // 노드가 텍스트 노드 인 경우, nodeType에 속성은 3을 반환합니다.
    // 노드가 주석 노드 인 경우, nodeType에 속성 8을 반환합니다.
    // console.log('nodeType :'+nextSibling.nodeType);

    while(nextSibling && nextSibling.nodeType != 1) {
        nextSibling = nextSibling.nextSibling;
    }
    // 형제노드안에서 요소노드를 차았을때 그 노드를 반환 한다
    // console.log("-----다음노드-----");
    // console.log(nextSibling);
    return nextSibling;
}


function prev(element){
    // console.log("---prev 함수 전달 받은 노드---");
    // console.log(element);
    var prevSibling = element.previousSibling;

    while(prevSibling && prevSibling.nodeType != 1) {
        prevSibling = prevSibling.previousSibling;
    }

    return prevSibling;
}



/**
 * Moves the page up one section.
 */


function moveSectionUp(){
var section = prev($(SECTION_ACTIVE_SEL));
    // console.log("---SECTION---");
    // console.log(section);
if (section) {
    scrollPage(section, null, true);
}
}

/**
* Moves the page down one section.
*/
function moveSectionDown(){

    var section = next($(SECTION_ACTIVE_SEL));
    // console.log("---SECTION---");
    // console.log(section);
    if(section){
        scrollPage(section, null, false);
    }
}



function scrollPage(element,callback,isMovementUp) {
    console.log("스크롤페이지 진입");
    // console.log("------scrollPage 전달 노드-----");
    // console.log(element);
    if(element===null){
        //선택자가 없으면 함수를 벗어난다
        return;
    }
    var v={
        element:element,//선택자
        callback:callback,
        isMovementUp:isMovementUp,//true or false
        dtop:element.offsetTop,//부모선택자와 현재선택자 사이에 거리
        // yMovement:getYmovement(element),
        //none,down,up 셋중에 하나가 리턴 값으로 온다
        // sectionIndex:getNodeIndex(element),

        activeSection:$(SECTION_ACTIVE_SEL),

        // leavingSection: getNodeIndex($(SECTION_ACTIVE_SEL)) + 1,
        //caching the value of isResizing at the momment the function is called
        //because it will be checked later inside a setTimeout and the value might change
        localIsResizing: isResizing
    };
    // console.log("sectionIndex :"+v.sectionIndex);
    // console.log("leavingIndex :"+v.leavingSection);

    //quiting when destination scroll is the same as the current one
    // if(( getNodeIndex(v.activeSection) == v.sectionIndex && !isResizing) || (options.scrollBar && getScrollTop() === v.dtop)){
    //     return;
    // }

    var siblings = $$(SECTION_SEL);
    //섹션영역을 가지는 배열변수

    for(var s=0; s<siblings.length; s++){
        // console.log("형제들");
        // console.log(siblings[s]);
        removeClass(siblings[s], ACTIVE);
        //클래스를 모두 지우고
    }

    addClass(element, ACTIVE);
    //.active 클래스를 추가한다

    //preventing from activating the MouseWheelHandler event
    //more than once if the page is scrolling
    canScroll = false;


    //callback (onLeave) if the site is not just resizing and readjusting the slides
    // isFunction(options.onLeave) && !v.localIsResizing && options.onLeave.call(v.activeSection, v.leavingSection, (v.sectionIndex + 1), v.yMovement);


    performMovement(v);

    //flag to avoid callingn `scrollPage()` twice in case of using anchor links
    lastScrolledDestiny = v.anchorLink;

}










//------값 관련 함수--------..
function getAverage(elements, number){
    var sum = 0;
    //
    // console.log("전달 된 셀렉터 : "+elements);
    // console.log("전달 된 숫자 : "+number);
    //taking `number` elements from the end to make the average, if there are not enought, 1
    // console.log("elements.length - number : "+(elements.length - number));
    var lastElements = elements.slice(Math.max(elements.length - number, 1));
    // console.log("lastElements : "+lastElements);
    for(var i = 0; i < lastElements.length; i++){
        sum = sum + lastElements[i];
    }
    // console.log("sum 변수 : "+sum);
    // console.log("값 반올림 : "+Math.ceil(sum/number));
    return Math.ceil(sum/number);
}



//-------------변수 선택 함수-----////

function $(selector, context){
    // console.log("---SELECTOR---");
    // console.log(selector);
    context = context || document;
    // console.log("---CONTEXT---");
    // console.log(context);
    //
    // console.log("---$ 선택자---");
    // console.log(context.querySelector(selector));
    //querySelector 클래스 이름으로 노드를 찾고 첫번째 선택된 것을 반환한다
    return context.querySelector(selector);
}


function $$(selector, context){

    context = context || document;

    //클래스 이름으로 노드를 찾고 검색된 클래스 리스틀 반환한다
    return context.querySelectorAll(selector);
}


function getNodeIndex(node) {
    //node : .section .active
    var index = 0;
    console.log("getNodeIndex 전달된 노드-----:");
    console.log(node);


    while ( (node = node.previousSibling) ) {
        //node=node.previousSibling
        //node변수에 넣을 값이 있을 때 동안 반복
        //즉 이전 형제를 찾다가 null일때 벗어난다
        // console.log("----while문----:");
        // console.log(node);
        // console.log(node.nodeType);

        if (node.nodeType != 3 || !/^\s*$/.test(node.data)) {
            ///^\s*$/ : whitespace
            //nodeType 3은 택스트노드로 구성된 노드
            //.test(대상) 대상

            //노드타임이 텍스트가 아니거나 노드의 데이터가 없으면
            //즉 요소노드일 때
            //index +1
            index++;
            // console.log("index : "+index);
        }
    }
    // console.log("최종 index : "+index);
    return index;
}



/**
 * Retuns `up` or `down` depending on the scrolling movement to reach its destination
 * from the current section.
 */
function getYmovement(destiny){

    console.log("------destiny-----");
    console.log(destiny);

    var fromIndex = getNodeIndex($(SECTION_ACTIVE_SEL));
    console.log("fromIndex : "+fromIndex);

    var toIndex = getNodeIndex(destiny);

    console.log("toIndex : "+toIndex);

    if( fromIndex == toIndex){
        return 'none';
    }
    if(fromIndex > toIndex){
        return 'up';
    }
    return 'down';
}





/**
 * Retuns `right` or `left` depending on the scrolling movement to reach its destination
 * from the current slide.
 */
function getXmovement(fromIndex, toIndex){
    if( fromIndex == toIndex){
        return 'none';
    }
    if(fromIndex > toIndex){
        return 'left';
    }
    return 'right';
}








//------------높이 설정 함수-----//
function getWindowHeight(){
    return  'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    // in 연산자는 명시된 속성이 명시된 객체에 존재하면 true를 반환합니다.
    //innerHeight 속성이 존재하면 true를 반환한다;
}

//http://stackoverflow.com/questions/3464876/javascript-get-window-x-y-position-for-scroll
function getScrollTop(){
    var doc = document.documentElement;
    // console.log("---doc---");
    // console.log(doc);
    return (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
}

//---------------------------------------------------


//---------------클래스 관련 함수-------------//
//http://jaketrent.com/post/addremove-classes-raw-javascript/
function hasClass(ele,cls) {
    //return !! Boolean으로 형변환 할때 쓴다.
    //!! 이중부정이므로 긍정 true
    return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
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


//----------css관련 함수---------------//
/**
 * Performs the movement (by CSS3 or by jQuery)
 */
function performMovement(v){
    // using CSS3 translate functionality
    // console.log("css3 : "+ options.css3);
    // console.log("autoScrolling : "+ options.autoScrolling);
    // console.log("scrollBar : "+ options.scrollBar);
    if (options.css3 && options.autoScrolling && !options.scrollBar) {

        var translate3d = 'translate3d(0px, -' + v.dtop + 'px, 0px)';
        transformContainer(translate3d, true);

        //even when the scrollingSpeed is 0 there's a little delay, which might cause the
        //scrollingSpeed to change in case of using silentMoveTo();
        if(options.scrollingSpeed){
            setTimeout(function () {
                afterSectionLoads(v);
            }, options.scrollingSpeed);
        }else{
            afterSectionLoads(v);
        }
    }

    // using jQuery animate
    // else{
    //     var scrollSettings = getScrollSettings(v.dtop);
    //     scrollTo(scrollSettings.element, scrollSettings.options, options.scrollingSpeed, function(){
    //         afterSectionLoads(v);
    //     });
    // }
}
///------------------------------------------




/**
 * Replacement of jQuery extend method.
 */
function extend(defaultOptions, options){
    //creating the object if it doesnt exist
    if(typeof(options) !== 'object'){
        options = {};
    }

    for(var key in options){
        if(defaultOptions.hasOwnProperty(key)){
            defaultOptions[key] = options[key];
        }
    }

    return defaultOptions;
}

function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}



//-----------애니매이션---------------//
/**
 * Adds a css3 transform property to the container class with or without animation depending on the animated param.
 */

function transformContainer(translate3d, animated){
    if(animated){
        addAnimation(container);
    }else{
        removeAnimation(container);
    }

    setTransforms(container, translate3d);

    //syncronously removing the class after the animation has been applied.
    setTimeout(function(){
        removeClass(container, NO_TRANSITION);
    },10);
}

/**
 * Adds transition animations for the given element
 */
function addAnimation(element){
    var transition = 'all ' + options.scrollingSpeed + 'ms ' + options.easingcss3;

    removeClass(element, NO_TRANSITION);

    css(element,{
        '-webkit-transition': transition,
        'transition': transition
    });

    return element;
}

function afterSectionLoads (v){
    //callback (afterLoad) if the site is not just resizing and readjusting the slides
    isFunction(options.afterLoad) && !v.localIsResizing && options.afterLoad.call(v.element, v.anchorLink, (v.sectionIndex + 1));
    canScroll = true;

    isFunction(v.callback) && v.callback.call(this);
}

/**
 * Simulates the animated scrollTop of jQuery. Used when css3:false or scrollBar:true or autoScrolling:false
 * http://stackoverflow.com/a/16136789/1081396
 */
// function scrollTo(element, to, duration, callback) {
//     var start = getScrolledPosition(element);
//     var change = to - start;
//     var currentTime = 0;
//     var increment = 20;
//     activeAnimation = true;
//
//     var animateScroll = function(){
//         if(activeAnimation){ //in order to stope it from other function whenever we want
//             var val = to;
//
//             currentTime += increment;
//             val = Math.easeInOutCubic(currentTime, start, change, duration);
//
//             setScrolling(element, val);
//
//             if(currentTime < duration) {
//                 setTimeout(animateScroll, increment);
//             }else if(typeof callback !== 'undefined'){
//                 callback();
//             }
//         }else if (currentTime < duration){
//             callback();
//         }
//     };
//
//     aniateScroll();
// }
//
// function getScrolledPosition(element){
//     var position;
//ㄴ
//     //is not the window element and is a slide?
//     if(element.self != window && hasClass(element, SLIDES_WRAPPER)){
//         position = element.scrollLeft;
//     }
//     else if(!options.autoScrolling  || options.scrollBar){
//         position = getScrollTop();
//     }
//     else{
//         position = element.offsetTop;
//     }
//
//     //gets the top property of the wrapper
//     return position;
// }

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


function setTransforms(element, translate3d){
    css(element, {
        '-webkit-transform': translate3d,
        '-moz-transform': translate3d,
        '-ms-transform': translate3d,
        'transform': translate3d
    });
}

/**
 * Remove transition animations for the given element
 */

function removeAnimation(element){
    return addClass(element, NO_TRANSITION);
}

/**
 * Removes the auto scrolling action fired by the mouse wheel and trackpad.
 * After this function is called, the mousewheel and trackpad movements won't scroll through sections.
 */
function removeMouseWheelHandler(){
    var wrapper = $(WRAPPER_SEL);

    if (document.addEventListener) {
        wrapper.removeEventListener('mousewheel', MouseWheelHandler, false); //IE9, Chrome, Safari, Oper
        wrapper.removeEventListener('wheel', MouseWheelHandler, false); //Firefox
    } else {
        wrapper.detachEvent('onmousewheel', MouseWheelHandler); //IE 6/7/8
    }
}

function preventDefault(event){
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
}



/**
 * Sliding with arrow keys, both, vertical and horizontal
 */
var keydownId;
document.onkeydown = function(e) {
    clearTimeout(keydownId);

    var activeElement = document.activeElement;
    var tagName = activeElement.tagName;

    if(tagName !== 'SELECT' && tagName !== 'INPUT' && options.keyboardScrolling && options.autoScrolling){

        e = window.event || e || e.originalEvent;
        var charCode = e.charCode || e.keyCode;

        //preventing the scroll with arrow keys & spacebar & Page Up & Down keys
        var keyControls = [40, 38, 32, 33, 34];
        for(var i=0; i<keyControls.length; i++){
            if(keyControls[i] == charCode){
                preventDefault(e);
            }
        }

        var shiftPressed = e.shiftKey;
        keydownId = setTimeout(function(){
            onkeydown(shiftPressed, charCode);
        },150);
    }
};

function onkeydown(shiftPressed, charCode){
    switch (charCode) {
        //up
        case 38:
        case 33:
            moveSectionUp();
            break;

        //down
        case 32: //spacebar
            if(shiftPressed){
                moveSectionUp();
                break;
            }
        case 40:
        case 34:
            moveSectionDown();
            break;

        //Home
        case 36:
            moveTo(1);
            break;

        //End
        case 35:
            moveTo( $$(SECTION_SEL).length );
            break;

        //left
        case 37:
            moveSlideLeft();
            break;

        //right
        case 39:
            moveSlideRight();
            break;

        default:
            return; // exit this handler for other keys
    }
}

function addVerticalNavigation(){
    var div = document.createElement('div');
    div.setAttribute('id', SECTION_NAV);

    var divUl = document.createElement('ul');
    div.appendChild(divUl);

    document.body.appendChild(div);

    nav = $(SECTION_NAV_SEL);

    setCss(nav, 'color', options.navigationColor);
    addClass(nav, options.navigationPosition);

    if(options.showActiveTooltip){
        addClass(nav, SHOW_ACTIVE_TOOLTIP);
    }

    var li = '';

    for (var i = 0; i < $$(SECTION_SEL).length; i++) {
        var link = '';
        if (options.anchors.length) {
            link = options.anchors[i];
        }

        li = li + '<li><a href="#' + link + '"><span></span></a>';

        // Only add tooltip if needed (defined by user)
        var tooltip = options.navigationTooltips[i];
        if (typeof tooltip !== undefined && tooltip !== '') {
            li += '<div class="'+ SECTION_NAV_TOOLTIP +' ' + options.navigationPosition + '">' + tooltip + '</div>';
        }

        li += '</li>';
    }

    var ul = $('ul', nav);
    ul.innerHTML = ul.innerHTML + li;

    //creating the event listener
    var links = $$(SLIDES_NAV_LINK_SEL);


    console.log("links :");
    console.log(links);
    // for(var l = 0; l<links.length; l++){
    //     addListenerMulti(links[l], 'click onclick touchstart', function(e){
    //         e = window.event || e || e.originalEvent;
    //         preventDefault(e);
    //         var index = getNodeIndex(this.parentNode);
    //         console.log("for문 index="+index);
    //         scrollPage($$(SECTION_SEL)[index], null, false);
    //     });
    // }

}

function setCss(element, style, value){
    element.style[style] = value;
}

function addListenerMulti(el, s, fn) {
    var evts = s.split(' ');
    for (var i=0, iLen=evts.length; i<iLen; i++) {
        if (document.addEventListener) {
            el.addEventListener(evts[i], fn, false);
        }else{
            el.attachEvent(evts[i], fn, false); //IE 6/7/8
        }
    }
}

function activateMenuElement(name){
    if(options.menu){
        var menu = $(options.menu);
        if(menu){
            removeClass($(ACTIVE_SEL, menu), ACTIVE);
            addClass($('[data-menuanchor="'+name+'"]', menu), ACTIVE);
        }
    }
}

function activateMenuAndNav(anchor, index){
    activateMenuElement(anchor);
    activateNavDots(anchor, index);
}

/**
 * Activating the website navigation dots according to the given slide name.
 */
function activateNavDots(name, sectionIndex){
    if(options.navigation){
        console.log("선택 된 nav는");
        console.log(nav);
        removeClass( $(ACTIVE_SEL, nav), ACTIVE);

        if(name){
            addClass( $('a[href="#' + name + '"]', nav) , ACTIVE);
        }else{
            var currentLi = $$('li', nav)[sectionIndex];
            addClass( $('a', currentLi), ACTIVE);
        }
    }
}

/*
* Sets the state for a variable with multiple states (original, and temporal)
* Some variables such as `autoScrolling` or `recordHistory` might change automatically its state when using `responsive` or `autoScrolling:false`.
* This function is used to keep track of both states, the original and the temporal one.
* If type is not 'internal', then we assume the user is globally changing the variable.
*/
function setVariableState(variable, value, type){
    options[variable] = value;
    if(type !== 'internal'){
        originals[variable] = value;
    }
}

function getScrollSettings(top){
    var scroll = {};

    //top property animation
    if(options.autoScrolling && !options.scrollBar){
        scroll.options = -top;
        scroll.element = $('.'+WRAPPER);
    }

    //window real scrolling
    else{
        scroll.options = top;
        scroll.element = window;
    }

    return scroll;
}

function silentScroll(top){
    if(options.scrollBar){
        var scrollSettings = getScrollSettings(top);
        setScrolling(scrollSettings.element, scrollSettings.options, 0);
    }
    else if (options.css3) {
        var translate3d = 'translate3d(0px, -' + top + 'px, 0px)';
        transformContainer(translate3d, false);
    }
    else {
        setCss(container, 'top', -top + 'px');

    }
}

function afterRenderActions(){
    var section = $(SECTION_ACTIVE_SEL);

    isFunction( options.afterLoad ) && options.afterLoad.call(section, section.getAttribute('data-anchor'), (getNodeIndex(section) + 1));
    isFunction( options.afterRender ) && options.afterRender.call(container);
}

function setBodyClass(text){
    var section = $(SECTION_ACTIVE_SEL);
    var slide = $(SLIDE_ACTIVE_SEL, section);

    var sectionAnchor = section.getAttribute('data-anchor');
    var sectionIndex = getNodeIndex(section);

    var text = String(sectionIndex);

    if(options.anchors.length){
        text = sectionAnchor;
    }

    if(slide){
        var slideAnchor = getSlideAnchor(slide);
        text = text + '-' + slideAnchor;
    }

    //changing slash for dash to make it a valid CSS style
    text = text.replace('/', '-').replace('#','');

    //removing previous anchor classes
    var classRe = new RegExp('\\b\\s?' + VIEWING_PREFIX + '-[^\\s]+\\b', "g");
    document.body.className = document.body.className.replace(classRe, '');

    //adding the current anchor
    addClass(document.body, VIEWING_PREFIX + '-' + text);
}

// * Displays warnings
// */
function displayWarnings(){
    //anchors can not have the same value as any element ID or NAME
    for(var i =0; i<options.anchors.length; i++){
        var name = options.anchors[i];
        var existId = getById('#' + name);
        if( existId || $$('[name="'+name+'"]').length){
            showError('error', 'data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).');
        }
    }
}


/**
 * Checks for translate3d support
 * @return boolean
 * http://stackoverflow.com/questions/5661671/detecting-transform-translate3d-support
 */
function support3d() {
    var el = document.createElement('p'),
        has3d,
        transforms = {
            'webkitTransform':'-webkit-transform',
            'OTransform':'-o-transform',
            'msTransform':'-ms-transform',
            'MozTransform':'-moz-transform',
            'transform':'transform'
        };

    // Add it to the body to get the computed style.
    document.body.insertBefore(el, null);

    for (var t in transforms) {
        if (el.style[t] !== undefined) {
            el.style[t] = 'translate3d(1px,1px,1px)';
            has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
        }
    }

    document.body.removeChild(el);

    return (has3d !== undefined && has3d.length > 0 && has3d !== 'none');
}

function showError(type, text){
    console && console[type] && console[type]('fullPage: ' + text);
}

function getById(element){
    return document.getElementById(element);
}

function getByTag(element){
    return document.getElementsByTagName(element)[0];
}

function removeMouseWheelHandler(){
    var wrapper = $(WRAPPER_SEL);

    if (document.addEventListener) {
        wrapper.removeEventListener('mousewheel', MouseWheelHandler, false); //IE9, Chrome, Safari, Oper
        wrapper.removeEventListener('wheel', MouseWheelHandler, false); //Firefox
    } else {
        wrapper.detachEvent('onmousewheel', MouseWheelHandler); //IE 6/7/8
    }
}