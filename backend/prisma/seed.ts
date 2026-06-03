import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')
  const pw = await bcrypt.hash('Password123', 12)

  const users = await Promise.all([
    prisma.user.upsert({ where:{email:'arjun@skycampus.edu'}, update:{}, create:{ name:'Arjun Sharma', email:'arjun@skycampus.edu', username:'arjunsharma', password:pw, university:'MIT Pune', branch:'Computer Engineering', year:3, skills:['React','Node.js','TypeScript','PostgreSQL'], interests:['AI/ML','Open Source','System Design'], bio:'Full-stack developer passionate about AI systems' } }),
    prisma.user.upsert({ where:{email:'priya@skycampus.edu'}, update:{}, create:{ name:'Priya Patel', email:'priya@skycampus.edu', username:'priyapatel', password:pw, university:'BITS Pilani', branch:'Computer Science', year:2, skills:['Python','Machine Learning','FastAPI','PyTorch'], interests:['Deep Learning','NLP','Research'], bio:'ML researcher and open source contributor' } }),
    prisma.user.upsert({ where:{email:'rohan@skycampus.edu'}, update:{}, create:{ name:'Rohan Verma', email:'rohan@skycampus.edu', username:'rohanverma', password:pw, university:'IIT Bombay', branch:'Electrical Engineering', year:4, skills:['C++','Embedded Systems','IoT','RTOS'], interests:['Robotics','Hardware','Startups'], bio:'Hardware hacker building the future of IoT' } }),
  ])

  const communities = await Promise.all([
    prisma.community.upsert({ where:{slug:'ai-ml-club'}, update:{}, create:{ name:'AI/ML Club', slug:'ai-ml-club', description:'Where machine learning enthusiasts collaborate', creatorId:users[1].id, tags:['ai','ml','python','deeplearning'], memberCount:1 } }),
    prisma.community.upsert({ where:{slug:'open-source-hub'}, update:{}, create:{ name:'Open Source Hub', slug:'open-source-hub', description:'Contribute to open source together', creatorId:users[0].id, tags:['opensource','github','collaboration'], memberCount:1 } }),
    prisma.community.upsert({ where:{slug:'placement-prep'}, update:{}, create:{ name:'Placement Prep', slug:'placement-prep', description:'DSA, system design and interview preparation', creatorId:users[2].id, tags:['dsa','placement','interviews','leetcode'], memberCount:1 } }),
  ])

  await prisma.follow.createMany({ data:[{ followerId:users[0].id, followingId:users[1].id },{ followerId:users[0].id, followingId:users[2].id },{ followerId:users[1].id, followingId:users[0].id }], skipDuplicates:true })

  await prisma.post.createMany({ data:[
    { userId:users[0].id, content:'Just built SkyCampus — an AI-powered university social platform! 🚀 Stack: Next.js + Node.js + FastAPI + Pinecone. Check it out!', tags:['skycampus','ai','nextjs','nodejs'], visibility:'PUBLIC' },
    { userId:users[1].id, content:'Finished training my transformer model on academic papers. Getting 92% accuracy on subject classification! 🤖 #MachineLearning #NLP', tags:['ml','nlp','transformer','python'], visibility:'PUBLIC' },
    { userId:users[2].id, content:'IoT weather station using ESP32 + MQTT + InfluxDB + Grafana. Real-time sensor dashboard running 24/7 💡', tags:['iot','esp32','embedded'], visibility:'PUBLIC' },
  ], skipDuplicates:true })

  console.log('✅ Seed complete:', { users:users.length, communities:communities.length })
}

main().catch(console.error).finally(() => prisma.$disconnect())
