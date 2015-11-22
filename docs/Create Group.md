# POST /group

+ Request (application/x-www-form-urlencoded)

    + Headers

            Cookie: session=eyJ1c2VySWQiOjd9; session.sig=UfIhtdGlqKnPh71cPOT18ZihIhs

    + Body

            name=My+Group

+ Response 200 (application/json; charset=utf-8)

    + Headers

            Access-Control-Allow-Origin: *
            X-Powered-By: Express
            Etag: W/"75-1Ml2V8gMNdu5lyh1eVM4mQ"

    + Body

            {"id":17,"name":"My Group","ownerId":7,"updatedAt":"2015-11-22T20:07:07.000Z","createdAt":"2015-11-22T20:07:07.000Z"}
