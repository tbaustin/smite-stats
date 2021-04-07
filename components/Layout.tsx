import React from 'react'
import Head from 'next/head'

export default function Layout(props) {
  const { children, title } = props

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col h-screen p-3">
        <header className="flex-shrink">
          <nav>Navigation</nav>
        </header>
        <div className="flex-grow p-6">
          {children}
        </div>
        <footer className="flex-shrink">
        I'm the footer
      </footer>
      </main>
    </>
  )
}