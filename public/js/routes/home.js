// Home Route
$(document).createRoute({
    path: 'home',
    templateUrl: 'views/home.html',
    default: true,
    controller: function() {

        /**
         * This route used to check the connection to
         * the server, eg. checking user details and stuff
         */

        // Validating user data
        processToken(localStorage.getItem(STORAGE_USER_TOKEN), function(err) {

            // Check for errors
            if (!err) {

                // For debugging
                if (STAGING_MODE === 'dev') console.log('Logged in Successfully');

                // Go to main page
                window.location.hash = '#!main'
            }
            else {

                // For debugging
                if (STAGING_MODE === 'dev') console.log('Error while validating token! Logging off..');

                // Logout the user
                performLogout();
            }
        });
    }
});