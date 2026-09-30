Change the «max-tick-time» in `server.properties` from 60000 to -1. When a player builds a large base with a lot of logic and pipes, the server doesn't always have time to load everything within 60 seconds and crashes.

`max-tick-time=-1`