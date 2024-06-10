import React, { useEffect, useState } from 'react';
import Blogscard from './Blogscard';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from "js-cookie";

const Viewblogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("Token");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/awt/blogs/Get');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data.data || []); // Ensure data.data is an array
        setLoading(false);
      } catch (error) {
        toast.error('Error fetching blogs: ' + error.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/awt/blogs/Delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }
      toast.success("Blog deleted successfully");
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog.");
    }
  };


  return (
    <div className='w-11/12 place-content-center justify-center items-center grid grid-cols-3 mx-auto'>
      <Toaster />
      {blogs.length > 0 ? (
        blogs.map((blog) => <Blogscard key={blog._id} blog={blog} onDelete={handleDelete}/>)
      ) : (
        <div>No blogs available</div>
      )}
    </div>
  );
};

export default Viewblogs;
