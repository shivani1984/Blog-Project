//Blogging App using Hooks
import { useState } from "react";
export default function Blog(){
    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    function handleSubmit(e){
        e.preventDefault();
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
                                value ={title}
                                onChange={(e)=>setTitle(e.target.value)}/>
                </Row >

                {/* Row component to create a row for Text area field */}
                <Row label="Content">
                        <textarea className="input content"
                                placeholder="Content for Blogs...."
                                value ={content}
                                onChange={(e)=>setContent(e.target.value)}/>
                </Row >

                {/* Button to submit the blog */}            
                <button className = "btn">ADD</button>
            </form>
                     
        </div>

        <hr/>

        {/* Section where submitted blogs will be displayed */}
        <h2> Blogs </h2>
        <h3>Title of Blog --> {title}</h3>
        <p>{content}</p>

        
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
