package org.ptlu.join.mapper;


import org.apache.ibatis.annotations.Mapper;
import org.ptlu.join.domain.GeUser_info;

import java.util.List;

/**
 * Created by joo on 2017. 5. 20..
 */


@Mapper
public interface Db1Mapper {
    public GeUser_info readGeUser(String geUserId);
    public List<String> readAuthority(String geUserPw);
//    public void regiImage(Image_info info);

}
