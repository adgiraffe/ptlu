package org.ptlu.join.service.storyService;


import org.ptlu.join.domain.storyContent.StoryContent;
import org.ptlu.join.domain.storyContent.StoryQuestion;

public interface StoryService {
    public StoryQuestion getTitle(int step) throws Exception;
    public StoryContent getContent(StoryContent content) throws Exception;
}
