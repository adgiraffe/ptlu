function selectAble() {
    $('.uploadedList').children('li').click(function () {
        $(this).addClass('selected');
    });
}

function getImage() {
    console.log('hi');
    var classArray = [];
    var numList = [];
    var num = 0;
    classArray = document.getElementsByClassName('selected');

    console.log('시작 : ');
    for (var i = 0; i < classArray.length; i++) {
        num = classArray[i].firstChild.getAttribute('name');
        console.log(num);
        numList[i] = num;
    }
    console.log(numList);
    return numList;
}

function sendNumList() {

    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");

    getImage();
    var numList=[];
    numList=getImage();
    var inoList={};
    console.log(numList);
    for (var i=0; i<numList.length; i++){
        var ino=numList[i];
        var numName="ino"+i;
        inoList[numName]=ino;
    }
   var jSonL=JSON.stringify(inoList);
    console.log(jSonL);
    $.ajax({
        url:'/pathPerNo',
        data:jSonL,

        dataType:'json',
        processData:false,
        contentType : 'application/json',
        method:'POST',
        beforeSend:function (xhr) {
            xhr.setRequestHeader(header,token);
        },
        success:function (rliList) {
            console.log(rliList);
            for(var i=0;i<rliList.length;i++){
                var path=rliList[i];
                var htmlTag='<img src="displayFile?fileName='
                    +path
                    +'"/>';
                console.log("경로 : "+path)
                opener.tinymce.execCommand("mceInsertContent",'true ',htmlTag);
            }
        }
    })
}