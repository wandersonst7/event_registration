package com.api.event.controllers;

import com.api.event.models.EventModel;
import com.api.event.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    EventService eventService;

    @GetMapping
    public ResponseEntity<Object> getAllEvents(){

        try{
            return ResponseEntity.status(HttpStatus.OK).body(eventService.getAllEvents());
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Ocorreu um erro ao resgatar eventos");
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getEvent(@PathVariable long id){
        try{
            Optional<EventModel> event  = eventService.getEvent(id);

            if(event.isPresent()){
                return ResponseEntity.status(HttpStatus.OK).body(event);
            }

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Evento não encontrado");

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Ocorreu um erro ao resgatar evento");
        }
    }

    @PostMapping
    public ResponseEntity<Object> createEvent(@RequestBody EventModel event){
        try{
            eventService.createEvent(event);
            return ResponseEntity.status(HttpStatus.CREATED).body("Evento cadastrado com sucesso");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Ocorreu um erro ao cadastrar evento");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateEvent(@RequestBody EventModel event, @PathVariable long id){
        try{
            if(eventService.updateEvent(event, id)){
                return ResponseEntity.status(HttpStatus.OK).body("Evento atualizado com sucesso");
            }

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Evento não encontrado");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Ocorreu um erro ao atualizar evento");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteEvent(@PathVariable long id){
        try{
            if(eventService.deleteEvent(id)){
                return ResponseEntity.status(HttpStatus.OK).body("Evento excluído com sucesso");
            }

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Evento não encontrado");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Ocorreu um erro ao atualizar evento");
        }
    }

}
