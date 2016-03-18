// Main Game Route
$(document).createRoute({
    path: 'settings',
    templateUrl: 'views/pages/settings.html',
    controller: function() {

        // Setting the title
        setTitle('Settings');
    }
});