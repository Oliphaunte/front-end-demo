# Structure

* The structure of this project is based around Atomic Design, with some added flare. Information on Atomic Design can be found here http://atomicdesign.bradfrost.com/chapter-2/.

* Individual elements like header and footer tags, are defined inside the 'atoms' folder. Components that take multiple atoms are 'molecules', and groups of molecules are organisms.

* Flexbox is used to position elements, and breakpoints are used to make the app mobile-compatible. The structure was built from a mobile-first approach, so elements do shift upon re-sizing of the browser.

### SETUP -- Front-end
1. Clone Repo
2. Run `touch .env` and copy input from `.env.example` into it
3. Run `yarn install`
4. Run `yarn build` to store our static assets in a single location for dev-server and production
5. Run `yarn start-api`
6. Run `yarn start` and open browser to port 3200