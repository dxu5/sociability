import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Hum from "../components/hum/Ability";
import Profile from "../components/profile/Profile";
import HumSkeleton from "../util/HumSkeleton";

import { connect } from "react-redux";
import { getHums } from "../redux/actions/dataActions";

export class home extends Component {
  componentDidMount() {
    this.props.getHums();
  }
  render() {
    const { hums, loading } = this.props.data;
    let recentHumsMarkup = !loading ? (
      hums.map((hum) => <Hum key={hum.humId} hum={hum} />)
    ) : (
      <HumSkeleton />
    );
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {recentHumsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getHums: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getHums })(home);
