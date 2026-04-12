"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Post, PostCategory } from "@/lib/posts"

interface FilterablePostsProps {
  posts: Post[]
  categories: PostCategory[]
  locale: string
  allLabel: string
}

export function FilterablePosts({ posts, categories, locale, allLabel }: FilterablePostsProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const filteredPosts = activeCategory === "all" 
    ? posts 
    : posts.filter(post => post.categorySlug === activeCategory)

  const [featured, ...rest] = filteredPosts

  return (
    <div className="space-y-12">
      {/* Category Navigation */}
      <div className="relative">
        <div className="flex overflow-x-auto pb-8 pt-4 scrollbar-hide gap-2.5 px-4 justify-start md:justify-center">
          <button
            onClick={() => setActiveCategory("all")}
            className="shrink-0 group"
          >
            <Badge
              variant={activeCategory === "all" ? "default" : "outline"}
              className={cn(
                "cursor-pointer text-sm px-5 py-2.5 transition-all duration-300 rounded-full",
                activeCategory === "all" 
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                  : "hover:bg-primary/5 hover:border-primary/50 text-muted-foreground hover:text-primary"
              )}
            >
              {allLabel} ({posts.length})
            </Badge>
          </button>
          
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className="shrink-0 group"
            >
              <Badge
                variant={activeCategory === cat.slug ? "default" : "outline"}
                className={cn(
                  "cursor-pointer text-sm px-5 py-2.5 transition-all duration-300 rounded-full whitespace-nowrap",
                  activeCategory === cat.slug 
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                    : "hover:bg-primary/5 hover:border-primary/50 text-muted-foreground hover:text-primary"
                )}
              >
                {cat.name} ({cat.count})
              </Badge>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-12"
        >
          {/* 精選文章 (Only if posts exist) */}
          {featured ? (
            <div className="space-y-12">
              <Link
                href={`/${locale}/learning/${featured.slug}`}
                className="group block"
              >
                <Card className="overflow-hidden border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] transition-all duration-500 rounded-3xl">
                  <div className="grid md:grid-cols-5 gap-0">
                    <div className="md:col-span-2 bg-gradient-to-br from-primary/[0.08] via-primary/[0.03] to-accent/[0.08] flex items-center justify-center p-12 md:p-16 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjAzIi8+PC9zdmc+')] opacity-50" />
                      <span className="text-6xl md:text-8xl font-black text-primary/15 select-none leading-none relative z-10">
                        {featured.title.slice(0, 2)}
                      </span>
                    </div>
                    <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
                      <div className="mb-5 flex items-center gap-3">
                        <Badge variant="accent" className="px-3 py-1 rounded-lg uppercase tracking-wider text-[10px] font-bold">
                          {featured.category}
                        </Badge>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Featured Post</span>
                      </div>
                      <CardTitle className="text-2xl md:text-3xl mb-4 group-hover:text-primary transition-colors leading-tight font-bold">
                        {featured.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-base md:text-lg mb-6 text-muted-foreground/80 leading-relaxed">
                        {featured.excerpt}
                      </CardDescription>
                      <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground/60 border-t border-border/40 pt-6">
                        <span className="bg-muted px-2 py-1 rounded text-foreground/70">{featured.author}</span>
                        <span>·</span>
                        <span>{featured.date}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>

              {/* 文章列表 */}
              {rest.length > 0 && (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/${locale}/learning/${post.slug}`}
                      className="group"
                    >
                      <Card className="h-full flex flex-col overflow-hidden border-border/40 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/[0.02] transition-all duration-300 rounded-2xl bg-white">
                        <div className="h-1.5 bg-gradient-to-r from-primary/30 to-accent/30" />
                        <CardHeader className="pb-4 pt-6 px-6">
                          <div className="mb-3">
                            <Badge variant="secondary" className="text-[11px] font-bold px-2.5 py-0.5 rounded-md">
                              {post.category}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg leading-snug group-hover:text-primary transition-colors font-bold">
                            {post.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 pt-0 px-6">
                          <CardDescription className="line-clamp-2 text-sm text-muted-foreground/80 leading-relaxed">
                            {post.excerpt}
                          </CardDescription>
                        </CardContent>
                        <CardFooter className="text-[11px] font-medium text-muted-foreground/50 gap-3 pt-4 pb-6 px-6 border-t border-border/20">
                          <span className="text-foreground/60">{post.author}</span>
                          <span className="opacity-30">|</span>
                          <span>{post.date}</span>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="py-20 text-center rounded-3xl border border-dashed border-border/60 bg-muted/20">
              <p className="text-muted-foreground">此分類暫無文章內容。</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
