import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, boolean, jsonb } from 'drizzle-orm/pg-core';

// Define the 'users' table.
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// App State table (simple JSON document store for the entire state)
export const appState = pgTable('app_state', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  stateData: jsonb('state_data').notNull(), // Stores the entire state (contacts, incidents, etc)
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  appState: many(appState),
}));

export const appStateRelations = relations(appState, ({ one }) => ({
  author: one(users, {
    fields: [appState.userId],
    references: [users.id],
  }),
}));
