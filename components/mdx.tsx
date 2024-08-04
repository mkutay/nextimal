import remarkGfm from 'remark-gfm';
import remarkLint from 'remark-lint';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { remarkCodeHike, recmaCodeHike } from 'codehike/mdx';
import { HighlightedCode, Pre } from 'codehike/code';
import Image from 'next/image';
import Link from 'next/link';
import { MDXComponents, MDXRemoteOptions } from 'next-mdx-remote-client/rsc';

import { siteConfig } from '@/config/site';
import React from 'react';

const chConfig = {
  components: { code: 'MyCode' },
  syntaxHighlighting: {
    theme: 'github-dark',
  },
};

export const options: MDXRemoteOptions = {
  mdxOptions: {
    baseUrl: siteConfig.url,
    remarkPlugins: [
      remarkGfm,
      remarkLint,
      remarkMath,
      [remarkCodeHike, chConfig],
    ],
    recmaPlugins: [
      [recmaCodeHike, chConfig],
    ],
    rehypePlugins: [rehypeKatex],
  }
};

export const components: MDXComponents = {
  MyCode: ({ codeblock }: { codeblock: HighlightedCode }) => (
    <Pre code={codeblock}/>
  ),
  a: (props: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => ( <Link href={props.href || ''}>{props.children}</Link> ),
  img: (props: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => ( <Image alt={props.alt || ''} src={props.src || ''} width={0} height={0} sizes="100vw" style={{ width: "100%", height: "auto" }}/> )
};