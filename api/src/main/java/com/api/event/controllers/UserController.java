package com.api.event.controllers;

import com.api.event.dtos.LoginDto;
import com.api.event.dtos.TokenDto;
import com.api.event.models.UserModel;
import com.api.event.services.UserService;
import com.api.event.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody UserModel user){
        try {
            userService.createUser(user);
            String token = jwtUtil.generateToken(user.getUsername());
            TokenDto tokenResponse = new TokenDto(token);
            return ResponseEntity.status(HttpStatus.CREATED).body(tokenResponse);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao cadastrar usuário");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginDto loginData){
        try {
            boolean validated = userService.validateUser(loginData.username(), loginData.password());

            if(validated){
                String token = jwtUtil.generateToken(loginData.username());
                TokenDto tokenResponse = new TokenDto(token);
                return ResponseEntity.status(HttpStatus.OK).body(tokenResponse);
            }

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais incorretas");

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao realizar login");
        }
    }

}
