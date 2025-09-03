import { NextRequest } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

function contentTypeFor(ext: string): string {
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.webp':
      return 'image/webp';
    case '.gif':
      return 'image/gif';
    case '.svg':
      return 'image/svg+xml';
    default:
      return 'application/octet-stream';
  }
}

export async function GET(_req: NextRequest, context: { params: Promise<{ slug: string[] }> }) {
  const params = await context.params;
  const relPath = (params?.slug || []).join('/');

  // Prevent path traversal
  if (relPath.includes('..')) {
    return new Response('Bad Request', { status: 400 });
  }

  const baseDir = path.join(process.cwd(), 'src/app/docs/assets');
  const filePath = path.join(baseDir, relPath);

  try {
    const data = await fs.readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const ct = contentTypeFor(ext);
    return new Response(new Uint8Array(data), {
      headers: {
        'Content-Type': ct,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new Response('Not Found', { status: 404 });
  }
}
