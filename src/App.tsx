import React, { useState, useEffect, useCallback } from "react";
import { Post, IProps } from "./Post";
import fetchSampleData from "./fetchSampleData";


function App() {
  const [posts, setPosts] = useState<IProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allowInfinite, setAllowInfinite] = useState(true);

  const fetchPostData = (currentPage: number) => {
    setAllowInfinite(false);
    fetchSampleData(currentPage)
      .then(({ data, page, total_pages }) => {
        setPosts(prevData => [...prevData, ...data]);
        setAllowInfinite(true);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const _handleScroll = useCallback((): void => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;

    if (Math.round(scrollTop + innerHeight) >= scrollHeight && allowInfinite) {
      setCurrentPage((prevPage: number) => prevPage + 1);
    }
  }, [allowInfinite]);

  useEffect(() => {
    fetchPostData(currentPage);
  }, [currentPage])

  useEffect(() => {
    window.addEventListener('scroll', _handleScroll, true);
    return () => window.removeEventListener('scroll', _handleScroll, true);
  }, [_handleScroll]);

  return (
    <div className="bg-gray-50">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-2 lg:p-10 p-2">
        {
          posts.map(({ name, _id, age, gender, imageUrl }) =>
            <Post name={ name } age={ age } gender={ gender } imageUrl={ imageUrl } key={ _id } _id={ _id }/>
          )
        }
      </div>
    </div>
  );
}

export default App;
