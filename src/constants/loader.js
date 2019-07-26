import React from "react";
import RefreshIndicator from "material-ui/RefreshIndicator";
export const loader = (
  <center>
    <RefreshIndicator
      size={40}
      left={10}
      top={0}
      status="loading"
      loadingColor="rgb(240, 143, 76)"
      style={{
        display: "inline-block",
        position: "relative"
      }}
    />
  </center>
);
