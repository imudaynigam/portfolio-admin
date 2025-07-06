import React from 'react';

export default function TermsPage() {
  return (
    <main className="container mx-auto py-12 px-4 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6 text-center">Terms of Service</h1>
      <div className="prose prose-blue">
        <p>By using this website, you agree to the following terms and conditions. Please read them carefully.</p>
        <h2>Use of Content</h2>
        <p>All content on this site is for informational purposes only. You may not copy, reproduce, or distribute content without permission.</p>
        <h2>User Conduct</h2>
        <ul>
          <li>Do not use this site for unlawful purposes.</li>
          <li>Do not attempt to gain unauthorized access to the site or its data.</li>
        </ul>
        <h2>Disclaimer</h2>
        <p>This site is provided "as is" without warranties of any kind. We are not responsible for any damages resulting from your use of the site.</p>
        <h2>Changes to Terms</h2>
        <p>We may update these Terms of Service at any time. Continued use of the site constitutes acceptance of the new terms.</p>
        <h2>Contact</h2>
        <p>If you have any questions about these Terms, please use the contact form on this site.</p>
      </div>
    </main>
  );
} 