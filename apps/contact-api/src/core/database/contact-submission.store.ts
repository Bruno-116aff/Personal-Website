import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import Database from 'better-sqlite3';

import { CONTACT_CONFIG, type ContactConfig } from '../config/contact.config.js';

export type StoredContactSubmission = {
  email: string;
  id: number;
  message: string;
  name: string;
  submittedAt: string;
};

export type NewContactSubmission = Omit<StoredContactSubmission, 'id' | 'submittedAt'>;

export interface ContactSubmissionStore {
  save(submission: NewContactSubmission): number;
}

export const CONTACT_SUBMISSION_STORE = Symbol('CONTACT_SUBMISSION_STORE');

@Injectable()
export class SQLiteContactSubmissionStore implements ContactSubmissionStore, OnModuleDestroy {
  private readonly database: Database.Database;

  constructor(@Inject(CONTACT_CONFIG) config: ContactConfig) {
    if (config.databasePath !== ':memory:') {
      mkdirSync(dirname(config.databasePath), { recursive: true });
    }

    this.database = new Database(config.databasePath);
    this.database.pragma('journal_mode = WAL');
    this.database.exec(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        submitted_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  save(submission: NewContactSubmission) {
    const result = this.database
      .prepare('INSERT INTO contact_submissions (name, email, message) VALUES (?, ?, ?)')
      .run(submission.name, submission.email, submission.message);

    return Number(result.lastInsertRowid);
  }

  findById(id: number): StoredContactSubmission | undefined {
    const row = this.database
      .prepare('SELECT id, name, email, message, submitted_at FROM contact_submissions WHERE id = ?')
      .get(id) as { email: string; id: number; message: string; name: string; submitted_at: string } | undefined;

    if (!row) return undefined;

    return {
      id: row.id,
      name: row.name,
      email: row.email,
      message: row.message,
      submittedAt: row.submitted_at,
    };
  }

  onModuleDestroy() {
    this.database.close();
  }
}
