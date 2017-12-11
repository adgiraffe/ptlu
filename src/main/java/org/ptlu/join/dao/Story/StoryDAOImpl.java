package org.ptlu.join.dao.Story;

import org.apache.ibatis.session.SqlSession;

import org.ptlu.join.domain.storyContent.StoryContent;
import org.ptlu.join.domain.storyContent.StoryQuestion;
import org.springframework.stereotype.Repository;

import javax.inject.Inject;
import javax.inject.Named;

@Repository
public class StoryDAOImpl implements StoryDAO{
    @Named("db1SqlSessionTemplate")
    @Inject
    SqlSession session;

    private static String storyNamespace="org.ptlu.join.mybatis.mapper.storyMapper.xml";

    @Override
    public StoryQuestion readQuestion(int step) {
        return null;
    }

    @Override
    public StoryContent readContent(int step, String answer) {
        return null;
    }
}
