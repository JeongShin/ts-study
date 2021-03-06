import React, { useState, useEffect, useCallback } from "react";
import { Post, IProps } from "./Post";
import fetchSampleData from "./fetchSampleData";
import Loader from "react-loader-spinner";
import Navbar from "./components/Navbar";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  const [posts, setPosts] = useState<IProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allowInfinite, setAllowInfinite] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [showNavbar, setShowNavbar] = useState<boolean>(true);
  const [lastScroll, setLastScroll] = useState<number>(0);

  const fetchPostData = (currentPage: number) => {
    setLoading(true);
    fetchSampleData(currentPage)
      .then(({ data, page, total_pages }) => {
        setPosts(prevData => [...prevData, ...data]);
        setLoading(false);
        if (page >= total_pages)
          setAllowInfinite(false);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const _handleScroll = useCallback((e): void => {
    const { innerHeight, pageYOffset } = window;
    const { scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;
    const st = pageYOffset || scrollTop;

    setShowNavbar(st > lastScroll || st === 0);
    setLastScroll(st)

    if (~~(scrollTop + innerHeight) >= scrollHeight && !loading && allowInfinite)
      setCurrentPage((prevPage: number) => prevPage + 1);

  }, [lastScroll, loading, allowInfinite]);

  useEffect(() => {
    fetchPostData(currentPage);
  }, [currentPage])

  useEffect(() => {
    window.addEventListener('scroll', _handleScroll, true);
    return () => window.removeEventListener('scroll', _handleScroll, true);
  }, [_handleScroll]);

  return (
    <div className="bg-gray-50">
      <Navbar visible={ showNavbar }/>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-2 lg:p-10 p-2">
        {
          posts.map(({ name, age, gender, imageUrl }, index) =>
            <Post name={ name } age={ age } gender={ gender } imageUrl={ imageUrl } key={ index }/>
          )
        }
      </div>
      <div className="flex justify-center">
        { loading ? <Loader type="TailSpin" color="#000"/> : null }
      </div>
    </div>
  );
}

export default App;
