import React, { useState, useEffect, useCallback } from "react";
import { Post, Advertisement, CatPost } from "./components/Post";
import fetchSampleData from "./fetchSampleData";
import Loader from "react-loader-spinner";
import Navbar from "./components/Navbar";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allowInfinite, setAllowInfinite] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [showNavbar, setShowNavbar] = useState<boolean>(true);
  const [lastScroll, setLastScroll] = useState<number>(0);

  const fetchData = useCallback((currentPage: number) => {
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
  }, [])

  const _handleScroll = useCallback((): void => {
    const { innerHeight, pageYOffset } = window;
    const { scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;
    const st = pageYOffset || scrollTop;

    setShowNavbar(st > lastScroll || st === 0);
    setLastScroll(st)

    if (~~(scrollTop + innerHeight) >= scrollHeight && !loading && allowInfinite)
      setCurrentPage((prevPage: number) => prevPage + 1);
  }, [lastScroll, loading, allowInfinite]);

  // 스크롤이 아래 닿으면 currentPage 가 바뀌고 바뀌면 fetchData
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, fetchData])

  // posts 가 바뀌면 광고 추가
  useEffect(() => {
    Advertisement.addAdvertisement(posts);
  }, [posts])

  useEffect(() => {
    window.addEventListener('scroll', _handleScroll, true);
    return () => window.removeEventListener('scroll', _handleScroll, true);
  }, [_handleScroll]);



  return (
    <div className="bg-gray-50">
      <Navbar visible={ showNavbar }/>
      <div className="grid grid-cols-2 md:grid-c ols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-2 lg:p-10 p-2">
        { posts.map((post, index) => {
          if (post instanceof CatPost) {
            const { name, gender, age, imageUrl } = post.props;
            return <CatPost name={ name } gender={ gender } age={ age } imageUrl={ imageUrl } key={ index }/>
          }
          debugger
          const { content } = post.props;
          return <Advertisement content={ content } key={ index }/>
        }) }
      </div>
      <div className="flex justify-center">
        { loading ? <Loader type="TailSpin" color="#000"/> : null }
      </div>
    </div>
  );
}

export default App;
