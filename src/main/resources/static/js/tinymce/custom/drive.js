function openExploer() {
    var fileBrowser = window.open("/fileBrowser", "tinymcePop", "width=400, height=350");
}

//JSON으로 보낼 때
// function sendTinyMceContent() {
//     var tinyContent=tinymce.get('my_editor');
//     console.log(tinyContent.getBody());
//     console.log(tinyContent.getContent());
//
//     var titleName=document.getElementById('title');
//     var title=titleName.value;
//     console.log(title);
//     var content={};
//
//     content["content"]=tinyContent.getContent();
//     var jsonData=JSON.stringify(content);
//     console.log(content);
    // $.ajax({
    //     url:'/insertMceContent',
    //     data:jsonData,
    //     dataType:'json',
    //     processData:false,
    //     contentType : 'application/json; charset=utf-8',
    //     method:'POST',
    //     success:function () {
    //         console.log("SUCCESS");
    //     }
    // })
// }
