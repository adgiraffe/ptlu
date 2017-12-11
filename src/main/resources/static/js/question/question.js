
var operation=document.getElementsByClassName('operation');
var xmlHttp;

if(window.XMLHttpRequest){
    xmlHttp=new XMLHttpRequest();
} else {
    xmlHttp=new ActiveXObject('Microsoft.XMLHTTP');
}

operation[0].addEventListener('click',ajaxOpen);

function ajaxOpen() {
    xmlHttp.onreadystatechange=function () {
        console.log('ready',xmlHttp.readyState);
        console.log('status',xmlHttp.status);

        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            // //통신 성공시 구현부분
            // console.log(xmlHttp.responseText);
            // var totalNum={
            //     "totalNum":getNumber()
            // };
            //
            // var jsonData=JSON.stringify(totalNum);
            // console.log(jsonData);
            // xmlHttp.open('GET','/example/question',true);
            // xmlHttp.send(jsonData);
        }
    }

    var totalNum={
        "totalNum":getNumber()
    };

    var jsonData=JSON.stringify(totalNum);
    console.log(jsonData);
    var params = "totalNum="+totalNum;
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");

    //Spring Security는 header에 csrf토큰을 지정해주지 않으면 POST로 전송이 되지 않는다
    xmlHttp.open('POST','/example/question',true);
    xmlHttp.setRequestHeader(header,token);
    xmlHttp.send("totalNum="+totalNum);

    // $.ajax({
    //     type: "GET",
    //     contentType: "application/json",
    //     url: "/question",
    //     data: getNumber(),
    //     dataType: 'String',
    //     cache: false,
    //     timeout: 600000,
    //     success:console.log('성공'),
    // })
}


function getNumber() {
    var unary=document.getElementsByClassName('unary');
    console.log(unary);
    var totalNum="";
    for(var i=0;i<unary.length;i++){
        var numberString=String(unary[i].value);
        totalNum=totalNum+numberString;
        console.log(numberString);
    }
    console.log(totalNum);
    return totalNum;
}

function checkNum(unary) {
    var regNumber=/^[0-9]*$/;
    for(var i=0;i<unary.length;i++){
        if(!regNumber.test(unary[i].value)){
            alert('숫자만 입력해 주세요');
            return;
        }
    }
}

