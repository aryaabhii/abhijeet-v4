import Certificates from '@/components/about/Certificates';
import About from '@/components/home/About';
import HireMe from '@/components/home/HireMe';
import Journey from '@/components/home/Journey';
import Skills from '@/components/home/Skills';
import React from 'react';

export const metadata = {
  title: "Abhijeet Kumar | About Me",
  description: "I am a software developer. Passionate about learning and educating other in the field of innovation and technology",
};

const Page = () => {
    return (
        <div>
            <About />
            <Skills />
            <Journey />
            <Certificates />
            <HireMe />
        </div>
    );
}

export default Page;
