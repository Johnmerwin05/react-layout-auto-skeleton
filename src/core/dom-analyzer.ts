import type { SkeletonNode, SkeletonShape, SkeletonSnapshot } from '../types';

const structural = new Set(['DIV', 'SECTION', 'MAIN', 'ARTICLE', 'HEADER', 'FOOTER', 'NAV', 'UL', 'OL', 'FORM', 'TABLE', 'TBODY', 'THEAD', 'TR']);
const textTags = new Set(['P', 'SPAN', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LABEL', 'LI', 'TD', 'TH', 'A']);
const leafTags = new Set(['IMG', 'SVG', 'CANVAS', 'INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'HR', 'PROGRESS']);

function depthFrom(element: Element, root: Element) { let depth = 0; for (let p = element.parentElement; p && p !== root; p = p.parentElement) depth++; return depth; }
function visible(element: HTMLElement, style: CSSStyleDeclaration, rect: DOMRect) { return style.display !== 'none' && style.visibility !== 'hidden' && (!style.opacity || Number(style.opacity) !== 0) && rect.width > 0 && rect.height > 0 && !element.hidden; }
function shapeFor(el: HTMLElement, radius: string): SkeletonShape {
  const override = el.dataset.skeletonShape as SkeletonShape | undefined;
  if (override) return override;
  if (textTags.has(el.tagName) && !el.querySelector('img,svg,canvas,input,button')) return 'text';
  const r = parseFloat(radius); if (r >= Math.min(el.offsetWidth, el.offsetHeight) / 2 && Math.abs(el.offsetWidth - el.offsetHeight) < 3) return 'circle';
  return 'rect';
}
export function analyzeDOM(root: HTMLElement, maxDepth = 12, exclude = ''): SkeletonSnapshot {
  const rootRect = root.getBoundingClientRect(); const candidates = Array.from(root.querySelectorAll<HTMLElement>('*')); const nodes: SkeletonNode[] = [];
  for (const [index, el] of candidates.entries()) {
    if (depthFrom(el, root) > maxDepth || el.hasAttribute('data-skeleton-ignore') || (exclude && el.matches(exclude))) continue;
    const style = getComputedStyle(el); const rect = el.getBoundingClientRect(); if (!visible(el, style, rect)) continue;
    const preserve = el.hasAttribute('data-skeleton-preserve'); const hasVisibleChildren = Array.from(el.children).some(c => { const r = c.getBoundingClientRect(); return r.width > 0 && r.height > 0; });
    if (!preserve && structural.has(el.tagName) && hasVisibleChildren) continue;
    if (!preserve && !leafTags.has(el.tagName) && !textTags.has(el.tagName) && hasVisibleChildren) continue;
    const width = el.dataset.skeletonWidth ? resolveSize(el.dataset.skeletonWidth, rootRect.width, rect.width) : rect.width;
    const height = el.dataset.skeletonHeight ? resolveSize(el.dataset.skeletonHeight, rootRect.height, rect.height) : rect.height;
    const radius = el.dataset.skeletonRadius || style.borderRadius || '0px'; const lines = Number(el.dataset.skeletonLines || 0);
    if (lines > 1) { const lineHeight = height / lines; for (let line = 0; line < lines; line++) nodes.push({ id: `${index}-${line}`, x: rect.left - rootRect.left, y: rect.top - rootRect.top + line * lineHeight, width: line === lines - 1 ? width * .72 : width, height: Math.max(2, lineHeight * .64), radius, shape: 'text' }); }
    else nodes.push({ id: String(index), x: rect.left - rootRect.left, y: rect.top - rootRect.top, width, height, radius, shape: shapeFor(el, radius) });
  }
  const signature = nodes.map(n => `${Math.round(n.x)},${Math.round(n.y)},${Math.round(n.width)},${Math.round(n.height)}`).join('|');
  return { width: rootRect.width, height: rootRect.height, nodes, signature, createdAt: Date.now() };
}
function resolveSize(value: string, parent: number, fallback: number) { if (value.endsWith('%')) return parent * parseFloat(value) / 100; const parsed = parseFloat(value); return Number.isFinite(parsed) ? parsed : fallback; }
