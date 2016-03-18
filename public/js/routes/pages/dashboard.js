// Main Game Route
$(document).createRoute({
    path: 'dashboard',
    templateUrl: 'views/pages/dashboard.html',
    controller: function() {

        // Setting the title
        setTitle('Dashboard');
    }
});