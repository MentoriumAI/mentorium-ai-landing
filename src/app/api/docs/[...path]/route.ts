import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: docPath } = await params;
    
    // Map docs paths to their corresponding HTML files
    let htmlFilePath = '';
    
    if (docPath.includes('pacasmayo') && docPath.includes('propuesta')) {
      htmlFilePath = path.join(process.cwd(), 'src/app/pages/pacasmayo/propuesta/propuesta.html');
    } else if (docPath.includes('pacasmayo') && docPath.includes('roadmap')) {
      htmlFilePath = path.join(process.cwd(), 'src/app/pages/pacasmayo/roadmap/roadmap.html');
    } else {
      // Fallback: try to construct the path
      const pathStr = docPath.join('/');
      htmlFilePath = path.join(process.cwd(), `src/app/pages/${pathStr}/${docPath[docPath.length - 1]}.html`);
    }
    
    // Read the HTML file
    if (!fs.existsSync(htmlFilePath)) {
      return NextResponse.json(
        { error: `HTML file not found: ${htmlFilePath}` },
        { status: 404 }
      );
    }
    
    const raw = fs.readFileSync(htmlFilePath, 'utf-8');
    
    // Extract body content (same logic as HtmlEmbedWithPresentation)
    let body = raw;
    const bodyMatch = raw.match(/<body[\s\S]*?>([\s\S]*?)<\/body>/i);
    
    if (bodyMatch) {
      body = bodyMatch[1] ?? raw;
    }
    
    // Remove outer html tags and doctype if any remain
    body = body
      .replace(/<!doctype[^>]*>/gi, '')
      .replace(/<\/?html[^>]*>/gi, '')
      .trim();
    
    return NextResponse.json({
      content: body,
      success: true
    });
    
  } catch (error) {
    console.error('Error serving docs content:', error);
    return NextResponse.json(
      { error: 'Failed to load document content' },
      { status: 500 }
    );
  }
}