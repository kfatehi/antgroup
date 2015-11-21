# Core Features
* Create a group
* Invite another person into the group
* See groups I belong to
* Automatically synchronize users with antplanner
* Render group memebers' schedule data on a calendar

# Nice to have
* Share files about class
* Send messages to the group

# Technology Choices

## Frontend

* Calendar https://github.com/robmonie/jquery-week-calendar/wiki

## Backend

* Node.js
* Hapi
* Sequelize
* Postgres

# Antplanner Extraction Example

GET http://antplanner.appspot.com/schedule/load?username=63393716

Returns JSON:
```
[{
    "id": "6dbc",
    "groupId": "37040",
    "start": "2012-10-02T00:00:00.000Z",
    "end": "2012-10-02T01:20:00.000Z",
    "title": "In4matx 131 at SSL 290<br>(37040)"
}, {
    "id": "72b6",
    "groupId": "37060",
    "start": "2012-10-01T21:00:00.000Z",
    "end": "2012-10-01T22:20:00.000Z",
    "title": "In4matx 151 at HG 1800<br>(37060)"
}, {
    "id": "aeb0",
    "groupId": "37050",
    "start": "2012-10-02T15:00:00.000Z",
    "end": "2012-10-02T16:20:00.000Z",
    "title": "In4matx 141 at DBH 1100<br>(37050)"
}, {
    "id": "b04c",
    "groupId": "37010",
    "start": "2012-10-02T21:00:00.000Z",
    "end": "2012-10-02T22:20:00.000Z",
    "title": "In4matx 113 at SSH 100<br>(37010)"
}, {
    "id": "171f",
    "groupId": "37051",
    "start": "2012-10-04T02:00:00.000Z",
    "end": "2012-10-04T02:50:00.000Z",
    "title": "In4matx 141 at TBA<br>(37051)"
}, {
    "id": "bb4c",
    "groupId": "37040",
    "start": "2012-10-04T00:00:00.000Z",
    "end": "2012-10-04T01:20:00.000Z",
    "title": "In4matx 131 at SSL 290<br>(37040)"
}, {
    "id": "18f3",
    "groupId": "37060",
    "start": "2012-10-03T21:00:00.000Z",
    "end": "2012-10-03T22:20:00.000Z",
    "title": "In4matx 151 at HG 1800<br>(37060)"
}, {
    "id": "407c",
    "groupId": "37050",
    "start": "2012-10-04T15:00:00.000Z",
    "end": "2012-10-04T16:20:00.000Z",
    "title": "In4matx 141 at DBH 1100<br>(37050)"
}, {
    "id": "9d05",
    "groupId": "37010",
    "start": "2012-10-04T21:00:00.000Z",
    "end": "2012-10-04T22:20:00.000Z",
    "title": "In4matx 113 at SSH 100<br>(37010)"
}, {
    "id": "e057",
    "groupId": "37041",
    "start": "2012-10-05T22:00:00.000Z",
    "end": "2012-10-05T22:50:00.000Z",
    "title": "In4matx 131 at SSL 248<br>(37041)"
}]
```
