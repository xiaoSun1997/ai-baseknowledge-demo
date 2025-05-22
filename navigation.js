document.addEventListener('DOMContentLoaded', function() {
  // 移动端菜单切换
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if(mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // 高亮当前页面对应的导航链接
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath.split('/').pop() ||
      (currentPath.split('/').pop() === '' && link.getAttribute('href') === 'index.html')) {
      link.classList.add('text-gray-900');
      link.classList.remove('text-gray-600');
      link.classList.add('font-semibold');
    }
  });

  // 初始化目录滚动监听
  initTableOfContents();

  // 添加平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// 初始化文章目录滚动监听
function initTableOfContents() {
  const tocLinks = document.querySelectorAll('.article-toc a');
  const sections = document.querySelectorAll('h2[id], h3[id]');

  if (tocLinks.length === 0 || sections.length === 0) return;

  // 滚动监听
  window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop - 100) {
        currentSection = '#' + section.getAttribute('id');
      }
    });

    tocLinks.forEach(link => {
      link.classList.remove('text-blue-600', 'font-semibold');

      if (link.getAttribute('href') === currentSection) {
        link.classList.add('text-blue-600', 'font-semibold');
      }
    });
  });
}

// 图片加载错误处理
function handleImageError(img) {
  img.onerror = null;
  img.src = 'path/to/fallback-image.jpg';
  img.alt = '图片加载失败';
}

// 公共功能
