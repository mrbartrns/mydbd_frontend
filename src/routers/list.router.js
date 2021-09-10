import React from "react";
import { useParams } from "react-router-dom";
import { useHistory, Route, Switch } from "react-router";
import Error from "../components/error.component";

import List from "../components/list.component";

function ListRouter(props) {
  const params = useParams();
  return (
    <div>
      <Switch>
        <Route
          // path={`${props.match.path}/:category(killers|survivors|perks|items|addons)`}
          path={`${props.match.path}/:category`}
          component={List}
        />
        {/* <Route path="/" component={Error} /> */}
      </Switch>
    </div>
  );
}

export default ListRouter;
