

// Get the registration <form> element from the DOM.
var forma = document.getElementById("events-form");

var submitButton = forma.querySelector("button");

var addSubmitClickEventListener = function() {
    submitButton.addEventListener("click", formSubmissionAttempted, false);
};


var formSubmissionAttempted = function() {
    //form.classList.add("submission-attempted");

    var formData = {};

    formData.appId = document.getElementById("app-id").value;
    formData.eventId = document.getElementById("event-id").value;
    formData.message = document.getElementById("message").value;
   
    httpPostAsync("/", formData, showResponse); 

};



function httpPostAsync(theUrl, jsonObj, callback) {

    var params = encodeURIComponent(JSON.stringify(jsonObj));
    console.log('Posting params: ' + params);

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("POST", theUrl, true); // true for asynchronous 
    
    //Send the proper header information along with the request
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.send(params);
}


function showResponse(data){
    var response = JSON.stringify(data);
    console.log('Response from server: \n\n' + response);
    //alert(response);
}


addSubmitClickEventListener();
