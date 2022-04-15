import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectiveRoutes from "src/routes/ProtectiveRoutes";
import routes, { IRoute } from "src/routes/routes";

const HospitalManagement: React.FC = () => {
  return (
    <Routes>
      {routes.map((route: IRoute) => {
        const Element = route.element;
        return (
          <React.Fragment key={route.key}>
            {route.isProtectiveRoute ? (
              <Route
                path={route.path}
                element={
                  <ProtectiveRoutes authorization={route.authorizers}>
                    <Element />
                  </ProtectiveRoutes>
                }
              />
            ) : (
              <Route path={route.path} element={<Element />} />
            )}
          </React.Fragment>
        );
      })}
    </Routes>
  );
};

export default HospitalManagement;
