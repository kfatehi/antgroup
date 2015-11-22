# DELETE /session

+ Request (application/x-www-form-urlencoded)

        email=kfatehi%40uci.edu&password=something

+ Response 302 (text/plain; charset=utf-8)

    + Headers

            Location: /
            X-Powered-By: Express
            Access-Control-Allow-Origin: *
            Set-Cookie: session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly, session.sig=o_XMnZlyG1IEFAUtK9iPQbDlnpY; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly
            Vary: Accept

    + Body

            Found. Redirecting to /
