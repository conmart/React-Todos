import React, {Component} from 'react'
import TodoForm from './TodoForm'

class Todo extends Component {

  render(){
    if (this.props.editingTodoId === this.props.todo._id){
      console.log(`${this.props.todo.body} is being edited`);
      return (
        <TodoForm
          autoFocus={true}
          buttonName="Update Todo!"
          onUpdateTodo={this.props.onUpdateTodo}
           />
      )
    } else{
      return (
        <p data-todos-index={this.props.todo.id}>
          <span onClick={() => this.props.onEditTodo(this.props.todo)}>
            {this.props.todo.body}
          </span>
          <span
            className='deleteButton'
            onClick={ () => this.props.onDeleteTodo(this.props.todo) }>
              (X)
          </span>
        </p>
      )
    }
  }
}

export default Todo
