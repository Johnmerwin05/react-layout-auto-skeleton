import type { CSSProperties, ReactNode } from 'react'; import type { AutoSkeletonOptions, SkeletonSnapshot } from '../types';
interface Props { snapshot?: SkeletonSnapshot; options: AutoSkeletonOptions; fallback?: ReactNode; }
export function SkeletonRenderer({ snapshot, options, fallback }: Props) {
  if (!snapshot?.nodes.length) return fallback ? <div className="ras-fallback">{fallback}</div> : <div className="ras-default" style={{minHeight:options.minHeight,minWidth:options.minWidth}}/>;
  return <div className="ras-overlay" aria-hidden="true">{snapshot.nodes.map(n => <span key={n.id} className={`ras-node ras-${options.animation} ras-${n.shape}`} style={{'--ras-x':`${n.x}px`,'--ras-y':`${n.y}px`,'--ras-w':`${Math.max(Number(options.minWidth)||0,n.width)}px`,'--ras-h':`${Math.max(Number(options.minHeight)||0,n.height)}px`,'--ras-radius': options.borderRadius==='auto'||options.borderRadius===undefined?n.radius:String(options.borderRadius)} as CSSProperties}/>)}</div>;
}
