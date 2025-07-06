import Link from 'next/link';

export default function AboutPreview() {
  return (
    <section className="w-full max-w-3xl mx-auto py-12 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">My Journey</h2>
      <p className="text-gray-600 mb-4">
        As a dedicated <span className="text-blue-600 font-semibold">full stack developer</span>, I specialize in creating robust web applications using the MERN stack. My journey in web development has been driven by a passion for clean code, exceptional user experiences, and solving complex technical challenges.
      </p>
      <Link href="/about" className="inline-block mt-2 text-purple-600 font-medium hover:underline">Read More</Link>
    </section>
  );
} 