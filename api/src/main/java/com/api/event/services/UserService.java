package com.api.event.services;

import com.api.event.models.UserModel;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    public boolean validateUser(String username, String password);

    public void createUser(UserModel user);
}
