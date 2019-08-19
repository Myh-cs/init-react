import React from 'react';

export default function BaseLayout(props) {
  const {children}=props;
  return (
    <div>
      <header>公共头部</header>
      <nav>公共导航</nav>
      <article>{children}</article>
      <aside>公共侧边栏</aside>
      <footer>公共页脚</footer>
    </div>
  )
}