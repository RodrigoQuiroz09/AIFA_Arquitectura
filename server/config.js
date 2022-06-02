const config = {
    application: {
        cors: {
            server: [
                {
                    origin: "100.26.41.90:3000", //servidor que deseas que consuma o (*) en caso que sea acceso libre
                    credentials: true
                }
        ]
        }
    }
}