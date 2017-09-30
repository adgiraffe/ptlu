package org.ptlu.join.domain.ImageVO;

import java.util.Date;

/**
 * Created by joo on 2017. 7. 13..
 */
public class Image_info {
    private int ino;
    private String imagePath;
    private String thumnailPath;
    private String imageInfo;
    private Date regdate;

    public int getIno() {
        return ino;
    }

    public void setIno(int ino) {
        this.ino = ino;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getThumnailPath() {
        return thumnailPath;
    }

    public void setThumnailPath(String thumnailPath) {
        this.thumnailPath = thumnailPath;
    }

    public String getImageInfo() {
        return imageInfo;
    }

    public void setImageInfo(String imageInfo) {
        this.imageInfo = imageInfo;
    }

    public Date getRegdate() {
        return regdate;
    }

    public void setRegdate(Date regdate) {
        this.regdate = regdate;
    }
}
