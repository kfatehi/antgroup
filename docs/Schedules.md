# POST /schedules

+ Request (application/x-www-form-urlencoded)

    + Headers

            Cookie: session=eyJ1c2VySWQiOjd9; session.sig=UfIhtdGlqKnPh71cPOT18ZihIhs

    + Body

            emails%5B0%5D=kfatehi%40uci.edu&emails%5B1%5D=panteater%40uci.edu

+ Response 200 (application/json; charset=utf-8)

    + Headers

            Access-Control-Allow-Origin: *
            X-Powered-By: Express
            Etag: W/"d55-+sPjhsryJyEUibf8ktrfzw"

    + Body

            [{"email":"kfatehi@uci.edu","events":[{"id":"6dbc","groupId":"37040","start":"2012-10-01T17:00:00.000Z","end":"2012-10-01T18:20:00.000Z","title":"In4matx  131 at SSL 290<br>(37040)"},{"id":"72b6","groupId":"37060","start":"2012-10-01T14:00:00.000Z","end":"2012-10-01T15:20:00.000Z","title":"In4matx  151 at HG 1800<br>(37060)"},{"id":"aeb0","groupId":"37050","start":"2012-10-02T08:00:00.000Z","end":"2012-10-02T09:20:00.000Z","title":"In4matx  141 at DBH 1100<br>(37050)"},{"id":"b04c","groupId":"37010","start":"2012-10-02T14:00:00.000Z","end":"2012-10-02T15:20:00.000Z","title":"In4matx  113 at SSH 100<br>(37010)"},{"id":"171f","groupId":"37051","start":"2012-10-03T19:00:00.000Z","end":"2012-10-03T19:50:00.000Z","title":"In4matx  141 at TBA<br>(37051)"},{"id":"bb4c","groupId":"37040","start":"2012-10-03T17:00:00.000Z","end":"2012-10-03T18:20:00.000Z","title":"In4matx  131 at SSL 290<br>(37040)"},{"id":"18f3","groupId":"37060","start":"2012-10-03T14:00:00.000Z","end":"2012-10-03T15:20:00.000Z","title":"In4matx  151 at HG 1800<br>(37060)"},{"id":"407c","groupId":"37050","start":"2012-10-04T08:00:00.000Z","end":"2012-10-04T09:20:00.000Z","title":"In4matx  141 at DBH 1100<br>(37050)"},{"id":"9d05","groupId":"37010","start":"2012-10-04T14:00:00.000Z","end":"2012-10-04T15:20:00.000Z","title":"In4matx  113 at SSH 100<br>(37010)"},{"id":"e057","groupId":"37041","start":"2012-10-05T15:00:00.000Z","end":"2012-10-05T15:50:00.000Z","title":"In4matx  131 at SSL 248<br>(37041)"}]},{"email":"panteater@uci.edu","events":[{"id":"4430","groupId":"67521","start":"2012-10-01T01:00:00.000Z","end":"2012-10-01T01:50:00.000Z","title":"Pol Sci  171F at DBH 1420<br>(67521)"},{"id":"bfdc","groupId":"26760","start":"2012-10-01T03:00:00.000Z","end":"2012-10-01T03:50:00.000Z","title":"History  169 at SSL 290<br>(26760)"},{"id":"b0ca","groupId":"26761","start":"2012-10-01T05:00:00.000Z","end":"2012-10-01T05:50:00.000Z","title":"History  169 at SSTR 101<br>(26761)"},{"id":"f546","groupId":"26757","start":"2012-10-02T03:30:00.000Z","end":"2012-10-02T04:50:00.000Z","title":"History  166B at DBH 1425<br>(26757)"},{"id":"c06a","groupId":"67520","start":"2012-10-02T00:30:00.000Z","end":"2012-10-02T01:50:00.000Z","title":"Pol Sci  171F at HH 262<br>(67520)"},{"id":"59bd","groupId":"70030","start":"2012-10-02T05:00:00.000Z","end":"2012-10-02T06:20:00.000Z","title":"Soc Sci  3A at SSLH 100<br>(70030)"},{"id":"a0f3","groupId":"26760","start":"2012-10-03T03:00:00.000Z","end":"2012-10-03T03:50:00.000Z","title":"History  169 at SSL 290<br>(26760)"},{"id":"d634","groupId":"70031","start":"2012-10-03T00:30:00.000Z","end":"2012-10-03T01:50:00.000Z","title":"Soc Sci  3A at SBSG<br>(70031)"},{"id":"8d5f","groupId":"26757","start":"2012-10-04T03:30:00.000Z","end":"2012-10-04T04:50:00.000Z","title":"History  166B at DBH 1425<br>(26757)"},{"id":"c8da","groupId":"67520","start":"2012-10-04T00:30:00.000Z","end":"2012-10-04T01:50:00.000Z","title":"Pol Sci  171F at HH 262<br>(67520)"},{"id":"5c1f","groupId":"70030","start":"2012-10-04T05:00:00.000Z","end":"2012-10-04T06:20:00.000Z","title":"Soc Sci  3A at SSLH 100<br>(70030)"},{"id":"cf32","groupId":"26760","start":"2012-10-05T03:00:00.000Z","end":"2012-10-05T03:50:00.000Z","title":"History  169 at SSL 290<br>(26760)"},{"id":"4d59","groupId":"70031","start":"2012-10-05T00:30:00.000Z","end":"2012-10-05T01:50:00.000Z","title":"Soc Sci  3A at SBSG<br>(70031)"}]}]
