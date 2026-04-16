import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed admin
  const email = process.env.ADMIN_EMAIL || 'robinrobert0113@gmail.com';
  const password = process.env.ADMIN_PASSWORD || 'robin0113';
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.admin.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });
  console.log(`✅ Admin seeded: ${email}`);

  // Seed services
  await prisma.service.deleteMany();
  await prisma.service.createMany({
    data: [
      { title: 'Web Development', description: 'Full-stack web apps, SaaS platforms, and MVPs.', techStack: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL'], order: 1 },
      { title: 'Blockchain & Web3', description: 'Smart contracts, DeFi protocols, NFT platforms, and dApps.', techStack: ['Solidity', 'Hardhat', 'Ethers.js', 'Wagmi', 'IPFS'], order: 2 },
      { title: 'UI/UX Design', description: 'Minimal, purposeful interfaces and design systems.', techStack: ['Figma', 'Framer', 'Tailwind CSS', 'Storybook'], order: 3 },
      { title: '3D & Motion', description: 'Immersive WebGL experiences and scroll-driven animations.', techStack: ['Three.js', 'React Three Fiber', 'Blender', 'GSAP'], order: 4 },
    ],
  });

  // Seed projects
  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: [
      { name: 'Polcode', description: 'A full-service software development company.', techStack: ['React', 'Node.js', 'PHP', 'AWS'], projectUrl: 'https://polcode.com' },
      { name: 'Netguru', description: 'A leading digital product studio.', techStack: ['Ruby on Rails', 'React', 'Vue.js'], projectUrl: 'https://netguru.com' },
      { name: 'Awesomic', description: 'On-demand design subscription service.', techStack: ['Figma', 'Webflow', 'React'], projectUrl: 'https://awesomic.com' },
    ],
  });

  console.log('✅ Seed complete');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
