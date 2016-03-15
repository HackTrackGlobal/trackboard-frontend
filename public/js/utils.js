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
 * Show Error Alert
 */
function showErrorAlert(msg) {

    $('#error-alert').html(msg).fadeIn(300);
    setTimeout(function() {
        $('#error-alert').fadeOut(300);
    }, 3000);
}

/**
 * Show Success Alert
 */
function showSuccessAlert(msg) {

    $('#success-alert').html(msg).fadeIn(300);
    setTimeout(function() {
        $('#success-alert').fadeOut(300);
    }, 3000);
}

/**
 * Calculate Relative Badges
 */
function getRelativeBadges(userData, callback) {

    /*
     * Extracting user's data
     */
    var totalScore = userData.totalScore;
    var totalQuestions = userData.totalQuestions;
    var categoryMatchScore = userData.categoryMatchScore;
    var imageMatchScore = userData.imageMatchScore;

    /*
     * Badges Result
     */
    var result = [

        /*totalScore: {
            title: '',
            name: '',
            description: '',
            target: 0,
            current: 0,
            progress: 0
        },

        totalQuestions: {
            title: '',
            name: '',
            description: '',
            target: 0,
            current: 0,
            progress: 0
        },

        categoryMatchScore: {
            title: '',
            name: '',
            description: '',
            target: 0,
            current: 0,
            progress: 0
        },

        imageMatchScore: {
            title: '',
            name: '',
            description: '',
            target: 0,
            current: 0,
            progress: 0
        }*/
    ];

    /*
     * Getting the badges
     */
    $.get(BADGES_URL, { dataType: 'json' }, function(data) {

        /*
         * Badges Calculation
         */
        data.badges.forEach(function(group) {

            // Group Data
            var groupType = group.check;

            // What to Check
            var toCheck;
            if (groupType === 'totalScore') toCheck = totalScore;
            else if (groupType === 'totalQuestions') toCheck = totalQuestions;
            else if (groupType === 'categoryMatchScore') toCheck = categoryMatchScore;
            else if (groupType === 'imageMatchScore') toCheck = imageMatchScore;

            // Getting the relative badge according
            // to the current checking target
            var badge = null;
            var lastTarget = group.targets[group.targets.length - 1].target;
            group.targets.forEach(function(target) {

                if (target.target > toCheck && target.target <= lastTarget) {
                    badge = {
                        check: groupType,
                        title: target.title,
                        name: target.name,
                        description: target.description,
                        target: target.target,
                        current: toCheck,
                        progress: (100 * toCheck) / target.target
                    }
                }
            });

            // Check if we have result
            if (badge) {

                // WE HAVE A MATCH!
                result.push(badge);
            }
            else {

                // No matching badge found.. TODO: The user finish the target?
            }
        });

        // We finished!
        callback(result);
    });
}

/**
 * Show Score Dialog
 */
function showScoreDialog(quest, submissions, score) {

    // Open dialog
    $('#dialog-score').dialog('open');

    // Add Classes
    $('.ui-dialog').addClass('ecomm-play-card ecomm-play-card-autoWidth mdl-card mdl-shadow--2dp').css('text-align', 'center');

    // change color if is category
    if (quest === 'category') $('.ui-dialog').addClass('ecomm-play-card-green');

    // Add score and submissions
    $('#dialog-score-submissions').html(submissions);
    $('#dialog-score-points').html(score);

    // Closing buttons
    $('#dialog-score a').on('click', function() {
        $('#dialog-score').dialog('close');
    });
}