import React from 'react';
import { Database, Zap, MessageSquare, Shield, ChartColumn, PanelsTopLeft, Target, Layers, MousePointer2, Globe, GraduationCap, Lock, HeartHandshake } from 'lucide-react';

export const PILLARS = [
  {
    pain: 'WhatsApp Lead Loss',
    solution: '24/7 Lead-Catcher',
    impact: 'Automated WhatsApp/Email responses that answer customers at 2:00 AM while you sleep.',
    icon: <MessageSquare className="w-8 h-8" />
  },
  {
    pain: 'Paperwork Pile-up',
    solution: 'Intelligent Invoicing',
    impact: 'Smart AI that reads, files, and reconciles your paperwork with surgical precision.',
    icon: <ChartColumn className="w-8 h-8" />
  },
  {
    pain: 'Team Friction',
    solution: 'Staff Training',
    impact: 'Comprehensive onboarding. We teach your team how to use AI so no one is left behind.',
    icon: <GraduationCap className="w-8 h-8" />
  },
  {
    pain: 'Logic Gaps',
    solution: 'Monthly Performance',
    impact: 'We tweak and optimize your AI every month so it grows with your business volume.',
    icon: <Target className="w-8 h-8" />
  }
];

export const IDENTIFY_TESTS = [
  {
    title: 'Admin Fatigue',
    description: 'Are you still spending your Sundays doing manual quotes instead of being with your family?',
    target: 'Family Time Recovery',
    icon: <Database className="w-8 h-8 text-[#1f75fe]" />
  },
  {
    title: 'The WhatsApp Gap',
    description: 'How many leads are you losing because you can’t reply to inquiries fast enough during peak hours?',
    target: 'Sales Capture',
    icon: <Zap className="w-8 h-8 text-[#1f75fe]" />
  },
  {
    title: 'The "Oops" Cost',
    description: 'Where do human errors—like typos on quotes or missed digits—cost you money or your reputation?',
    target: 'Risk Mitigation',
    icon: <Shield className="w-8 h-8 text-[#1f75fe]" />
  }
];

export const TRUST_SIGNALS = [
  {
    title: 'POPIA Security',
    description: 'Your data never leaves safe, encrypted environments. We treat your privacy as our top priority.',
    icon: <Lock className="w-10 h-10 text-[#1f75fe]" />
  },
  {
    title: 'Human-in-the-Loop',
    description: 'You are always in control. Every system has a "Human Override" for total peace of mind.',
    icon: <HeartHandshake className="w-10 h-10 text-[#1f75fe]" />
  },
  {
    title: 'Fixed Local Pricing',
    description: 'No "surprise" bills. We work on a transparent, flat-fee basis suited for the SA economy.',
    icon: <Globe className="w-10 h-10 text-[#1f75fe]" />
  }
];

export const CASE_STUDIES = [
  {
    id: '1',
    title: 'Nexus Automation',
    category: 'Enterprise',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    description: 'A custom logic engine that automated 90% of back-office operations.'
  },
  {
    id: '2',
    title: 'Lumina SaaS',
    category: 'Product Design',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    description: 'High-conversion landing pages for a global software provider.'
  },
  {
    id: '3',
    title: 'Vertex Retail',
    category: 'E-commerce',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800',
    description: 'Reducing cart abandonment by 35% through behavioral triggers.'
  }
];

export const PRICING_PLANS = [
  {
    name: 'Business Flow',
    price: '7,500',
    description: 'Perfect for small teams',
    features: ['WhatsApp Lead-Catcher', 'Basic Document OCR', 'POPIA Compliance Setup', 'Email Support'],
    recommended: false
  },
  {
    name: 'Growth Engine',
    price: '14,500',
    description: 'Most popular for scale',
    features: ['Full Admin Automation', 'Intelligent Invoicing', 'Team AI Training', 'Priority Local Support', 'Monthly Reviews'],
    recommended: true
  },
  {
    name: 'Enterprise Custom',
    price: '25,000+',
    description: 'For market leaders',
    features: ['Custom Micro-App Logic', 'Full CRM Integration', 'Dedicated Architect', 'White-Glove Onboarding', 'Quarterly Strategy Audits'],
    recommended: false
  }
];

export const PARTNERS = [
  'TechVibe', 'NexusLabs', 'Quantum', 'Elevate', 'Stellar', 'FlowState', 'Velocity', 'Apex', 'Zenith', 'Horizon', 'Prisma', 'Vertex'
];