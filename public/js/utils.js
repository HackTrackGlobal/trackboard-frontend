/**
 * Function to perform logout
 */
function performLogout() {

    // Clear all the localStorage
    localStorage.clear();

    // Go to login screen
    window.location.hash = '#!login';
}

/**
 * Process user token after login or register
 * This will get all the user's data
 */
function processToken(token, done) {

    if (!localStorage.getItem(STORAGE_USER_TOKEN)) localStorage.setItem(STORAGE_USER_TOKEN, token);

    // Get token and extract the user data
    $.ajax({
        type: 'GET',
        url: API_ROUTE_USER + '?token=' + localStorage.getItem(STORAGE_USER_TOKEN),
        contentType: 'application/json',

        success: function(data) {

            // Save the info
            localStorage.setItem(STORAGE_USER_ID, data._id);
            localStorage.setItem(STORAGE_USER_USERNAME, data.username);
            localStorage.setItem(STORAGE_USER_EMAIL, data.email);

            // Call the done callback
            done(false, data);
        },

        error: function(xhr) {

            // For debugging..
            if (STAGING_MODE === 'dev') console.log('unable to retrieve user data! XHR: ' + xhr);

            // Clear the saved token
            localStorage.removeItem(STORAGE_USER_TOKEN);

            // Call the done()
            done(true);
        }
    });
}

/**
 * Setting the title
 */
function setTitle(title) {
    $('#page-title').html(title);
}