var antcalender = function(container, data) {
    function render(container, data) {

        for (var key in data) {
            for (var i in data[key].events) {
                data[key].events[i].color = data[key].user.color
                data[key].events[i].email = data[key].user.email
            }
        }

        var union = data.reduce(function (union, cur) {
            return union.concat(cur.events);
        }, []);

        container.weekCalendar({
            date: new Date("2012-10-01T21:50:00.000Z"),
            timeFormat:"h:i",
            timeslotsPerHour: 4,
            dateFormat: "",
            allowCalEventOverlap: true,
            overlapEventsSeparate: true,
            businessHours: {start: 6, end: 22, limitDisplay: true},
            readonly: true,
            showHeader: true,
            showColumnHeaderDate: false,
            buttons: false,
            height: function($calendar){
                return $(window).height() - $("h1").outerHeight();
            },
            eventRender : function(calEvent, $event) {
                $event.find('.wc-time')
                    .css("backgroundColor", "black")
                    .css("color", "white");

                $event
                    //.css('z-index', 10000)
                    .css("backgroundColor", calEvent.color)
                    .css('opacity', 1)
                    .css("color", "black")
                    .css("border", '1px solid black');

                $event.find('.wc-title').css("opacity", 1);
            },
            eventNew : function(calEvent, $event) {
                //displayMessage("<strong>Added event</strong><br/>Start: " + calEvent.start + "<br/>End: " + calEvent.end);
                //alert("You've added a new event. You would capture this event, add the logic for creating a new event with your own fields, data and whatever backend persistence you require.");
            },
            eventDrop : function(calEvent, $event) {
                //displayMessage("<strong>Moved Event</strong><br/>Start: " + calEvent.start + "<br/>End: " + calEvent.end);
            },
            eventResize : function(calEvent, $event) {
                //displayMessage("<strong>Resized Event</strong><br/>Start: " + calEvent.start + "<br/>End: " + calEvent.end);
            },
            eventClick : function(calEvent, $event) {
                //$event.css('z-index', parseInt($event.css('z-index')) - 1 );
                //displayMessage("<strong>Clicked Event</strong><br/>Start: " + calEvent.start + "<br/>End: " + calEvent.end);
            },
            eventMouseover : function(calEvent, $event) {
                //$event.css('z-index', 100000);
                //displayMessage("<strong>Mouseover Event</strong><br/>Start: " + calEvent.start + "<br/>End: " + calEvent.end);
            },
            eventMouseout : function(calEvent, $event) {
                //$event.css('z-index', null);
                //displayMessage("<strong>Mouseout Event</strong><br/>Start: " + calEvent.start + "<br/>End: " + calEvent.end);
            },
            noEvents : function() {
                //displayMessage("There are no events for this week");
            },
            data:{events: union}
        });
    }

    return {
        render: render
    };
}();

/*[{
        user: {
            email: 'someemal'
        },
        events: [{}]
     }]*/



