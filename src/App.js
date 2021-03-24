import { useEffect, useState } from "react"
import axios from "axios"
import "./App.css"

const API_ENDPOINT = "https://jsonplaceholder.typicode.com/posts"

function App() {
	const [posts, setPosts] = useState([])

	const populatePosts = async () => {
		const { data: posts } = await axios.get(API_ENDPOINT)
		setPosts(posts)
	}

	useEffect(() => {
		populatePosts()
	}, [])

	const handleAdd = async () => {
		console.log("Add")
		const obj = { title: "Added", body: "body" }
		const { data: post } = await axios.post(API_ENDPOINT, obj)
		const newArrayOfPosts = [post, ...posts]
		setPosts(newArrayOfPosts)
	}

	const handleUpdate = (post) => {
		console.log("Update", post)
	}

	const handleDelete = (post) => {
		console.log("Delete", post)
	}

	return (
		<div className="App">
			<button className="btn btn-primary my-2" onClick={handleAdd}>
				Add
			</button>
			<table className="table">
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
