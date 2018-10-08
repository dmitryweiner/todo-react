import React, {Component} from "react";
import "./App.css";
import NavBar from "./NavBar";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import TodoDeleteDialog from "./TodoDeleteDialog";
import {Route} from "react-router-dom";

class App extends Component {
    render() {
        return (
            <div className="App">
                <NavBar/>
                <div className="wrapper">
                    <Route exact path="/" component={TodoList}/>
                    <Route exact path="/create" component={TodoForm}/>
                    <Route exact path="/edit/:id" component={TodoForm}/>
                    <Route exact path="/delete/:id" component={TodoDeleteDialog}/>
                </div>
            </div>
        );
    }
}

export default App;
