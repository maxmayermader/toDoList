import { useEffect, useState } from 'react';
const api_base = 'http://localhost:4001';

function App() {
	const [todos, setTodos] = useState([]);
	const [popupActive, setPopupActive] = useState(false);
	const [newTodo, setNewTodo] = useState("");

	useEffect(() => {
		GetTodos();
	}, []);

	const GetTodos = () => {
		fetch(api_base + '/todos')
			.then(res => res.json())
			.then(data => setTodos(data))
			.catch((err) => console.error("Error: ", err));
	}

	const completeTodo = async id => {
		const data = await fetch(api_base + '/todo/complete/' + id).then(res => res.json());

		setTodos(todos => todos.map(todo => {
			if (todo._id === data._id) {
				todo.complete = data.complete;
			}

			return todo;
		}));
		
	}

	const addTodo = async () => {
		const data = await fetch(api_base + "/todo/new", {
			method: "POST",
			headers: {
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({
				text: newTodo
			})
		}).then(res => res.json());

		setTodos([...todos, data]);

		setPopupActive(false);
		setNewTodo("");
	}

	const deleteTodo = async id => {
		const data = await fetch(api_base + '/todo/delete/' + id, { method: "DELETE" }).then(res => res.json());

		setTodos(todos => todos.filter(todo => todo._id !== data.result._id));
	}

	return (
		<div className="App">
			<h1>Welcome, User</h1>
			<h4>Your tasks</h4>

			<div className="todos">
				{todos.length > 0 ? todos.map(todo => (
					<div className={
						"todo" + (todo.complete ? " is-complete" : "")
					} key={todo._id} onClick={() => completeTodo(todo._id)}>
						<div className="checkbox"></div>

						<div className="text">{todo.text}</div>

						<div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>
					</div>
				)) : (
					<p>You did everything. Good job!</p>
				)}
			</div>

			<div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

			{popupActive ? (
				<div className="popup">
					<div className="closePopup" onClick={() => setPopupActive(false)}>X</div>
					<div className="content">
						<h3>Add Task</h3>
						<input type="text" className="add-todo-input" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
						<div className="button" onClick={addTodo}>Create Task</div>
					</div>
				</div>
			) : ''}
			<div>
			<footer>
				<div>
					<br></br>
				<h4>
					About authors:
				</h4>
				</div>
				<div>
				<p>
					<strong>Max Mayer-Mader:</strong> Max Mayer-Mader is a computer science student at Iowa State University who has a passion for the outdoors, 
					video games, and coding. He enjoys spending time hiking and camping in the wilderness, where he can disconnect from technology 
					and appreciate the natural beauty around him. At the same time, Max is an avid gamer who loves exploring virtual worlds and trying out new games. His interest in coding is what led him to pursue a degree in computer science, as he enjoys the challenge of creating programs and solving complex problems. Max's diverse interests and skills make him a well-rounded individual who is always looking for new experiences and opportunities to learn.
				</p>
				<br></br>
				<p>
					<strong>Abrahim Toutoungi:</strong> Abrahim Toutoungi is a software engineering student at Iowa State University who has a passion for both gaming and literature. As an avid Minecraft player, he enjoys creating complex structures and exploring the virtual world with friends. When he's not gaming, Abrahim can be found with his nose buried in a book, particularly science fiction and fantasy genres. Alongside his love for entertainment, he is also dedicated to his studies in software engineering, applying his passion for coding and technology to his academic pursuits. With a diverse range of interests, Abrahim is sure to bring a unique perspective to any project he works on.
				</p>
				</div>
			</footer>
			</div>
		</div>
	);
}

export default App;
