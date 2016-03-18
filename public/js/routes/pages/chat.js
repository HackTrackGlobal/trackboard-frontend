// Main Game Route
$(document).createRoute({
    path: 'chat',
    templateUrl: 'views/pages/chat.html',
    controller: function() {

        // Setting the title
        setTitle('Public Chat');
    }
});