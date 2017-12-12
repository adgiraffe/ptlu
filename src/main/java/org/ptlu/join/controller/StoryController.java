package org.ptlu.join.controller;


import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@EnableWebSecurity
@Controller
public class StoryController {

    @RequestMapping(value ="/infoStory",method = RequestMethod.GET)
    public String infoStory(){
        return "/infoStory/storyTitle";
    }

    @RequestMapping(value ="/infoStory/storyContent",method = RequestMethod.GET)
    public String storyJoin(){
        return "infoStory/storyContent";
    }


    @RequestMapping(value = "/infoStory/storyFinal",method = RequestMethod.GET)
    public String storyFinal(){
        return "/infoStory/storyFinal";
    }
}
