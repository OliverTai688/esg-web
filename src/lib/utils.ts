import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface ImpactMetric {
  value: number
  prefix: string
  suffix: string
  label: string
}

export function formatImpactMetric({ value, prefix, suffix }: Pick<ImpactMetric, "value" | "prefix" | "suffix">) {
  return `${prefix}${value.toLocaleString("en-US")}${suffix}`
}
