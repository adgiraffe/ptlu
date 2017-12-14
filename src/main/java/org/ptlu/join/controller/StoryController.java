package org.ptlu.join.controller;


import org.ptlu.join.domain.storyContent.StoryQuestion;
import org.ptlu.join.service.storyService.StoryService;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;

@EnableWebSecurity
@Controller
public class StoryController {

    @Inject
    StoryService storyService;

    @RequestMapping(value ="/infoStory",method = RequestMethod.GET)
    public String infoStory(Model model,StoryQuestion initQuestion ,@ModelAttribute("content") StoryQuestion content) throws Exception {

        int step;
        StoryQuestion sq = null;
        if(initQuestion==null){
            step=1;
            sq=storyService.getTitle(1);
            model.addAttribute("question",sq);

        }else if(initQuestion!=null) {

            step=initQuestion.step;
            sq=storyService.getTitle(step);
        }
        System.out.println(sq);

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


    @ResponseBody
    @RequestMapping(value = "/infoStory/readAjaxTitle",method = RequestMethod.GET)
    public String ajaxReadTitle() throws Exception {
        System.out.println("실행");
        System.out.println("step");
        return "/infoStory/storyContent";
    }

    @RequestMapping(value = "/infoStory/readTitle",method = RequestMethod.GET)
    public String readTitle() throws Exception {
        System.out.println("실행");
        System.out.println("step");
        return "/infoStory/storyContent";
    }


}
