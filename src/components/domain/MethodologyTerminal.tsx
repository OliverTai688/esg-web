"use client"

import * as React from "react"
import { Terminal, AnimatedSpan, TypingAnimation } from "@/components/magicui/terminal"
import { cn } from "@/lib/utils"

interface Principle {
  title: string
  description: string
}

interface MethodologyTerminalProps {
  principles: readonly Principle[]
  className?: string
}

export const MethodologyTerminal = ({ principles, className }: MethodologyTerminalProps) => {
  return (
    <div className={cn("max-w-3xl mx-auto w-full", className)}>
      <Terminal title="共好永續方法論" variant="light" className="min-h-[400px]">
        <TypingAnimation delay={0} duration={60} className="text-accent font-bold">
          {">"} 啟動 共好永續方法論 核心運算...
        </TypingAnimation>

        <AnimatedSpan delay={1000} className="text-muted-foreground mt-2">
          [系統] 正在初始化 CO-ESG 核心方法論...
        </AnimatedSpan>

        {principles.map((p, idx) => {
          const stepBaseDelay = 2000 + idx * 2500
          return (
            <div key={idx} className="mt-6">
              <AnimatedSpan delay={stepBaseDelay} className="text-primary font-black">
                {`[核心準則 0${idx + 1}]：${p.title}`}
              </AnimatedSpan>
              <TypingAnimation
                delay={stepBaseDelay + 500}
                duration={30}
                className="text-foreground/80 block mt-1 pl-4 border-l border-border"
              >
                {`內容：${p.description}`}
              </TypingAnimation>
              <AnimatedSpan delay={stepBaseDelay + 2000} className="text-emerald-600 pl-4 text-xs font-mono">
                ✔ 狀態：準則已建立並驗證完成
              </AnimatedSpan>
            </div>
          )
        })}

        <AnimatedSpan delay={10000} className="mt-8 pt-4 border-t border-border text-accent font-bold">
          {">"} 恭喜：共好永續生態系 (CO-ESG Ecosystem) 佈署完成。
        </AnimatedSpan>
        
        <AnimatedSpan delay={11000} className="text-muted-foreground/40 text-[10px] mt-2 italic">
          準備好開始創造永續價值...
        </AnimatedSpan>
      </Terminal>
    </div>
  )
}
