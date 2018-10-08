import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import 'react-datepicker/dist/react-datepicker.css';

class TodoForm extends Component {

    getEmptyItem() {
        return {
            title: "",
            description: "",
            priority: "regular",
        }
    }

    constructor(props) {
        super(props);

        if (this.props.match.params.id) {
            //TODO: here should be loading from store
            this.state = {
                id: 1,
                title: "Title 1",
                description: "Description 1",
                priority: "asap",
                dueDate: new Date(),
                completeDate: new Date()
            };
        } else {
            this.state = this.getEmptyItem();
        }

    }

    handleSaveButton(e) {
        console.log("saving", this.state);
    }

    render() {
        return <form>
            <fieldset>
                <legend>{this.props.match.params.id ? "Edit" : "Create"} item</legend>
                <div className="form-group">
                    <label className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            value={this.state.title}
                            onChange={(e) => this.setState({title: e.target.value})}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 col-form-label">Description</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Description"
                            value={this.state.description}
                            onChange={(e) => this.setState({description: e.target.value})}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 col-form-label">Priority</label>
                    <div className="col-sm-10">
                        <select
                            value={this.state.priority}
                            className="form-control"
                            onChange={(e) => this.setState({priority: e.target.value})}>
                            <option value="regular">Regular</option>
                            <option value="important">Important</option>
                            <option value="asap">ASAP</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 col-form-label">Due date</label>
                    <div className="col-sm-10">
                    <DatePicker
                        selected={moment(this.state.dueDate)}
                        onChange={(date) => this.setState({dueDate: date.format()})}
                        className="form-control"
                    />
                    </div>
                </div>
                <div className="col-sm-10">
                    <Link className="btn btn-info" to="/">Cancel</Link>
                    &nbsp;
                    <Link className="btn btn-success" to="/" onClick={() => this.handleSaveButton()}>Submit</Link>
                </div>
            </fieldset>
        </form>
    }
}

TodoForm.propTypes = {
    id: PropTypes.number
};

export default TodoForm;