package com.magic.project.configuration;

import com.magic.project.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserService userService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	http.csrf().disable();
//    	http.cors();
   	http
        .cors()
            .and()
        .authorizeRequests()
        .antMatchers("/hospital/doctor/**").hasAnyRole("Admin")
        .antMatchers(HttpMethod.POST, "/hospital/doctor/add", "/hospital/receptionist/add").hasRole("Admin")
        .antMatchers(HttpMethod.DELETE, "/hospital/doctor/delete", "/hospital/receptionist/delete", "/hospital/patient/delete", "/hospital/appointment/delete").hasRole("Admin")
        .antMatchers(HttpMethod.POST, "/hospital/appointment/add", "/hospital/patient/add").hasAnyRole("Admin", "Receptionist")
        .antMatchers(HttpMethod.PATCH,"/hospital/user/update/password/**", "/hospital/appointment/update/status/**").hasAnyRole("Doctor", "Receptionist", "Admin")
        .antMatchers(HttpMethod.PUT, "/hospital/doctor/update/**", "/hospital/receptionist/update/**").hasRole("Admin")
        .antMatchers(HttpMethod.PUT, "/hospital/appointment/update/**", "/hospital/patient/update/**").hasAnyRole("Admin", "Receptionist")
        .antMatchers("/hospital/user/list").hasAnyRole("Admin")
        .antMatchers("/hospital/receptionist/**").hasAnyRole("Admin")
        .antMatchers("/hospital/user/authenticate").hasAnyRole("Admin")
        .antMatchers("/hospital/patient/**").hasAnyRole("Doctor", "Receptionist", "Admin")
        .antMatchers("/hospital/appointment/**").hasAnyRole("Doctor", "Receptionist", "Admin")
            // Configure your request mappings and authorization rules
            .anyRequest().fullyAuthenticated()
            .and().httpBasic();
//        http.authorizeRequests()
//            .antMatchers("/hospital/doctor/**").hasAnyRole("Admin")
//            .antMatchers(HttpMethod.POST, "/hospital/doctor/add", "/hospital/receptionist/add").hasRole("Admin")
//            .antMatchers(HttpMethod.DELETE, "/hospital/doctor/add", "/hospital/receptionist/add", "/hospital/patient/add", "/hospital/appointment/add").hasRole("Admin")
//            .antMatchers(HttpMethod.POST, "/hospital/appointment/add", "/hospital/patient/add").hasAnyRole("Admin", "Receptionist")
//            .antMatchers(HttpMethod.PATCH,"/hospital/user/update/password/**", "/hospital/appointment/update/status/**").hasAnyRole("Doctor", "Receptionist", "Admin")
//            .antMatchers(HttpMethod.PUT, "/hospital/doctor/update/**", "/hospital/receptionist/update/**").hasRole("Admin")
//            .antMatchers(HttpMethod.PUT, "/hospital/appointment/update/**", "/hospital/patient/update/**").hasAnyRole("Admin", "Receptionist")
//            .antMatchers("/hospital/user/list").hasAnyRole("Admin")
//            .antMatchers("/hospital/receptionist/**").hasAnyRole("Admin")
//            .antMatchers("/hospital/patient/**").hasAnyRole("Doctor", "Receptionist", "Admin")
//            .antMatchers("/hospital/appointment/**").hasAnyRole("Doctor", "Receptionist", "Admin")
//            .anyRequest().fullyAuthenticated()
//            .and()
//            .httpBasic();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(passwordEncoder()).and()
        .inMemoryAuthentication().withUser("Admin").password(passwordEncoder().encode("Admin@1234")).roles("Admin"); 
    }
    
    
}
