import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.service.deleteMany();

  await prisma.service.createMany({
    data: [
      {
        title: 'Web Development',
        description: 'Full-stack web applications built with modern frameworks. From MVPs to enterprise-grade platforms, we deliver clean, scalable, production-ready code.',
        techStack: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
        order: 1,
      },
      {
        title: 'Blockchain & Web3',
        description: 'Smart contracts, DeFi protocols, NFT platforms, and dApps. We build secure, audited on-chain solutions across EVM-compatible chains and Solana.',
        techStack: ['Solidity', 'Hardhat', 'Ethers.js', 'Solana', 'IPFS', 'The Graph'],
        order: 2,
      },
      {
        title: 'UI/UX Design',
        description: 'Minimal, purposeful interfaces that users love. We craft design systems, interactive prototypes, and pixel-perfect implementations from scratch.',
        techStack: ['Figma', 'Framer', 'Tailwind CSS', 'Storybook', 'Lottie'],
        order: 3,
      },
      {
        title: '3D & Motion',
        description: 'Immersive 3D experiences, product visualizations, and real-time WebGL scenes. We bring depth and motion to the web in ways that make people stop scrolling.',
        techStack: ['Three.js', 'React Three Fiber', 'Blender', 'GSAP', 'WebGL', 'Spline'],
        order: 4,
      },
      {
        title: 'API & Backend',
        description: 'Robust REST and GraphQL APIs designed for scale. Clean architecture, proper validation, comprehensive documentation, and rock-solid reliability.',
        techStack: ['Node.js', 'Express', 'GraphQL', 'Redis', 'Docker', 'AWS'],
        order: 5,
      },
      {
        title: 'Technical Consulting',
        description: 'Architecture reviews, tech stack decisions, and code audits. We help teams move faster with fewer mistakes and build systems that last.',
        techStack: ['System Design', 'Code Review', 'Security Audits', 'Performance'],
        order: 6,
      },
    ],
  });

  await prisma.project.deleteMany();

  await prisma.project.createMany({
    data: [
      {
        name: 'Fintrack',
        description: 'A personal finance dashboard with real-time analytics, budget tracking, and AI-powered spending insights.',
        techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'OpenAI'],
        imageUrl: null,
        link: null,
      },
      {
        name: 'Shipfast',
        description: 'SaaS boilerplate platform that lets founders launch their product in days, not months. Auth, billing, and email included.',
        techStack: ['React', 'Node.js', 'Stripe', 'Resend', 'Supabase'],
        imageUrl: null,
        link: null,
      },
      {
        name: 'Logbase',
        description: 'Developer-first logging and monitoring tool. Ingest, search, and alert on logs with a clean minimal UI.',
        techStack: ['Go', 'React', 'ClickHouse', 'Docker'],
        imageUrl: null,
        link: null,
      },
      {
        name: 'Crewboard',
        description: 'Remote team collaboration tool with async standups, project tracking, and team health metrics.',
        techStack: ['Next.js', 'tRPC', 'Prisma', 'Tailwind CSS'],
        imageUrl: null,
        link: null,
      },
    ],
  });

  console.log('✅ Seed complete');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
