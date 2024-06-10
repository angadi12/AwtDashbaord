import React from 'react';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';

const Blogscard = ({ blog ,onDelete }) => {


    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
      };

      const { title, description, imageUrl } = blog;
      const shortTitle = truncateText(title, 50); // Adjust the max length as needed
      const shortDescription = truncateText(description, 100);

  return (
    <div className="w-72 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4">
        <Image
          className="rounded-t-lg w-full object-fill h-60"
          src={blog.imageUrl} // Use blog.imageUrl for the image source
          alt="Thumbnail"
          width={200}
          height={200}
        />
      <div className="p-5">
      
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {shortTitle}
          </h5>
      
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {shortDescription}
        </p>
        <div className="flex justify-start gap-2 items-center">
          <Button className="ring-1 ring-[#FF7143] text-[#FF7143] bg-white font-bold">Update</Button>
          <Button  onClick={() => onDelete(blog._id)} className="bg-[#FF7143] text-white font-bold">Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default Blogscard;
