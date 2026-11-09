import { solutionPrice } from './solutions';

// The /events/<slug> inner pages (rev2 #51, EN #51). Of the seven old pages
// three are sold (永續白皮書工作坊, 永續商創師, 永續白皮書) and one is a past
// event kept as a record (問卷設計實作工作坊). The removed and renamed slugs
// redirect in next.config.ts. Prices are not written here: they come from
// src/data/solutions.ts, the site's single price list.
//
// - course:   a course with cohorts (下一梯次規劃中 until a date is set)
// - advisory: a consulting service (顧問／工期 instead of 講師／時數, #51)
// - record:   a past event in 我們走過的路; its text stays as it was
export type CourseKind = 'course' | 'advisory' | 'record';

// 規劃中: recurring course whose next date has not been announced yet.
export type CourseStatus = '招生中' | '規劃中' | '可預約' | '開放中' | '已結束';

interface CourseText {
  title: string;
  description: string;
  /** More about the course under the facts (course direction, #51) */
  body?: string[];
  duration?: string;
  location?: string;
  capacity?: string;
  highlights?: string[];
  /** Overrides the status wording (e.g. 規劃中 for the merged 永續商創師) */
  statusLabel?: string;
}

export interface Course extends CourseText {
  slug: string;
  kind: CourseKind;
  status: CourseStatus;
  /** Item in solutions.ts that holds the price */
  solutionId?: string;
  /**
   * The price in Chinese, read from solutions.ts. Kept for pages that list
   * courses; inner pages call solutionPrice() for the page's language.
   */
  price?: string;
  /** Consultant ids (src/data/team.ts): one instructor card each (#52) */
  instructors: readonly string[];
  /** ISO date of the next or last session; omitted while the next run is being planned */
  date?: string;
  en: CourseText;
}

const withPrice = (course: Omit<Course, 'price'>): Course => ({
  ...course,
  price: course.solutionId ? solutionPrice(course.solutionId, 'zh') : undefined,
});

/** Every inner page, in the order of the 方案總表 (the record last) */
export const courses: Course[] = [
  withPrice({
    // Was sustainable-brand-workshop (#51)
    slug: 'whitepaper-workshop',
    kind: 'course',
    title: '永續白皮書工作坊',
    description: '兩天實作，帶著自己組織的資料來，離開時帶走白皮書初稿與一頁式企業提案。',
    solutionId: 'whitepaper-workshop',
    status: '規劃中',
    instructors: ['evvon-wu', 'sylvia-shih'],
    duration: '2 天實體課（10:00–17:00）',
    location: '台北市',
    capacity: '每梯 25–30 人',
    // 兩天的產出 (#51)
    highlights: ['永續白皮書初稿', '一頁式企業提案', '提案發表與回饋'],
    en: {
      title: 'Sustainability White Paper Workshop',
      description:
        'Two days of hands-on work. Bring your organisation’s own data, and leave with a first draft of your white paper and a one-page proposal for companies. Taught in Mandarin.',
      duration: '2 days, in person (10:00–17:00)',
      location: 'Taipei',
      capacity: '25–30 people per cohort',
      highlights: [
        'A first draft of your Sustainability White Paper',
        'A one-page proposal for companies',
        'A presentation with feedback',
      ],
    },
  }),
  withPrice({
    // Merges sustainable-business-creator-basic and -advanced (#51): 規劃中, the
    // course direction only; no price, days, places or certificate.
    slug: 'sustainable-business-innovator',
    kind: 'course',
    title: '永續商創師',
    status: '規劃中',
    statusLabel: '規劃中',
    description: '給品牌與中小企業經營者的永續課程。',
    body: [
      '結合ESG與商業策略，幫助建立成為永續商創師的基礎能力。課程融合AI工具應用、品牌案例分析與實作演練。',
      '涵蓋實施策略、利害關係人溝通、影響力評估，打造完整的永續商業策略能力。',
    ],
    instructors: ['evvon-wu'],
    location: '台北市',
    highlights: ['AI 工具應用', '品牌案例分析', '實作演練', '策略實施', '利害關係人溝通', '影響力評估'],
    en: {
      title: 'Sustainable Business Innovator Programme',
      statusLabel: 'In planning',
      description: 'A sustainability course for brand owners and SME leaders. Taught in Mandarin.',
      body: [
        'Builds the core skills of a Sustainable Business Innovator by combining ESG with business strategy, AI tools, brand case analysis and hands-on practice.',
        'Covers implementation strategy, stakeholder communication and impact assessment for a complete sustainable business strategy.',
      ],
      location: 'Taipei',
      highlights: ['AI tools', 'Brand case analysis', 'Hands-on practice', 'Implementation', 'Stakeholder communication', 'Impact assessment'],
    },
  }),
  withPrice({
    // An advisory service, not a course (#10, #51, #53)
    slug: 'impact-whitepaper',
    kind: 'advisory',
    title: '永續白皮書',
    description: '協助企業與組織透過精準的文字和視覺化圖表，整合 ESG 行動與成效，轉化為可對外溝通的永續白皮書。',
    solutionId: 'whitepaper',
    status: '可預約',
    instructors: ['evvon-wu'],
    duration: '6–12 週',
    highlights: ['深度訪談', '數據整合', '視覺化報告', '品牌故事'],
    en: {
      title: 'Sustainability White Paper',
      description:
        'We help you bring your ESG actions and results together in one Sustainability White Paper. Precise writing and clear charts make it ready to share outside your organisation.',
      duration: '6–12 weeks',
      highlights: ['In-depth interviews', 'Data integration', 'Visual report', 'Brand story'],
    },
  }),
  withPrice({
    // A past event in 我們走過的路: the text stays as it was (#51)
    slug: 'survey-design-workshop',
    kind: 'record',
    title: '問卷設計實作工作坊',
    description: '2小時實作工作坊，運用4W框架和薩提爾冰山理論，學習設計有效的永續調查問卷。',
    status: '已結束',
    instructors: ['evvon-wu'],
    duration: '2 小時',
    // Date from the original course page (docs/scraped/courses/10-workshop-2024-1222.md)
    date: '2024-12-22',
    location: '線上',
    highlights: ['4W 框架', '薩提爾冰山理論', '問卷實作'],
    en: {
      title: 'Survey Design Workshop',
      description:
        'A two-hour hands-on workshop using the 4W framework and the Satir iceberg model to design effective sustainability surveys.',
      duration: '2 hours',
      location: 'Online',
      highlights: ['4W framework', 'Satir iceberg model', 'Survey practice'],
    },
  }),
];

/** Courses with cohorts and past events (listed on /events) */
export const workshops: Course[] = courses.filter((c) => c.kind !== 'advisory');

/** Advisory services */
export const services: Course[] = courses.filter((c) => c.kind === 'advisory');

/** The pages offered under 其他方案 (#51): the three that are sold, never the record */
export const offeredCourses: Course[] = courses.filter((c) => c.kind !== 'record');

/** Look up a single course by its URL slug */
export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

/** Localised text fields for a course */
export function courseText(course: Course, locale: string): CourseText {
  return locale === 'en' ? course.en : course;
}

export const courseStatusLabel: Record<CourseStatus, { zh: string; en: string }> = {
  招生中: { zh: '招生中', en: 'Open for enrolment' },
  規劃中: { zh: '下一梯次規劃中', en: 'Next cohort in planning' },
  可預約: { zh: '可預約', en: 'Available' },
  開放中: { zh: '開放中', en: 'Open' },
  已結束: { zh: '已結束', en: 'Ended' },
};
