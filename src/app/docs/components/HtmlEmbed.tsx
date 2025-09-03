import fs from 'fs';
import path from 'path';
import React from 'react';

/**
 * Server component to read an HTML file from disk and inject its body content.
 * - Strips <!doctype>, <html>, <head>, and <body> wrappers.
 * - Keeps inline <style> blocks placed in <head> by moving them before the content.
 */
export default function HtmlEmbed({ relativePath }: { relativePath: string }) {
  const filePath = path.join(process.cwd(), relativePath);
  let raw = '';
  try {
    raw = fs.readFileSync(filePath, 'utf-8');
  } catch {
    raw = `<p>Could not load ${relativePath}. Ensure the file exists.</p>`;
  }

  // Extract <head> styles and body content when present
  let head = '';
  let body = raw;

  // Normalize newlines for simple regex
  const headMatch = raw.match(/<head[\s\S]*?>([\s\S]*?)<\/head>/i);
  const bodyMatch = raw.match(/<body[\s\S]*?>([\s\S]*?)<\/body>/i);

  if (headMatch) head = headMatch[1] ?? '';
  if (bodyMatch) body = bodyMatch[1] ?? raw;

  // Remove outer html tags and doctype if any remain
  body = body
    .replace(/<!doctype[^>]*>/gi, '')
    .replace(/<\/?html[^>]*>/gi, '')
    .trim();

  // Keep styles from head if present
  const stylesOnly = head
    .match(/<style[\s\S]*?<\/style>/gi)
    ?.join('\n') ?? '';

  const html = `${stylesOnly}\n${body}`;

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
