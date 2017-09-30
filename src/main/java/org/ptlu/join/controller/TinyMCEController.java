package org.ptlu.join.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by joo on 2017. 7. 2..
 */


@RestController
public class TinyMCEController
{
   @RequestMapping(value = "/upLoadContents",method = RequestMethod.POST)
    private String saveContets(){
       return "";
   }
}
