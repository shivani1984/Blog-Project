import { useState, useRef, useEffect } from "react";
import { db } from "./firebaseInit";
import { collection, setDoc, doc, onSnapshot, deleteDoc } from "firebase/firestore"; 

export default function Blog() {
    const [formData, setFormData] = useState({ title: "", content: "" });
    const [blogs, setBlogs] = useState([]);
    const titleRef = useRef(null);

    // Focus the title input field when the component mounts
    useEffect(() => {
        titleRef.current.focus();
    }, []);

    // Real-time fetching of blog posts
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "blogs"), (snapshot) => {
            const blogsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setBlogs(blogsData);
        });

        // Cleanup listener on component unmount
        return () => unsubscribe();
    }, []);

    // Handle form submission and add a new blog
    async function handleSubmit(e) {
        e.preventDefault();
        titleRef.current.focus();

        // Add the new blog to Firestore
        const docRef = doc(collection(db, "blogs"));
        await setDoc(docRef, {
            title: formData.title,
            content: formData.content,
            createdOn: new Date(),
        });

        console.log("Document written with ID: ", docRef.id);
        setFormData({ title: "", content: "" });
    }

    // Remove a blog from the state (this won't delete from Firestore)
    async function removeBlog(id) {
        //setBlogs(blogs.filter((_, index) => index !== i));
        const docRef = doc(db, "blogs", id);
        await deleteDoc(docRef);
    }

    return (
        <>
            {/* Heading of the page */}
            <h1>Write a Blog!</h1>

            {/* Section containing the blog form */}
            <div className="section">
                <form onSubmit={handleSubmit}>
                    <Row label="Title">
                        <input
                            className="input"
                            placeholder="Enter the Title of Blog..."
                            value={formData.title}
                            ref={titleRef}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </Row>

                    <Row label="Content">
                        <textarea
                            className="input content"
                            placeholder="Content for Blogs...."
                            value={formData.content}
                            required
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        />
                    </Row>

                    <button className="btn">ADD</button>
                </form>
            </div>

            <hr />

            {/* Section displaying the blogs */}
            <h2>Blogs</h2>
            {blogs.map((blog, i) => (
                <div className="blog" key={i}>
                    <h3>{blog.title}</h3>
                    <p>{blog.content}</p>
                    <div className="blog-btn">
                        <button className="btn remove" onClick={() => removeBlog(blog.id)}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
}

// Row component to render labeled form fields
function Row({ label, children }) {
    return (
        <>
            <label>{label}<br /></label>
            {children}
            <hr />
        </>
    );
}
