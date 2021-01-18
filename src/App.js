import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoText: "",
      todoList: [{ id: "1", value: "todo", checked: false }],
      editingTodo: null,
    };
  }

  handleDelete = (id) => {
    const newTodoList = this.state.todoList.filter((todo) => todo.id !== id);
    this.setState({ todoList: newTodoList });
  };

  handleCheckedboxToggle = (id) => {
    const newTodoList = this.state.todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, checked: !todo.checked };
      } else {
        return todo;
      }
    });
    this.setState({ todoList: newTodoList });
  };

  handleEdit = (id) => {
    this.setState({ editTodo: id });
  };

  handleTodoChange = (id, value) => {
    const newTodoList = this.state.todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, value: value };
      } else {
        return todo;
      }
    });
    this.setState({ todoList: newTodoList });
  };

  confirmEdit = () => {
    this.setState({ editTodo: null });
  };


  render() {
    return (
      <div>
        <section className="input-area">
          <div className="check-all-icon">&#10003;</div>
          <input
            className="text-input"
            placeholder="What needs to be done?"
            value={this.state.todoText}
            onChange={(e) => {
              const value = e.target.value;
              this.setState({ todoText: value });
            }}
          />
          <button
            className="button"
            id="add-button"
            onClick={() => {
              const newTodo = {
                id: new Date().toISOString(),
                value: this.state.todoText,
                checked: false,
              };
              const newTodoList = [...this.state.todoList, newTodo]
              this.setState({todoList : newTodoList});
            }}
          >
            Add
          </button>
        </section>
        <section className="contianer">
          <ul className="list-container">
            {this.state.todoList.map((todo) => {
              const isEditing = todo.id === this.state.editTodo;
              return (
                <li key={todo.id}>
                  <input
                    type="checkbox"
                    checked={todo.checked}
                    onChange={() => this.handleCheckedboxToggle(todo.id)}
                  />
                  {isEditing ? (
                    <input
                      value={todo.value}
                      onChange={(e) => {
                        const value = e.target.value;
                        this.handleTodoChange(todo.id, value);
                      }}
                    />
                  ) : (
                    <div>{todo.value}</div>
                  )}
                  {isEditing ? (
                    <button onClick={() => this.confirmEdit()}>Confirm</button>
                  ) : (
                    <div>
                      <button onClick={() => this.handleDelete(todo.id)}>
                        delete
                      </button>
                      <button
                        onClick={() => {
                          this.handleEdit(todo.id);
                        }}
                      >
                        edit
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    );
  }
}
