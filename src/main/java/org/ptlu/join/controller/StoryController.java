package org.ptlu.join.controller;


import org.ptlu.join.domain.storyContent.GetContent;
import org.ptlu.join.domain.storyContent.StoryContent;
import org.ptlu.join.domain.storyContent.StoryQuestion;
import org.ptlu.join.service.storyService.StoryService;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;
import java.util.Map;

@EnableWebSecurity
@Controller
public class StoryController {

    @Inject
    StoryService storyService;



    @RequestMapping(value ="/infoStory",method = RequestMethod.GET)
    public String infoStory(@ModelAttribute("content")StoryContent content,@ModelAttribute("question")StoryQuestion question,Model model) throws Exception {
        //ModelAttrbute를 처음 들어가는 사이트 부터 호출 해줘야 그 사이트해서 해당 객체를 사용 할 수 있다.
        //뷰로 데이터를 넘길때는 Model객체 사
        int step=0;

        if(content.step==0){
            step=1;
            question=storyService.getTitle(step);
        } else if(content.step==3){
            return "/infoStory/storyFinal";
        }else {
            step=question.step;
            System.out.println("퀘스천"+question.step);
            step=step+1;
            System.out.println("증가판단"+step);
            question=storyService.getTitle(step);
        }

        model.addAttribute("question",question);
        return "/infoStory/storyTitle";
    }

//    @RequestMapping(value ="/infoStory",method = RequestMethod.GET)
//    public String infoStory(@ModelAttribute("content")StoryContent content,@ModelAttribute("question")StoryQuestion question,Model model) throws Exception {
//        //ModelAttrbute를 처음 들어가는 사이트 부터 호출 해줘야 그 사이트해서 해당 객체를 사용 할 수 있다.
//        //뷰로 데이터를 넘길때는 Model객체 사
//        int step;
//        System.out.println("넘어오는"+content.step);
//        System.out.println(question.step);
//        if(question.step==0){
//            step=1;
//            question=storyService.getTitle(step);
//        }else {
//            System.out.println(question.step);
//            step=question.step;
//            question=storyService.getTitle(step);
//        }
//
//        model.addAttribute("question",question);
//        return "/infoStory/storyTitle";
//    }

    @RequestMapping(value ="/infoStory/storyContent",method = RequestMethod.GET)
    public String infoContent(@ModelAttribute("content")StoryContent content, Model model,StoryContent storyContent) throws Exception {
        //ModelAttrbute를 처음 들어가는 사이트 부터 호출 해줘야 그 사이트해서 해당 객체를 사용 할 수 있다.
        System.out.println(content.step);
        System.out.println(content.answer);
        storyContent=storyService.getContent(content);
        System.out.println(storyContent.infoContent);
        model.addAttribute("infoContent",storyContent);
        return "infoStory/storyContent";
    }


    @RequestMapping(value = "/infoStory/storyFinal",method = RequestMethod.GET)
    public String storyFinal(){
        return "/infoStory/storyFinal";
    }


    @ResponseBody
    @RequestMapping(value = "/infoStory/readAjaxTitle",method = RequestMethod.GET)
    public String ajaxReadTitle(@RequestBody Map<String,Integer> inoList) throws Exception {
        System.out.println(inoList);
        System.out.println("step");

        return "/infoStory/storyTitle";
    }

//    @RequestMapping(value = "/infoStory/readTitle",method = RequestMethod.GET)
//    public String readTitle(@ModelAttribute("step") int step) throws Exception {
//        System.out.println("실행");
//        System.out.println(step);
//        return "/infoStory/storyContent";
//    }


}
