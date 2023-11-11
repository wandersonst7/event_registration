package com.api.event.repositories;

import com.api.event.models.EventModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("**")
@RepositoryRestResource(exported = false)
public interface EventRepository extends JpaRepository<EventModel, Long> {
}
