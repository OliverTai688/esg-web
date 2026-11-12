import Link from "next/link"
import type { Metadata } from "next"
import { alternatesFor } from "@/lib/seo"
import { site } from "@/lib/site"
import { ChineseOnly, LegalLayout } from "../_legal/LegalLayout"

// ┌──────────────────────────────────────────────────────────────────────────┐
// │ 草稿 DRAFT: 使用者條款 (rev2 #7, D4)                                       │
// │ Drafted by the web team; awaiting confirmation by 共好玟化 before launch. │
// │ English: the client will supply the text; until then /en/terms shows    │
// │ "This page is currently available in Chinese only" (EN R37).             │
// └──────────────────────────────────────────────────────────────────────────┘

const UPDATED = "最後更新：2026 年 11 月 9 日"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (locale === "en") {
    return {
      title: "Terms of Use",
      description: "The Terms of Use for the Gung-Ho Culture CO-ESG website. Currently available in Chinese only.",
      alternates: alternatesFor(locale, "/terms"),
    }
  }
  return {
    title: "使用者條款",
    description: "共好玟化 CO-ESG 官網使用者條款：網站內容的性質、價格與服務資訊、智慧財產權、使用規範、外部連結與免責事項。",
    alternates: alternatesFor(locale, "/terms"),
  }
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (locale === "en") return <ChineseOnly title="Terms of Use" href="/zh/terms" linkLabel="Read the Terms of Use [in Chinese]" />

  return (
    <LegalLayout title="使用者條款" updated={UPDATED}>
      <p>
        歡迎使用共好玟化 CO-ESG 官網（以下稱「本網站」）。本網站由{site.legalName.zh}（以下稱「本公司」或「我們」）經營。使用本網站，即表示你已閱讀並同意以下條款；如果不同意，請停止使用本網站。
      </p>

      <h2>一、網站內容的性質</h2>
      <p>
        本網站介紹本公司的服務、課程、活動與永續相關知識，內容僅供一般參考，不構成法律、財務、會計或其他專業意見。你的組織適合怎麼做，請以雙方正式合作時的討論與約定為準。
      </p>

      <h2>二、價格與服務資訊</h2>
      <ul>
        <li>網站上列出的價格與服務內容，以網站當時公告為準，本公司可以視情況調整。</li>
        <li>實際的合作內容、價格、付款方式與時程，以雙方書面約定或本公司提供的報價單為準。</li>
        <li>課程報名、訂閱與商品購買在外部平台（例如 ESG共學坊商城）完成，適用該平台的條款與退費規定。</li>
      </ul>

      <h2>三、智慧財產權</h2>
      <ul>
        <li>本網站的文字、圖片、圖表、Logo、影片、白皮書與其他內容，著作權及其他智慧財產權屬於本公司或合法授權給本公司的權利人。</li>
        <li>你可以為個人、非商業目的閱讀、下載與列印本網站內容。轉載、改作、公開傳輸或其他商業利用，須事先取得本公司書面同意。</li>
        <li>引用本網站內容時，請註明出處「共好玟化 CO-ESG」並附上原網址。</li>
        <li>本網站提供下載的客戶永續白皮書，權利屬於該客戶或依雙方約定，僅供你個人參考，不得另行散布或商業利用。</li>
      </ul>

      <h2>四、使用規範</h2>
      <p>使用本網站時，你同意不做以下行為：</p>
      <ul>
        <li>在表單中填寫不實資料，或冒用他人身分。</li>
        <li>透過表單傳送廣告、垃圾訊息或惡意程式。</li>
        <li>以自動化程式大量擷取網站內容，或干擾、破壞網站運作。</li>
        <li>其他違反法令或侵害他人權益的行為。</li>
      </ul>

      <h2>五、外部連結</h2>
      <p>
        本網站有連到其他網站的連結，例如 LINE、LinkedIn、Facebook、ESG共學坊商城、線上工具與 Google 表單。這些網站由各自的經營者負責，內容與隱私做法不在本條款與本網站隱私權政策的範圍內，請在使用前另行閱讀它們的條款。
      </p>

      <h2>六、免責聲明</h2>
      <p>
        我們會盡力確保網站內容正確、網站正常運作，但不保證內容完全無誤、即時更新，或網站不會中斷。在法律允許的範圍內，因使用或無法使用本網站所產生的損害，本公司不負賠償責任。
      </p>

      <h2>七、個人資料</h2>
      <p>
        本網站如何蒐集與處理你的個人資料，請見<Link href="/zh/privacy">隱私權政策</Link>。
      </p>

      <h2>八、條款修改</h2>
      <p>本公司可以修改本條款，修改後會公告在本頁並更新上方日期。修改後你繼續使用本網站，即表示同意修改後的條款。</p>

      <h2>九、準據法與管轄法院</h2>
      <p>本條款依中華民國法律解釋與適用。因本條款或本網站所生的爭議，雙方同意以臺灣臺北地方法院為第一審管轄法院。</p>

      <h2>十、聯絡我們</h2>
      <p>
        {site.legalName.zh}（統一編號 {site.taxId}）
        <br />
        地址：{site.address.zh}
        <br />
        客服信箱：<a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>
      </p>
    </LegalLayout>
  )
}
