# Weather Demo Application

This is a weather forecast application showing hourly data from the next 2 days.

The master branch is deployed on: [https://weather-demo.vercel.app/](https://weather-demo.vercel.app/)

## Development Instructions

```bash
npm run dev
# or
yarn dev
```

First we need to create a `.env.local` file to store our build time env vars:

```bash
echo "OPENWEATHER_API_KEY=$API_KEY" >> .env.local
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Flow

- User visits website
- Check localStorage if we users location data cached
- If not ask for geolocation permission
- User accepts and the geolocation is fetched
  - The location data is stored in localStorage so we don't have to ask everytime
- The browser now calls an api with the geolocation to fetch weather details
  - Call to api is: `/api/weather/$lat/$lon`
- The api call is wrapped with SWR package, this keeps our state up to date by calling the API again at certain intervals/events

## Design decisions

The project could have been built with a complete client side solution, but I choose to use Next.js as a way to
keep the project flexible and keep our API calls to openweather secure.

In a production environment, ideally we will have to add caching & throttling to the openweather api calls and nextjs gives us this flexibility.

Nextjs hydrates the pages and builds either static or server rendered pages. Since we had to get user's geolocation,
I decided to not render a server side page and instead build it on the client. This is bad for SEO purposes.

An alternative would be to use a service like ipinfo or geolocation-db to fetch details from the IP on the server side. This would allow us to get rid of the browsers geolocation api (which is a bit inconsistent across browsers, and requires permission) and build the entire page on the server.

_I have not handled the unhappy path where the user denies the geolocation permission request. This can be solved using the Browsers `permissions.query` API but that is not completely supported in iOS/Safari_

Currently the background shape color is changing randomly, as an extra feature I would like to have custom logic to change the image/color based on the temp.

Finally I decided to use CSS Modules with SCSS support. Unfortunately since this is my first next.js application, I was unaware of the shortcomings. This lead to two problems:

- Nextjs does not support global scss variables with CSS Modules. There is an experimental feature but it was more work than I initally thought and could not get it to work properly.
- Since nextjs has native modules support and ignores the `postcss-modules` plugin, it does not play well with `purgecss` which is needed to build manageable tailwind production builds. (So I had to get rid of tailwind too)

I tried to stick to the UI given in dribble as accurately as possible but had to improve a little.

The "Tomorrow" part of the time slot looks ugly having 24 different buttons. I would ideally change it to show larger intervals depending on the hours left in the day. For example:

- if 24 slots are available, show only 8 slots at 3 hour intervals
- if 16 slots are available, show only 8 slots at 2 hour intervals
- or maybe use a graph/slider instead of buttons

One more (subjective) UI improvement would be to automatically select the first time slot when a date is changed.

Even in this limited project, I feel there are many scopes of improvement. But I feel the current implementation is a good indication of how I would code in a real world scenario.
