import Head from 'next/head'

function Title({ title }: { title: string }) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default Title
