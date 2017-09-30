
var bgImgUrl= {
    section0: '../../images/a/aa.jpg',
    section1: 'http://www.kakao.com/kakaopay/wp-content/uploads/2016/09/samuel-zeller-74718_tiny.jpg',
};


// img.onload=function () {
//     console.log("img로드",Date.now());
//     a[0].style.backgroundImage='url('+img.src+')';
//     // var BtoU=document.querySelectorAll(".ani");
//     // for (var i=0; i<BtoU.length; i++){
//     //     BtoU[i].classList.add('divBtoU');
//     // }
// }
//
styleBackgorundImge();

window.onload=function () {
    appendTextContainer();
}

function insertBgImgSrc() {
    var bgInner=document.querySelectorAll('.bgInner');
    var sectionArr=[];

    for(var section in bgImgUrl){
        var src=bgImgUrl[section];
        sectionArr.push(src);
    }

    for(var i=0;i<bgInner.length;i++){
        console.log(sectionArr[i]);
        bgInner[i].style.backgroundImage='url('+sectionArr[i]+')';
    }

    // for(var i=0;i<bgImaUrl.length;i++){
    //     img.src=bgImaUrl.;
    //     imgArray[i]=img;
    //     console.log(img[i].src);
    // }

    // console.log(imgArray);
    //
    // if(img.complete==true){
    //     console.log("이프문",img.complete);
    //
    //     for (var i=0;i<bgInner.length;i++){
    //         bgInner[i].style.backgroundImage='url('+img[i].src+')';
    //     }
    // }
    // documnet.style.onload
}




function appendTextContainer() {
    var parent=document.querySelector("#section01");
    var outeDiv=document.createElement('div');
    outeDiv.className="outer";

    var innerDiv=document.createElement('div');
    innerDiv.className="inner";

    var centeredDiv=document.createElement('div');
    centeredDiv.className="centered";

    innerDiv.appendChild(centeredDiv);
    outeDiv.appendChild(innerDiv);
    parent.appendChild(outeDiv);
    addAniBtn(centeredDiv);
}

function apeendText(parentElement) {

}

function dataDelay(whatAni,timeNum) {
    setTimeout(whatAni,timeNum);
}


function addAniBtn(parentElement) {
    var div=document.createElement('div');
    var span=document.createElement('span');
    var spanClear=document.createElement('span');
    var btn=document.createElement('btn');

    btn.className="btn-circle";
    spanClear.className="spanBlock";
    div.className="aniDivAlphaIn";
    span.appendChild(btn);
    div.appendChild(span);
    div.appendChild(spanClear);
    parentElement.appendChild(div);

}

function imgeUrl() {

}

function styleBackgorundImge() {
    console.log("스타일 시트 접근");
    console.log(document.styleSheets[1]);


    // var parents=document.querySelectorAll(".bgInner");

}


//----------------------------------------------


function getStyle(elem, cssprop, cssprop2){

    //IE
    if(elem.currentStyle){
        return elem.currentStyle[cssprop];

        //다른 브라우저
    }else if(document.defaultView && document.defaultView.getComputedStyle){
        return document.defaultView.getComputedStyle(elem, null).getPropertyValue(cssprop2);

        //대비책
    }else{
        return null;
    }
}