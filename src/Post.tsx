import React from 'react';

type Gender = "male" | "female";
type Type = "cat" | "ad";

export interface IProps {
  _type: Type;
  name: string;
  gender?: Gender;
  age?: number;
  imageUrl?: string;
}

export const Post: React.FC<IProps> = ({ name, gender, age, imageUrl }) => {
  return (
    <div className="border rounded-xl h-60 shadow-md overflow-hidden flex flex-col bg-white hover:bg-indigo-100">
      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */ }
      <img src={ imageUrl } className="w-full h-32" alt={ `cat-image-${ name }` }/>
      <div className="p-6">
        <p className="text-2xl font-bold">{ name }</p>
        <p className="text-gray-400">{ age }살 입니다</p>
      </div>
    </div>
  )
};

// export const
