import React, {Component} from "react";
import {Link} from "react-router-dom";
import {store} from "./Store";
import TodoItem from "./TodoItem";

class TodoDeleteDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: store.getItem(this.props.match.params.id)
        };
    }

    handleDeleteButton() {
        store.deleteItem(this.props.match.params.id);
    }

    render() {
        return <form>
            <fieldset>
                <legend>Delete item?</legend>
                <div className="col-sm-10">
                    <TodoItem item={this.state.item} noButtons={true}/>
                </div>
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