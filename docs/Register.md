# POST /register

+ Request (application/x-www-form-urlencoded)

    + Body

            email=panteater%40uci.edu&password=something&confirmPassword=something&antPlannerId=123456&name=Peter+Anteater

+ Response 200 (application/json; charset=utf-8)

    + Headers

            Access-Control-Allow-Origin: *
            Set-Cookie: session=eyJ1c2VySWQiOjd9; path=/; httponly, session.sig=UfIhtdGlqKnPh71cPOT18ZihIhs; path=/; httponly
            X-Powered-By: Express
            Etag: W/"8-+QlobErfZPeoxGiynm5mqg"

    + Body

            {"id":7}
