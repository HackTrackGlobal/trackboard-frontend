# Trackboard Frontend
The community contributing platform for eBay.

## Run
    npm install
    node server

## Moving to Production
1) Open file `public/js/app.js`
2) Change variable `STAGING_MODE` from `dev` to `prod`
3) Build Project (Next Section)

## Configuring default port (for the mock server)
edit config.js:

    module.exports = {

        // Port
        port: YOUR PORT HERE (DEFAULT IS 3000)
    };

## Build
    npm install
    gulp build

## To Do
Crossed items are deprecated.

### Important
- [ ] Setting up the framework

### Still important, but only if we have time
- [ ]

### Later
- [ ]

### Trash
- [ ]
