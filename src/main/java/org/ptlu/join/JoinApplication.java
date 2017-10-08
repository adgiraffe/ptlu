package org.ptlu.join;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

@SpringBootApplication
public class JoinApplication extends SpringBootServletInitializer{

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(JoinApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(JoinApplication.class, args);
	}
}



//@SpringBootApplication
//public class JoinApplication {
//
//	public static void main(String[] args) {
//		SpringApplication.run(JoinApplication.class, args);
//	}
//}
