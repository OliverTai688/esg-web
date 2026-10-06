export type CourseType = 'workshop' | 'training' | 'consulting' | 'subscription';

// 規劃中: recurring course whose next date has not been announced yet.
export type CourseStatus = '招生中' | '規劃中' | '可預約' | '開放中' | '已結束';

interface CourseText {
  title: string;
  description: string;
  duration?: string;
  location?: string;
  capacity?: string;
  highlights?: string[];
}

export interface Course extends CourseText {
  slug: string;
  type: CourseType;
  // Single (highest) list price per the client's pricing rule (C02)
  price: string;
  status: CourseStatus;
  instructor: string;
  /** ISO date of the next or last session; omitted while the next run is being planned */
  date?: string;
  en: CourseText & { instructor: string };
}

const founder = '吳玟樺（共好玟化創辦人）';
const founderEn = 'Evvon Wu, founder of Gung-Ho Culture';

/** Workshops and training courses (event-based) */
export const workshops: Course[] = [
  {
    slug: 'sustainable-business-creator-basic',
    title: '永續商創師初階',
    type: 'training',
    description:
      '結合ESG與商業策略，幫助建立成為永續商創師的基礎能力。課程融合AI工具應用、品牌案例分析與實作演練。',
    price: 'NT$25,000',
    status: '規劃中',
    instructor: founder,
    duration: '3 天 / 18 小時',
    location: '台北市',
    capacity: '20 人',
    highlights: ['AI 工具應用', '品牌案例分析', '實作演練', '結業證書'],
    en: {
      title: 'Sustainable Business Creator — Foundation',
      description:
        'Builds the core skills of a sustainable business creator by combining ESG with business strategy, AI tools, brand case analysis and hands-on practice.',
      instructor: founderEn,
      duration: '3 days / 18 hours',
      location: 'Taipei',
      capacity: '20 people',
      highlights: ['AI tools', 'Brand case analysis', 'Hands-on practice', 'Certificate'],
    },
  },
  {
    slug: 'sustainable-business-creator-advanced',
    title: '永續商創師進階',
    type: 'training',
    description:
      '進階培訓，涵蓋實施策略、利害關係人溝通、影響力評估，打造完整的永續商業策略能力。',
    price: 'NT$22,000',
    status: '規劃中',
    instructor: founder,
    duration: '2 天 / 12 小時',
    location: '台北市',
    capacity: '15 人',
    highlights: ['策略實施', '利害關係人溝通', '影響力評估', '進階認證'],
    en: {
      title: 'Sustainable Business Creator — Advanced',
      description:
        'Advanced training in implementation strategy, stakeholder communication and impact assessment for a complete sustainable business strategy.',
      instructor: founderEn,
      duration: '2 days / 12 hours',
      location: 'Taipei',
      capacity: '15 people',
      highlights: ['Implementation', 'Stakeholder communication', 'Impact assessment', 'Advanced certificate'],
    },
  },
  {
    slug: 'sustainable-brand-workshop',
    title: '永續品牌初階工作坊',
    type: 'workshop',
    description:
      '用2小時掌握打造永續品牌的第一步。互動式教學模式，建立永續品牌的基礎觀念與核心價值。',
    price: 'NT$6,000',
    status: '規劃中',
    instructor: founder,
    duration: '2 小時',
    location: '線上',
    capacity: '30 人',
    highlights: ['互動式教學', '永續框架入門', '品牌連結點'],
    en: {
      title: 'Sustainable Brand Workshop — Foundation',
      description:
        'Take the first step towards a sustainable brand in two hours: an interactive session on the core concepts and values of sustainable branding.',
      instructor: founderEn,
      duration: '2 hours',
      location: 'Online',
      capacity: '30 people',
      highlights: ['Interactive teaching', 'Sustainability frameworks', 'Brand touchpoints'],
    },
  },
  {
    slug: 'survey-design-workshop',
    title: '問卷設計實作工作坊',
    type: 'workshop',
    description:
      '2小時實作工作坊，運用4W框架和薩提爾冰山理論，學習設計有效的永續調查問卷。',
    price: 'NT$1,600',
    status: '已結束',
    instructor: founder,
    duration: '2 小時',
    // Date from the original course page (docs/scraped/courses/10-workshop-2024-1222.md)
    date: '2024-12-22',
    location: '線上',
    highlights: ['4W 框架', '薩提爾冰山理論', '問卷實作'],
    en: {
      title: 'Survey Design Workshop',
      description:
        'A two-hour hands-on workshop using the 4W framework and the Satir iceberg model to design effective sustainability surveys.',
      instructor: founderEn,
      duration: '2 hours',
      location: 'Online',
      highlights: ['4W framework', 'Satir iceberg model', 'Survey practice'],
    },
  },
];

