import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

// Projeyi detaylı getir (gruplar ve ürünlerle birlikte)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);

    if (isNaN(projectId)) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 });
    }

    const db = getDatabase();
    
    // Proje bilgisi
    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(projectId);
    
    if (!project) {
      return NextResponse.json({ error: 'Proje bulunamadı' }, { status: 404 });
    }

    // Proje grupları
    const groups = db.prepare('SELECT * FROM project_groups WHERE project_id = ? ORDER BY sort_order').all(projectId);
    
    // Proje ürünleri
    const items = db.prepare('SELECT * FROM project_items WHERE project_id = ? ORDER BY sort_order').all(projectId);

    return NextResponse.json({
      ...project,
      groups,
      items
    });

  } catch (error) {
    console.error('Proje getirilirken hata:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Projeyi güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);

    if (isNaN(projectId)) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 });
    }

    const body = await request.json();
    const { name, description } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Proje adı gereklidir' }, { status: 400 });
    }

    const db = getDatabase();
    
    const result = db.prepare(`
      UPDATE projects 
      SET name = ?, description = ?, updated_at = datetime('now')
      WHERE id = ?
    `).run(name, description || null, projectId);

    if (result.changes === 0) {
      return NextResponse.json({ error: 'Proje bulunamadı' }, { status: 404 });
    }

    const updatedProject = db.prepare('SELECT * FROM projects WHERE id = ?').get(projectId);
    
    return NextResponse.json(updatedProject);

  } catch (error) {
    console.error('Proje güncellenirken hata:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Projeyi sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);

    if (isNaN(projectId)) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 });
    }

    const db = getDatabase();
    
    const result = db.prepare('DELETE FROM projects WHERE id = ?').run(projectId);

    if (result.changes === 0) {
      return NextResponse.json({ error: 'Proje bulunamadı' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Proje başarıyla silindi' });

  } catch (error) {
    console.error('Proje silinirken hata:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
