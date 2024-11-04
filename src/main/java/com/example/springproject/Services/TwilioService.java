package com.example.springproject.Services;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Call;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;

@Service
public class TwilioService {


    @Value("${app.twillio.accountSID}")
    private String ACCOUNT_SID;

    @Value("${app.twillio.authToken}")
    private String AUTH_TOKEN;





    public void makeCall(String from, String to) {

        try {
            Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
            Call call = Call.creator(
                            new PhoneNumber(to),
                            new PhoneNumber(from),
                            URI.create("http://demo.twilio.com/docs/voice.xml"))
                    .setStatusCallback(URI.create("http://postb.in/1234abcd"))
                    .create();
            System.out.println(call);
        }catch(Exception e) {

            e.printStackTrace();

        }
    }






}
