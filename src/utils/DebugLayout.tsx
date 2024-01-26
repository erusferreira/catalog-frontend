import * as React from "react";
import { Outlet, useLocation, useNavigationType } from "react-router-dom";

const DebugLayout = () => {
  const location = useLocation();
  const navigationType = useNavigationType(); // "POP" | "PUSH" | "REPLACE"

  React.useEffect(() => {
    console.log("Current URL: ", {...location});
    console.log("The last navigation action was", navigationType);
  }, [location, navigationType]);

  return <Outlet />;
};

export default DebugLayout;