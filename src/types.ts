import type { CSSProperties, ReactNode } from 'react';
export type SkeletonAnimation = 'shimmer' | 'pulse' | 'wave' | 'none';
export type SkeletonTheme = 'light' | 'dark' | 'auto';
export type SkeletonShape = 'text' | 'rect' | 'circle';
export interface SkeletonNode { id: string; x: number; y: number; width: number; height: number; radius: string; shape: SkeletonShape; }
export interface SkeletonSnapshot { width: number; height: number; nodes: SkeletonNode[]; signature: string; createdAt: number; }
export interface AutoSkeletonOptions {
  animation?: SkeletonAnimation; duration?: number; baseColor?: string; highlightColor?: string; borderRadius?: CSSProperties['borderRadius'];
  preserveLayout?: boolean; minWidth?: number; minHeight?: number; maxDepth?: number; exclude?: string; cache?: boolean;
  cacheKey?: string; loadingDelay?: number; minimumDuration?: number; transitionDuration?: number; tableRows?: number;
  responsive?: boolean; theme?: SkeletonTheme; fallback?: ReactNode; placeholderData?: ReactNode;
}
export interface AutoSkeletonProps extends AutoSkeletonOptions { loading: boolean; children: ReactNode; className?: string; }
export interface AutoSkeletonProviderProps extends AutoSkeletonOptions { children: ReactNode; }

declare module 'react' {
  interface HTMLAttributes<T> {
    'data-skeleton-ignore'?: boolean | '';
    'data-skeleton-shape'?: SkeletonShape;
    'data-skeleton-width'?: string;
    'data-skeleton-height'?: string;
    'data-skeleton-radius'?: string;
    'data-skeleton-lines'?: number | string;
    'data-skeleton-preserve'?: boolean | '';
  }
}
