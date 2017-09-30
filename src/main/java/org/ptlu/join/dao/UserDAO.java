package org.ptlu.join.dao;

import org.ptlu.join.domain.GeUser_info;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;

/**
 * Created by joo on 2017. 5. 23..
 */

public interface UserDAO {
    public GeUser_info readGeUser(String geUserId) throws Exception;
    public List <GrantedAuthority> readAuthority(String geUserId) throws Exception;
    public void createUser(GeUser_info user);
    public void createAuthority(GeUser_info user);
    public void deleteUser(String geUserId);
    public void deleteAuthority(String geUserId);
}
