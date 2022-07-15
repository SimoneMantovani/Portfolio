package com.example.Rubrica.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Persona {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Integer id;
    private String first_name;
    private String last_name;
    private int age;
    private String email;
    private String phone;



    public Persona(String first_name,String last_name,int age,String email,String phone) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.age = age;
        this.email = email;
        this.phone = phone;
    }
    public Persona( Persona persona){
        this.first_name = persona.first_name;
        this.last_name = persona.last_name;
        this.age = persona.age;
        this.email = persona.email;
        this.phone = persona.phone;
    }
}
