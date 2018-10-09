import React, {Component} from "react";
import PropTypes from "prop-types";
import PriorityBage from "./PriorityBage";
import {Link} from "react-router-dom";
import {store} from "./Store";

class TodoItem extends Component {

    handleCompleteButton() {
        const item = store.getItem(this.props.item.id);
        item.completeDate = new Date();
        store.setItem(item);
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

    render() {
        const {item} = this.props;

        return <div className="card mb-3">
            <div className="card-body">
                <h4 className="card-title">
                    {item.title}&nbsp;
                    <PriorityBage priority={item.priority}/>
                </h4>
                <p className="card-text">{item.description}</p>
                {item.dueDate &&
                    <p className="card-text"><strong>Due date:</strong>{item.dueDate.toLocaleDateString()}</p>
                }
                {item.completeDate &&
                    <p className="card-text"><strong>Complete date:</strong>{item.completeDate.toLocaleDateString()}</p>
                }
                {this.renderButtons()}
            </div>
        </div>;
    }

}

TodoItem.defaultProps = {
    noButtons: false
};

TodoItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        priority: PropTypes.oneOf(["regular", "important", "asap"]).isRequired,
        dueDate: PropTypes.instanceOf(Date),
        completeDate: PropTypes.instanceOf(Date)
    }).isRequired,
    noButtons: PropTypes.bool
};

export default TodoItem;