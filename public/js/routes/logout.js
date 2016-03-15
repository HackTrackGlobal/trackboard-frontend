// Logout Route
$(document).createRoute({
    path: 'logout',
    templateUrl: 'views/logout.html',
    controller: function() {

        // Logout..
        performLogout();
    }
});