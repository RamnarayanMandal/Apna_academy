package com.example.demo.entity;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "admins")
public class Admin extends BaseUser {
    private boolean superAdmin;

    // Constructor
    public Admin(String id, String name, String password, String email, boolean superAdmin) {
        super(id, name, password, email);
        this.superAdmin = superAdmin;
    }

   
}
