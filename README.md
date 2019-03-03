## Cashier
Gaming (gambling, lol) platform, which is an `open space with games`. The core is a multiplayer architecture that allows you to `easily add new games` to the catalog. `One profile for all games`, the `simple creation` of `rooms` and the `addition of new games`.
______________

Task tracker:
======================

***Trello***: <https://trello.com/b/zkQ7Re9N/cashier>

Prepare:
======================
First what you mast do - install `Redis` database and run on port 6379. <br />
Second what you mast do - install `MongoDB` database or create in cloud (for example - `mlab.com`). <br />
Then configurate project in configs (in folders `src/client` and `src/server`). <br />

After `all done` - go to the project folder and run command:
```
npm run i // Install required packages.
```
.env configuration:
======================
MODE = development || production <br />
BACKEND_URL = http://localhost <br />
FRONTEND_URL = http://localhost <br />
BACKEND_PORT = 1337 <br />
FRONTEND_PORT = 8000 <br />
<br />
MONGO_USER = login <br />
MONGO_PASSWORD = paswword <br />

REDIS_USER = user <br />
REDIS_PASSWORD = password <br />
REDIS_PORT = 6379 <br />
REDIS_HOST = 127.0.0.1 <br />
<br />
JWT_SECRET = jokeorjoker <br />

Commands:
======================
```
npm run devserver //For running development serve
npm run back //For running new backend server

npm run server //For running old backend server (only sockets (deprecated, only for history))
```

#### Now in development. If you want join to develop, please connect me by <https://vk.com/e7c2188cd4d48e4a658bfefb763cc62f> or web.rnskv@gmail.com
