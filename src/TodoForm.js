import React, {Component} from "react";
import {Link} from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import {store} from "./Store";

class TodoForm extends Component {

    constructor(props) {
        super(props);

        const item = this.props.match.params.id
            ? store.getItem(this.props.match.params.id)
            : store.getEmptyItem();
        this.state = {
            item: item,
            changed: false
        };

    }

    handleSaveButton(e) {

        this.setState({
            changed: true
        });

        if (!this.isFormValid()) {
            e.preventDefault();
            return false;
        }

        store.setItem(this.state.item);
    }

    handleUncompleteButton(e) {
        const {item} = this.state;
        item.completeDate = null;
        store.setItem(item);

    }

    /**
     * @param {string} inputName
     * @param {*} value
     */
    handleInputChange(inputName, value) {
        const {item} = this.state;
        item[inputName] = value;
        this.setState({
            item: item,
            changed: true
        });
    }

    isFormValid() {
        const {item} = this.state;
        return item.title.length > 0 && item.description.length > 0;
    }

    /**
     * @param {string} inputName
     * @returns {boolean}
     */
    isValid(inputName) {
        const {item} = this.state;

        if (!this.state.changed) {
            return true;
        }

        return item[inputName].length > 0;
    }

    render() {
        const {item} = this.state;

        return <form>
            <fieldset>
                <legend>{this.props.match.params.id ? "Edit" : "Create"} item</legend>
                <div className="form-group">
                    <label className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                        <input
                            required={true}
                            type="text"
                            className={"form-control " + (this.isValid("title") ? "" : "is-invalid")}
                            placeholder="Title"
                            value={item.title}
                            onChange={(e) => this.handleInputChange("title", e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 col-form-label">Description</label>
                    <div className="col-sm-10">
                        <input
                            required={true}
                            type="text"
                            className={"form-control " + (this.isValid("description") ? "" : "is-invalid")}
                            placeholder="Description"
                            value={item.description}
                            onChange={(e) => this.handleInputChange("description", e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 col-form-label">Priority</label>
                    <div className="col-sm-10">
                        <select
                            value={item.priority}
                            className="form-control"
                            onChange={(e) => this.handleInputChange("priority", e.target.value)}>
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
                        value={item.dueDate ? new Date(item.dueDate).toLocaleDateString() : ""}
                        onSelect={(date) =>  this.handleInputChange("dueDate", date ? date.format() : null)}
                        className="form-control"
                    />
                    </div>
                </div>
                <div className="col-sm-10">
                    <Link className="btn btn-info" to="/">Cancel</Link>
                    &nbsp;
                    {item.completeDate ? ([
                        <Link className="btn btn-secondary" to="/" onClick={() => this.handleUncompleteButton()}>Mark uncomplete</Link>,
                        <span key={2}>&nbsp;</span>
                    ]) : null}
                    <Link className="btn btn-success" to="/" onClick={() => this.handleSaveButton()}>Submit</Link>
                </div>
            </fieldset>
        </form>
    }
}

export default TodoForm;