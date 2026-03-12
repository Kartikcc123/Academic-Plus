import {
  FaArrowRight,
  FaAward,
  FaBookOpen,
  FaBriefcase,
  FaBullseye,
  FaChartLine,
  FaCheckCircle,
  FaClock,
  FaEnvelope,
  FaGlobeAsia,
  FaHeartbeat,
  FaHospital,
  FaMapMarkerAlt,
  FaMicroscope,
  FaPhoneAlt,
  FaPills,
  FaRegLightbulb,
  FaShieldAlt,
  FaStethoscope,
  FaUserMd,
  FaUsers,
} from 'react-icons/fa';

export const siteMeta = {
  phonePrimary: '+91 9413669776',
  phoneSecondary: '+91 9782975957',
  email: 'jay001amera@gmail.com',
  address: '5-R-40, RC Vyas Colony, near Mother Teresa School, Bhilwara, Rajasthan',
  mapLabel: 'RC Vyas Colony, Bhilwara',
};

export const heroStats = [
  { value: '5,000+', label: 'learners mentored' },
  { value: '94%', label: 'placement readiness score' },
  { value: '200+', label: 'hospital and clinical partners' },
  { value: '1:1', label: 'career counseling support' },
];

export const homeHighlights = [
  {
    title: 'Outcome-first coaching',
    description: 'Academic mentoring, admission guidance, and job-readiness support are combined into one structured learning system.',
    icon: FaBullseye,
  },
  {
    title: 'Clinical industry exposure',
    description: 'Students train with real hospital workflows, practical labs, interview drills, and documentation support.',
    icon: FaHospital,
  },
  {
    title: 'Professional career support',
    description: 'From course selection to placements, the team helps students plan a credible route into healthcare careers.',
    icon: FaBriefcase,
  },
];

export const capabilityCards = [
  {
    title: 'Career Mapping',
    description: 'Personalized guidance for nursing, paramedical, pharmacy, and licensing pathways.',
    icon: FaChartLine,
    kicker: 'Strategy',
  },
  {
    title: 'Faculty Mentoring',
    description: 'Structured coaching, doubt-solving, and practical orientation led by experienced educators.',
    icon: FaUsers,
    kicker: 'People',
  },
  {
    title: 'Placement Readiness',
    description: 'Resume support, interview practice, and workplace preparation for hospital and clinic roles.',
    icon: FaShieldAlt,
    kicker: 'Execution',
  },
];

export const programs = [
  {
    id: 1,
    title: 'B.Sc. Nursing',
    category: 'Nursing',
    duration: '4 years',
    eligibility: '12th Science (PCB)',
    description: 'A professional degree pathway for bedside care, leadership, critical care practice, and hospital systems.',
    icon: FaHeartbeat,
  },
  {
    id: 2,
    title: 'GNM Nursing',
    category: 'Nursing',
    duration: '3 years',
    eligibility: '12th any stream',
    description: 'Practical nursing training with strong foundations in patient care, community health, and ward operations.',
    icon: FaUserMd,
  },
  {
    id: 3,
    title: 'DMLT',
    category: 'Paramedical',
    duration: '2 years',
    eligibility: '12th Science',
    description: 'Build diagnostic lab capability in pathology, testing workflows, reporting, and quality processes.',
    icon: FaMicroscope,
  },
  {
    id: 4,
    title: 'DRT',
    category: 'Paramedical',
    duration: '2 years',
    eligibility: '12th Science',
    description: 'Train for imaging and radiology environments with a focus on technical accuracy and hospital readiness.',
    icon: FaStethoscope,
  },
  {
    id: 5,
    title: 'B.Pharm',
    category: 'Pharmacy',
    duration: '4 years',
    eligibility: '12th Science (PCB/PCM)',
    description: 'A professional pharmacy track covering dispensing, pharmacology, compliance, and clinical support systems.',
    icon: FaPills,
  },
  {
    id: 6,
    title: 'Medical Admission Guidance',
    category: 'Medical',
    duration: 'Counseling based',
    eligibility: '12th PCB',
    description: 'Admission planning and document support for MBBS, BDS, BAMS, and allied opportunities in India and abroad.',
    icon: FaBookOpen,
  },
  {
    id: 7,
    title: 'FMGE / NEXT Coaching',
    category: 'Medical',
    duration: 'Modular program',
    eligibility: 'Foreign medical graduates',
    description: 'Focused exam coaching, revision systems, and mentoring designed around licensing exam outcomes.',
    icon: FaGlobeAsia,
  },
];

export const trustMetrics = [
  { value: '10+', label: 'years building healthcare careers', icon: FaAward },
  { value: '200+', label: 'partner hospitals and employers', icon: FaHospital },
  { value: '100%', label: 'guided counseling support', icon: FaCheckCircle },
];

export const timeline = [
  {
    year: '2015',
    title: 'Foundation phase',
    description: 'Academic Plus began with a focused mission: make healthcare education more accessible, career-aware, and practical.',
    icon: FaRegLightbulb,
  },
  {
    year: '2018',
    title: 'Program expansion',
    description: 'Paramedical pathways and stronger lab infrastructure were added to support a broader student base.',
    icon: FaMicroscope,
  },
  {
    year: '2021',
    title: 'Multi-track coaching model',
    description: 'Nursing, pharmacy, counseling, and preparation programs were aligned under one student support system.',
    icon: FaUsers,
  },
  {
    year: '2025',
    title: 'Placement-led positioning',
    description: 'The institute sharpened its model around employability, admissions guidance, and professional coaching outcomes.',
    icon: FaBriefcase,
  },
];

export const testimonials = [
  {
    name: 'Priya Sharma',
    course: 'B.Sc. Nursing',
    result: 'Placed at Apollo Hospitals',
    quote: 'The coaching was disciplined, practical, and focused on what hospitals actually expect from fresh candidates.',
  },
  {
    name: 'Rahul Verma',
    course: 'FMGE Coaching',
    result: 'Cleared on first serious attempt',
    quote: 'The mentorship turned scattered preparation into a repeatable study system that finally worked.',
  },
  {
    name: 'Anita Desai',
    course: 'DMLT',
    result: 'Joined a government diagnostic role',
    quote: 'What stood out was the balance between classroom learning, practical guidance, and career planning.',
  },
];

export const contactCards = [
  {
    title: 'Call the counseling desk',
    body: `${siteMeta.phonePrimary} | ${siteMeta.phoneSecondary}`,
    icon: FaPhoneAlt,
  },
  {
    title: 'Email for admissions',
    body: siteMeta.email,
    icon: FaEnvelope,
  },
  {
    title: 'Visit the campus',
    body: siteMeta.address,
    icon: FaMapMarkerAlt,
  },
];

export const footerPrograms = [
  'Nursing programs',
  'Paramedical diplomas',
  'Pharmacy pathways',
  'Medical admission counseling',
  'FMGE / NEXT mentoring',
];

export const coachingPoints = [
  'Career counseling for students and parents',
  'Structured learning plans with practical alignment',
  'Admission support and placement-facing preparation',
];

export const authHighlights = [
  'Student portal access for notes and learning resources',
  'Simple registration flow for new learners',
  'Professional, mobile-friendly account experience',
];

export const ctaLinks = {
  primaryLabel: 'Book a counseling call',
  primaryIcon: FaArrowRight,
};

export const courseMetaIcons = {
  duration: FaClock,
  eligibility: FaCheckCircle,
};
