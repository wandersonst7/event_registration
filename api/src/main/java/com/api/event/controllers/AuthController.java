package com.api.event.controllers;

import com.api.event.dtos.LoginDto;
import com.api.event.dtos.TokenDto;
import com.api.event.models.UserModel;
import com.api.event.repositories.UserRepository;
import com.api.event.services.Impl.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    TokenService tokenService;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginDto loginData){
        try{
            UserDetails user = userRepository.findByUsername(loginData.username());

            Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, Collections.singleton(new SimpleGrantedAuthority("ROLE_ADMIN")));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = tokenService.generateToken(user);

            return ResponseEntity.status(HttpStatus.OK).body(new TokenDto(token));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Ocorreu um erro ao realizar login.");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody UserModel user){
        try{
            String encryptedPassword = new BCryptPasswordEncoder().encode(user.getPassword());
            UserModel newUser = new UserModel(user.getUsername(), user.getEmail(), encryptedPassword);
            UserModel userSaved = userRepository.save(newUser);

            Authentication authentication = new UsernamePasswordAuthenticationToken(userSaved, null, Collections.singleton(new SimpleGrantedAuthority("ROLE_ADMIN")));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String token = tokenService.generateToken(userSaved);

            return ResponseEntity.status(HttpStatus.CREATED).body(new TokenDto(token));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Ocorreu um erro ao salvar o usuário.");
        }
    }

}
