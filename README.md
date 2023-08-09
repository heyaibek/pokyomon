# Pokyomon

> A simple Pokemon catching game in the Bishkek city using the PokeAPI, ReactJS and ExpressJS stack.

## How to run?

1. Prepare
   your [NodeJS](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment)
   environment
2. Clone the repo
3. Go inside the `pokyomon` dir
4. Install all the dependencies via `yarn` or `npm install`
5. Run via `yarn start` or `npm start`

> The project consists of two separate modules - `frontend` and `backend`. You can start both modules in parallel
> using `yarn start` on the root directory (thanks to *lerna*) or separately going into each module's dir.

## How to play?

Explore Bishkek city's map in the game, where Pokémon randomly appear. Your job is to find and catch them using the
Wheel of Fortune.

Click anywhere on the map to uncover nearby Pokémon. They'll also show up on the sidebar.

Once you spot a Pokémon, click "Catch" to try and capture it. A window with info about the Pokémon and the Wheel of
Fortune will pop up.

Spin the wheel for a 10% chance to win. If you do, the Pokémon joins your Pokédex. If not, don't worry—you get another
shot!

Your goal is to catch all 10 Pokémon to unlock them in your Pokédex. Before that, their images and details stay hidden.

Once you catch 'em all, you win! Congrats! 👏🏻👏🏻👏🏻

### Available Pokemons

* bulbasaur
* ivysaur
* venusaur
* charmander
* charmeleon
* charizard
* squirtle
* wartortle
* blastoise
* caterpie

### Admin features

Go to `/admin` route to see all the admin features.

## Developer notes

I've built this project using ReactJS and ExpressJS stack in 2 days. However, I've spent 1.5 more days to implement the
backend using FastAPI in Python [see the repo here](https://github.com/heyaibek/pokyomon-api), which failed in my case,
since I wasn't sure if I'm doing the right things ))) It seemed very interesting but I found out I need more time to
make the FastAPI project better as it is by researching more stuff on the Internet.

That's why I switched over to the more/less known stack ExpressJS for the implementation. Tho, I also didn't use it in
my professional work, aka Java/Spring/Apollo ;) But it was fun!

As you may follow, I used Postgres (hosted at [ElephantSQL](elephantsql.com)) and `pg` library to communicate with it
within the ExpressJS. I didn't use some kind of ORM stuff in this project, since the requirements were not that
complicated to deal with complex relations, data manipulation, etc.

The API routes aren't handled by any auth and rate limiting mechanisms. It's good loot for hackers and ddosers ;) Also
good candidates for the future improvements. However, on the client side I used simple Firebase authentication to
distinguish users and user pokemons in the DB.

All the code is not tested in any way. No tests, no exception handlers, nothing =( These are also a good option to
improve if time allowed. I wanted to write unit tests for each frontend component/page/route and backend API
routes/modules. Also I'd write some e2e tests using `express` to ensure that game workflow works fine.

One more thing I wanted to do is packing all this stuff with Docker (compose) and deploying it somewhere like Heroku.
But didn't have enough time =(

Oh, yeah! I'd also improve the UI. Make it looking more like a retro game.

I'm out of any other thoughts for now and leaving the project for a review in this state. I'll add more details (if
remember) afterwards.
