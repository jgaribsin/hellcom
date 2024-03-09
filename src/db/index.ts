import {drizzle} from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import {config} from '../config';
import * as schema from './schema';
import {announcementChannels} from './schema';

const {DATABASE_URL} = config;

// https://orm.drizzle.team/kit-docs/quick#quick-start
// https://orm.drizzle.team/docs/get-started-postgresql#postgresjs
const queryClient = postgres(DATABASE_URL, {ssl: 'require'});
export const db = drizzle(queryClient, {schema});

type NewAnnouncementChannel = typeof schema.announcementChannels.$inferInsert;
type NewPersistentMessage = typeof schema.persistentMessages.$inferInsert;

export const newAnnouncementChannel = async (data: NewAnnouncementChannel) => {
  return db.insert(announcementChannels).values(data);
};

export const newPersistentMessage = async (data: NewPersistentMessage) => {
  return db.insert(schema.persistentMessages).values(data);
};

export {eq} from 'drizzle-orm';
export * from './schema';
