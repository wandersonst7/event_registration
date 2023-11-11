package com.api.event.services;

import com.api.event.models.EventModel;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface EventService {
    public Optional<EventModel> getEvent(long id);
    public List<EventModel> getAllEvents();
    public void createEvent(EventModel event);
    public boolean updateEvent(EventModel event, long id);
    public boolean deleteEvent(long id);
}
