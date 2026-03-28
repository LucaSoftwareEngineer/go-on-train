package com.luca.engineer.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordUpdateRequest {

    private String email;
    private String optResetPassword;
    private String rawPassword;

}