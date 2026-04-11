export type CourseType = 'workshop' | 'training' | 'consulting' | 'subscription';

export type CourseStatus =
  | '招生中'
  | '可預約'
  | '開放中'
  | '已結束';

export interface Course {
  slug: string;
  title: string;
  type: CourseType;
  description: string;
  price: string;
  status: CourseStatus;
  instructor: string;
}

/** Workshops and training courses (event-based) */
export const workshops: Course[] = [
  {
    slug: 'sustainable-business-creator-basic',
    title: '永續商創師初階',
    type: 'training',
    description:
      '結合ESG與商業策略，幫助建立成為永續商創師的基礎能力。課程融合AI工具應用、品牌案例分析與實作演練。',
    price: 'NT$25,000',
    status: '招生中',
    instructor: '吳玟樺（共好玟化創辦人）',
  },
  {
    slug: 'sustainable-business-creator-advanced',
    title: '永續商創師進階',
    type: 'training',
    description:
      '進階培訓，實施策略、利害關係人溝通、影響力評估',
    price: 'NT$22,000',
    status: '招生中',
    instructor: '吳玟樺（共好玟化創辦人）',
  },
  {
    slug: 'sustainable-brand-workshop',
    title: '永續品牌初階工作坊',
    type: 'workshop',
    description:
      '用2小時掌握打造永續品牌的第一步。互動式教學模式，建立永續品牌的基礎觀念與核心價值。',
    price: 'NT$6,000',
    status: '招生中',
    instructor: '吳玟樺（共好玟化創辦人）',
  },
  {
    slug: 'survey-design-workshop',
    title: '問卷設計實作工作坊',
    type: 'workshop',
    description:
      '2小時實作工作坊，4W框架和薩提爾冰山理論',
    price: 'NT$1,600',
    status: '已結束',
    instructor: '吳玟樺（共好玟化創辦人）',
  },
];

/** Consulting and subscription services (ongoing) */
export const services: Course[] = [
  {
    slug: 'brand-positioning-consulting',
    title: '永續品牌定位顧問（單次）',
    type: 'consulting',
    description: '一對一品牌定位顧問諮詢',
    price: 'NT$6,000',
    status: '可預約',
    instructor: '吳玟樺（共好玟化創辦人）',
  },
  {
    slug: 'impact-whitepaper',
    title: '永續影響力白皮書精華版',
    type: 'consulting',
    description:
      '協助企業與組織透過精準的文字和視覺化圖表，整合ESG行動與成效，轉化為可對外溝通的簡報式影響力報告。',
    price: 'NT$100,000',
    status: '可預約',
    instructor: '吳玟樺（共好玟化創辦人）',
  },
  {
    slug: 'subscription-plan',
    title: '訂閱方案',
    type: 'subscription',
    description:
      '每週線上授課、影片回放、講師投影片、交流社群、課程優惠折扣',
    price: 'NT$300/月',
    status: '開放中',
    instructor: '吳玟樺（共好玟化創辦人）',
  },
];

/** All courses combined (excluding products) */
const allCourses: Course[] = [...workshops, ...services];

/** Look up a single course by its URL slug */
export function getCourseBySlug(slug: string): Course | undefined {
  return allCourses.find((course) => course.slug === slug);
}
