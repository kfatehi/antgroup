# POST /session

+ Request (application/x-www-form-urlencoded)

    + Headers

            Cookie: session=eyJ1c2VySWQiOjd9; session.sig=UfIhtdGlqKnPh71cPOT18ZihIhs

    + Body

            email=panteater%40uci.edu&password=something

+ Response 201 (application/json; charset=utf-8)

    + Headers

            Access-Control-Allow-Origin: *
            X-Powered-By: Express
            Etag: W/"8-+QlobErfZPeoxGiynm5mqg"

    + Body

            {"id":7}
