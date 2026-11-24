import ifindScreenshot from './assets/ifind.jpg'
import sboAttendanceScreenshot from './assets/sboattendance.jpg'
import wattwiseScreenshot from './assets/wattwise.jpg'
import wattwiseMobileScreenshot from './assets/wattwise2.jpg'
import wattwisePlaceholderScreenshot from './assets/wattwise3.jpg'
import wattwisePlaceholderScreenshot2 from './assets/wattwise4.jpg'
import marketSquareScreenshot from './assets/marketsquare.png'
import marketSquarePlaceholderScreenshot from './assets/marketsquare1.png'
import marketSquarePlaceholderScreenshot2 from './assets/marketsquare3.png'
import marketSquarePlaceholderScreenshot3 from './assets/marketsquare4.png'
import houseofthedragonScreenshot from './assets/hotd.png'
import houseofthedragonPlaceholderScreenshot from './assets/hotd1.png'
import houseofthedragonPlaceholderScreenshot3 from './assets/hotd3.png'
import houseofthedragonPlaceholderScreenshot4 from './assets/hotd4.png'
import networkingScreenshot from './assets/networking.png'
import wadhwaniScreenshot from './assets/wadhwani.png'
import wadhwaniScreenshot2 from './assets/wadhwani2.png'
import wadhwaniScreenshot3 from './assets/wadhwani3.png'
import eduProfileScreenshot from './assets/eduprofile1.png'
import eduProfileScreenshot2 from './assets/eduprofile2.png'
import eduProfileScreenshot3 from './assets/eduprofile3.png'
import eduProfileScreenshot4 from './assets/eduprofile4.png'
import eduProfileScreenshot5 from './assets/eduprofile5.png'
import resumeFile from './assets/Yroy-Resume.pdf'


export const portfolio = {
  name: 'Joanna Nicole P. Yroy',
  headline: 'IT Student & Developer',
  intro:
    'Hi, I’m Joanna! I’m an IT student who enjoys building web applications and working with my team to solve everyday problems.',
  location: 'Bukidnon State University',
  contact: {
    email: '',
    github: 'https://github.com/Nicoleyroy?tab=overview&from=2026-10-01&to=2026-10-31',
    resume: resumeFile,
  },
  skills: [
    'Web Development',
    'Software Development',
    'UI/UX Design',
    'HTML & CSS',
    'React',
    'ESP32',

  ],
}

export const certificates = [
  {
    title: 'CCNA: Switching, Routing, and Wireless Essentials',
    issuer: 'Cisco Networking Academy – Bukidnon State University',
    year: '2025',
    image: networkingScreenshot,
    file: '',
  },
  {
    title: 'Certificate of Proficiency – Ignite Philippines',
    issuer: 'Wadhwani Global Entrepreneur ',
    year: '2025',
    image: wadhwaniScreenshot,
    file: '',
  },
   {
    title: 'Certificate of Program Completion – Ignite Philippines',
    issuer: 'Wadhwani Global Entrepreneur ',
    year: '2025',
    image: wadhwaniScreenshot2,
    file: '',
  },
   {
    title: 'Certificate of Content Completion – Ignite Philippines',
    issuer: 'Wadhwani Global Entrepreneur ',
    year: '2025',
    image: wadhwaniScreenshot3,
    file: '',
  },

]

