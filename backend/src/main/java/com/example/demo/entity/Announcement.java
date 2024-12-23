package com.example.demo.entity;

import com.example.demo.Enum.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "announcements")
public class Announcement {

    @Id
    private String id;
    private String adminId;
    private String content;

    // Change role from a single Role to a Set<Role> to support multiple roles
    private Set<Role> roles;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    @Override
    public String toString() {
        return "Announcement{" +
                "id='" + id + '\'' +
                ", adminId='" + adminId + '\'' +
                ", content='" + content + '\'' +
                ", roles=" + roles +
                '}';
    }
}
