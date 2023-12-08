package com.api.event.controllers;

import com.api.event.dtos.TokenDto;
import com.api.event.services.Impl.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/token")
public class TokenController {

    @Autowired
    TokenService tokenService;

    @PostMapping("/verify")
    public ResponseEntity verifyToken(@RequestBody TokenDto tokenDto){
        String validate = tokenService.validateToken(tokenDto.getToken());

        if(!validate.isEmpty()){
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.badRequest().build();
    }
}
