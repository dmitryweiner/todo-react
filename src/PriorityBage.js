import React, {Component} from "react";
import PropTypes from "prop-types";

class PriorityBage extends Component {
    render() {
        if (this.props.priority === "asap") {
            return <span className="badge badge-danger">asap</span>;
        }
        if (this.props.priority === "important") {
            return <span className="badge badge-warning">important</span>;
        }
        return null;
    }
}

PriorityBage.propTypes = {
    priority: PropTypes.oneOf(["regular", "important", "asap"]).isRequired
};

export default PriorityBage;