package org.ptlu.join.dao;

import org.apache.ibatis.session.SqlSession;
import org.ptlu.join.domain.GeUser_info;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Repository;

import javax.inject.Inject;
import javax.inject.Named;
import java.util.List;

/**
 * Created by joo on 2017. 5. 23..
 */

@Repository
public class UserDaoImpl implements UserDAO{

    @Named("db1SqlSessionTemplate")
    @Inject
    SqlSession session;

    private static String namespace="org.bssimin.mybatis.mapper.geUserMapper.xml";

    @Override
    public GeUser_info readGeUser(String geUserId) throws Exception {
        return session.selectOne(namespace+".readGeUser",geUserId);
    }

    @Override
    public List <GrantedAuthority> readAuthority(String geUserId) throws Exception {
        return session.selectList(namespace+".readAuthority",geUserId);
    }

    @Override
    public void createUser(GeUser_info user) {

        session.insert(namespace+".createUser",user);
    }

    @Override
    public void createAuthority(GeUser_info user) {
        session.insert(namespace+".createAuthority",user);
    }

    @Override
    public void deleteUser(String geUserId) {
        session.delete(namespace+".deleteUser",geUserId); }

    @Override
    public void deleteAuthority(String geUserId) {
        System.out.println("1");
        System.out.println(geUserId);
        session.delete(namespace+".deleteAuthority",geUserId);

    }


}
