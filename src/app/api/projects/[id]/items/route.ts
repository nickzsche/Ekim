import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

// Projeye ürün ekle
export async function POST(
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
    const { 
      group_id, 
      product_id, 
      product_name, 
      quantity, 
      unit_price, 
      discount, 
      margin, 
      sales_price, 
      square_meters 
    } = body;

    const db = getDatabase();
    
    const result = db.prepare(`
      INSERT INTO project_items 
      (project_id, group_id, product_id, product_name, quantity, unit_price, discount, margin, sales_price, square_meters)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      projectId, 
      group_id || null, 
      product_id, 
      product_name, 
      quantity || 1, 
      unit_price || 0, 
      discount || 0, 
      margin || 0, 
      sales_price || 0, 
      square_meters || 0
    );

    const newItem = db.prepare('SELECT * FROM project_items WHERE id = ?').get(result.lastInsertRowid);
    
    return NextResponse.json(newItem);

  } catch (error) {
    console.error('Ürün eklenirken hata:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Proje ürünlerini toplu güncelle
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
    const { items, groups } = body;

    const db = getDatabase();
    
    // Mevcut ürünleri ve grupları sil
    db.prepare('DELETE FROM project_items WHERE project_id = ?').run(projectId);
    db.prepare('DELETE FROM project_groups WHERE project_id = ?').run(projectId);

    // Grupları ekle
    if (groups && Array.isArray(groups)) {
      for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        db.prepare(`
          INSERT INTO project_groups (project_id, name, sort_order)
          VALUES (?, ?, ?)
        `).run(projectId, group.name, i);
      }
    }

    // Ürünleri ekle
    if (items && Array.isArray(items)) {
      const groupMap = new Map();
      const groupRows = db.prepare('SELECT * FROM project_groups WHERE project_id = ?').all(projectId);
      (groupRows as any[]).forEach(g => groupMap.set(g.name, g.id));

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const groupId = item.groupName ? groupMap.get(item.groupName) : null;
        
        db.prepare(`
          INSERT INTO project_items 
          (project_id, group_id, product_id, product_name, quantity, unit_price, discount, margin, sales_price, square_meters, sort_order)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          projectId,
          groupId || null,
          item.product_id,
          item.product_name,
          item.quantity || 1,
          item.unit_price || 0,
          item.discount || 0,
          item.margin || 0,
          item.sales_price || 0,
          item.square_meters || 0,
          i
        );
      }
    }

    return NextResponse.json({ message: 'Proje ürünleri güncellendi' });

  } catch (error) {
    console.error('Ürünler güncellenirken hata:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
