import React, {Component} from "react";
import PropTypes from "prop-types";
import PriorityBage from "./PriorityBage";
import {Link} from "react-router-dom";
import moment from "moment";
import {updateItem} from "./redux/actions";
import {connect} from "react-redux";

const mapStateToProps = (state, ownProps) => {
    const item = state.items.find(element => element.id === ownProps.item.id);
    return {item: {...item}}; // NOTE: this ... is necessary for rerender
};

const mapDispatchToProps = dispatch => {
    return {
        updateItem: item => dispatch(updateItem(item)),
    };
};

class ConnectedTodoItem extends Component {

    handleCompleteButton() {
        const {item} = this.props;
        item.completeDate = new Date().toISOString();
        this.props.updateItem(item);
    }

    renderButtons() {
        const {item} = this.props;

        if (this.props.noButtons) {
            return null;
        }

        return <div>
            {!item.completeDate ? ([
            <button key="1" className="btn btn-info btn-sm" onClick={() => this.handleCompleteButton()}>Complete</button>,
            <span key="2">&nbsp;</span>
            ]) : null}
            <Link className="btn btn-success btn-sm" to={"/edit/" + item.id}>Edit</Link>
            &nbsp;
            <Link className="btn btn-warning btn-sm" to={"/delete/" + item.id}>Delete</Link>

        </div>;
    }

    renderCardStyle() {
        const {item} = this.props;

        //task complete
        if (item.completeDate) {
            return 'bg-light';
        }

        //task expired
        if (moment().diff(moment(item.dueDate), "days") >= 1) {
            return 'border-danger text-white bg-primary ';
        }

        return 'text-white bg-secondary';
    }

    render() {
        const {item} = this.props;

        return <div className={"card mb-3 " + this.renderCardStyle()}>
            <div className="card-body">
                <h4 className="card-title">
                    {item.title}&nbsp;
                    <PriorityBage priority={item.priority}/>
                </h4>
                <p className="card-text">{item.description}</p>
                {item.dueDate &&
                    <p className="card-text"><strong>Due date:</strong>{new Date(item.dueDate).toLocaleDateString()}</p>
                }
                {item.completeDate &&
                    <p className="card-text"><strong>Complete date:</strong>{new Date(item.completeDate).toLocaleDateString()}</p>
                }
                {this.renderButtons()}
            </div>
        </div>;
    }

}

ConnectedTodoItem.defaultProps = {
    noButtons: false
};

ConnectedTodoItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        priority: PropTypes.oneOf(["regular", "important", "asap"]).isRequired,
        dueDate: PropTypes.string,
        completeDate: PropTypes.string
    }).isRequired,
    noButtons: PropTypes.bool
};

const TodoItem = connect(mapStateToProps, mapDispatchToProps)(ConnectedTodoItem);

export default TodoItem;