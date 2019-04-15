import React from "react";
import SecretPassword from "../components/SecretPassword";

const DemoPage = ({ chingProp, exampleFunction }) => (
  <div>
    <h1>{chingProp}</h1>
    <SecretPassword exampleFunction={exampleFunction} />
  </div>
);

export default DemoPage;
