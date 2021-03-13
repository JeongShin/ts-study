import React from 'react';
import { GENDER, Gender } from "../constants/constants";

interface IPost {
  deleteEvent: (index: number) => void;
  index: number;
}

export interface ICatPost extends IPost {
  name: string;
  gender: Gender;
  age: number;
  imageUrl: string;
  _id: string;
}

export interface IAdvertisement extends IPost {
  header: string;
  body: string;
}

export const CatPost = (props: ICatPost) => {
  const { imageUrl, name, age, gender, deleteEvent, index } = props;

  return (
    <div className="post">
      <img src={ imageUrl } className="post__image"/>
      <div className="p-6">
        <p className="text-2xl font-bold">{ name }</p>
        <p className="text-gray-400">{ age }살 입니다</p>
      </div>
      <span className="post__title">{ gender === GENDER.MALE ? "수컷이다냥" : "암컷이다냥" }</span>
      <button className="post__delete-btn" onClick={ deleteEvent.bind(this, index) }>삭제</button>
    </div>
  );
}

export const Advertisement = (props: IAdvertisement) => {
  const { header, body, index, deleteEvent } = props;

  return (
    <div className="post bg-yellow-200 justify-center items-center">
      <span>{ header }</span>
      <span>{ body }</span>
      <button className="post__delete-btn" onClick={ deleteEvent.bind(this, index) }>삭제</button>
    </div>
  )
}

const getIndex = (index: number) => index + (Math.floor(Math.random() * 15) + 5);

export const addAdvertisement = (posts: Array <ICatPost | IAdvertisement>): Array <ICatPost | IAdvertisement> => {
  let advertisementIndex = getIndex(0);

  return posts.reduce((acc, post, index) => {
    acc.push(post);
    if (advertisementIndex === index) {
      acc.push({ header: "사지말고", body: "입양하세요" } as IAdvertisement);
      advertisementIndex = getIndex(advertisementIndex);
    }
    return acc;
  }, [] as Array <ICatPost | IAdvertisement>)
}
