import { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { AuthContext } from "../store/auth.jsx";
import Select from 'react-select';
import { useNavigate , useLocation } from 'react-router-dom';

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [topic, setTopic] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const location = useLocation();
  const postId = new URLSearchParams(location.search).get("id");
  const navigate = useNavigate();


  if(!token){
    navigate("/")
  }

  console.log(postId)
  const options = [
    { value: 'smartphone', label: 'Smartphone' },
    { value: 'computer', label: 'Computer' },
    { value: 'hardware', label: 'Hardware' },
    { value: 'ai', label: 'AI' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'others', label: 'Others' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('desc', desc);
    formData.append('file', image);
    formData.append('topic', JSON.stringify(topic.map(t => t.value)));

    try {
      const uploadResponse = await axios.post(
        "http://localhost:5000/api/post/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const imageName = uploadResponse.data.file;

      await axios.post(
        "http://localhost:5000/api/post/",
        {
          title,
          desc,
          image: imageName,
          topic: topic.map(t => t.value),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      console.error("Error creating post:", error.response ? error.response.data : error.message);
    }
  };
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/post/${postId}`);
        const postData = response.data;
        setTitle(postData.title);
        setDesc(postData.desc);
        setTopic(postData.topic.map(topic => ({ value: topic, label: topic })));
        // Assuming you also want to load the image
        // You may need to modify this based on how your image data is returned
        setImage(postData.image);
      } catch (error) {
        console.error("Error fetching post data:", error.response ? error.response.data : error.message);
      }
    };

    if (postId) {
      fetchPostData();
    } else {
      // Clear fields when postId is not available
      setTitle("");
      setDesc("");
      setTopic([]);
      setImage(null);
    }
  }, [postId]);



  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleTopic = (e) => {
    setTopic(e);
  };

  return (
    <div className="container mx-auto px-6 md:px-10 p-4">
      <h1 className="text-2xl text-center my-6">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div>
            <label className="block text-lg font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the post title"
              required
            />
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-4">
            <div className="mb-4 md:mb-0">
              <label className="block text-lg font-medium mb-2">Upload Image</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-2">Select Topics</label>
              <Select
                options={options}
                value={topic}
                onChange={handleTopic}
                isMulti={true}
              />
            </div>
          </div>
          <div className="h-auto">
            <label className="block text-lg font-medium mb-2">Description</label>
            <ReactQuill
              value={desc}
              theme="snow"
              onChange={setDesc}
              placeholder="Write the post description"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 hover:bg-gray-800 text-white p-3 rounded-md font-bold"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path d="M12 2a10 10 0 0110 10h-4a6 6 0 10-6-6V2z" fill="currentColor" />
                </svg>
                Posting...
              </span>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write;
