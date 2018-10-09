import React, {Component} from "react";
import TodoItem from "./TodoItem";
import {store} from "./Store";

class TodoList extends Component {

    constructor(props) {
        super(props);

        this.state = {
             items: store.getItems().sort(this.sortItems)
        };
    }

    /**
     * @param {object} item1
     * @param {object} item2
     * @returns {number}
     */
    sortItems(item1, item2) {
        let dueDate1, dueDate2;

        if (item1.completeDate && !item2.completeDate) {
            return 1;
        }

        if (!item1.completeDate && item2.completeDate) {
            return -1;
        }

        if (item1.dueDate && !item2.dueDate) {
            return -1;
        }

        if (!item1.dueDate && item2.dueDate) {
            return 1;
        }

        if (item1.dueDate && item2.dueDate) {
            dueDate1 = new Date(item1.dueDate);
            dueDate2 = new Date(item2.dueDate);
            if (dueDate1 < dueDate2) {
                return -1;
            }
            if (dueDate2 < dueDate1) {
                return 1;
            }
        }


        return 0;
    }

    componentWillMount() {
        store.bind('storeUpdate', this.handleStoreUpdate.bind(this));
    }

    componentWillUnmount() {
        store.unbind('storeUpdate', this.handleStoreUpdate);
    }

    handleStoreUpdate() {
        this.setState({
            items: store.getItems().sort(this.sortItems)
        });
    }

    renderList() {
        const {items} = this.state;
        if (items.length) {
            return <div className="card-columns">
                {items.map((element, index) => <div key={index}><TodoItem item={element}/></div>)}
            </div>;
        }

        return <div className="alert alert-light">No records found. Create some items first!</div>
    }

    render() {
        return <div>
            {/* TODO: move this to separate component*/}
            <div className="card bg-light mb-3">
                <div className="card-header">Task filter</div>
                <div className="card-body">
                    <button type="button" className="btn btn-secondary btn-sm">All</button>
                    &nbsp;
                    <button type="button" className="btn btn-primary btn-sm">Regular</button>
                    &nbsp;
                    <button type="button" className="btn btn-warning btn-sm">Important</button>
                    &nbsp;
                    <button type="button" className="btn btn-danger btn-sm">ASAP</button>
                </div>
            </div>
            {this.renderList()}
        </div>;
    }
}

export default TodoList;