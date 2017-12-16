package org.ptlu.join.domain.storyContent;

public class StoryQuestion {

    public int no;
    public int step;
    public int pageNum;
    public String qFirstLine;
    public String qSecondLine;
    public String qThirdLine;

    public int getStep() {
        return step;
    }

    public void setStep(int step) {
        this.step = step;
    }

    public String getqFirstLine() {
        return qFirstLine;
    }

    public void setqFirstLine(String qFirstLine) {
        this.qFirstLine = qFirstLine;
    }

    public String getqSecondLine() {
        return qSecondLine;
    }

    public void setqSecondLine(String qSecondLine) {
        this.qSecondLine = qSecondLine;
    }

    public String getqThirdLine() {
        return qThirdLine;
    }

    public void setqThirdLine(String qThirdLine) {
        this.qThirdLine = qThirdLine;
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
