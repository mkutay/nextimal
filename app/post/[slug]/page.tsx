import { format } from 'date-fns';

import { getPost, getPostSlugs } from '@/lib/queries';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import Link from 'next/link';
import { components, options } from '@/components/mdx';
import { siteConfig } from '@/config/site';


export function generateMetadata({ params }: { params: { slug: string } }) {
  const props = getPost(params.slug);
  const formattedDate = format(props.meta.date, 'PP');

  return {
    title: props.meta.title,
    description: props.meta.description,
    openGraph: {
      title: props.meta.title,
      description: props.meta.description,
      url: siteConfig.url + '/posts/' + props.slug,
      locale: props.meta.locale,
      type: 'article',
      publishedTime: formattedDate,
      images: ['images/favicon.png'],
      siteName: siteConfig.name,
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);

  return (
    <main className="mx-auto prose prose-slate dark:prose-invert my-8 px-4">
      <p>
        <Link href="/">Home</Link>
      </p>
      <h1>
        {post.meta.title}
      </h1>
      <p className="text-muted-foreground">
        {post.meta.description}
      </p>
      <hr/>
      <p>
        {format(post.meta.date, 'PP')}
      </p>
      <MDXRemote source={post.content} options={options} components={components}/>
    </main>
  );
}

export function generateStaticParams() {
  return getPostSlugs().map((slug) => { slug });
}