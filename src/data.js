import ifindScreenshot from './assets/ifind.jpg'
import sasScreenshot from './assets/sass.jpg'
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
import houseofthedragonPlaceholderScreenshot2 from './assets/hotd2.png'
import houseofthedragonPlaceholderScreenshot3 from './assets/hotd3.png'
import houseofthedragonPlaceholderScreenshot4 from './assets/hotd4.png'

export const portfolio = {
  name: 'Joanna Nicole P. Yroy',
  headline: 'IT Student & Developer',
  intro:
    'Hi, I’m Joanna! I’m an IT student who enjoys building web applications and working with my team to solve everyday problems.',
  location: 'Bukidnon State University',
  contact: {
    email: '',
    github: '',
    linkedin: '',
    resume: '',
  },
  skills: [
    'Web Development',
    'Java',
    'Android Development',
    'Team Collaboration',
    'Project Management',
    'UI/UX Design',
  ],
}

export const certificates = [
  {
    title: 'Certificate title',
    issuer: 'Issuing organization',
    year: 'Year',
    image: '',
    file: '',
  },
  {
    title: 'Certificate title',
    issuer: 'Issuing organization',
    year: 'Year',
    image: '',
    file: '',
  },
  {
    title: 'Certificate title',
    issuer: 'Issuing organization',
    year: 'Year',
    image: '',
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
    technologies: ['ESP32-S3', 'PZEM-004T', 'Firebase Realtime Database', 'MongoDB', 'Arduino'],
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
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Express.js', 'MongoDB', 'Mongoose'],
    role: 'Project Manager & Programmer 2',
    contribution: 'Served as Project Manager and Programmer 2, helping coordinate the team while contributing to system implementation.',
    screenshot: ifindScreenshot,
    screenshotAlt: 'iFind lost-and-found management interface',
    github: '',
    demo: '',
  },
  {
    id: 'sas',
    name: 'SAS',
    title: 'Student Attendance System',
    category: 'Android Application',
    description:
      'An attendance application for student organization events that supports registration and QR-based time tracking.',
    features: ['Student registration', 'QR-based attendance', 'AM/PM time tracking'],
    technologies: ['Android', 'QR Code', 'Java'],
    role: 'Team Member',
    contribution: 'Contributed to the team Android application.',
    screenshot: sasScreenshot,
    screenshotAlt: 'SAS Android attendance application preview',
    github: '',
    demo: '',
  },
  {
    id: 'marketsquare',
    name: 'MarketSquare',
    title: 'MarketSquare UI/UX Design',
    category: 'UI/UX Design',
    description:
      'A marketplace interface designed to provide clear navigation and a friendly shopping experience.',
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
      houseofthedragonPlaceholderScreenshot2,
      houseofthedragonPlaceholderScreenshot3,
      houseofthedragonPlaceholderScreenshot4,
    ],
    screenshotAlt: 'House of the Dragon UI/UX design preview',
    github: '',
    demo: '',
  },
]
