package org.ptlu.join.controller;


import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@EnableWebSecurity
@Controller
public class StoryController {

    @RequestMapping(value ="/storyJoin",method = RequestMethod.GET)
    public String storyJoin(){
        return null;
    }
}
