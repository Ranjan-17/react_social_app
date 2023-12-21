import React from 'react'

const NewPost = ({handleSubmit,postTitle,postBody,setPostBody,setPostTitle}) => {
    return (
        <main className='NewPost'>
                <h2>New Post</h2>
                <form className='newpostForm' onSubmit={handleSubmit}>
                    <label htmlFor='postTitle'>Title:</label>
                    <input 
                        type='text'
                        id='postTitle'
                        required
                        value={postTitle}
                        onChange={(e)=>setPostTitle(e.target.value)}
                    /><br/><br/>
                    <label htmlFor='postBody'>Post:</label>
                    <textarea
                        type='text'
                        id='post'
                        required
                        value={postBody}
                        onChange={(e)=>setPostBody(e.target.value)}
                    /><br/><br/>
                    <button type='submit' >Submit</button>

                </form>


        </main>
    )
}

export default NewPost
