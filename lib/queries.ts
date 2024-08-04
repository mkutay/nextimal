import { readdirSync, readFileSync } from 'fs';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import path from 'path';

export type postMeta = {
  title: string,
  description: string,
  date: string,
  locale: string,
};

export function getPostSlugs() {
  return readdirSync(path.join(process.cwd(), 'content'), { encoding: 'utf-8' }).map((filename) => filename.replace('.mdx', ''));
}

export function getPost(slug: string) {
  let markdownFile;
  
  try {
    markdownFile = readFileSync(path.join(process.cwd(), `content/${slug}.mdx`), 'utf-8');
  } catch (error) {
    notFound();
  }

  const { data: frontMatter, content } = matter(markdownFile);

  return {
    slug: slug,
    meta: frontMatter as postMeta,
    content: content,
  };
}