import React from 'react'
import { Link } from 'react-router'

function makePosts(postdata, posts) {
	return postdata.slice(0, 10).map(({ slug }, index) => {
		const post = {...posts[slug]}
		post.__html = post.__html.replace(/.*\n/, '')
		return (
			<article className="home-post post" key={index}>
				<time className="home-post-date post-date" dateTime={(new Date(post.meta.date)).toISOString().replace(/...\..*/, '').replace('T', ' ')}>{(new Date(post.meta.date)).toDateString().toLowerCase()}</time>
				<h1 className="home-post-title post-title">
					<Link className="home-post-title-link post-title-link" to={`/post/${slug}`}>{post.meta.title}</Link>
				</h1>
				<div dangerouslySetInnerHTML={post}/>
			</article>
		)
	})
}

class Home extends React.Component {
	componentWillMount() {
		const { getPosts } = this.props
		getPosts([0, 10])
	}

	render() {
		const { posts, postdata } = this.props

		if (postdata.length <= Object.keys(posts).length) {
			return (
				<div className="home home-posts">
					{ makePosts(postdata, posts) }
					<div className="home-footer post-footer">
						<Link to="/posts">other posts</Link>
					</div>
				</div>
			)
		}
		return (
			<div>
				loading posts...
				<div className="post-footer">
					<Link to="/posts">other posts</Link>
				</div>
			</div>
		)
	}
}

export default Home