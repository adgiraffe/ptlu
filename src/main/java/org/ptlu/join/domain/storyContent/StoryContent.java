package org.ptlu.join.domain.storyContent;


public class StoryContent {

    public int no;
    public int step;
    public int pageNum;
    public String answer;
    public String infoTitleFirst;
    public String infoTitleSecond;
    public String infoContent;
    public String infoImg;

    public int getStep() {
        return step;
    }

    public void setStep(int step) {
        this.step = step;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }


    public String getInfoTitleFirst() {
        return infoTitleFirst;
    }

    public void setInfoTitleFirst(String infoTitleFirst) {
        this.infoTitleFirst = infoTitleFirst;
    }

    public String getInfoTitleSecond() {
        return infoTitleSecond;
    }

    public void setInfoTitleSecond(String infoTitleSecond) {
        this.infoTitleSecond = infoTitleSecond;
    }

    public String getInfoContent() {
        return infoContent;
    }

    public void setInfoContent(String infoContent) {
        this.infoContent = infoContent;
    }


    public String getInfoImg() {
        return infoImg;
    }

    public void setInfoImg(String infoImg) {
        this.infoImg = infoImg;
    }

    public int getPageNum() {
        return pageNum;
    }

    public void setPageNum(int pageNum) {
        this.pageNum = pageNum;
    }


    public int getNo() {
        return no;
    }

    public void setNo(int no) {
        this.no = no;
    }
}
