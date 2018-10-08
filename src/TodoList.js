import React, {Component} from "react";
import TodoItem from "./TodoItem";

class TodoList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            elements: [
                {
                    id: 1,
                    title: "Title 1",
                    description: "Description 1",
                    priority: "asap",
                    dueDate: new Date(),
                    completeDate: new Date()
                },
                {
                    id: 2,
                    title: "Title 2",
                    description: "Description 2",
                    priority: "important"
                },
                {
                    id: 3,
                    title: "Title 3",
                    description: "Description 3",
                    priority: "regular"
                },
                {
                    id: 4,
                    title: "Title 4",
                    description: "Description 4",
                    priority: "important"
                },
                {
                    id: 5,
                    title: "Title 5",
                    description: "Description 5",
                    priority: "regular"
                }
            ]
        };
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
            <div className="card-columns">
                {this.state.elements.map((element, index) => <div key={index}><TodoItem {...element}/></div>)}
            </div>
        </div>;
    }
}

export default TodoList;