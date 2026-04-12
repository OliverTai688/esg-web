"use client"

import * as React from "react"
import { Container } from "@/components/core/Container"
import { Section } from "@/components/core/Section"
import { Heading } from "@/components/core/Heading"
import { Button } from "@/components/ui/button"
import { Heart, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface StorySectionProps {
  label: string
  title: string
  headline: string
  summary: string
  bullets: readonly string[]
  fullStory: readonly string[]
  founderName?: string
  founderTitle?: string
}

const StorySection = ({
  label,
  title,
  founderName,
  founderTitle,
  headline,
  summary,
  bullets,
  fullStory,
}: StorySectionProps) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Section className="bg-muted/30">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Visual Side — warm gradient with orange accent (#9 #12) */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-[2.5rem] bg-gradient-to-br from-primary via-primary/95 to-primary/85 relative overflow-hidden shadow-2xl shadow-primary/20 border border-primary/20 group">
              {/* Orange decorative corner — brand warmth (#12) */}
              <div className="absolute top-0 right-0 w-2/3 h-1/3 bg-gradient-to-bl from-accent/15 via-accent/5 to-transparent rounded-bl-[6rem]" />

              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                <div className="size-24 rounded-[2rem] bg-white/10 backdrop-blur-sm flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0 transition-transform duration-500 border border-white/10">
                  <Heart className="text-accent size-10 fill-accent/20" />
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="text-6xl font-black text-white/15 absolute -top-12 -left-12">&ldquo;</div>
                  <p className="text-xl font-bold italic text-white/90 leading-relaxed">
                    Sayun means &quot;Bridge&quot;
                  </p>
                  <div className="text-6xl font-black text-white/15 translate-y-4 absolute -bottom-8 -right-12">&rdquo;</div>

                  <div className="mt-12 pt-8 border-t border-white/15">
                    {founderName && (
                      <p className="text-2xl font-black text-white mb-1 tracking-tight">{founderName}</p>
                    )}
                    {founderTitle && (
                      <p className="text-[11px] text-white/60 tracking-[0.2em] font-semibold">{founderTitle}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Warm decorative blobs (#12) */}
              <div className="absolute -bottom-24 -right-24 size-80 bg-accent/20 blur-[100px] rounded-full" />
              <div className="absolute -top-12 -left-12 size-40 bg-white/5 blur-[60px] rounded-full" />
            </div>
          </div>

          {/* Narrative Side */}
          <div className="lg:col-span-7 pt-4 relative group/narrative">
            {/* Modern yellow decorative circle — 'Sun/Energy' vibe (#12) */}
            <div className="absolute -top-20 -right-20 size-96 bg-accent/20 blur-[100px] rounded-full pointer-events-none group-hover/narrative:scale-110 transition-transform duration-700" />
            <div className="absolute top-10 -right-10 size-40 bg-accent/15 blur-[60px] rounded-full pointer-events-none animate-pulse" />
            
            <div className="relative z-10">
              <Heading
                level={2}
                label={label}
                title={title}
                subTitle={headline}
                description={summary}
                spacing="sm"
              />

              {/* Scannable bullets — orange dots for warmth (#12) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {bullets.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-3 p-5 bg-white rounded-2xl border border-border shadow-sm hover:shadow-md hover:border-accent/20 transition-all duration-300 group/bullet">
                    <div className="size-2.5 rounded-full bg-accent mt-1.5 shrink-0 group-hover/bullet:scale-125 transition-transform" />
                    <p className="text-sm font-medium text-foreground/90 leading-snug">{bullet}</p>
                  </div>
                ))}
              </div>

              {/* Progressive Disclosure (Modal) */}
              <div className="mt-10 pt-10 border-t border-border">
                <Button 
                  variant="ghost" 
                  onClick={() => setIsOpen(true)}
                  className="p-0 h-auto hover:bg-transparent text-primary font-bold text-xs gap-2"
                >
                  閱讀完整故事
                  <ChevronDown className="size-3" />
                </Button>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                  </DialogHeader>
                  <DialogContent>
                    <div className="space-y-6">
                      {fullStory.map((p, i) => (
                        <p key={i} className="text-base text-foreground/80 leading-[1.8]">
                          {p}
                        </p>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export { StorySection }
