package com.luca.engineer.backend.exceptions;

public class OtpIsNotvalid extends Exception {
    public OtpIsNotvalid() {
        super("Opt code is not valid");
    }
}