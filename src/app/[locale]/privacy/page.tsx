import Link from "next/link"
import type { Metadata } from "next"
import { alternatesFor } from "@/lib/seo"
import { site } from "@/lib/site"
import { ChineseOnly, LegalLayout } from "../_legal/LegalLayout"

// ┌──────────────────────────────────────────────────────────────────────────┐
// │ 草稿 DRAFT: 隱私權政策 (rev2 #7, D4)                                       │
// │ Drafted by the web team under 個人資料保護法; awaiting confirmation by    │
// │ 共好玟化 before launch. English: the client will supply the text; until   │
// │ then /en/privacy shows "This page is currently available in Chinese only".│
// │                                                                          │
// │ Keep it true to the code. When any of these change, update this page:    │
// │ - form fields: src/components/forms/schema.ts                            │
// │ - forms are only emailed (src/lib/mail.ts), nothing stored on the site   │
// │ - the only cookie is NEXT_LOCALE (src/proxy.ts, one year)                │
// │ - no analytics or tracking scripts are installed (checked 2026-11-09)   │
// │ - the in-memory per-IP rate limit (src/app/api/forms/route.ts)           │
// └──────────────────────────────────────────────────────────────────────────┘

const UPDATED = "最後更新：2026 年 11 月 9 日"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (locale === "en") {
    return {
      title: "Privacy Policy",
      description: "How the Gung-Ho Culture CO-ESG website handles your personal data. Currently available in Chinese only.",
      alternates: alternatesFor(locale, "/privacy"),
    }
  }
  return {
    title: "隱私權政策",
    description: "共好玟化 CO-ESG 官網如何處理你的個人資料：三個表單蒐集的欄位與用途、資料只寄到公司信箱而不存在網站、語言 Cookie 與主機紀錄，以及你的權利。",
    alternates: alternatesFor(locale, "/privacy"),
  }
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (locale === "en") return <ChineseOnly title="Privacy Policy" href="/zh/privacy" linkLabel="Read the Privacy Policy [in Chinese]" />

  const mail = <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>

  return (
    <LegalLayout title="隱私權政策" updated={UPDATED}>
      <p>
        {site.legalName.zh}（以下稱「本公司」或「我們」）經營共好玟化 CO-ESG 官網（以下稱「本網站」），並依《個人資料保護法》（以下稱「個資法」）蒐集、處理及利用你的個人資料。本政策說明本網站蒐集哪些資料、為什麼蒐集、資料會去哪裡，以及你可以行使的權利。
      </p>

      <h2>一、適用範圍</h2>
      <p>
        本政策適用於本網站的中文版與英文版。本網站連到的外部網站，例如 ESG共學坊商城、線上工具、LINE、LinkedIn、Facebook、Google 表單與白皮書檔案的存放處，各有自己的隱私權政策，不適用本政策。
      </p>

      <h2>二、我們透過表單蒐集的資料與用途</h2>
      <p>本網站只透過以下三個表單蒐集個人資料。你不填寫表單，也可以瀏覽本網站的所有內容。</p>
      <h3>1. 合作洽詢聯絡表單（合作洽詢頁）</h3>
      <ul>
        <li>欄位：姓名、Email（必填）；所屬單位、想聊的方向、需求或訊息（選填）。</li>
        <li>用途：回覆你的洽詢、安排會談，並提供你詢問的服務資訊。</li>
      </ul>
      <h3>2. Email 訂閱（加入我們頁）</h3>
      <ul>
        <li>欄位：Email（必填）。</li>
        <li>用途：寄送永續趨勢、課程與活動等消息給你。</li>
      </ul>
      <h3>3. 白皮書下載表單（永續白皮書頁）</h3>
      <ul>
        <li>欄位：姓名、職稱、Email（皆必填），以及你選擇下載的白皮書。</li>
        <li>用途：提供白皮書下載、了解下載者的背景，並寄送與永續白皮書、課程及活動相關的消息給你。</li>
      </ul>
      <p>
        個資法上的蒐集目的：〇四〇 行銷；〇九〇 消費者、客戶管理與服務；一八一 其他經營合於營業登記項目或組織章程所定之業務。個人資料類別：C001 辨識個人者（姓名、Email）；C038 職業（職稱、所屬單位）。
      </p>

      <h2>三、資料存放在哪裡</h2>
      <ul>
        <li>
          <strong>本網站不儲存表單資料。</strong>
          本網站沒有會員系統或資料庫，也不把資料寫入試算表。你按下送出後，網站伺服器只在寄信的過程中處理你填寫的內容，把它以 Email 寄到本公司客服信箱 {mail}，寄出後網站不留存。
        </li>
        <li>信件透過本公司的 Google Workspace（Gmail）帳號寄出，Google 會依其政策保存寄送紀錄。</li>
        <li>收到的信件存放在本公司客服信箱，只有負責回覆的同仁可以讀取。訂閱與白皮書下載的名單，由同仁從這些信件整理。</li>
        <li>我們不會出售、出租或交換你的個人資料。除法令要求（例如司法機關依法調取）外，不會提供給第三方。</li>
      </ul>

      <h2>四、利用的期間、地區、對象與方式</h2>
      <ul>
        <li>期間：自你送出表單起，到蒐集目的消失、你要求停止利用或刪除，或依法令須保存的期間屆滿為止。</li>
        <li>
          地區：臺灣，以及本網站主機（Vercel Inc.）與郵件服務（Google）的主機所在地區。這些主機可能位於臺灣以外（例如美國），你的資料在寄送過程中會經過這些地區。
        </li>
        <li>對象：本公司。</li>
        <li>方式：以 Email 回覆、聯繫你，或寄送你訂閱的消息。</li>
      </ul>

      <h2>五、Cookie</h2>
      <p>
        本網站只使用一個 Cookie：<code>NEXT_LOCALE</code>。它記住你選擇的語言（中文或英文），讓你下次進站時看到同一種語言。它的內容只有語言代碼（zh 或 en），有效期一年，不含個人資料，也不用於追蹤。你可以在瀏覽器設定中刪除或封鎖 Cookie；封鎖後網站仍可正常使用，只是不會記住你的語言選擇。
      </p>

      <h2>六、網站分析與主機紀錄</h2>
      <ul>
        <li>
          本網站目前沒有安裝任何網站分析或廣告追蹤工具（例如 Google Analytics、Meta Pixel），也沒有嵌入會追蹤你瀏覽行為的第三方內容。日後如果加裝，會先更新本政策。
        </li>
        <li>
          本網站由 Vercel 託管。和多數網站一樣，主機會自動記錄連線資訊，例如 IP 位址、瀏覽器類型、造訪的網址與時間，用於維持網站運作、排除錯誤與防範攻擊。這些紀錄由 Vercel 依其政策短期保存，我們不會用它們辨識你的身分。
        </li>
        <li>為了防止垃圾訊息，伺服器會在記憶體中暫時記住送出表單的 IP 位址與次數（10 分鐘內），不寫入任何檔案或資料庫，也不會寄給本公司。</li>
      </ul>

      <h2>七、你的權利</h2>
      <p>依個資法第 3 條，你可以就你的個人資料向我們：</p>
      <ul>
        <li>查詢或請求閱覽；</li>
        <li>請求製給複製本；</li>
        <li>請求補充或更正；</li>
        <li>請求停止蒐集、處理或利用；</li>
        <li>請求刪除。</li>
      </ul>
      <p>
        你也可以隨時要求我們不再寄送訂閱消息。請寫信到 {mail}，我們會在個資法第 13 條規定的期限內處理並回覆你。
      </p>

      <h2>八、不提供資料的影響</h2>
      <p>
        你可以自由決定是否提供個人資料。各表單的必填欄位沒有填寫時，表單無法送出，我們也就無法回覆你的洽詢、寄送訂閱消息或提供白皮書下載。你仍然可以直接寫信到 {mail} 與我們聯繫。
      </p>

      <h2>九、資料安全</h2>
      <p>本網站全程使用 HTTPS 加密連線。客服信箱由本公司以帳號密碼與存取權限管理，只有負責同仁可以讀取。</p>

      <h2>十、政策修訂</h2>
      <p>
        本政策如有修改，會公告在本頁並更新上方日期。使用本網站的其他規範，請見<Link href="/zh/terms">使用者條款</Link>。
      </p>

      <h2>十一、聯絡我們</h2>
      <p>
        {site.legalName.zh}（統一編號 {site.taxId}）
        <br />
        地址：{site.address.zh}
        <br />
        客服信箱：{mail}
      </p>
    </LegalLayout>
  )
}
