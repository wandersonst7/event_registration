package com.api.event.repositories;

import com.api.event.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("**")
@RepositoryRestResource(exported = false)
public interface UserRepository extends JpaRepository<UserModel, Long> {
    UserDetails findByUsername(String username);
}
