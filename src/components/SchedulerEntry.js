import React, { useEffect, useState } from "react";
// need to import database as db
import { hours, minutes, dates } from "../constants";
//1. create an empty schedule entry for each data/time option
//2. find the schedule based off id from database, compare times

//for each
const ScheduleEntry = () => {
  const times = createTimes();
  const events = dates.map(function(item) {
    return { item, times };
  });
  //return createDateEntry(item, times);})
  return events;
  //const schedule = `"id": ${id}, "events": ${events} `
  //saveToFirebase(schedule);
};

//this creates every possible hour/minute combindation
const createTimes = () => {
  return hours
    .map(function(item) {
      return minutes.map(function(item2) {
        return `${item}:${item2}:00`;
      });
    })
    .flat();
};

const saveToFirebase = ({ schedule }) => {};

export default ScheduleEntry;
