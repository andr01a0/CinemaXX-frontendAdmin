import renderMain from "./pages/main/main.js";
import renderAbout from "./pages/about/about.js";
import renderMovie from "./pages/movie/movie.js";
import renderLogin from "./pages/login/login.js";
import renderMovies from "./pages/movies/movies.js";
import renderAddMovie from "./pages/addMovie/addMovie.js";
import renderEditMovie from "./pages/movie/edit.js";
import { checkToken } from "./index.js";

export default () => {
  //const router = new Navigo("/", { hash: true });
  window.router = new Navigo("/", { hash: true });

  router
    .on({
      "/": () => {
        authenticationMiddleware(() => {
          // call updatePageLinks to let navigo handle the links
          // when new links have been inserted into the dom
          renderMain().then(router.updatePageLinks);
        });
      },
      about: () => {
        authenticationMiddleware(() => {
          renderAbout();
        });
      },
      login: () => {
        authenticationMiddleware(() => {
          renderLogin();
        });
      },
      movies: () => {
        authenticationMiddleware(() => {
          renderMovies().then(router.updatePageLinks);
        });
      },
      "/movie/:id/": ({ data, params }) => {
        authenticationMiddleware(() => {
          renderMovie(data.id);
        });
      },
      "movie/:id/edit": ({ data }) => {
        authenticationMiddleware(() => {
          renderEditMovie(data.id);
        });
      },
      addMovie: () => {
        authenticationMiddleware(() => {
          renderAddMovie();
        });
      },
    })
    .resolve();
};

async function authenticationMiddleware(next) {
  await checkToken();
  next();
}
