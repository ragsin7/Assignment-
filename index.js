try {

    /**********global variables**************/
    ROOT_DIR = __dirname + '/';
    /****************************************/

    const express = require('express');
    var routeName = require('./core/config/routename');
    const cors = require('cors');
    const path = require('path');

    db = require('./core/config/connection').mongo_init();

    const roleModel = require('./app/roles/index');
    var app = express();

    app.use(cors());

    var bodyParser = require('body-parser');
    app.use(bodyParser.json()); // support json encoded bodies
    app.use(express.static(path.join(__dirname, "public")));

    global.adminrole;
    global.userrole;
    async function getAuthData() {
        await roleModel.find()
            .then((res) => {
                AC = res;
                for (let i = 0; i < AC.length; i++) {
                    if (AC[i].name == "user") {
                        userrole = AC[i].access.path;
                    } else if (AC[i].name == "admin") {
                        adminrole = AC[i].access.path;
                    }
                }
            })
            .catch((err) => {
                console.log("Error in app.js ", err);

            })

    }
    getAuthData();


    const routeArray = routeName.routeNames;
    // app.use(auth.verifyToken) // If we want to apply middleware to all routes
    for (var i = 0; i < routeArray.length; i++)
        app.use(`/${routeArray[i]}`, require(`./app/${routeArray[i]}/routes`));

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        const error = new Error("Not found");
        error.status = 404;
        next(error);
    });

    // error handler middleware
    app.use((error, req, res, next) => {
        res.status(error.status || 500).send({
            error: {
                status: error.status || 500,
                message: error.message || 'Internal Server Error',
            },
        });
    });

    app.listen(3016, function () {
        console.log('app listening on port 3016!');
    });
}
catch (err) {
    console.log('====================================');
    console.log(err);
    console.log('====================================');
}
