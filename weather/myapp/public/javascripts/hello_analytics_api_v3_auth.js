/**
 * @author robertbrock
 */
var clientId = '265773901391-4da8d6cn712o30nls5c046omeie0s08g.apps.googleusercontent.com';
var apiKey = 'AIzaSyA14xXpj2XmqiGZWtOxnuJ-5VIsI30ave8';
var scopes = 'https://www.googleapis.com/auth/analytics.readonly';

// This function is called after the Client Library has finished loading
function handleClientLoad() {
  // 1. Set the API Key
  gapi.client.setApiKey(apiKey);

  // 2. Call the function that checks if the user is Authenticated. This is defined in the next section
  window.setTimeout(checkAuth,1);
}

function loadAnalyticsClient() {
  // Load the Analytics client and set handleAuthorized as the callback function
  gapi.client.load('analytics', 'v3', handleAuthorized);
}

function handleAuthResult(authResult) {
  if (authResult) {
    // The user has authorized access
    // Load the Analytics Client. This function is defined in the next section.
    loadAnalyticsClient();
	  } else {
    // User has not Authenticated and Authorized
    handleUnAuthorized();
  }
}


function checkAuth() {
  // Call the Google Accounts Service to determine the current user's auth status.
  // Pass the response to the handleAuthResult callback function
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}

// Authorized user
function handleAuthorized() {
  var authorizeButton = document.getElementById('authorize-button');
  var makeApiCallButton = document.getElementById('make-api-call-button');

  // Show the 'Get Visits' button and hide the 'Authorize' button
  makeApiCallButton.style.visibility = '';
  authorizeButton.style.visibility = 'hidden';


}
// Unauthorized user
function handleUnAuthorized() {
  var authorizeButton = document.getElementById('authorize-button');
  var makeApiCallButton = document.getElementById('make-api-call-button');

  // Show the 'Authorize Button' and hide the 'Get Visits' button
  makeApiCallButton.style.visibility = 'hidden';
  authorizeButton.style.visibility = '';

  // When the 'Authorize' button is clicked, call the handleAuthClick function
  authorizeButton.onclick = handleAuthClick;


function handleAuthClick(event) {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
  return false;
}

  // When the 'Get Visits' button is clicked, call the makeAapiCall function
  makeApiCallButton.onclick = makeApiCall;










}