import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
afterEach(cleanup);
class ResizeObserverMock { observe(){} unobserve(){} disconnect(){} }
globalThis.ResizeObserver=ResizeObserverMock;
globalThis.requestAnimationFrame=(callback:FrameRequestCallback)=>setTimeout(callback,0) as unknown as number;
globalThis.cancelAnimationFrame=(id:number)=>clearTimeout(id);
