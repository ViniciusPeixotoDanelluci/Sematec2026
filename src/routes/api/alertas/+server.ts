import { json, error } from '@sveltejs/kit';
import db from '#lib/db.ts';
import { AlertStatus } from '#lib/types/alert-status.type.js';
import { ObstacleType } from '#lib/types/obstacle-type.ts';

export async function POST({ request }) {
    const form = await request.formData();

    const title = form.get('title')?.toString().trim();
    const description = form.get('description')?.toString().trim();
    const category = form.get('category')?.toString();
    const neighborhood = form.get('neighborhood')?.toString().trim();
    const street = form.get('street')?.toString().trim();
    const photo = form.get('photo');

    if (!title || !description || !neighborhood || !street) {
        throw error(400, 'Preencha todos os campos.');
    }
    if (!category) {
        throw error(400, 'Categoria inválida.');
    }
    if (!(photo instanceof File) || photo.size === 0) {
        throw error(400, 'Imagem obrigatória.');
    }

    const buffer = Buffer.from(await photo.arrayBuffer());

    const resultado = db
        .prepare(
            `INSERT INTO alertas (title, description, category, neighborhood, street, status, photo)
             VALUES (?, ?, ?, ?, ?, ?, ?)`
        )
        .run(title, description, category, neighborhood, street, AlertStatus.STANDBY, buffer);

    return json({ id: resultado.lastInsertRowid }, { status: 201 });
}