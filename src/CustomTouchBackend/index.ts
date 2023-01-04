import type { BackendFactory, DragDropManager } from 'dnd-core';

import type { TouchBackendContext, TouchBackendOptions } from './interfaces';
import { TouchBackendImpl } from './TouchBackendImpl';

export * from './interfaces.js';
export * from './TouchBackendImpl';

export const TouchBackend: BackendFactory = function createBackend(
  manager: DragDropManager,
  context: TouchBackendContext = {},
  options: Partial<TouchBackendOptions> = {}
): TouchBackendImpl {
  return new TouchBackendImpl(manager, context, options);
};
