import React from "react";
import PropTypes from "prop-types";
import {FlyingObjectSize} from "../../utils/constants";

const FlyingObjectBase = props => {
  const style = {
    fill: "#979797",
    stroke: "#5c5c5c"
  };

  return (
    <ellipse
      cx={props.position.x}
      cy={props.position.y}
      rx={FlyingObjectSize.baseWith}
      ry={FlyingObjectSize.baseHeight}
      style={style}
    />
  );
};

FlyingObjectBase.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired
};

export default FlyingObjectBase;
