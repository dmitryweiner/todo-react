import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

class TodoDeleteDialog extends Component {

    handleDeleteButton() {
        console.log('delete id = ', this.props.match.params.id);
    }

    render() {
        return <form>
            <fieldset>
                <legend>Delete item?</legend>
                <div className="col-sm-10">
                    <Link className="btn btn-info" to="/">Cancel</Link>
                    &nbsp;
                    <Link className="btn btn-success" to="/" onClick={() => this.handleDeleteButton()}>Delete</Link>
                </div>
            </fieldset>
        </form>
    }
}

export default TodoDeleteDialog;