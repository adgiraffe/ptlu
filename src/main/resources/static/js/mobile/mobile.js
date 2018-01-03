
var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/);

var branding={
    logoLink:"../../../../images/logo/logo1.png",
    menuName:['홈','변영주','권해효','김보통','이정미','허지웅','박철민','노동자','왜 공공운수노조인가?'],
    menuLink:['http://so-kptu.net/#firstPage','http://so-kptu.net/#secondPage','http://so-kptu.net/#3rdPage','http://so-kptu.net/#4thPage','http://so-kptu.net/#5thPage','http://so-kptu.net/#6thPage','http://so-kptu.net/#7thPage','http://so-kptu.net/#8thPage','http://so-kptu.net/#9thPage','http://so-kptu.net/#lastPage'],
    localHost:'http://so-kptu.net',
    menuCount:9,
    originHeaderHeight:0,
    tansHeaderHeight:0,
}

var aAttr={
    href:'href',
}




if(isTouchDevice){
    console.log(isTouchDevice)
    var video=document.querySelector('.video');
    console.log(video);
    var source=document.createElement('source');
    source.setAttribute('src','../../video/verticalMain.m4v');
    source.setAttribute('class','video-bg-vertical');
    video.appendChild(source);
    // createMobileMenu();
    // iniMenuHeight();
    // openEvent();

}

else {
    var video=document.querySelector('.video');
    console.log(video);
    var source=document.createElement('source');
    source.setAttribute('src','../../video/homepage.m4v');
    source.setAttribute('class','video-bg-horizon')
    video.appendChild(source);
    createDeskTopMenu();
}


function next(element){
    var nextSibling = element.nextSibling;
    while(nextSibling && nextSibling.nodeType != 1) {
        nextSibling = nextSibling.nextSibling;
    }

    return nextSibling;
}

function createMobileMenu() {
    var bodyArr=document.getElementsByTagName('body');
    var body=bodyArr[0];
    var firstChild=next(body.firstChild);
    var header=document.createElement("header");
    header.className='menuHeader';
    createBasicMenu(header);
    body.insertBefore(header,firstChild);
}


function createDeskTopMenu() {

    var bodyArr=document.getElementsByTagName('body');
    var body=bodyArr[0];
    var firstChild=next(body.firstChild);


    var header=document.createElement("header");
    header.className='menuHeader';

    createDeskTopBasicMenu(header)
    body.insertBefore(header,firstChild);


}
function createDeskTopBasicMenu(parent) {
    createBrandDiv(parent);
    createMenuListDiv(parent);
}




function createBasicMenu(parent) {
    createBrandDiv(parent);
    createMenuListDiv(parent);
}




function createBrandDiv(parent) {
    var brandDiv=document.createElement('div');
    brandDiv.className='brandDiv';

    var titleDiv=document.createElement('div');
    titleDiv.className="menuTitle";
    titleDiv.innerHTML='그러니까, 공공운수';

    var phone=document.createElement('div');
    phone.className='sendPhone';
    phone.innerHTML='&#9742 상담전화'
    var aPhone=document.createElement('a');
    aPhone.appendChild(phone);
    aPhone.setAttribute('href','tel:1661-5557');


    var a=createAtagLink(branding.localHost);
    var logo=createLogo(branding.logoLink);
    var icon=createIconDiv();


    parent.appendChild(brandDiv);
    brandDiv.appendChild(a);
    brandDiv.appendChild(aPhone);
    brandDiv.appendChild(icon);
    a.appendChild(logo);
    a.appendChild(titleDiv);
}


function createMenuListDiv(parent) {

    var menuNav=document.createElement('nav');
    menuNav.className='menuNav';
    parent.appendChild(menuNav);

    createLiMenu(menuNav);

}


function createIconDiv() {
    var icon=document.createElement('div');
    icon.className='icon';

    var menuBtn=document.createElement('div');
    menuBtn.className='menuBtn';

    icon.appendChild(menuBtn);
    return icon;

}

function svgSetAttribute(svg) {
    svg.setAttribute('version','1.1');
    svg.setAttribute('xmlns','http://www.w3.org/2000/svg');
    svg.setAttribute('viewBox','0 0 16 16');
    svg.setAttribute('preserveAspectRatio','none');
}



function createCirle() {
    var circle=document.createElement('circle');
    circle.setAttribute('cx','8');
    circle.setAttribute('cy','8');
    circle.setAttribute('r','6.29');
    circle.setAttribute('transform','rotate(90 8 8)');
    return circle;
}

function createLogo(imgLink) {
    var img=document.createElement('img');
    img.className='logoImg';
    img.setAttribute('src',imgLink);

    return img
}

function createAtagLink(link) {
    var a=document.createElement('a');
    a.setAttribute(aAttr.href,link);

    return a;
}

function openEvent() {
    var icon=document.getElementsByClassName('icon');
     icon[0].addEventListener('click',function () {
        var btn=icon[0].firstChild;
        toggleClass(btn,'open');
        checkMenuOpen();
    })
}


function checkMenuOpen() {
    var icon=document.querySelector('.icon');
    var opened=icon.firstChild;
    var name=opened.getAttribute('class');


    switch (name){
        case 'open':
            console.log(1);


            var menuHeader=document.getElementsByClassName('menuHeader');


            branding.tansHeaderHeight=menuHeader[0].scrollHeight;

            menuHeader[0].style.height=branding.tansHeaderHeight+'px';

            break;

        case 'menuBtn':

            var menuHeader=document.getElementsByClassName('menuHeader');
            var brandDiv=document.getElementsByClassName('brandDiv');

            branding.originHeaderHeight=brandDiv[0].scrollHeight;


            menuHeader[0].style.height=branding.originHeaderHeight+'px';

            break;
    }


}


function iniMenuHeight() {
    var menuHeader=document.getElementsByClassName('menuHeader');
    var brandDiv=document.getElementsByClassName('brandDiv');

    branding.originHeaderHeight=brandDiv[0].scrollHeight;
    menuHeader[0].style.height=branding.originHeaderHeight+'px';
}



function toggleClass(element, className){
    console.log('toggle',element.classList.toggle('menuBtn'))
    if(element.classList.toggle('open')==true){
        element.classList.add('open');
    }
}


function myFunction() {
    var x = document.getElementById("menuNav");
    if (x.className === "menuNav") {
        x.className += " responsive";
    } else {
        x.className = "menuNav";
    }
}

function createLiMenu(parent) {
    var parent=parent;
    var num=branding.menuCount;
    var meNa=branding.menuName;
    var ul=document.createElement('ul');
    ul.className='siteMenu';

    console.log('메뉴',meNa);
    for(var i=0;i<num;i++){

        var a=document.createElement('a');
        a.setAttribute('href',branding.menuLink[i]);

        var li=document.createElement('li');

        li.className="menuLi";
        li.innerHTML=meNa[i]

        a.appendChild(li);
        ul.appendChild(a);


    }

    parent.appendChild(ul);
}




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
