/**
 * Created by joo on 2017. 7. 13..
 */
function checkImageType(fileName) {
    var pattern=/jpg|gif|png|jpeg/i;
    return fileName.match(pattern);
}

function getImageLink(fileName) {
    if (!checkImageType(fileName)){
        return;
    }

    var front=fileName.substr(0,12);
    console.log(front);
    var end=fileName.substr(14);
    console.log(end);
    return front+end;
}

function getFileInfo(fullName) {
    var fileName,imgSrc,getLink;

    var fileLink;

    if (checkImageType(fullName)){
        imgSrc="/displayFile?fileName="+fullName;
        fileLink=fullName.substr(14);
        console.log(fileLink);

        var front=fullName.substr(0,12);
        var end=fullName.substr(14);

        getLink="/displayFile?fileNmae"+front+end;
    }else {
        imgSrc="";
        fileLink=fullName.substr(12);
        getLink="/displayFile?fileName="+fullName;
    }

    fileName=fileLink.substr(fileLink.indexOf("_")+1);
    return {fileName:fileName,imgSrc:imgSrc,getLink:getLink,fullName:fullName};
}

