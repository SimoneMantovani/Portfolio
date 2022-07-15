package com.example.Rubrica.Repository;

import com.example.Rubrica.Entity.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface PersonaRepository extends JpaRepository<Persona,Integer> {

    @Transactional
    @Modifying
    @Query(value = "update persona set first_name = :first_name, last_name = :last_name, age = :age, email= :email, phone= :phone where id = :id", nativeQuery = true)
    void updatePersona(@Param(value = "id") int id, @Param(value = "first_name") String first_name, @Param(value = "last_name") String last_name, @Param(value= "age") int age, @Param(value= "email") String email, @Param(value="phone") String phone);

}
