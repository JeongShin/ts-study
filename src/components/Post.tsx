import React from 'react';

enum Gender {male = "male", female = "female"}

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

export type Post = ICatPost | IAdvertisement;

export function isCatPost(post: Post): boolean {
  return (post as ICatPost)._id !== undefined;
}

export class CatPost extends React.Component<ICatPost> {
  render() {
    const { name, age, imageUrl, gender, _id, deleteEvent, index } = this.props as ICatPost;

    return (
      <div className="border rounded-xl h-60 shadow-md overflow-hidden flex flex-col bg-white hover:bg-indigo-100 relative">
        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */ }
        <img src={ imageUrl } className="w-full h-32" alt={ `cat-image-${ _id }` }/>
        <div className="p-6">
          <p className="text-2xl font-bold">{ name }</p>
          <p className="text-gray-400">{ age }살 입니다</p>
        </div>
        <span className="absolute bottom-28 right-2 text-white font-bold text-lg">{ gender === Gender.male ? "수컷이다냥" : "암컷이다냥" }</span>
        <div className="absolute bottom-4 right-4 text-sm text-red-500 border border-red-500 rounded-lg p-1 cursor-pointer hover:bg-red-500 hover:text-white"
             onClick={ deleteEvent.bind(this, index) }
        >삭제</div>
      </div>
    );
  }
}

export class Advertisement extends React.Component<IAdvertisement> {
  static index = Advertisement.generateRandomIndex();
  // 다음 광고가 들어갈 인덱스 반환 (현재 offset + (5 ~ 20) 사이 랜덤 값)
  static generateRandomIndex(): number {
    return ~~(Math.random() * 15) + 5;
  }

  // 광고를 추가하는 함수
  static addAdvertisement(posts: Post[]): void {
    while (Advertisement.index < posts.length) {
      posts.splice(Advertisement.index, 0, { header: "사지말고", body: "입양하세요" } as IAdvertisement);
      Advertisement.index += Advertisement.generateRandomIndex();
    }
  }

  render() {
    const { header, body, index, deleteEvent } = this.props as IAdvertisement;
    return (
      <div className="border rounded-xl h-60 shadow-md flex flex-col justify-center items-center bg-yellow-200 hover:bg-indigo-100 text-2xl relative">
        <span>{ header }</span>
        <span>{ body }</span>
        <div className="absolute bottom-4 right-4 text-sm text-red-500 border border-red-500 rounded-lg p-1 cursor-pointer hover:bg-red-500 hover:text-white"
             onClick={ deleteEvent.bind(this, index) }
        >삭제</div>
      </div>
    )
  }
}
