import { postgresHandler } from '../dataSources/postgres';
import { FlagTypes } from '../types/enum_types';
import { FlagResponse } from '../types/object_types';
import { Flag } from './Flag';

export async function createFlag(
    this: postgresHandler,
    rev_id: number,
    category: FlagTypes,
    topic: string,
    intensity: number
): Promise<FlagResponse> {
    const r: FlagResponse = {};
    await this.knex<Flag>('flags')
        .insert({ intensity, topic, category, rev_id })
        .returning('*')
        .then((flags) => {
            r.flags = flags;
        })
        .catch((e) => {
            if (e.code === '23505') {
                r.errors = [{ message: 'email taken', field: 'email' }];
            } else {
                r.errors = [{ field: 'insert flag', message: e.message }];
            }
        });
    return r;
}

export async function getFlagsById(
    this: postgresHandler,
    ids: number[]
): Promise<FlagResponse> {
    const r: FlagResponse = {};
    await this.knex<Flag>('flags')
        .select('*')
        .where('flag_id', 'in', ids)
        .then((flags) => {
            r.flags = flags;
        })
        .catch(
            (e) => (r.errors = [{ field: 'query flag', message: e.toString() }])
        );

    return r;
}

export async function getFlagsByReviewId(
    this: postgresHandler,
    rev_id: number
): Promise<FlagResponse> {
    const r: FlagResponse = {};
    await this.knex<Flag>('flags')
        .select('*')
        .where('rev_id', '=', rev_id)
        .then((flags) => {
            r.flags = flags;
        })
        .catch(
            (e) => (r.errors = [{ field: 'query flag', message: e.toString() }])
        );

    return r;
}
