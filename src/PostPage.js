import React from 'react'
import { Link, useParams } from 'react-router-dom'

const PostPage = ({posts,handleDelete,handleEdit}) => {
    const {id}=useParams();
    const post=posts.find(post=>(post.id).toString()==id);
    return (
       <main className='postpage'>
            <article className='post'>
                    {post &&
                        <>
                            <h1 >{post.title}</h1> 
                            <p className='postdate'>{post.dateTime}</p> 
                            <p className='postbody'>{post.body}</p>   
                            <Link to={`/edit/${post.id}`}><button className='editButton'>Edit Post</button></Link>
                            <button className='deleteButton' onClick={()=>handleDelete(post.id)}>Delete Post</button>                  
                        </>
                    }
                    {!post &&

                        <>
                            <h2>Post Not found</h2>

                            <p>
                                <Link to ='/'>Visit our home page</Link>
                            </p>
                        </>

                    }
            </article>


       </main>
    )
}

export default PostPage
