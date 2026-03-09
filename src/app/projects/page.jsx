import Projects from '@/components/home/Project';
import React from 'react';

export const metadata = {
  title: "Abhijeet Kumar | Projects",
  description: "Projects which I had completed",
};

const Page = () => {
    return (
        <Projects showAll={true} />
    );
}

export default Page;