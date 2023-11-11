package com.api.event.services.Impl;

import com.api.event.models.UserModel;
import com.api.event.repositories.UserRepository;
import com.api.event.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;


    @Override
    public boolean validateUser(String username, String password) {
        Optional<UserModel> userOptional = userRepository.findByUsername(username);

        if(userOptional.isPresent()){
            return encoder.matches(password, userOptional.get().getPassword());
        }

        return false;
    }

    @Override
    public void createUser(UserModel user) {
        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);
    }
}
