import { useEffect, useState } from "react"
import axios from "axios"
import { API_ENDPOINT } from "./config.json"
import "./App.css"

function App() {
	const [posts, setPosts] = useState([])
	const [input, setInput] = useState("")

	const populatePosts = async () => {
		const { data: posts } = await axios.get(API_ENDPOINT)
		setPosts(posts)
	}

	useEffect(() => {
		populatePosts()
	}, [])

	const handleAdd = async () => {
		// console.log("Add")
		const obj = { title: input, body: "body" }
		const { data: post } = await axios.post(API_ENDPOINT, obj)
		const newArrayOfPosts = [post, ...posts] // array cloning
		setPosts(newArrayOfPosts)
		setInput("")
	}

	const handleUpdate = async (post) => {
		// console.log("Update", post)
		post.title = input
		await axios.put(`${API_ENDPOINT}/${post.id}`)
		const newArrayOfPosts = [...posts]
		const index = newArrayOfPosts.indexOf(post)
		newArrayOfPosts[index] = { ...post }
		setPosts(newArrayOfPosts)
		setInput("")
	}

	const handleDelete = async (post) => {
		const originalPosts = [...posts]
		const newArrayOfPosts = posts.filter((p) => p.id !== post.id)
		setPosts(newArrayOfPosts)
		try {
			await axios.delete(`${API_ENDPOINT}/${post.id}`)
			throw new Error("")
		} catch (error) {
			if (error.response && error.response.status === 404) {
				alert("404 Not Found")
			}
			setPosts(originalPosts)
		}
	}

	return (
		<div className="container">
			<h2>API Call Done</h2>
			<hr />
			<div>
				<input
					style={{ margin: 20 }}
					className="form-control"
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
			</div>
			<button
				className="btn btn-primary my-2"
				disabled={!input}
				onClick={handleAdd}
			>
				Add
			</button>
			<table className="table table-bordered table-sm">
				<thead>
					<tr>
						<th>Title</th>
						<th>Update</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{posts.map((post) => (
						<tr key={post.id}>
							<td>{post.title}</td>
							<td>
								<button
									disabled={!input}
									className="btn btn-info btn-sm"
									onClick={() => handleUpdate(post)}
								>
									Update
								</button>
							</td>
							<td>
								<button
									className="btn btn-danger btn-sm"
									onClick={() => handleDelete(post)}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default App
