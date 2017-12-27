package org.ptlu.join.controller;


import org.ptlu.join.domain.GeUser_info;
import org.ptlu.join.domain.mceContens.MceContentDTO;
import org.ptlu.join.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;
import java.util.Enumeration;

;

/**
 * Created by joo on 2017. 5. 23..
 */


@Controller
public class WelcomeController {


    @Inject
    UserService service;

    @GetMapping("/")
    public String home() {

//        if (principal==null){
//            model.addAttribute("logIn",null);
//        }else {
//            System.out.println(principal.getName());
//            model.addAttribute("logIn",principal.getName());
//        }
        return "/home";
    }

    @GetMapping("/admin")
    public String admin(HttpSession session) {
        System.out.println(session);
        System.out.println("principal :"+session.getAttribute("geUserId"));
        System.out.println("AttibuteName"+session.getAttributeNames());
        Enumeration<?> attributeNames = session.getAttributeNames();
        while (attributeNames.hasMoreElements()) {



            String name = (String) attributeNames.nextElement();

            if (name.equals("SPRING_SECURITY_CONTEXT")) {

                SecurityContext value = (SecurityContext) session.getAttribute(name);

                Authentication authentication = value.getAuthentication();

                GeUser_info principal = (GeUser_info) authentication.getPrincipal();

                WebAuthenticationDetails details = (WebAuthenticationDetails) authentication.getDetails();

                String username = authentication.getName();

                String password = (String) authentication.getCredentials();




            }

        }





        return "/admin";
    }

    @GetMapping("/user")
    public String user() {
        return "/user";
    }

    @GetMapping("/about")
    public String about() {
        return "/about";
    }

    @RequestMapping(value = "/login",method = {RequestMethod.POST, RequestMethod.GET})
    public String login() {
        return "/frameBody/login";
    }


    @RequestMapping(value = "/log-out",method = {RequestMethod.POST, RequestMethod.GET})
    public String logout(){

        return "/home";
    }


    @GetMapping("/403")
    public String error403() {
        return "/error/403";
    }

    @RequestMapping("/tiny")
    public String tinyMCE(Model model){
        model.addAttribute("content",new MceContentDTO());
        return "/text/tiny" ;
    }

    @RequestMapping("/ckEditor")
    public String ckEditor(){
        return "/text/ckEditor";
    }

    @RequestMapping("/fileBrowser")
    public String fileBrowser(){
        return "/popUp/fileBrowser";
    }


    @RequestMapping("/join")
    public String join(Model model){
        model.addAttribute("userForm",new GeUser_info());
        return "/frameBody/userTemp/join";
    }

    @RequestMapping(value = "/joinUser",method = RequestMethod.POST)
    public String joinUser(@ModelAttribute GeUser_info user){
        user.setAccountNonLocked(true);
        user.setEnabled(true);
        user.setCredentialsNonExpired(true);
        user.setAccountNonExpired(true);
        service.createUser(user);
        return "/home";
    }


    @RequestMapping(value = "/example/apple",method = {RequestMethod.POST, RequestMethod.GET})
    public String appleExam(){
        return "/example/apple";
    }

    @RequestMapping(value = "/example/fullpage",method = {RequestMethod.POST, RequestMethod.GET})
    public String fullPageExam(){
        return "/example/fullPage";
    }


    @RequestMapping(value = "/example/storyJoin",method = {RequestMethod.POST, RequestMethod.GET})
    public String joinExam(){
        return "/join";
    }

    @RequestMapping(value = "/example/question",method = {RequestMethod.POST, RequestMethod.GET})
    public String question(@ModelAttribute("totalNum") String totalNum){

        System.out.println("시발"+totalNum.length());
        return "/question/question";
    }

    @RequestMapping(value = "/example/videoComparison",method = {RequestMethod.POST, RequestMethod.GET})
    public String comparisonVideo(){
        return "/example/videoSlider/videoSlider";
    }


}
