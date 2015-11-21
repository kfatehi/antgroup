var antcallender = (function() {
    function render(container, data) {
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

    return {
        render: render
    };
})();

/*[{
        user: {
            email: 'someemal'
        },
        events: [{}]
     }]*/



