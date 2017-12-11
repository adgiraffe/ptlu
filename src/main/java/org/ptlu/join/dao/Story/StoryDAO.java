package org.ptlu.join.dao.Story;

import org.ptlu.join.domain.storyContent.StoryContent;
import org.ptlu.join.domain.storyContent.StoryQuestion;

public interface StoryDAO {
    public StoryQuestion readQuestion(int step);
    public StoryContent readContent(int step, String answer);
}
