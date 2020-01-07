const fcm = require('fcm-notification');
const FCM = new fcm('privatekey.json'); 
let tokens =[];


exports.FCMSendNotification =  (param, callback, callbackError) => {

    let message = {
        data: { 
          score: '850',
          time: '2:45'
        },
        notification:{
          title : param.title,
          body : param.body },
        data:{
            report_id: param.reportId
        },
        topic: param.topic
    };

    FCM.send(message, function(err, respons) {
        if(err){
            callbackError(err);
        }else { 
            callback(respons);
        }
    })
}

exports.FCMSubscribe =  (param , callback, callbackError) => { 
    FCM.subscribeToTopic(param.tokens, param.topic, function(err) {
        if(err){
            callbackError(err);
        }else {
            callback();
        }
    })
}

exports.FCMunsubscribeFromTopic = (param, callback, callbackError) => {
    FCM.unsubscribeFromTopic(param.tokens, param.topic, function(err) {
        if(err){
            callbackError(err);
        }else {
            callback();
        }
    })
}
