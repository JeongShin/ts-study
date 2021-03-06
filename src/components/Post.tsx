import React from 'react';
type Gender = "male" | "female";

export interface ICatPost {
  name: string;
  gender: Gender;
  age: number;
  imageUrl: string;
}

export interface IAdvertisement {
  content: string;
}

export type Post = CatPost | Advertisement;

export class CatPost extends React.Component<ICatPost> {
  render() {
    const { name, age, imageUrl, gender } = this.props as ICatPost;

    return (
      <div className="border rounded-xl h-60 shadow-md overflow-hidden flex flex-col bg-white hover:bg-indigo-100">
        <img src={ imageUrl } className="w-full h-32" alt={ `cat-image-${ name }` }/>
        <div className="p-6">
          <p className="text-2xl font-bold">{ name }</p>
          <p className="text-gray-400">{ age }살 입니다</p>
        </div>
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

  static addAdvertisement(posts: Post[]): void {
    while (Advertisement.index < posts.length) {
      posts.splice(Advertisement.index, 0, { props: { content: "asd" } } as Post);
      Advertisement.index += Advertisement.generateRandomIndex();
    }
  }

  render() {
    const { content } = this.props as IAdvertisement;
    return (
      <div className="border rounded-xl h-60 shadow-md overflow-hidden flex flex-col bg-white hover:bg-indigo-100">
        { content }
      </div>
    )
  }
}
