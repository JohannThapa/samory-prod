import { Injectable, signal } from '@angular/core';
import { HelpArticle } from '../models/help-center.mode';

@Injectable({ providedIn: 'root' })
export class HelpCenterService {
  private articles: HelpArticle[] = [
    {
      slug: 'tips-and-best-practices',
      title: 'Tips & Best Practices for Cyber Helpers',
      author: 'Elijah Rohan',
      authorRole: 'Product Marketing, Samory',
      publishedAt: 'July 19, 2025',
      image: '/assets/images/helper-tips.png',
      sections: [
        {
          id: 'communicate',
          title: 'Communicate Clearly and Respectfully',
          content: `Strong communication is the foundation of a successful diagnostic process. Always aim to introduce yourself clearly, explain your process, and set clear expectations with the client. Respond to inquiries promptly—ideally within 24 hours—to maintain momentum and show professionalism.
    
    Your role is to advise and guide, not to dictate. Act as a partner to the client. Many organizations may not have deep cybersecurity knowledge, so be patient and avoid using overly technical jargon. Remain neutral, focused, and objective during all conversations. Ask open-ended questions and encourage active collaboration to explore their challenges in detail. Be respectful and patient—you’re not just solving a problem, you’re building trust.`,
        },
        {
          id: 'privacy',
          title: 'Protect Data and Ensure Privacy',
          content: `As a cyber helper, you’re trusted with sensitive information; it’s your duty to treat that data with the highest level of confidentiality and care.
    
    All communications and data should occur through the Samory Mini-Atlas Cyber platform’s secure channels. Do not store or process client data on your personal devices or computers. Only access and work with information directly on the platform and never download it to personal devices beyond the duration of the engagement. Once your report is submitted, delete any local copies.`,
        },
        {
          id: 'reporting',
          title: 'Diagnostic Reporting Best Practices',
          content: `• Use the Official Report Template\n• Summarize Before Diving Deep\n• Provide Proofs and Screenshots`,
        },
      ],
      faqs: [
        {
          question: 'How do I request a cybersecurity diagnostic?',
          answer:
            'You must first register your organization, create your profile, and then request a diagnostic through your dashboard. Once you’ve submitted your request, it’ll be reviewed by our team before being assigned to a Cyber Helper.',
        },
        {
          question: 'Is the diagnostic really free?',
          answer:
            'Yes, all diagnostics are free! Our mission is to democratize cybersecurity by offering essential services at no cost to clients and providing a platform for cyber helpers to gain experience and contribute to the community.',
        },
        {
          question: 'How long does it take to be assigned a Cyber Helper?',
          answer:
            'Assignments are usually made within 48 hours, but this can vary depending on the complexity of your request and the availability of suitable Cyber Helpers.',
        },
      ],
    },
    {
      slug: 'getting-started',
      title: 'Getting Started with Samory Mini-Atlas',
      author: 'Jane Doe',
      authorRole: 'Community Manager, Samory',
      publishedAt: 'August 1, 2025',
      sections: [
        {
          id: 'setup',
          title: 'Account Setup',
          content: 'This section details the steps to create your account and complete your profile.',
        },
        {
          id: 'dashboard',
          title: 'Navigating the Dashboard',
          content: 'A guide to understanding and using all the features of your dashboard.',
        },
      ],
      faqs: [{ question: 'How do I reset my password?', answer: 'You can reset your password from the login page.' }],
    },
  ];

  getArticleBySlug(slug: string): HelpArticle | undefined {
    return this.articles.find((a) => a.slug === slug);
  }
}
