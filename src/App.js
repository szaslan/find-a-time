import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
//ID 972462016047-ibp3c77reskfvj6fkc4fqs16ncs00iia.apps.googleusercontent.com
// secret uNnJ2XFFgmuw1vgI2_U7dnzg

//

// KEY AIzaSyDxk_cxL2QN89xWCZquLTiF4RyWsgaBlO4
function App() {
  var CLIENT_ID =
    "361706564526-d45fhmlunape2obgniut1tc3nbg7spk4.apps.googleusercontent.com";
  var API_KEY = "AIzaSyDxk_cxL2QN89xWCZquLTiF4RyWsgaBlO4";

  // Array of API discovery doc URLs for APIs used by the quickstart
  var DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
  ];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

  var authorizeButton = document.getElementById("authorize_button");
  var signoutButton = document.getElementById("signout_button");

  useEffect(() => {
    handleClientLoad();
  }, []);

  /**
   *  On load, called to load the auth2 library and API client library.
   */
  const handleClientLoad = () => {
    window.gapi.load("client:auth2", initClient);
  };

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  const initClient = () => {
    window.gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      })
      .then(
        // listUpcomingEvents()

        function() {
          console.log("hello");
          // Listen for sign-in state changes.
          window.gapi.auth2
            .getAuthInstance()
            .isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(
            window.gapi.auth2.getAuthInstance().isSignedIn.get()
          );
          // authorizeButton.onclick = handleAuthClick;
          // signoutButton.onclick = handleSignoutClick;
        }
        // function(error) {
        //   appendPre(JSON.stringify(error, null, 2));
        // }
      );
  };

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  const updateSigninStatus = isSignedIn => {
    console.log(isSignedIn);
    if (isSignedIn) {
      // authorizeButton.style.display = "none";
      // signoutButton.style.display = "block";
      listUpcomingEvents();
    } else {
      // authorizeButton.style.display = "block";
      // signoutButton.style.display = "none";
    }
  };

  /**
   *  Sign in the user upon button click.
   */
  const handleAuthClick = event => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  /**
   *  Sign out the user upon button click.
   */
  const handleSignoutClick = event => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  const listUpcomingEvents = () => {
    window.gapi.client.calendar.events
      .list({
        calendarId: "szaslan@gmail.com",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime"
      })
      .then(function(response) {
        var events = response.result.items;
        // appendPre("Upcoming events:");
        console.log(events);
        if (events.length > 0) {
          for (let i = 0; i < events.length; i++) {
            var event = events[i];
            var when = event.start.dateTime;
            if (!when) {
              when = event.start.date;
            }
            // appendPre(event.summary + " (" + when + ")");
          }
        } else {
          // appendPre("No upcoming events found.");
        }
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleAuthClick}>Authorize Google Calendar</button>
      </header>
    </div>
  );
}

export default App;
