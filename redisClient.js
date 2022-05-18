import { createClient } from 'redis';
const client = createClient({ url: 'redis://redis:6379', legacyMode: true });

export default client;