# MP2 completion and submission notes

## Run and verify

Run `npm install`, then `npm run dev`. Open the URL Vite prints, using
`/CS361-MP2/` as the application path. Run `npm run build` and `npm run lint`
before submitting.

- List: type a partial name; try mixed case and an empty query. Sort by name
  and number in both directions. Search for a nonexistent name.
- Gallery: choose Fire, Water, and a dual-type Pokemon's type; choose All types.
  Every image card links to that Pokemon's details.
- Details: inspect image, types, measurements and stats. Next from Mew wraps
  to Bulbasaur; Previous from Bulbasaur wraps to Mew. Navigation uses Pokedex
  order across all 151, independent of list search/sort and gallery filters.
- Open and refresh a detail URL directly. Try an invalid Pokemon name.
- Check the layout on a narrow phone screen and navigate with the keyboard.

## Deployment

The Vite base and router basename match the repository name `CS361-MP2`.
The existing GitHub Actions workflow builds and deploys on pushes to main.
It copies `index.html` to `404.html` so GitHub Pages can load client-side
routes on direct visits without inline scripts. The initial document on
such visits has HTTP status 404, but the application renders the route.

In GitHub Settings > Pages, select GitHub Actions as the source. Commit and
push the intended project files, including package-lock.json. Check the
deployment result and verify the live URL before recording the demo.
Expected URL after successful deployment:
https://ArtemGryniv.github.io/CS361-MP2/

## Submission still requires your action

- Record a demo of the deployed site, maximum three minutes, showing its URL
  and all requirements. Share the Drive video with uiuc.web.programming@gmail.com.
- Include the actual LLM chatlogs with the source, as required by the assignment.
  This document is not a replacement for the chatlogs.
- Complete the assignment submission form and LLM survey questions.

## Sources and assistance

- Course schedule and linked week 4–6 slides: https://cs409-fa25.github.io/fa-26/
  React components, props, JSX, state, effects, list rendering, routing,
  TypeScript, Axios, visual design, Grid, and media queries.
- Assignment: https://github.com/cs409-fa25/mp2
- API data and sprites: https://pokeapi.co/docs/v2
- React Router documentation: https://reactrouter.com/start/declarative/routing
- Axios documentation (consulted for the earlier cancellation implementation):
  https://axios-http.com/docs/cancellation
- OpenAI Codex provided explanations and implementation assistance throughout
  this project, including fetching, search/sorting guidance, details, routing,
  navigation, gallery, styles, caching, and deployment configuration.

## Additional implementation concepts

`pokemonApi.ts` keeps requests in memory with a Map. A Promise represents
an unfinished API request; caching it prevents duplicate simultaneous calls.
Promise.all waits for each group of 12 requests. Failed requests are removed
from the cache so retry works. No localStorage or paid API is used.

Layout uses NavLink for the active navigation item and Outlet for the current
page. Gallery's `some()` checks whether any type matches the selected filter.
These are small additions to the lecture examples, rather than verbatim slide code.
