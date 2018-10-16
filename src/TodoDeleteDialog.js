import React, {Component} from "react";
import {Link} from "react-router-dom";
import TodoItem from "./TodoItem";
import {connect} from "react-redux";
import {removeItem} from "./redux/actions";

const mapStateToProps = (state, ownProps) => {
    const item = state.items.find(element => element.id === ownProps.match.params.id);
    return { item: item};
};
const mapDispatchToProps = dispatch => {
    return {
        removeItem: id => dispatch(removeItem(id))
    };
};

class ConnectedTodoDeleteDialog extends Component {

    handleDeleteButton() {
        this.props.removeItem(this.props.match.params.id);
    }

    render() {
        const {item} = this.props;
        return <form>
            <fieldset>
                <legend>Delete item?</legend>
                <div className="col-sm-10">
                    <TodoItem item={item} noButtons={true}/>
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

const TodoDeleteDialog = connect(mapStateToProps, mapDispatchToProps)(ConnectedTodoDeleteDialog);

export default TodoDeleteDialog;