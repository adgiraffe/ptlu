
var curIndex=0;
var totalSection=0;
getTotalIndex();
function getDelta(event) {
    var e = window.event || event || event.originalEvent;
    var events=[];
    events.y = (typeof e.pageY !== 'undefined' && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY);
    events.x = (typeof e.pageX !== 'undefined' && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX);

    console.log('이벤트 ',e);
    console.log("타입오프 ",typeof e.touches[0].pageY);
    console.log(events);
}

function createUpDownNav() {
    var body=document.querySelector('body');
    var nav=document.createElement('nav');
    nav.className='up-down-nav';
    var divDown=document.createElement('div');
    var divUp=document.createElement('div');
    divDown.className='down-arrow';
    divUp.className='up-arrow';
    nav.appendChild(divUp);
    nav.appendChild(divDown);
    body.appendChild(nav);
}

function getTotalIndex() {
    var section=document.querySelectorAll('section');
    totalSection=section.length;
}

function findActiveIndex(v) {
    curIndex=v.sectionIndex;
    console.log("현재인덱스 ",curIndex);
    console.log("활성화 인덱스 ",v.activeSection);

    switch (curIndex){
        case 0:
            var upArrow=document.querySelector('.up-arrow');
            var downArrow=document.querySelector('.down-arrow');
            console.log(upArrow);
            // upArrow.style.display='none';
            // downArrow.style.display='block';
            upArrow.style.opacity='0';
            downArrow.style.opacity='1';
            break;
        case totalSection-1:
            var upArrow=document.querySelector('.up-arrow');
            var downArrow=document.querySelector('.down-arrow');
            // upArrow.style.display='block';
            // downArrow.style.display='none';
            upArrow.style.opacity='1';
            downArrow.style.opacity='0';

            break;

        default:
            var upArrow=document.querySelector('.up-arrow');
            var downArrow=document.querySelector('.down-arrow');
            // upArrow.style.display='block';
            // downArrow.style.display='block';
            upArrow.style.opacity='1';
            downArrow.style.opacity='1';
    }

}

function getNodeIndex(node) {
    console.log("getNodeIndex",node);
    var index = 0;
    while ( (node = node.previousSibling) ) {
        console.log('previous node',node.previousSibling);
        if (node.nodeType != 3 || !/^\s*$/.test(node.data)) {
            console.log('노드타입',node.nodeType);
            console.log('노드데이터',node.data);
            index++;
        }
    }

    return index;
}
