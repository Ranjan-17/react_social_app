import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { Routes,Route,useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react';
import './index.css'
import { format } from 'date-fns';
import api from './api/posts';
import EditPost from './EditPost';
import useAxiosFetch from './hooks/useAxiosFetch';

function App() {
  const [posts,setPosts]=useState([])
  const[search,setSearch]=useState("")
  const[searchResults,setSearchResults]=useState('')
  const[postTitle,setPostTitle]=useState('')
  const[postBody,setPostBody]=useState('')
  const[editTitle,setEditTitle]=useState('')
  const[editBody,setEditBody]=useState('')
  const navigate=useNavigate()
 const {data,fetchError,isLoading}=useAxiosFetch(" http://localhost:3500/posts")


 useEffect(()=>{
  setPosts(data);
 },[data])  

  useEffect(()=>{
    const filteredresults=posts.filter((post)=>((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase())
    );
    setSearchResults(filteredresults.reverse());
  },[posts,search])

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const id=posts.length ?posts[posts.length-1].id+1:1;
    const dateTime=format(new Date(),'MMMM dd,yyyy pp');
    const newpost={id,title:postTitle,dateTime,body:postBody};
  try{
     const response=await api.post("/posts",newpost);
    const allPosts=[...posts,response.data];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/');
  }catch(err){
    console.log(err.message);
  }
   
  }
  const handleDelete=async(id)=>{
    try{
        await api.delete(`/posts/${id}`);
      const postsList=posts.filter((post)=>(post.id !==id));
      setPosts(postsList);
      navigate('/');
    }catch(err){
      console.log(err.message);
    }
      
  }
  const handleEdit =async(id)=>{
    const dateTime=format(new Date(),'MMMM dd,yyyy pp');
    const updatedPost ={id,title:editTitle,dateTime,body:editBody};
    try{
      const response =await api.put(`/posts/${id}`,updatedPost);
      setPosts(posts.map(post=>post.id===id?{...response.data}:post));
      setPostTitle('');
      setPostBody('');
      navigate('/');
    }catch(err){
      console.log(`Error:${err.message}`);
    }
  }
        
  
  
  return (
    <div className="App">    
            <Header title="RANJAN SOCIAL MEDIA"/>
            <Nav search={search}
            setSearch={setSearch}/>
            <Routes>
                  <Route path='/' element={
                  <Home posts={searchResults}
                  isLoading={isLoading}
                  fetchError={fetchError}
                  />}/>
                  <Route path='post' >
                        <Route index element={<NewPost
                          postTitle={postTitle}
                          handleSubmit={handleSubmit}
                          setPostBody={setPostBody}
                          setPostTitle={setPostTitle}
                          setPosts
                          />}/>
                        <Route path=':id' element={<PostPage posts={posts} handleDelete={handleDelete}/>}/>
                  </Route>
                  <Route path='/edit/:id' element={<EditPost
                    posts={posts}
                    handleEdit={handleEdit}
                    editTitle={editTitle}
                    editBody={editBody}
                    setEditBody={setEditBody}
                    setEditTitle={setEditTitle}
                  />}/>
                <Route path='about' element={<About/>}/>
                  <Route path='*' element={<Missing/>}/>
            </Routes>
            <Footer/>
      
    </div>
  );
}

export default App;
