package com.api.event.services.Impl;

import com.api.event.models.EventModel;
import com.api.event.repositories.EventRepository;
import com.api.event.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImpl implements EventService {

    @Autowired
    EventRepository eventRepository;

    @Override
    public Optional<EventModel> getEvent(long id){
        return eventRepository.findById(id);
    }

    @Override
    public List<EventModel> getAllEvents(){
        return eventRepository.findAll();
    }

    @Override
    public void createEvent(EventModel event) {
        eventRepository.save(event);
    }

    @Override
    public boolean updateEvent(EventModel event, long id){
        Optional<EventModel> eventOptional = eventRepository.findById(id);

        if(eventOptional.isPresent()){
            EventModel eventUpdate = eventOptional.get();
            eventUpdate.setName(event.getName());
            eventUpdate.setDescription(event.getDescription());
            eventUpdate.setDate(event.getDate());
            eventRepository.save(eventUpdate);
            return true;
        }

        return false;
    }

    @Override
    public boolean deleteEvent(long id){
        Optional<EventModel> eventOptional = eventRepository.findById(id);

        if(eventOptional.isPresent()){
            eventRepository.deleteById(id);
            return true;
        }

        return false;
    }





}
