import React, {Component} from 'react'
import TodoModel from '../models/Todo'
import Todos from '../components/Todos'
import CreateTodoForm from '../components/CreateTodoForm'

class TodosContainer extends Component {
  constructor(){
    super()
    this.state = {
      todos: []
    }
  }

  componentDidMount(){
    this.fetchData()
  }

  fetchData(){
    TodoModel.all().then( (res) => {
      this.setState ({
        todos: res.data.todos,
        todo: ''
      })
    })
  }

  createTodo(todo) {
      let newTodo = {
          body: todo,
          completed: false
      }
      TodoModel.create(newTodo).then((res) => {
          let todos = this.state.todos
          let newTodos = todos.push(res.data)
          this.setState({newTodos})
      })
  }

  deleteTodo(todo) {
      TodoModel.delete(todo).then((res) => {
          let todos = this.state.todos.filter(function(todo) {
            return todo._id !== res.data._id
          });
          this.setState({todos})
      })
  }

  updateTodo(todoBody) {
    console.log('updateTodo is being hit and this is the todoBody - ', todoBody);
    var todoId = this.state.editingTodoId
    function isUpdatedTodo(todo) {
        return todo._id === todoId;
    }
    TodoModel.update(todoId, todoBody).then((res) => {
        let todos = this.state.todos
        todos.find(isUpdatedTodo).body = todoBody
        console.log('updateTodo in the TodosContainer - ', todos.find(isUpdatedTodo).body);
        this.setState({todos: todos, editingTodoId: null, editing: null})
    })
  }

  editTodo(todo){
    this.setState({
      editingTodoId: todo._id
    })
  }


  render(){
    return (
      <div className='todosComponent'>
      <CreateTodoForm
        createTodo={this.createTodo.bind(this)} />
      <Todos
        todos={this.state.todos}
        editingTodoId={this.state.editingTodoId}
        onEditTodo={this.editTodo.bind(this)}
        onDeleteTodo={this.deleteTodo.bind(this)}
        onUpdateTodo={this.updateTodo.bind(this)}
         />

      </div>
    )
  }
}

export default TodosContainer
