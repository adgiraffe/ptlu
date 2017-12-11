package org.ptlu.join.controller;

import org.apache.commons.io.IOUtils;
import org.ptlu.join.domain.ImageVO.Image_info;
import org.ptlu.join.domain.mceContens.MceContentDTO;
import org.ptlu.join.service.imageService.ImageService;
import org.ptlu.join.util.MediaUtils;
import org.ptlu.join.util.UploadFileUtils;
import org.ptlu.join.domain.ImageVO.Image_info;
import org.ptlu.join.service.imageService.ImageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.inject.Inject;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by joo on 2017. 7. 12..
 */

@EnableWebSecurity
@Controller
public class UploadController {
    private static String canonUploadPath = "dcjournal/src/main/resources/static/cImage";
    private static final Logger logger =
            LoggerFactory.getLogger(UploadController.class);

    @Inject
    ImageService imageService;

    @RequestMapping(value = "/uploadForm", method = RequestMethod.GET)
    public void uploadForm() {
    }

//    @RequestMapping(value = "/uploadForm", method = RequestMethod.POST)
//    public String uploadForm(MultipartFile file,Model model) throws Exception{
//        logger.info("originalName:"+file.getOriginalFilename());
//        logger.info("size:"+file.getSize());
//        logger.info("contentType:"+file.getContentType());
//        String saveName=uploadFile(file.getOriginalFilename(),file.getBytes());
//        model.addAttribute("savedName",saveName);
//
//        return "uploadResult";
//    }
//

//    private String uploadFile(String originalName, byte[] fileData) throws Exception{
//        UUID uid= UUID.randomUUID();
//        String savedName=uid.toString()+"_"+originalName;
//        String canonicalPath=canonPath;
//        File target=new File(canonicalPath,savedName);
//        FileCopyUtils.copy(fileData,target);
//        return savedName;
//    }






    @ResponseBody
    @RequestMapping(value = "/uploadForm", method = RequestMethod.POST,produces = "text/plain;charset=UTF-8")
    public ResponseEntity<List<Image_info>> uploadAjax(List<MultipartFile> files) throws Exception {

        List <Image_info> infoList=new ArrayList<>();

        ResponseEntity<List <Image_info>> thumList=null;
        for (MultipartFile file:files){
            Image_info iInfo = UploadFileUtils.uploadFile(canonUploadPath, file.getOriginalFilename(), file.getBytes());
            imageService.addImage(iInfo);
            String thumPath=iInfo.getThumnailPath();
            int ino=imageService.getImageNo(thumPath);
            iInfo.setIno(ino);
            infoList.add(iInfo);
        }
        thumList=new ResponseEntity<>(infoList, HttpStatus.CREATED);
        return thumList;
    }

    //    @ResponseBody
//    @RequestMapping(value = "/uploadForm",
//            method = RequestMethod.POST,
//            produces = "text/plain;charset=UTF-8"
//    )
//    public ResponseEntity<String> uploadAjax(MultipartFile file) throws Exception {
//        logger.info("originalName:" + file.getOriginalFilename());
//        Image_info iInfo = UploadFileUtils.uploadFile(canonUploadPath, file.getOriginalFilename(), file.getBytes());
//        String filePath = iInfo.getThumnailPath();
//        imageService.addImage(iInfo);
//        return new ResponseEntity<String>(
//                filePath, HttpStatus.CREATED);
//    }





    @ResponseBody
    @RequestMapping("/displayFile")
    public ResponseEntity<byte[]> displayFile(String fileName) throws Exception {
        InputStream in = null;
        ResponseEntity<byte[]> entity = null;

        logger.info("FILE NAME : " + fileName);


        try {
            String formatName = fileName.substring(fileName.lastIndexOf(".") + 1);//확장자 저장
            MediaType mType = MediaUtils.getMediaType(formatName);
            HttpHeaders headers = new HttpHeaders();

            in = new FileInputStream(canonUploadPath + fileName);
            if (mType != null) {
                headers.setContentType(mType);
            } else {
                fileName = fileName.substring(fileName.indexOf("_") + 1);
                headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
                headers.add("Content-Disposition", "attachment; filename=\""
                        + new String(fileName.getBytes("UTF-8"), "ISO-8859-1") + "\"");
            }
            entity = new ResponseEntity<byte[]>(IOUtils.toByteArray(in),
                    headers, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            entity = new ResponseEntity<byte[]>(HttpStatus.BAD_REQUEST);
        } finally {
            in.close();
        }
        return entity;
    }

    @ResponseBody
    @RequestMapping(value = "/deleteFile", method = RequestMethod.POST)
    public ResponseEntity<String> deleFile(String fileName) {
        logger.info("delete file : " + fileName);
        String formateName = fileName.substring(fileName.lastIndexOf(".") + 1);
        MediaType mType = MediaUtils.getMediaType(formateName);

        if (mType != null) {
            String front = fileName.substring(0, 12);
            String end = fileName.substring(14);
            new File(canonUploadPath + (front + end)
                    .replace('/', File.separatorChar)).delete();
            try {
                imageService.deleImage((front + end));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        new File(canonUploadPath + fileName.replace('/', File.separatorChar)).delete();
        try {
            imageService.deleImage(fileName);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity("deleted", HttpStatus.OK);
    }



    @ResponseBody
    @RequestMapping(value = "/selectImageList", method = RequestMethod.GET,produces = "application/json")
    public ResponseEntity<List<Image_info>> allImageSelect() throws Exception {

        ResponseEntity<List<Image_info>> imageList = null;
        try {
            imageList = new ResponseEntity<>
                    (imageService.allSelectImage(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            imageList = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return imageList;
    }

    @ResponseBody
    @RequestMapping(value = "/pathPerNo",method = RequestMethod.POST)
    public ResponseEntity<List<String>> pathPno(@RequestBody Map<String,Integer> inoList)throws Exception{
        System.out.println(inoList);
        int ino=0;
        List<String> pathList=new ArrayList<>();
        ResponseEntity<List<String>> rliList=null;
        for (int i=0;i<inoList.size();i++){
            ino=inoList.get("ino"+i);
            System.out.println(ino);
            String imagePath=imageService.selectPathImage(ino);
            pathList.add(imagePath);
        }
        rliList=new ResponseEntity<>(pathList, HttpStatus.OK);

        return rliList;
    }

    @ResponseBody
    @RequestMapping(value = "/selectOneNum",method = RequestMethod.GET)
    public ResponseEntity<List<Integer>> getIno(List<Object> objectList) throws Exception{
        List<Object> objectList1=objectList;
        ResponseEntity<List <Integer>> returnIntList=null;
        List<Integer> intList=new ArrayList<>();
        for (int i=0;i<objectList1.size();i++){
            String slist=objectList.get(i).toString();
            int ino=imageService.getImageNo(slist);
            intList.add(ino);
        }
        returnIntList=new ResponseEntity<>(intList, HttpStatus.OK);

        return returnIntList;
    }


    @RequestMapping(value = "/insertMceContent",method = RequestMethod.POST)
        public String insertContent(Principal principal,@ModelAttribute("content") MceContentDTO contentDTO)throws Exception{
        contentDTO.setCreatedUser(principal.getName());
        imageService.addContent(contentDTO);
        return "/frameBody/home";

    }





}
