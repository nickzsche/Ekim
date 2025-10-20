import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function GET() {
  try {
    const db = getDatabase();
    const projects = db.prepare('SELECT * FROM projects ORDER BY created_at DESC').all();
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Projeler getirilirken hata:', error);
    return NextResponse.json(
      { error: 'Projeler getirilirken hata oluştu' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Proje adı gereklidir' }, { status: 400 });
    }

    const db = getDatabase();
    
    const result = db.prepare(`
      INSERT INTO projects (name, description)
      VALUES (?, ?)
    `).run(name, description || null);
    
    const newProject = db.prepare('SELECT * FROM projects WHERE id = ?').get(result.lastInsertRowid);
    
    return NextResponse.json(newProject);
  } catch (error) {
    console.error('Proje eklerken hata:', error);
    return NextResponse.json(
      { error: 'Proje eklenirken hata oluştu' },
      { status: 500 }
    );
  }
}
