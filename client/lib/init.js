(function () {
    var ids = [ "62661627", "63393716" ];

    function getSchedules (ids, cb) {
        $.ajax({
            url: "http://107.170.244.250/schedules",
            type: "POST",
            data: {
                ids: ids
            },
            cotentType: 'application/json',
            /*crossDomain: true,*/
            success: cb
        });
    }

    function renderCalender (container, data) {
        var union = data.reduce(function (union, cur) {
            return union.concat(cur.events);
        }, []);

        container.weekCalendar({
            date: new Date("2012-10-01T21:50:00.000Z"),
            timeslotsPerHour: 4,
            allowCalEventOverlap: false,
            overlapEventsSeparate: false,
            height: function($calendar){
                return $(window).height() - $("h1").outerHeight();
            },
            eventRender : function(calEvent, $event) {
                $event.find('.wc-time')
                    .css("backgroundColor", "black")
                    .css("color", "white");

                $event
                    .css('z-index', 100000000)
                    .css("backgroundColor", "rgb(170,243,255)")
                    .css('opacity', 1)
                    .css("color", "black")
                    .css("border", '1px solid black');

                $event.find('.wc-title').css("opacity", 1);
            },
            eventNew : function(calEvent, $event) {
                displayMessage("<strong>Added event</strong><br/>Start: " + calEvent.start + "<br/>End: " + calEvent.end);
                alert("You've added a new event. You would capture this event, add the logic for creating a new event with your own fields, data and whatever backend persistence you require.");
            },
            eventDrop : function(calEvent, $event) {
                displayMessage("<strong>Moved Event</strong><br/>Start: " + calEvent.start + "<br/>End: " + calEvent.end);
            },
            eventResize : function(calEvent, $event) {
                displayMessage("<strong>Resized Event</strong><br/>Start: " + calEvent.start + "<br/>End: " + calEvent.end);
            },
            eventClick : function(calEvent, $event) {
                $event.css('z-index', parseInt($event.css('z-index')) - 1 );
                displayMessage("<strong>Clicked Event</strong><br/>Start: " + calEvent.start + "<br/>End: " + calEvent.end);
            },
            eventMouseover : function(calEvent, $event) {
                //$event.css('z-index', 100000);
                displayMessage("<strong>Mouseover Event</strong><br/>Start: " + calEvent.start + "<br/>End: " + calEvent.end);
            },
            eventMouseout : function(calEvent, $event) {
                //$event.css('z-index', null);
                displayMessage("<strong>Mouseout Event</strong><br/>Start: " + calEvent.start + "<br/>End: " + calEvent.end);
            },
            noEvents : function() {
                displayMessage("There are no events for this week");
            },
            data:{events: union}
        });
    }

    function displayMessage(message) {
            $("#message").html(message).fadeIn();
        }

    getSchedules(ids, function (res) {
        var json = JSON.parse(res);

        /*json = fixTimezones(json);*/

        /*json.forEach(function (obj) {
            obj.events.forEach(function (event) {
                event.start = event.start.replace(/000Z/, '800Z');
                event.end = event.end.replace(/000Z/, '800Z');
            });
        });*/

        renderCalender($("#main"), json);
    });


    /*function fixTimezones(events) {
        return events.map(function(e) {
            sub(e, 'start')
            sub(e, 'end')
            return e
        });
    }


    function sub(e, key) {
        console.log(e);
        e[key] = moment(e[key]).subtract(5, 'hours').toDate()
        return e;
    }*/


})();
