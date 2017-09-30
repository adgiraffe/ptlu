package org.ptlu.join.config.db;


import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

/**
 * Created by joo on 2017. 5. 20..*/

@Configuration
//@MapperScan(value ="org.bssimin.mapper",sqlSessionFactoryRef = "db1SqlSessionFactory")
//@EnableTransactionManagement
public class FirstSourceConfig {

    @Bean(name = "db1DataSource")
    @ConfigurationProperties(prefix = "spring.db1.datasource")
    public DataSource db1DataSource(){
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "db1SqlSessionFactory")
    public SqlSessionFactory db1SqlSessionFactory (@Qualifier("db1DataSource") DataSource db1DataSource, ApplicationContext applicationContext)throws Exception{
        SqlSessionFactoryBean sqlSessionFactoryBean=new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(db1DataSource);
        sqlSessionFactoryBean.setMapperLocations(applicationContext.getResources("classpath:mybatis/**/*.xml"));
        return sqlSessionFactoryBean.getObject();
    }

    @Bean(name = "db1SqlSessionTemplate")
    public SqlSessionTemplate db1SqlSessionTemplate(SqlSessionFactory db1SqlSessionFactory)throws Exception{
        return new SqlSessionTemplate(db1SqlSessionFactory);

    }


/*
  Mybatis의 기본 구조는 다음과 같다.

    Mybatis는 SqlSession이라는 자바 인터페이스를 이용해서 명령어 실행, Mapper 획득, 트랜잭션 관리 등을 맡게 된다.
    SqlSession은 SqlSessionFactory를 통해서 생성된다.

    Mybatis-Spring 연동시, SqlSessionFactory는 SqlSessionFactoryBean을 통해 생성된다.
    Mybatis-Spring 연동시, SqlSession의 실제 구현체는 SqlSessionTemplate이다.

    SqlSessionTemplate의 역할은 다음과 같다.
    자동 트랜잭션 관리
    (commit()/rollback() 등 수동 트랜잭션 관리 불가
    - Spring 안에서 수동으로 트랜잭션을 관리하기 위해서는
    Spring에서 제공하는 PlatformTransactionManager 타입의 인스턴스가 필요하다)
    SqlSession의 자동 메모리 해제

    @Configuration 어노테이션으로 설정 클래스임을 명시해주고,
    @MapperScan 어노테이션으로 Mapper 인터페이스가 있는 패키지를 지정해준다.
    @EnableTransactionManagement 어노테이션으로 트랜잭션 매니저를 지정해 줄 수 있는데,
    자바 기반 설정의 경우 PlatformTransactionManager를 구현한 인스턴스(ex: DataSourceTransactionManager)를 찾아 지정한다.
    SqlSessionFactoryBean에 데이터소스를 설정하고
    Mybatis 프로퍼티를 설정한다.
    lazyLoadingEnabled을 true로 설정하면 global scope에서 Lazy Loading을 사용한다.

    SqlSessionTemplate빈에 SqlSessionFactoryBean을 넣어주면 설정이 끝난다.

 */

}
