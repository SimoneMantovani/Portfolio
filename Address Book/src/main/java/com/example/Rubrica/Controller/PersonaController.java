package com.example.Rubrica.Controller;

import com.example.Rubrica.Entity.Persona;
import com.example.Rubrica.Repository.PersonaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@CrossOrigin
public class PersonaController {
    @Autowired
    PersonaRepository personaRepository;

    @GetMapping("/insert")
    public void run(){
        Stream<String> stream;
        try {
            stream = Files.lines(Paths.get("C:\\Users\\simon\\OneDrive\\Desktop\\WorkingArea\\Esercizi Fullstack\\Rubrica\\Rubrica Simone\\src\\main\\java\\com\\example\\Rubrica\\contatti"));
            ArrayList<String> arrayListOfLines = (ArrayList<String>) stream.collect(Collectors.toList());
            List<Persona> arrayListOfPersone = new ArrayList<>();
            System.out.println(arrayListOfLines);
            for (int i=0;i<arrayListOfLines.size();i++) {
                String[] thisPersona = arrayListOfLines.get(i).split("\t");
                Persona persona = new Persona(thisPersona[0], thisPersona[1], (Integer.valueOf(thisPersona[2])), thisPersona[3],thisPersona[4]);
                arrayListOfPersone.add(persona);
            }
            personaRepository.saveAll(arrayListOfPersone);
        } catch (IOException e) {
            System.out.println("Error in file open");
            e.printStackTrace();
        }
    }

    @RequestMapping("/insertPersona")
    public String insertNewUser(@RequestParam String first_name, String last_name,int age, String email, String phone) {
        try {
            Persona tmp = new Persona(first_name,last_name,age,email,phone);
            personaRepository.save(tmp);
        } catch (Exception e){
            return "Caricamento errato";
        }
        return "Caricamento eseguito correttamente";
    }

 @RequestMapping("/deletePersona")
    public void deletePersonaById(Integer id) {
        personaRepository.deleteById(id);
    }

    @RequestMapping("/updatePersona")
    public void updatePersona(Integer id, String first_name, String last_name, int age, String email, String phone) {
      personaRepository.updatePersona(id, first_name, last_name, age, email, phone);
    }

    @GetMapping("/findPersona")
    public List<Persona> findPersona(@RequestParam  String first_name, String last_name) {
        List<Persona> tmp = personaRepository.findAll();
        ArrayList<Persona> output = new ArrayList<>();
        if (first_name.compareTo("")!=0 && last_name.compareTo("")!=0) { //per fare questo controllo al frontend devo passare default "" se non viene inserito il valore
            for (int i = 0; i < tmp.size(); i++) {
                if (tmp.get(i).getFirst_name().compareTo(first_name)==0 && tmp.get(i).getLast_name().compareTo(last_name)==0) {
                    output.add(tmp.get(i));

                }

            }
        } else {
            for (int i = 0; i < tmp.size(); i++) {
                if (tmp.get(i).getFirst_name().compareTo(first_name)==0 || tmp.get(i).getLast_name().compareTo(last_name)==0) {
                    output.add(tmp.get(i));
                }
            }
        }
        System.out.println(output);
      return output;
    }

    @GetMapping("/allUsers")
    public List<Persona> allUsers(){
        return personaRepository.findAll();

    }

}
