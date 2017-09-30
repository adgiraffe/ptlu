


// $(document).ready(function() {

    $(".fileDrop").on("dragenter dragover",function (event) {
        event.preventDefault();
    });

    $(".fileDrop").on("drop",function (event) {
        event.preventDefault();
        multiFileAdd(event);
    });

    $(".uploadedList").on("click","small",function (event) {
        var that=$(this);
        var token = $("meta[name='_csrf']").attr("content");
        var header = $("meta[name='_csrf_header']").attr("content");

        $.ajax({
            url:'/deleteFile',
            type:'POST',
            data:{fileName : $(this).attr("data-src")},
            dataType:'text',
            beforeSend:function (xhr) {
                xhr.setRequestHeader(header,token);
            },
            success:function (result) {
                if (result=='deleted'){

                    alert("deleted");
                    that.parent('li').remove();
                }
            }

        });
    });

    $('.uploadedList').ready(function () {
        selectImageList();
    })


function multiFileAdd(event) {
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");

    var files=[];
    files=event.originalEvent.dataTransfer.files;
    // console.log(files);
    var formData=new FormData();

    for(var i=0;i<files.length;i++){
        var str='file'+i.toString();
        formData.append('files',files[i]);
        //formData.append로 추가시 key값인 'files'이름으로 서버측 인자값이름으로 받아야 한다

    }

    $.ajax({
        url:'/uploadForm',
        data: formData,
        processData:false,
        contentType:false,
        dataType:'json',
        //json으로 안하고 text로 설정하면 서버에서 돌려 받는 값이 문자로 변경된다 json으로 받아야 .length메소드가 배열갯수를 구함
        type:'POST',
        beforeSend:function (xhr) {
            xhr.setRequestHeader(header,token);
        },
        success:function (thumnailList) {


            // var nName=[];
            //
            // console.log(nName);

            // console.log(checkImageType(data));
            var data=[];
            data=thumnailList;
            var fileInfo=null;

            for(var i=0; i <data.length;i++){
                fileInfo=getFileInfo(data[i].thumnailPath);
                // nName=getiNum(data[i].thumnailPath);
                if (checkImageType(data[i].thumnailPath)){
                    str='<li>'
                        // +'<a href="displayFile?fileName='
                        // +getImageLink(data)
                        // +'">'
                        +'<img src="displayFile?fileName='
                        +data[i].thumnailPath
                        +'" name="'
                        +data[i].ino
                        +'"/>'
                        // + '</a>' +
                        +'<small data-src="'
                        +data[i].thumnailPath
                        + '">X</small></li>';
                }else {
                    str='<li><small data-src="'
                        +data[i].thumnailPath
                        +'">X</small></li>';
                }
                $(".uploadedList").append(str);
                selectAble();
            }
        }
    });
}


function selectImageList() {

        var imageArray=[];
        var data=new Array();

        var token = $("meta[name='_csrf']").attr("content");
        var header = $("meta[name='_csrf_header']").attr("content");



    $.ajax({
            url:'/selectImageList',
            dataType:'json',
            // async: false,
            beforeSend:function (xhr) {
                xhr.setRequestHeader(header,token);
            },
            success:function (imageList) {
                imageArray=imageList;
                console.log(imageList);

                for (var i=0; i<imageArray.length; i++){
                    data[i]=imageArray[i].thumnailPath;
                    // console.log(data[i]);
                    // filePath[i]=data[i].substring(data[i].lastIndexOf("_")+1);
                    // console.log(filePath[i]);

                    if (checkImageType(data[i])){
                        str='<li>'
                            +'<img src="displayFile?fileName='
                            +data[i]
                            +'" name="'
                            +imageArray[i].ino
                            +'"/>'
                            + '<small data-src="'
                            + data[i]
                            + '">X</small></li>';
                    }else {
                        str='<li><small data-src="'
                            +data[i]
                            +'">X</small></li>';
                    }
                    $(".uploadedList").append(str);
                    // var liList='<li><img src="displayFile?fileName='+imageArray[i].thumnailPath+'"></li>';
                    // $(".uploadedList").append(liList);
                    selectAble();
                }
            }
        })
    }






function getiNum(data) {
    var fileName=new Array();
    fileName[0]=data;
    console.log(fileName);
    var fName=[];
    for (var i=0;i<fileName.length;i++){
        console.log(i);
        fName[i]=data;
    }
    var nameNo=[];
    // var obj = new Object(); // JSON형식으로 변환 할 오브젝트
    // obj.fPath = data; // form의 값을 오브젝트에 저장
    // var fPath=JSON.stringify(obj);


    console.log(fName);
    $.ajax({
        url:'/selectOneNum',
        data:'objectList='+fName,
        dataType:'json',
        type:'get',
        processData:false,
        contentType:false,
        type:'GET',
        async:false,
        success:function (iNo) {
            nameNo=iNo;
        }
    })
    console.log(nameNo)
    return nameNo;
}









    // function selectImageList() {
    //
    //     var imageArray=[];
    //     var data=new Array();
    //     $.ajax({
    //         url:'/selectImageList',
    //         dataType:'json',
    //         // async: false,
    //         success:function (imageList) {
    //             imageArray=imageList;
    //             console.log(imageList);
    //
    //             for (var i=0; i<imageArray.length; i++){
    //                 data[i]=imageArray[i].thumnailPath;
    //                 // console.log(data[i]);
    //                 // filePath[i]=data[i].substring(data[i].lastIndexOf("_")+1);
    //                 // console.log(filePath[i]);
    //
    //                 if (checkImageType(data[i])){
    //                     console.log('1');
    //                     str='<li>'
    //                         +'<a href="displayFile?fileName='
    //                         +getImageLink(data[i])
    //                         +'">'
    //                         +'<img src="displayFile?fileName='
    //                         +data[i]
    //                         +'"/>'
    //                         + '</a><small data-src="'
    //                         + data[i]
    //                         + '">X</small></li>';
    //                 }else {
    //                     console.log("2");
    //                     str='<li><a href="displayFile?filename='
    //                         +data[i]+'">'
    //                         +getOriginalName(data[i])
    //                         +'</a><small data-src="'
    //                         +data[i]
    //                         +'">X</small></li>';
    //                 }
    //                 $(".uploadedList").append(str);
    //                 // var liList='<li><img src="displayFile?fileName='+imageArray[i].thumnailPath+'"></li>';
    //                 // $(".uploadedList").append(liList);
    //                 selectAble();
    //
    //             }
    //         }
    //     })
    //  }




//
// });
