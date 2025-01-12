import AWS from 'aws-sdk';

const eventBridge  = new AWS.EventBridge();

export const sendEvent = async(eventDetail: any)=>{
    await eventBridge.putEvents({
    Entries:[
            {
                Source: "",
                DetailType: "",
                Detail: "",
                EventBusName: "appointmentBus"
            },
        ],
    }).promise();
}