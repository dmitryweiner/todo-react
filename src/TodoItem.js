import React, {Component} from "react";
import PropTypes from "prop-types";
import PriorityBage from "./PriorityBage";
import {Link} from "react-router-dom";

class TodoItem extends Component {
    render() {
        return <div className="card">
            <div className="card-body">
                <h4 className="card-title">
                    {this.props.title}&nbsp;
                    <PriorityBage priority={this.props.priority}/>
                </h4>
                <p className="card-text">{this.props.description}</p>
                {this.props.dueDate &&
                    <p className="card-text"><strong>Due date:</strong>{this.props.dueDate.toLocaleDateString()}</p>
                }
                {this.props.completeDate &&
                <p className="card-text"><strong>Due date:</strong>{this.props.completeDate.toLocaleDateString()}</p>
                }
                <Link className="btn btn-success btn-sm" to={"/edit/" + this.props.id}>Edit</Link>
                &nbsp;
                <Link className="btn btn-warning btn-sm" to={"/delete/" + this.props.id}>Delete</Link>
            </div>
        </div>;
    }

}

TodoItem.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    priority: PropTypes.oneOf(["regular", "important", "asap"]).isRequired,
    dueDate: PropTypes.instanceOf(Date),
    completeDate: PropTypes.instanceOf(Date)
};

export default TodoItem;