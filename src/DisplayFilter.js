import React, {Component} from "react";
import PropTypes from "prop-types";

class DisplayFilter extends Component {
    
    static get DEFAULT_FILTER() {
        return "all";
    }

    constructor(props) {
        super(props);

        this.state = {
            selected: DisplayFilter.DEFAULT_FILTER
        }
    }

    handleClick(selected) {
        this.setState({selected: selected});
        this.props.onChange(selected);
    }

    render() {
        return <div className="card bg-light mb-3">
            <div className="card-header">Task filter</div>
            <div className="card-body">
                <button
                    type="button"
                    className={"btn btn-primary btn-sm " + (this.state.selected === "all" ? "active" : "disabled")}
                    onClick={() => this.handleClick("all")}>
                    All
                </button>
                &nbsp;
                <button
                    type="button"
                    className={"btn btn-info btn-sm " + (this.state.selected === "regular" ? "active" : "disabled")}
                    onClick={() => this.handleClick("regular")}>
                    Regular
                </button>
                &nbsp;
                <button
                    type="button"
                    className={"btn btn-warning btn-sm " + (this.state.selected === "important" ? "active" : "disabled")}
                    onClick={() => this.handleClick("important")}>
                    Important
                </button>
                &nbsp;
                <button
                    type="button"
                    className={"btn btn-danger btn-sm " + (this.state.selected === "asap" ? "active" : "disabled")}
                    onClick={() => this.handleClick("asap")}>
                    ASAP
                </button>
            </div>
        </div>
    }
}

DisplayFilter.defaultProps = {
    onChange: () => {}
};

DisplayFilter.propTypes = {
    onChange: PropTypes.func
};

export default DisplayFilter;