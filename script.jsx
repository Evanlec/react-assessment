
const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

class TodoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }
    this.toggleComplete = this.toggleComplete.bind(this)
  }
  getTotalCount() {
    return this.state.todos.length
  }
  getIncompleteCount() {
    return this.state.todos.reduce((count, todo) => {
      return !todo.completed ? count + 1 : count
    }, 0)
  }
  newTodo(todoText) {
    this.setState({
      todos: [...this.state.todos, {text: todoText.trim(), completed: false}]
    })
  }
  toggleComplete(i) {
    let todosCopy = this.state.todos.slice()
    todosCopy[i].completed = !todosCopy[i].completed
    this.setState({
      todos: todosCopy
    })
  }
  renderTodo(i) {
    return (<Todo
      key={this.state.todos[i].text.replace(/(\s+|\W+)/g, '_') + '-' + Date.now()}
      onClick={() => this.toggleComplete(i)}
      text={this.state.todos[i].text}
      completed={this.state.todos[i].completed} />)
  }
  componentDidUpdate() {
    uncheckedCountSpan.innerText = this.getIncompleteCount()
    itemCountSpan.innerText = this.getTotalCount()
  }
  render() {
    return this.state.todos.map((_todo, index) => {
      return this.renderTodo(index)
    })
  }
}

class Todo extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <li className="todo-item"
        style={{textDecoration: this.props.completed ? 'line-through' : 'none'}}
        onClick={this.props.onClick}>{this.props.text}</li>
    );
  }
}

const todoList = ReactDOM.render(<TodoList />, list);

function newTodo() {
  let todoText = prompt('Enter Todo Description')
  todoList.newTodo(todoText)
}