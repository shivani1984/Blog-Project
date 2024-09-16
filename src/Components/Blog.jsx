//Blogging App using Hooks
import { useState, useRef} from "react";
export default function Blog(){
    
    
    const[formData, setFormData] = useState({title:"", content:"" });
    const [blogs, setBlogs] = useState([]);
    const titleRef =useRef(null);


    function handleSubmit(e){
        e.preventDefault();
        setBlogs([{ title: formData.title, content: formData.content}, ...blogs]);
        setFormData({title:"", content:""})
        titleRef.current.focus();
    }




    function removeBlog(index) {
        setBlogs(blogs.filter((_, i) => i !== index));
    }
    
        
    



    
    
    
    
    
    return(
        <>
        {/* Heading of the page */}
        <h1>Write a Blog!</h1>

        {/* Division created to provide styling of section to the form */}
        <div className="section">

        {/* Form for to write the blog */}
            <form onSubmit={handleSubmit}>

                {/* Row component to create a row for first input field */}
                <Row label="Title">
                        <input className="input"
                                placeholder="Enter the Title of Blog..."
                                value ={formData.title}
                                ref ={titleRef}
                                onChange={(e)=>setFormData({title: e.target.value, content:formData.content})}/>
                </Row >

                {/* Row component to create a row for Text area field */}
                <Row label="Content">
                        <textarea className="input content"
                                placeholder="Content for Blogs...."
                                value ={formData.content}
                                onChange={(e)=>setFormData({title: formData.title, content: e.target.value})}/>
                </Row >

                {/* Button to submit the blog */}            
                <button className = "btn">ADD</button>
            </form>
                     
        </div>

        <hr/>

        {/* Section where submitted blogs will be displayed */}
        <h2> Blogs </h2>
        {blogs.map((blog, i)=>(
            <div className="blog" key={i}>
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
                <div className="blog-btn">
                    <button className="btn remove" onClick={()=>removeBlog(i)}>Delete</button>

                </div>
            </div>
        ))}
        

        
        </>
        )
    }

//Row component to introduce a new row section in the form
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}
