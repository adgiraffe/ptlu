


// $(document).ready(function() {

$(".fileDrop").on("dragenter dragover",function (event) {
    event.preventDefault();
});

$(".fileDrop").on("drop",function (event) {
    event.preventDefault();
    var files=event.originalEvent.dataTransfer.files;
    var file=files[0];
//                console.log(file);

    var formData=new FormData();
    formData.append("file",file);

    $.ajax({
        url:'/uploadForm',
        data: formData,
        dataType:'text',
        processData:false,
        contentType:false,
        type:'POST',
        success:function (data) {
            // success:function () {
            //     $('li').remove();
            //    selectImageList();
            // var fileInfo=getFileInfo(data);
            //
            // var nName=[];
            // nName=getiNum(data);
            //
            // console.log(nName);
            // console.log(data);
            // console.log(checkImageType(data));
            console.log(data)


            if (checkImageType(data)){
                str='<li>'
                    // +'<a href="displayFile?fileName='
                    // +getImageLink(data)
                    // +'">'
                    +'<img src="displayFile?fileName='
                    +data
                    +'" name="'
                    +nName
                    +'"/>'
                    // + '</a>' +
                    +'<small data-src="'
                    + data
                    + '">X</small></li>';
            }else {
                str='<li><small data-src="'
                    + data
                    +'">X</small></li>';
            }
            $(".uploadedList").append(str);
        }
    });
});
$(".uploadedList").on("click","small",function (event) {
    var that=$(this);

    $.ajax({
        url:'/deleteFile',
        type:'POST',
        data:{fileName : $(this).attr("data-src")},
        dataType:'text',
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


// function selectAble() {
//     $('.uploadedList').children('li').click(function () {
//         $(this).addClass('selected');
//     });
// }



function selectImageList() {

    var imageArray=[];
    var data=new Array();
    $.ajax({
        url:'/selectImageList',
        dataType:'json',
        // async: false,
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
        dataType:'text',
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
