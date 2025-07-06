import Link from 'next/link';
import { CodeIcon, LaptopIcon, ArchiveIcon } from '@radix-ui/react-icons';

const services = [
  {
    icon: <CodeIcon className="w-8 h-8 text-blue-600" />,
    title: 'Website Development',
    desc: 'Full-stack web development using MERN stack for scalable, responsive apps.'
  },
  {
    icon: <LaptopIcon className="w-8 h-8 text-purple-600" />,
    title: 'Application Development',
    desc: 'Modern app development with API integration and user-focused design.'
  },
  {
    icon: <ArchiveIcon className="w-8 h-8 text-green-600" />,
    title: 'CRM Software Maintenance',
    desc: 'Enhancement and maintenance of CRM systems for optimal performance.'
  },
];

export default function ServicesPreview() {
  return (
    <section className="w-full max-w-5xl mx-auto py-12 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">What I Can Do For You</h2>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {services.map((service, i) => (
          <div key={i} className="flex-1 bg-white/80 rounded-xl shadow p-6 flex flex-col items-center">
            {service.icon}
            <h3 className="text-lg font-semibold mt-3 mb-2">{service.title}</h3>
            <p className="text-gray-500 text-sm mb-2">{service.desc}</p>
          </div>
        ))}
      </div>
      <Link href="/services" className="inline-block mt-6 text-purple-600 font-medium hover:underline">See All Services</Link>
    </section>
  );
} 