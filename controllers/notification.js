var admin = require("firebase-admin");
var serviceAccount = require('../privatekey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://wishlist-8a95b.firebaseio.com"
});

exports.SendNotification = (registrationToken, param, callback, callbackError) => {

    let payload = {
        notification: {
            title: param.title,
            body: param.body
        },
    };
    var options = {
        priority: "normal",
        timeToLive: 60 * 60
    };

    admin.messaging().sendToDevice(registrationToken, payload, options)
        .then(function (response) {
            console.log("Successfully sent message:", response);
            callback(response);
        })
        .catch(function (error) {
            console.log("Error sending message:", error);
            callbackError(error);
        });
}


