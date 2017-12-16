package org.ptlu.join.service.storyService;


import org.ptlu.join.dao.Story.StoryDAO;
import org.ptlu.join.domain.storyContent.StoryContent;
import org.ptlu.join.domain.storyContent.StoryQuestion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StoryServiceImpl implements StoryService{
    @Autowired
    StoryDAO storyDAO;


    @Override
    public StoryQuestion getTitle(int step) throws Exception {
        return storyDAO.readQuestion(step);
    }

    @Override
    public StoryContent getContent(StoryContent content) throws Exception {
        return storyDAO.readContent(content);
    }
}
