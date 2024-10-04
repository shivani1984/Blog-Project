import { useState, useRef, useEffect } from "react";
import { db } from "./firebaseInit";
import { collection, addDoc, setDoc, doc, onSnapshot } from "firebase/firestore";

export default function Blog() {
    const [formData, setFormData] = useState({ title: "", content: "" });
    const [blogs, setBlogs] = useState([]);

    const titleRef = useRef(null);
    
    
    useEffect(() => {
        titleRef.current.focus();
    }, []);

    // Fetch blogs in real-time from Firestore
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "blogs"), (snapshot) => {
            const blogs = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setBlogs(blogs);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    // Handle form submission and add new blog to Firestore
    async function handleSubmit(e) {
        e.preventDefault();
        titleRef.current.focus();

        // Add new blog to Firestore
        const docRef = doc(collection(db, "blogs"));
        await setDoc(docRef, {
            title: formData.title,
            content: formData.content,
            createdOn: new Date(),
        });

        console.log("Document written with ID: ", docRef.id);
        setFormData({ title: "", content: "" });
    }

    // Remove blog from the UI
    function removeBlog(i) {
        setBlogs(blogs.filter((_, index) => index !== i));
    }

    return (
        <>
            <h1>Write a Blog!</h1>

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

            <h2>Blogs</h2>
            {blogs.map((blog, i) => (
                <div className="blog" key={i}>
                    <h3>{blog.title}</h3>
                    <p>{blog.content}</p>
                    <div className="blog-btn">
                        <button className="btn remove" onClick={() => removeBlog(i)}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
}

// Row component to display form fields
function Row({ label, children }) {
    return (
        <>
            <label>{label}<br /></label>
            {children}
            <hr />
        </>
    );
}
