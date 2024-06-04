import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import Parser from 'html-react-parser';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AuthContext } from '../store/auth';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const postsPerPage = 6;

  const { filter } = useContext(AuthContext);

  console.log(filter)
  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/post/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getAllPosts();
  }, []);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        let url = "http://localhost:5000/api/post/posts";
        if (filter) {
          url += `/?topic=${filter}`;
        }
        const response = await axios.get(url);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
  
    getAllPosts();
  }, [filter]);
  

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);


  return (
    <div className='flex flex-wrap'>
      <div className="container mx-auto p-4 w-full lg:w-3/4">
        <div className="flex flex-wrap -mx-4">
          {currentPosts.map((posts, index) => (
            <div key={index} className="w-full md:w-1/2 px-4 mb-6">
              <div className="flex bg-white shadow-md rounded-lg h-full">
                <div className="w-1/3">
                  <img src={`http://localhost:5000/api/post/images/${posts.image}`} alt={posts.title} className="object-cover h-full w-full" />
                </div>
                <article className="w-2/3 p-4">
                  <div className="mt-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2">
                      {posts.topic}
                    </span>
                  </div>

                  <h2 className='text-2xl bold'><Link to={`/post/${posts._id}`}>{posts.title}</Link></h2>
                  <div className="flex items-center my-2 text-gray-700">
                    <span>{posts.author.name} | {posts.createdAt}</span>
                  </div>
                  <p className="line-clamp-3">{Parser(posts.desc)}</p>

                </article>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Previous
          </button>
          {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded ${currentPage === i + 1 ? 'bg-gray-300' : ''}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastPost >= posts.length}
            className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      </div>
      <div className="container mx-auto p-4 w-full lg:w-1/4">
        <h1 className="text-2xl font-bold mb-4">Today's Top Story</h1>
        {/* <div className="bg-white shadow-md rounded-lg p-4">
          <span className="text-xs text-gray-500 bg-gray-200 rounded-full px-2">{posts[0].topic[0]}</span>
          <h2 className="text-xl font-bold text-gray-900">{posts[0].title}</h2>
          <div className="text-gray-600 flex items-center">
            <p>{posts[0].author} | {posts[0].date}</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
