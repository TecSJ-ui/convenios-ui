import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/Home.tsx"),
    route("dashboard", "routes/Dashboard.tsx", [
        route(":userId", "routes/PersonalInfo.tsx"),
    ]),

] satisfies RouteConfig;
