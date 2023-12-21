import React, { useEffect, } from 'react'
import { useParams,Link } from 'react-router-dom';

const EditPost = ({posts,handleEdit,editBody,setEditBody,editTitle,setEditTitle}) => {
    const {id}=useParams();
    const post=posts.find(post=>(post.id).toString()==id);

    useEffect(()=>{
        if(post){
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    },[post,setEditTitle,setEditBody])
    return (
        <main className='NewPost'>
            {editTitle &&
                    <>   
                        <h2>Edit Post</h2>
                        <form className='newpostForm' onSubmit={(e)=>e.preventDefault()}>
                            <label htmlFor='postTitle'>Title:</label>
                            <input 
                                type='text'
                                id='editTitle'
                                required
                                value={editTitle}
                                onChange={(e)=>setEditTitle(e.target.value)}
                            /><br/><br/>
                            <label htmlFor='postBody'>Post:</label>
                            <textarea
                                type='text'
                                id='post'
                                required
                                value={editBody}
                                onChange={(e)=>setEditBody(e.target.value)}
                            /><br/><br/>
                            <button type='submit' onClick={()=>handleEdit(post.id)} >Submit</button>

                        </form>
                   </>
            }
            {!editTitle &&
                <>
                    <h2>Page Not found</h2>
                    <p>Well,Thats disappointing</p>

                    <p><Link to="/"> Visit our Home page</Link></p>
                
                
                </>
            
            
            }


    </main>
    )

        }
export default EditPost
