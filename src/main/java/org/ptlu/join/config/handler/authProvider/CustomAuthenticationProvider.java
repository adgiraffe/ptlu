package org.ptlu.join.config.handler.authProvider;

import org.ptlu.join.domain.GeUser_info;
import org.ptlu.join.service.UserService;
import org.ptlu.join.util.encryption.EncryptingPW;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;


@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {
    @Autowired
    private UserService userService;

    @Autowired
    private EncryptingPW encryptingPW;
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        String user_id = (String)authentication.getPrincipal();
        String user_pw = (String)authentication.getCredentials();

        System.out.printf("사용자 로그인정보: %s \n", user_id + "/" + user_pw);
        GeUser_info user=(GeUser_info)userService.loadUserByUsername(user_id);
        System.out.printf("사용자 DB 정보: %s \n", user.getGeUserId() + "/"
                + user.getPassword());




        if (encryptingPW.matches(user_pw,user.getGeUserPw())){
            // use the credentials
            // and authenticate against the third-party system
           return new UsernamePasswordAuthenticationToken(user_id,user_pw,user.getAuthorities());

        }
        else{

            throw new BadCredentialsException("Bad credentials");
        }
    }


    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