export const projects = [
  {
    id: 'wattwise',
    name: 'WattWise',
    title: 'WattWise: A Smart Energy Monitoring and Remote Control Device for Multiple Appliances',
    category: 'Major Capstone Project',
    description:
      'An IoT-based project designed to help households monitor electricity consumption and remotely control appliances. It provides real-time energy monitoring, appliance management, and voltage anomaly detection to promote safer and more efficient electricity usage.',
    features: [
      'Real-time energy monitoring',
      'Remote appliance ON/OFF control',
      'Voltage anomaly detection',
      'Automatic appliance shutdown',
      'Scheduling',
      'Configurable consumption limits',
    ],
    technologies: ['ESP32-S3', 'PZEM-004T', 'Firebase Realtime Database', 'MongoDB', 'Arduino', 'Vue', 'Tailwind CSS', 'Laravel'],
    role: 'Team Member',
    contribution: 'Developed and contributed to the IoT system as part of a team project.',
    screenshot: wattwiseScreenshot,
    screenshots: [
      wattwiseScreenshot,
      wattwiseMobileScreenshot,
      wattwisePlaceholderScreenshot,
      wattwisePlaceholderScreenshot2,
    ],
    screenshotAlt: 'WattWise energy monitoring dashboard',
    github: '',
    demo: '',
  },
  {
    id: 'ifind',
    name: 'iFind',
    title: 'iFind – Lost and Found Management System',
    category: 'Web Development Project',
    description:
      'A web-based application designed to help users report, manage, and locate lost and found items. It provides an organized platform for users and administrators to manage item reports and improve the process of recovering lost belongings.',
    features: [
      'User registration and authentication',
      'Lost and found item reporting',
      'Item management',
      'Admin and moderator management',
      'Role-based access control',
    ],
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Express.js', 'MongoDB'],
    role: 'Project Manager & Programmer 2',
    contribution: 'Served as Project Manager and Programmer 2, helping coordinate the team while contributing to system implementation.',
    screenshot: ifindScreenshot,
    screenshots: [ifindScreenshot, '/project-ifind.svg'],
    screenshotAlt: 'iFind lost-and-found management interface',
    github: '',
    demo: '',
  },
  {
    id: 'sas',
    name: 'EduProfile',
    title: 'Student Attendance System',
    category: 'Android Application',
    description:
      'EduProfile is a multi-tenant school management platform that allows different educational institutions to manage their student records within one SaaS application while keeping each institutions information separate.',
    features: ['Student registration', 'QR-based attendance', 'AM/PM time tracking'],
    technologies: ['Laravel', 'PHP', 'Multi-Tenant SaaS Architecture', 'RBAC'],
    role: 'Team Member',
    contribution: 'Contributed to the team Android application.',
    screenshot: eduProfileScreenshot,
    screenshots: [eduProfileScreenshot, eduProfileScreenshot2, eduProfileScreenshot3, eduProfileScreenshot4, eduProfileScreenshot5],
    screenshotAlt: 'EduProfile Android attendance application preview',
    github: '',
    demo: '',
  },
  {
    id: 'marketsquare',
    name: 'MarketSquare',
    title: 'MarketSquare UI/UX Design',
    category: 'UI/UX Design',
    description:
      'MarketSquare is a UI/UX mobile application prototype designed to connect local buyers and sellers within their communities. It provides a user-friendly shopping experience through product browsing, location-based searching, direct messaging, and seller ratings and reviews.',
    features: ['Marketplace layout', 'User-friendly browsing', 'Visual design system'],
    technologies: ['Figma', 'UI/UX Design'],
    role: 'UI/UX Designer',
    contribution: 'Created the complete interface and visual design system.',
    screenshot: marketSquareScreenshot,
    screenshots: [
      marketSquareScreenshot,
      marketSquarePlaceholderScreenshot,
      marketSquarePlaceholderScreenshot2,
      marketSquarePlaceholderScreenshot3,
    ],
    screenshotAlt: 'MarketSquare marketplace interface preview',
    github: '',
    demo: '',
  },
  {
    id: 'SBOAttendance',
    name: 'SBO Attendance',
    title: 'SBO Attendance System',
    category: 'Web Application',
    description:
      'A web-based attendance system for the SBO organization, featuring user registration and event tracking.',
    features: ['User registration', 'Event tracking', 'Attendance reports'],
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Express.js', 'MongoDB', 'Mongoose'],
    role: 'Project Manager & Programmer 2',
    contribution: 'Served as Project Manager and Programmer 2, helping coordinate the team while contributing to system implementation.',
    screenshot: sboAttendanceScreenshot,
    screenshots: [sboAttendanceScreenshot],
    screenshotAlt: 'SBO Attendance system interface preview',
    github: '',
    demo: '',
  },
  {
    id: 'houseofthedragon',
    name: 'House of the Dragon',
    title: 'House of the Dragon UI/UX Design',
    category: 'UI/UX Design',
    description:
      'House of the Dragon: Targaryen Quest is a 2D side-scrolling platformer inspired by classic games like Super Mario, set in the fantasy world of Westeros. Players take on the role of Queen Rhaenyra Targaryen as she battles enemies, overcomes obstacles, and faces powerful bosses to reclaim the Iron Throne, featuring dragon-fire attacks and immersive environments.',
    features: ['Immersive design', 'Character-based UI', 'Thematic consistency'],
    technologies: ['Java', 'UI/UX Design'],
    role: 'UI/UX Designer',
    contribution: 'Designed the complete user interface and user experience for the fictional series.',
    screenshot: houseofthedragonScreenshot,
    screenshots: [
      houseofthedragonScreenshot,
      houseofthedragonPlaceholderScreenshot,
      houseofthedragonPlaceholderScreenshot3,
      houseofthedragonPlaceholderScreenshot4,
    ],
    screenshotAlt: 'House of the Dragon UI/UX design preview',
    github: '',
    demo: '',
  },
]
