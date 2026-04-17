import { initI18n } from './services/i18n.service.js';
import { bootstrapApp } from './app.js';

await initI18n();
await bootstrapApp();
