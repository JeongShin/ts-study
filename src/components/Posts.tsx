import React, { useCallback, useEffect, useState } from "react";
import { Advertisement, CatPost, addAdvertisement, IAdvertisement, ICatPost } from "./Post";
import { fetchSampleData, IRespond } from "../assets/fetchSampleData";
import Loader from "react-loader-spinner";

const Posts = (props: { toggleNav: (visible: boolean) => void }) => {
  const [posts, setPosts] = useState([] as Array <ICatPost | IAdvertisement>);
  const [allowInfinite, setAllowInfinite] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastScroll, setLastScroll] = useState<number>(0);

  const getPosts = useCallback( async (currentPage: number): Promise<IRespond | Error> => {
    return fetchSampleData(currentPage)
      .then((res) => {
        res.data = addAdvertisement(res.data);
        return res;
      })
      .catch(() => {
        throw new Error("데이터 로드에 실패 하였습니다. ");
      });
  }, []);

  const handleScroll = useCallback((): void => {
    const { innerHeight, pageYOffset } = window;
    const { scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;
    const offsetFromTop = pageYOffset || scrollTop;

    setLastScroll(offsetFromTop)
    props.toggleNav(offsetFromTop > lastScroll || offsetFromTop === 0);

    if (Math.floor(scrollTop + innerHeight) >= scrollHeight && !loading && allowInfinite)
      setCurrentPage((prevPage: number) => prevPage + 1);
  }, [props, lastScroll, loading, allowInfinite]);

  const handleDelete = (indexToDelete: number) => {
    const filteredPosts = posts.filter((post, index) => index !== indexToDelete);
    setPosts(filteredPosts);
  }

  useEffect(() => {
    setLoading(true);
    getPosts(currentPage).then((respond  )  => {
      const { data, page, totalPages } = respond as IRespond;
      setLoading(false);
      setPosts(prevPosts => [...prevPosts, ...data]);
      if (page >= totalPages)
        setAllowInfinite(false);
    }).catch(() => {
      setLoading(false);
      alert("문제가 발생 했습니다. 잠시 후 다시 시도해주세요. ");
    })
  }, [currentPage, getPosts])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [handleScroll]);

  return (
    <React.Fragment>
      <div className="post-container">
        { posts.map((post, index) => (
          '_id' in post ?
            <CatPost name={ post.name } gender={ post.gender } age={ post.age } imageUrl={ post.imageUrl } key={ post.index } _id={ post._id } index={ index } deleteEvent={ handleDelete }/>
            :
            <Advertisement header={ post.header } body={ post.body } key={ index } index={ index } deleteEvent={ handleDelete }/>
          )
        )}
      </div>
      <div className="flex justify-center">
        { loading ? <Loader type="TailSpin" color="#000"/> : null }
      </div>
    </React.Fragment>
  )
}

export default Posts;
