package org.ptlu.join.dao.image;

import org.ptlu.join.domain.ImageVO.Image_info;
import org.ptlu.join.domain.mceContens.MceContentDTO;

import java.util.List;

/**
 * Created by joo on 2017. 7. 13..
 */
public interface ImageDAO {
    public void upLoadImage(Image_info iInfo) throws Exception;
    public void deleteImage(String fPath) throws Exception;
    public List<Image_info> allImageSelect() throws Exception;
    public String selectImagePath(int ino) throws Exception;
    public int selectIno(String fPath) throws Exception;
    public void regiContent(MceContentDTO contentDTO) throws Exception;
}
