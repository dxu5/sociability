import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Hum from "../components/hum/Ability";
import Grid from "@material-ui/core/Grid";
import StaticProfile from "../components/profile/StaticProfile";

import HumSkeleton from "../util/HumSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

class user extends Component {
  state = {
    profile: null,
    humIdParam: null,
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const humId = this.props.match.params.humId;
    if (humId) this.setState({ humIdParam: humId });
    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { hums, loading } = this.props.data;
    const { humIdParam } = this.state;
    const humsMarkup = loading ? (
      <HumSkeleton />
    ) : hums === null ? (
      <p> No abilities from this user </p>
    ) : !humIdParam ? (
      hums.map((hum) => <Hum key={hum.humId} hum={hum} />)
    ) : (
      hums.map((hum) => {
        if (hum.humId !== humIdParam) {
          return <Hum key={hum.humId} hum={hum} />;
        } else {
          return <Hum key={hum.humId} hum={hum} openDialog />;
        }
      })
    );
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {humsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(user);
