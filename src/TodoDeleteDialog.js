import React, {Component} from "react";
import PropTypes from "prop-types";

class TodoDeleteDialog extends Component {

    render() {
        return <div>
            <h4>Delete?</h4>
        </div>
    }
}

TodoDeleteDialog.propTypes = {
    id: PropTypes.number.isRequired
};

export default TodoDeleteDialog;