# GET /session

+ Request (application/x-www-form-urlencoded)

    + Headers

            Cookie: session=eyJ1c2VySWQiOjd9; session.sig=UfIhtdGlqKnPh71cPOT18ZihIhs

    + Body

            email=kfatehi%40uci.edu&password=something

+ Response 201 (application/json; charset=utf-8)

    + Headers

            Access-Control-Allow-Origin: *
            X-Powered-By: Express
            Etag: W/"f4-35Nd87DmuqZ1KST4DKohaA"

    + Body

            {"id":7,"name":"Peter Anteater","email":"panteater@uci.edu","groups":[{"id":18,"name":"My Group","ownerId":"7","members":[{"id":7,"name":"Peter Anteater","email":"panteater@uci.edu"},{"id":1,"name":"Keyvan Fatehi","email":"kfatehi@uci.edu"}]}]}
