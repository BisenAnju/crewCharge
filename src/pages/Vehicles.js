import React from "react";
import withFirebase from "../hoc/withFirebase";
import SingleVehicle from "../components/SingleVehicle";
import NewVehicle from "../containers/NewVehicle";

class Vehicles extends React.Component {
  constructor() {
    super();
    this.state = { vehicles: [], loading: true };
  }

  componentDidMount() {
    this.props.db.collection("vehicles").onSnapshot(qs => {
      let vehicles = [];
      qs.forEach(doc => vehicles.push(doc.data()));
      this.setState({ vehicles, loading: false });
      console.log(vehicles);
    });
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <p>Loading</p>
        ) : (
          this.state.vehicles.map(vehicle => (
            <div>
              <p>
                <SingleVehicle vehicle={vehicle.name} />
              </p>
            </div>
          ))
        )}
        <NewVehicle />
      </div>
    );
  }
}

export default withFirebase(Vehicles);
