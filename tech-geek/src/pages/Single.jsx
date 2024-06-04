import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Parser from 'html-react-parser';
import { AuthContext } from "../store/auth.jsx";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

const Single = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/post/${id}`);
        setPost(response.data);
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/post/${id}`);
      if(res){
        navigate("/")
      }else{
        console.log("can't delete")
      }
    } catch (err) {
      console.log(err);
    }
  };

 

  return (
    <div className="flex p-4">
      <div className="w-[90%] mx-auto p-5 bg-white rounded-lg shadow-md">
        {post && (
          <>
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <div className="w-full h-64 overflow-hidden rounded-lg mb-4">
              <img
                className="w-full h-full object-cover"
                src={`http://localhost:5000/api/post/images/${post.image}`}
                alt={post.title}
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {/* <div className="mr-3">
                  <img
                    className="w-10 h-10 rounded-full"
                    alt={post.author.name}
                  />
                </div> */}
                <div>
                  <p className="text-sm font-semibold">{post.author.name}</p>
                  <p className="text-sm text-gray-500">{post.createdAt}</p>
                </div>
              </div>
              <div>
                {user.username === post.author.username &&  (
                  <div className="flex">
                    <div className="mr-4">
                      <Link to={`/write?id=${post._id}`} state={post}><BiEdit className="text-gray-500 cursor-pointer hover:text-gray-700" /></Link>
                    </div>
                    <div>
                      <MdDeleteOutline onClick={handleDelete} className="text-gray-500 cursor-pointer hover:text-gray-700" />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p className="text-lg">{Parser(post.desc)}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Single;
