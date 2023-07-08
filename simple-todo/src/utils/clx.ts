import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const clx = (...classes: ClassValue[]) => twMerge(clsx(classes))