/** Consulting and subscription services (ongoing) */
export const services: Course[] = [
  {
    slug: 'brand-positioning-consulting',
    title: '永續品牌定位顧問（單次）',
    type: 'consulting',
    description: '一對一品牌定位顧問諮詢，協助釐清永續定位與 ESG 敘事架構。',
    price: 'NT$6,000',
    status: '可預約',
    instructor: founder,
    duration: '60 分鐘',
    highlights: ['一對一諮詢', '品牌定位', 'ESG 敘事架構'],
    en: {
      title: 'Sustainable Brand Positioning (single session)',
      description: 'One-to-one consulting to clarify your sustainability positioning and ESG narrative.',
      instructor: founderEn,
      duration: '60 minutes',
      highlights: ['One-to-one', 'Brand positioning', 'ESG narrative'],
    },
  },
  {
    slug: 'impact-whitepaper',
    title: '永續白皮書精華版',
    type: 'consulting',
    description:
      '協助企業與組織透過精準的文字和視覺化圖表，整合ESG行動與成效，轉化為可對外溝通的簡報式永續報告。',
    price: 'NT$100,000',
    status: '可預約',
    instructor: founder,
    duration: '4–8 週',
    highlights: ['深度訪談', '數據整合', '視覺化報告', '品牌故事'],
    en: {
      title: 'Sustainability White Paper — Essentials',
      description:
        'Turns your ESG actions and results into a presentation-style report for external communication, with precise writing and clear charts.',
      instructor: founderEn,
      duration: '4–8 weeks',
      highlights: ['In-depth interviews', 'Data integration', 'Visual report', 'Brand story'],
    },
  },
  {
    slug: 'subscription-plan',
    title: '訂閱方案',
    type: 'subscription',
    description:
      '每週線上授課、影片回放、講師投影片、交流社群、課程優惠折扣，持續精進永續知識。',
    price: 'NT$300/月',
    status: '開放中',
    instructor: founder,
    highlights: ['每週線上授課', '影片回放', '交流社群', '課程折扣'],
    en: {
      title: 'Subscription',
      description:
        'Weekly online classes, recordings, speaker slides, a peer community and course discounts to keep your sustainability knowledge current.',
      instructor: founderEn,
      highlights: ['Weekly online classes', 'Recordings', 'Community', 'Course discounts'],
    },
  },
];

/** All courses combined (excluding products) */
const allCourses: Course[] = [...workshops, ...services];

/** Look up a single course by its URL slug */
export function getCourseBySlug(slug: string): Course | undefined {
  return allCourses.find((course) => course.slug === slug);
}

/** Localised text fields for a course */
export function courseText(course: Course, locale: string): CourseText & { instructor: string } {
  return locale === 'en' ? course.en : course;
}

export const courseStatusLabel: Record<CourseStatus, { zh: string; en: string }> = {
  招生中: { zh: '招生中', en: 'Open for enrolment' },
  規劃中: { zh: '下一梯次規劃中', en: 'Next run in planning' },
  可預約: { zh: '可預約', en: 'Available' },
  開放中: { zh: '開放中', en: 'Open' },
  已結束: { zh: '已結束', en: 'Ended' },
};
