package org.ptlu.join.util;

import org.ptlu.join.domain.ImageVO.Image_info;
import org.imgscalr.Scalr;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.FileCopyUtils;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.text.DecimalFormat;
import java.util.Calendar;
import java.util.UUID;

/**
 * Created by joo on 2017. 7. 12..
 */
public class UploadFileUtils {
    private static final Logger logger=
            LoggerFactory.getLogger(UploadFileUtils.class);

//    private static String uploadPath="dcjournal/src/main/resources/static/cImage";
    public static Image_info uploadFile(String uploadPath,
                                        String originalName,
                                        byte[] fileData) throws Exception{

        UUID uid=UUID.randomUUID();
        String savedName= uid.toString()+"_"+originalName;

        String savedPath=calcPath(uploadPath);

        String fileRegiPath=savedPath+File.separator+savedName;
        File target=new File(uploadPath+savedPath,savedName);
        FileCopyUtils.copy(fileData,target);

        String formatName=originalName.substring(originalName.lastIndexOf(".")+1);
        String uploadedFileName=null;

        if (MediaUtils.getMediaType(formatName) != null){
            uploadedFileName=makeThumbnail(uploadPath,savedPath,savedName);
        } else {
            uploadedFileName=makeIcon(uploadPath,savedPath,savedName);
        }

        Image_info image_info=new Image_info();
        image_info.setImagePath(fileRegiPath);
        image_info.setThumnailPath(uploadedFileName);
        return image_info;
    }

    private static String calcPath(String uploadPath){
        Calendar cal=Calendar.getInstance();
        String yearPath = File.separator+cal.get(Calendar.YEAR);
        String monthPath = yearPath +
                File.separator +
                new DecimalFormat("00").format(cal.get(Calendar.MONTH)+1);
        String datePath = monthPath+
                File.separator +
                new DecimalFormat("00").format(cal.get(Calendar.DATE));

        makeDir(uploadPath,yearPath,monthPath,datePath);
        logger.info(datePath);

        return datePath;
    }


//    여기가 문제다
    private static void makeDir(String uploadPath,String... paths){
        if (new File(paths[paths.length-1]).exists()){
            return;
        }

        for (String path:paths){
            File dirPath=new File(uploadPath+path);

            if (!dirPath.exists()){
                System.out.println(dirPath);
                dirPath.mkdir();
            }
        }
    }
//    여기가 문제

    private static String makeThumbnail(String uploadPath,
                                        String path,
                                        String fileName)throws Exception{
        BufferedImage sourceImg= ImageIO.read(new File(uploadPath+path,fileName));

        BufferedImage destImg=
                Scalr.resize(sourceImg,
                Scalr.Method.AUTOMATIC,
                Scalr.Mode.FIT_TO_HEIGHT,100);

        String thumbnailName=
                uploadPath+path+File.separator+"s_"+fileName;
        File newFile=new File(thumbnailName);
        String formatName=
                fileName.substring(fileName.lastIndexOf(".")+1);

        ImageIO.write(destImg,formatName.toUpperCase(),newFile);
        return thumbnailName.substring(
                uploadPath.length()).replace(File.separatorChar, '/');
    }

    private static String makeIcon(String uploadPath,
                                   String path,
                                   String fileName)throws Exception{
        String iconName =
                uploadPath + path + File.separator + fileName;

        return iconName.substring(
                uploadPath.length()).replace(File.separatorChar,'/');
    }

}
