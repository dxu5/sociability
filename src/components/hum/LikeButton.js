import React, { Component } from "react";
import MyButton from "../../util/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FavoriteIcon from "@material-ui/icons/Favorite";

import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { connect } from "react-redux";
import { likeHum, unlikeHum } from "../../redux/actions/dataActions";

export class LikeButton extends Component {
  likedHum = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find((like) => like.humId === this.props.humId)
    )
      return true;
    else return false;
  };
  likeHum = () => {
    this.props.likeHum(this.props.humId);
  };
  unlikeHum = () => {
    this.props.unlikeHum(this.props.humId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedHum() ? (
      <MyButton tip="Undo like" onClick={this.unlikeHum}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeHum}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  humId: PropTypes.string.isRequired,
  likeHum: PropTypes.func.isRequired,
  unlikeHum: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const MapActionsToProps = {
  likeHum,
  unlikeHum,
};

export default connect(mapStateToProps, MapActionsToProps)(LikeButton);
