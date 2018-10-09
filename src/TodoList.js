import React, {Component} from "react";
import TodoItem from "./TodoItem";
import {store} from "./Store";
import DisplayFilter from "./DisplayFilter";
import {Link} from "react-router-dom";

class TodoList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: this.processItems(),
            filter: DisplayFilter.DEFAULT_FILTER
        };
    }

    /**
     * 1. Get items from store
     * 2. Sort
     */
    processItems() {
        const items = store
            .getItems()
            .sort(this.sortItems);
        return items;
    }

    /**
     * Filter them according to selected filter
     * @param {array} items
     * @returns {array}
     */
    filterItems(items) {
        return items.filter((element) => {
            if (this.state.filter !== "all") {
                return element.priority === this.state.filter;
            }
            return true;
        });
    }

    /**
     * @param {object} item1
     * @param {object} item2
     * @returns {number}
     */
    sortItems(item1, item2) {
        const priorityRange = ["regular", "important", "asap"];

        let dueDate1, dueDate2;

        if (item1.priority !== item2.priority) {
            return priorityRange.indexOf(item2.priority) - priorityRange.indexOf(item1.priority);
        }

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
            items: this.processItems()
        });
    }

    handleFilterChange(filter) {
        this.setState({filter: filter});
    }

    renderList() {
        const items = this.filterItems(this.state.items);
        if (items.length) {
            return <div className="card-columns">
                {items.map((element, index) => <div key={index}><TodoItem item={element}/></div>)}
            </div>;
        }

        return <div className="alert alert-light">
            No records found. <Link className="nav-item" to="/create">Create</Link> some items first!
        </div>
    }

    render() {
        return <div>
            <DisplayFilter onChange={this.handleFilterChange.bind(this)}/>
            {this.renderList()}
        </div>;
    }
}

export default TodoList;