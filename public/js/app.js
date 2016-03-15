/**
 * STAGE MODE
 * ================
 * Very important! change from 'dev' to 'prod' when
 * using in production!!!
 */
var STAGING_MODE = 'prod';

/**
 * API ROUTES
 */
var API_ROUTE_LOGIN = 'https://ecomm-server.herokuapp.com/login';
var API_ROUTE_USERS = 'https://ecomm-server.herokuapp.com/users';
var API_ROUTE_USER = 'https://ecomm-server.herokuapp.com/user';
var API_ROUTE_QUESTS = 'https://ecomm-server.herokuapp.com/quests';

/**
 * API QUESTS ROUTES
 */
var API_ROUTE_QUEST_MATCH_CATEGORY_START = 'https://ecomm-server.herokuapp.com/game/category/start';
var API_ROUTE_QUEST_MATCH_CATEGORY_END = 'https://ecomm-server.herokuapp.com/game/category/end';
var API_ROUTE_QUEST_MATCH_IMAGE_START = 'https://ecomm-server.herokuapp.com/game/image/start';
var API_ROUTE_QUEST_MATCH_IMAGE_END = 'https://ecomm-server.herokuapp.com/game/image/end';

/**
 * BADGES URL
 */
var BADGES_URL = 'https://api.myjson.com/bins/2kgex';

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

        // There is a problem with the
        // MDL JS Library, so we initiate
        // all this stuff here. again.
        componentHandler.upgradeAllRegistered();

        // Close drawer
        $('#ecomm-drawer, .mdl-layout__obfuscator').removeClass('is-visible');

        // Remove the 'is-invalid' class to inputs,
        // because of a bug with MDL
        $('.mdl-textfield').removeClass('is-invalid');

        // Check if support localStorage
        if (typeof(Storage) === 'undefined') {

            // Show message
            showErrorAlert('You browser is not supported');
        }
        else {

            // Check if the user is logged
            if (!localStorage.getItem(STORAGE_USER_TOKEN)) {

                // User isn't logged! Go to login page
                if (route !== 'register') window.location.hash = '#!login';

                // And hide the stuff we don't want him to see
                $('.onlyForLogged').hide();
            }
            else {

                // Show everything!
                $('.onlyForLogged').show();

                // Setting user bar
                $('#ecomm-user-menu').html(localStorage.getItem(STORAGE_USER_EMAIL));
            }
        }
    }});

/**
 * SCORE DIALOG SETUP
 */
$('#dialog-score').dialog({
    autoOpen: false,
    modal: true,
    resizable: false,
    draggable: false,
    minWidth: 570,
    show: {
        effect: 'fadeIn',
        duration: 300
    },
    hide: {
        effect: 'fadeOut',
        duration: 300
    }
});