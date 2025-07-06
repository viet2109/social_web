import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotfound";
import Register from "../pages/Register";
import { routes } from "../routes";
import type { Route } from "../types";

const publicRoutes: Route[] = [
  { path: routes.login, page: Login },
  { path: routes.register, page: Register },
  { path: routes.notFound, page: PageNotFound },
];
const privateRoutes: Route[] = [
  { path: routes.home, page: Home, layout: DefaultLayout },
];
const routers = {
  publicRoutes,
  privateRoutes,
};
export default routers;
