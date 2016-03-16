/**
 * STAGE MODE
 * ================
 * Very important! change from 'dev' to 'prod' when
 * using in production!!!
 */
var STAGING_MODE = 'dev';

/**
 * API ROUTES
 */
var API_ROUTE_USER = '';

/**
 * LOCAL STORAGE KEYS
 */
var STORAGE_USER_TOKEN = 'user_token';
var STORAGE_USER_ID = 'user_id';
var STORAGE_USER_USERNAME = 'user_username';
var STORAGE_USER_EMAIL = 'user_email';

/**
 * Initiate the Routing system
 */
$(document).initRouter({

    // Error template
    errPath: 'views/error.html',

    // When route is changed
    onRouteChange: function(route) {

        /**
         * This will happened AFTER
         * the route is changed
         */
        if (STAGING_MODE === 'dev') console.debug('Route changed! ' + route);

        // Need to add an 'active' class to the selected menu item
        $('.tb-navigation .mdl-navigation__link').each(function() {
            var e = $(this);
            e.removeClass('active');
            if (e.attr('href') == window.location.hash) e.addClass('active');
        });

        // Setting the title
        var title = window.location.hash.slice(2, window.location.hash.length).split('_').join(" ");
        $('#page-title').html(title);

        // There is a problem with the
        // MDL JS Library, so we initiate
        // all this stuff here. again.
        componentHandler.upgradeAllRegistered();

        // Remove the 'is-invalid' class to inputs,
        // because of a bug with MDL
        $('.mdl-textfield').removeClass('is-invalid');

        // Check if support localStorage
        if (typeof(Storage) === 'undefined') {

            // Show message
            // TODO: Change
            alert('You browser is not supported');
        }
        else {

            // Check if the user is logged
            if (!localStorage.getItem(STORAGE_USER_TOKEN)) {

                // User isn't logged! Go to login page
                if (route !== 'register') window.location.hash = '#!login';

                // And hide the stuff we don't want him to see
                $('.only-for-logged').hide();
            }
            else {

                // Show everything!
                $('.only-for-logged').show();
            }
        }
    }});