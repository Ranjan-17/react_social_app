import React from 'react'
import Feed from './Feed'

const Home = ({posts,fetchError,isLoading}) => {
    return (
        <main className='Home'>
             {isLoading &&  <p className='statusmsg'>Loading posts....</p>}
             {!isLoading && fetchError && <p className='statusmsg' style={{color:"red"}}>{fetchError}</p>}
             {!isLoading && !fetchError &&  (posts.length ? 
              <Feed posts={posts}/> : 
                    <p className='statusmsg'>No Post to Display.</p>)}
                
            

        </main>
    )
}

export default Home
