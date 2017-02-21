package models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class GuestbookEntry {
    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    Long id;

    private String text;
    private String email;
    
    public GuestbookEntry() {}
    
    public String getText() {
        return text;
    }
    public void setText(String text) {
        this.text = text;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

}
