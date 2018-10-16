import React, {Component} from "react";
import {Link} from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import {connect} from "react-redux";
import {addItem, updateItem} from "./redux/actions";

const mapStateToProps = (state, ownProps) => {
    const item = state.items.find(element => element.id === ownProps.match.params.id);
    return {item: {...item}}; // NOTE: this ... is necessary for rerender
};

const mapDispatchToProps = dispatch => {
    return {
        addItem: item => dispatch(addItem(item)),
        updateItem: item => dispatch(updateItem(item))
    };
};

class ConnectedTodoForm extends Component {

    constructor(props) {
        super(props);

        const item = this.props.match.params.id
            ? this.props.item
            : this.getEmptyItem();
        this.state = {
            item: item,
            changed: false
        };

    }

    getEmptyItem() {
        return {
            title: "",
            description: "",
            priority: "regular",
        }
    }

    handleSaveButton(e) {

        this.setState({
            changed: true
        });

        if (!this.isFormValid()) {
            e.preventDefault();
            return false;
        }

        if (this.props.match.params.id) {
            this.props.updateItem(this.state.item);
        } else {
            this.props.addItem(this.state.item);
        }
    }

    handleUncompleteButton(e) {
        const {item} = this.state;
        item.completeDate = null;
        this.props.updateItem(item);
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

        return typeof item[inputName] !== 'undefined'
            ? item[inputName].length > 0
            : true;
    }

    renderInput(inputName) {
        const {item} = this.state;
        if (typeof item[inputName] === 'undefined') {
            item[inputName] = '';
        }
        return <input
            type="text"
            className={"form-control " + (this.isValid(inputName) ? "" : "is-invalid")}
            placeholder={inputName.charAt(0).toUpperCase() + inputName.slice(1)}
            value={item[inputName]}
            onChange={(e) => this.handleInputChange(inputName, e.target.value)}/>;
    }

    render() {
        const {item} = this.state;

        return <form>
            <fieldset>
                <legend>{this.props.match.params.id ? "Edit" : "Create"} item</legend>
                <div className="form-group">
                    <label className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                        {this.renderInput('title')}
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 col-form-label">Description</label>
                    <div className="col-sm-10">
                        {this.renderInput('description')}
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
                        <Link key={1} className="btn btn-secondary" to="/" onClick={(e) => this.handleUncompleteButton(e)}>Mark uncomplete</Link>,
                        <span key={2}>&nbsp;</span>
                    ]) : null}
                    <Link className="btn btn-success" to="/" onClick={(e) => this.handleSaveButton(e)}>Submit</Link>
                </div>
            </fieldset>
        </form>
    }
}

const TodoForm = connect(mapStateToProps, mapDispatchToProps)(ConnectedTodoForm);

export default TodoForm;