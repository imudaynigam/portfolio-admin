import React from 'react';
import { Code2, Database, MonitorSmartphone, Cloud, ShieldCheck, Users } from 'lucide-react';

const services = [
  {
    icon: <Code2 className="w-8 h-8 text-blue-600 mb-2" />,
    title: 'Web App Development',
    desc: 'Building fast, scalable, and modern web applications using React, Next.js, and Node.js.'
  },
  {
    icon: <Database className="w-8 h-8 text-purple-600 mb-2" />,
    title: 'Database Design',
    desc: 'Designing and managing robust databases with MongoDB, PostgreSQL, and Supabase.'
  },
  {
    icon: <MonitorSmartphone className="w-8 h-8 text-green-600 mb-2" />,
    title: 'Responsive UI/UX',
    desc: 'Crafting beautiful, accessible, and responsive interfaces for all devices.'
  },
  {
    icon: <Cloud className="w-8 h-8 text-cyan-600 mb-2" />,
    title: 'Cloud & APIs',
    desc: 'Integrating cloud services, REST APIs, and third-party platforms for seamless experiences.'
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-emerald-600 mb-2" />,
    title: 'Security & Auth',
    desc: 'Implementing secure authentication, authorization, and best practices.'
  },
  {
    icon: <Users className="w-8 h-8 text-pink-600 mb-2" />,
    title: 'Consulting & Training',
    desc: 'Providing expert advice, code reviews, and developer training for teams.'
  },
];

export default function ServicesPage() {
  return (
    <main className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((service, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-lg">
            {service.icon}
            <h2 className="font-semibold text-lg mb-2">{service.title}</h2>
            <p className="text-gray-600 text-sm">{service.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
} 