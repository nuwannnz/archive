import { routeList } from "../routes";

const getPublicRoutes = () =>
  routeList.filter((route) => route.isPublic === true);

export default getPublicRoutes;
