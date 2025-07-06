import React from 'react';

export default function AboutPage() {
  return (
    <main className="container mx-auto py-12 px-4 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6 text-center">About Me</h1>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <img src="https://ipfcwnngxwyeqferqmpg.supabase.co/storage/v1/object/public/profile-picture//UdayNigam.jpeg" alt="Uday Nigam portrait" className="w-40 h-40 rounded-full object-cover shadow-lg mb-4 md:mb-0" />
        <div>
          <p className="text-lg text-gray-700 mb-4">
            Hi! I'm <span className="font-semibold text-blue-700">Uday Nigam</span>, a passionate Full Stack Developer specializing in the MERN stack. I love building scalable web applications, modern user interfaces, and robust backend systems. My mission is to transform ideas into powerful digital solutions that help businesses grow and succeed.
          </p>
          <p className="text-gray-600 mb-4">
            With 2+ years of experience, I have delivered projects ranging from business websites to custom CRM platforms. I thrive on solving complex problems and staying up-to-date with the latest technologies.
          </p>
          <div>
            <h2 className="font-semibold text-lg mb-2">Skills:</h2>
            <ul className="flex flex-wrap gap-3 text-sm text-gray-800">
              <li className="bg-blue-100 px-3 py-1 rounded-full">React.js</li>
              <li className="bg-blue-100 px-3 py-1 rounded-full">Next.js</li>
              <li className="bg-blue-100 px-3 py-1 rounded-full">Node.js</li>
              <li className="bg-blue-100 px-3 py-1 rounded-full">Express.js</li>
              <li className="bg-blue-100 px-3 py-1 rounded-full">MongoDB</li>
              <li className="bg-blue-100 px-3 py-1 rounded-full">TypeScript</li>
              <li className="bg-blue-100 px-3 py-1 rounded-full">Tailwind CSS</li>
              <li className="bg-blue-100 px-3 py-1 rounded-full">Supabase</li>
              <li className="bg-blue-100 px-3 py-1 rounded-full">UI/UX</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
} 