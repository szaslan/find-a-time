import React, {useEffect, useState} from "react";
import UpdateDb from "../Db/UpdateDb";
import moment from 'moment'


const minutes = ['00', '30'];

//roomId, date, interval, userName, isBusy
const AddEvents = (roomId, userName, events) => {
    events.map(event => findIntervals(roomId, userName, event));
};


const getStartTime = (event) => {
    let start = event.start.dateTime;
    if (!start) {
        start = event.start.date;
    }
    return moment(start);
};

const getEndTime = (event) => {
    let end = event.end.dateTime;
    if (!end) {
        end = event.end.date;
    }
    return moment(end);
};

const getDay = (time) => {
    return time.format('YYYY-MM-DD')
};

const findIntervals = (roomId, userName, event) => {
    const start = getStartTime(event);
    const end = getEndTime(event);
    findBuckets(roomId, userName, start, end);
};

const findBuckets = (roomId, userName, currTime, endTime) => {

    console.log('start time');
    console.log(currTime);
    console.log('endtime');
    console.log(endTime);
    // Finding the first time interval -- figuring out what minute to start at
    // if min is in [0,30) then set i=0, otherwise set i=1.
    var i = 0

    while (i < minutes.length - 1){
        if (Number(minutes[i]) <= currTime.minute() && currTime.minute() < Number(minutes[i + 1])){
            currTime.minutes(Number(minutes[i]));
            break;
        }
        i += 1;
    }

    // keep incrementing startTime by 30min until startTime>= endTime then stop,
    // for each day record the 30min intervals seen in `dayPayload`,
    // once the day changes add `dayPayload` to `payload`
    let currentDay=  getDay(currTime);
    let dayPayload = {};
    let payload = {};

    while (currTime.isBefore(endTime)) {
        dayPayload[`${currTime.hour()}:${minutes[i]}`] = 1;
        i = (i+1)%(minutes.length);
        currTime.add(Number(minutes[1]),'minutes');

        if (getDay(currTime) !== currentDay){
            payload[currentDay] = dayPayload;
            currentDay = getDay(currTime);
            dayPayload = {};
        }
    }    

    payload[currentDay]=dayPayload;

    // the actual payload w/ identifying information
    const actualPayload = {userName:userName, roomId:roomId, data: payload};
    console.log(actualPayload);
};

export default AddEvents;
