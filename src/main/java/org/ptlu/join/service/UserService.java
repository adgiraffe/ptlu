package org.ptlu.join.service;

import org.ptlu.join.domain.GeUser_info;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Collection;

/**
 * Created by joo on 2017. 5. 25..
 */

public interface UserService extends UserDetailsService {
    Collection<GrantedAuthority> getAutorities(String geUserId) throws Exception;
    public GeUser_info readUser(String geUserId);
    public void createUser(GeUser_info user);
    public void deleteUser(String geUserId) throws Exception;


}
