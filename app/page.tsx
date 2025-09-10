import { siteConfig } from '@/config/site';
import { getPost, getPostSlugs } from '@/lib/queries';
import me from '@/public/images/me.png';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  const posts = getPostSlugs();

  return (
    <main className="mx-auto prose prose-slate dark:prose-invert my-8 px-4">
      <div className="flex items-center justify-center">
        <Image
          src={me}
          alt={`portrait`}
          className="rounded-full max-w-72"
        />
      </div>
      <h1 className="text-center">
        {siteConfig.name}
      </h1>
      <p className="text-center">
        {siteConfig.description}
      </p>
      {posts.map((slug) => (
        <h2 key={slug}>
          <Link href={`/post/${slug}`}>
            {getPost(slug).meta.title}
          </Link>
        </h2>
      ))}
    </main>
  );
}
