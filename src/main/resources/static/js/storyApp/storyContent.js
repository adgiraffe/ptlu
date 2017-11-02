


var state=0;

function releaseData(state) {
    var oneArr=textArr[state];
    var dataArr=oneArr.split(',');
    state=state+1;
    console.log("B는",dataArr);

    return dataArr;
}

// 문자열의 형식 질문번호-질문내용-다음갈번호-다음갈번호
var textArr=[
    '0,당신은 정규직인가요?,1,2,,imgSrc1,imgSrc2,,,,',
    '1,당신은 공공부문노동자 인가요?,3,4,5,(../../images/storyImg/pi2.jpg),imgSrc2,imgSrc3,,' ,
    '2,당신은 공공부문노동자 인가요?,6,7,8,imgSrc1,imgSrc2,imgSrc3,,',
    '3,당신은 노동조합원 인가요?,9,10,,imgSrc1,imgSrc2,,,',
    '4,당신은 노동조합원 인가요?,11,12,,imgSrc,imgSrc1,,,',

    '5,당신에게 가장 알맞은 노조가 궁금하신가요/지금바로 전화하세요/1661-551,,,,imgSrc,imgSrc1,,,joinLink',

    '6,당신은 노동조합원 인가요?,13,14,,imgSrc,imgSrc1,,,',
    '7,당신은 노동조합원 인가요?,15,16,,imgSrc,imgSrc1,,,',

    '8,당신에게 가장 알맞은 노조가 궁금하신가요/지금바로 전화하세요/1661-551,,,,imgSrc,imgSrc1,,,joinLink',

    '9,당신은 자랑스런 공공부문 노동조합 조합원입니다/비정규직조직화에 함께 해주세요,,,,imgSrc,imgSrc1,,http://www.kptu.net/mboard.asp?Action=view&strBoardID=KPTU_PDS04&intPage=1&intCategory=0&strSearchCategory=%7Cs_name%7Cs_subject%7C&strSearchWord=&intSeq=21989,',
    '10,당당신에겐 공공운수노조가 필요합니다/지금바로 전화하세요/1661-5557,,,,imgSrc,imgSrc1,,,joinLink',
    '11,당신은 자랑스런 공공부문 노동조합 조합원입니다/비정규직조직화에 함께 해주세요,,,,imgSrc,imgSrc1,,http://www.kptu.net/mboard.asp?Action=view&strBoardID=KPTU_PDS04&intPage=1&intCategory=0&strSearchCategory=%7Cs_name%7Cs_subject%7C&strSearchWord=&intSeq=21989,',
    '12,당신에겐 민주노조가 필요합니다/지금바로 전화하세요/1661-5557,,,,imgSrc,imgSrc1,,,joinLink',

    '13,당신은 자랑스런 공공부문 노동조합 조합원입니다/비정규직조직화에 함께 해주세요,,,,imgSrc,imgSrc1,,http://www.kptu.net/mboard.asp?Action=view&strBoardID=KPTU_PDS04&intPage=1&intCategory=0&strSearchCategory=%7Cs_name%7Cs_subject%7C&strSearchWord=&intSeq=21989,',
    '14,당당신에겐 공공운수노조가 필요합니다/지금바로 전화하세요/1661-5557,,,,imgSrc,imgSrc1,,,joinLink',
    '15,당신은 자랑스런 공공부문 노동조합 조합원입니다/비정규직조직화에 함께 해주세요,,,,imgSrc,imgSrc1,,http://www.kptu.net/mboard.asp?Action=view&strBoardID=KPTU_PDS04&intPage=1&intCategory=0&strSearchCategory=%7Cs_name%7Cs_subject%7C&strSearchWord=&intSeq=21989,',
    '16,당신에겐 민주노조가 필요합니다/지금바로 전화하세요/1661-5557,,,,imgSrc,imgSrc1,,,joinLink',

];


