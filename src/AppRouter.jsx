import React from "react";
import {Navigate, Route, Routes} from "react-router";
import {routes} from "./routes";

const AppRouter = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.component}
          path={route.path}
          element={<route.component />}
        />
      ))}
      <Route
        path="*"
        element={<Navigate to="/exchanger" />}
      />
    </Routes>
  );
};

export default AppRouter;
