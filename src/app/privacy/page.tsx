import React from 'react';

export default function PrivacyPage() {
  return (
    <main className="container mx-auto py-12 px-4 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
      <div className="prose prose-blue">
        <p>Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use this website.</p>
        <h2>Information We Collect</h2>
        <ul>
          <li><strong>Contact Information:</strong> If you submit a contact form, we collect your name, email, and message.</li>
          <li><strong>Usage Data:</strong> We may collect anonymous analytics data to improve the site.</li>
        </ul>
        <h2>How We Use Your Information</h2>
        <ul>
          <li>To respond to your inquiries and provide support.</li>
          <li>To improve and personalize your experience on the site.</li>
        </ul>
        <h2>Information Sharing</h2>
        <p>We do not sell or share your personal information with third parties except as required by law.</p>
        <h2>Data Security</h2>
        <p>We take reasonable measures to protect your data, but no method of transmission over the Internet is 100% secure.</p>
        <h2>Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Please review this page periodically for changes.</p>
        <h2>Contact</h2>
        <p>If you have any questions about this Privacy Policy, please use the contact form on this site.</p>
      </div>
    </main>
  );
} 