import React from "react";
import PropTypes from "prop-types";
import FlyingObjectBase from "./FlyingObjectBase";
import FlyingObjectTop from "./FlyingObjectTop";

const FlyingObect = props => {
  return (
    <g>
      <FlyingObjectBase position={props.position} />
      <FlyingObjectTop position={props.position} />
    </g>
  );
};

FlyingObect.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired
};

export default FlyingObect;
