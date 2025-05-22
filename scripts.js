
// 显示引用工具提示
function setupCitationTooltips() {
  const citations = document.querySelectorAll('.citation');

  citations.forEach(citation => {
    citation.addEventListener('mouseenter', function() {
      const citationId = this.getAttribute('data-citation');
      const citationText = document.querySelector(`#citation-${citationId}`).textContent;

      const tooltip = document.createElement('div');
      tooltip.className = 'citation-tooltip bg-black text-white text-xs rounded px-2 py-1 absolute z-10';
      tooltip.style.bottom = '100%';
      tooltip.style.left = '50%';
      tooltip.style.transform = 'translateX(-50%)';
      tooltip.style.whiteSpace = 'nowrap';
      tooltip.style.marginBottom = '5px';
      tooltip.textContent = citationText;

      this.style.position = 'relative';
      this.appendChild(tooltip);
    });

    citation.addEventListener('mouseleave', function() {
      const tooltip = this.querySelector('.citation-tooltip');
      if (tooltip) {
        tooltip.remove();
      }
    });
  });
}

// 启用代码语法高亮
function highlightCode() {
  document.querySelectorAll('pre code').forEach(block => {
    hljs.highlightBlock(block);
  });
}

// 创建图像查看器
function createImageViewer() {
  document.querySelectorAll('.article-content img').forEach(img => {
    img.addEventListener('click', function() {
      const overlay = document.createElement('div');
      overlay.className = 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50';

      const imgContainer = document.createElement('div');
      imgContainer.className = 'relative max-w-screen-lg max-h-screen p-4';

      const image = document.createElement('img');
      image.src = this.src;
      image.className = 'max-w-full max-h-[90vh] object-contain';

      const closeButton = document.createElement('button');
      closeButton.className = 'absolute top-0 right-0 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center';
      closeButton.innerHTML = '×';
      closeButton.addEventListener('click', () => overlay.remove());

      imgContainer.appendChild(image);
      imgContainer.appendChild(closeButton);
      overlay.appendChild(imgContainer);

      overlay.addEventListener('click', e => {
        if (e.target === overlay) overlay.remove();
      });

      document.body.appendChild(overlay);
    });

    // 添加可点击的视觉提示
    img.classList.add('cursor-zoom-in', 'hover:opacity-90', 'transition-opacity');
  });
}

// 文章内容加载
function loadArticleContent(contentModule, containerId) {
  const container = document.getElementById(containerId);
  if (!container || !contentModule) return;

  container.innerHTML = contentModule.render();

  // 初始化交互功能
  setupCitationTooltips();
  createImageViewer();

  // 延迟加载图片
  const lazyImages = document.querySelectorAll('.lazy-load');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy-load');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // 不支持 IntersectionObserver 的回退
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.classList.remove('lazy-load');
    });
  }
}

// 初始化文章页面
document.addEventListener('DOMContentLoaded', function() {
  // 根据页面动态加载相应内容
  const pageId = document.body.id;

  if (pageId === 'rag-page') {
    loadArticleContent(ragContent, 'article-container');
  } else if (pageId === 'function-calling-page') {
    loadArticleContent(functionCallingContent, 'article-container');
  } else if (pageId === 'mcp-page') {
    loadArticleContent(mcpContent, 'article-container');
  } else if (pageId === 'ai-agent-page') {
    loadArticleContent(aiAgentContent, 'article-container');
  } else if (pageId === 'embodied-agent-page') {
    loadArticleContent(embodiedAgentContent, 'article-container');
  }

  // 部分页面模态演示
  const demoButtons = document.querySelectorAll('.demo-trigger');
  demoButtons.forEach(button => {
    button.addEventListener('click', function() {
      const demoId = this.getAttribute('data-demo');
      const demoContainer = document.getElementById(demoId);

      if (demoContainer) {
        demoContainer.classList.remove('hidden');

        const closeBtn = demoContainer.querySelector('.close-demo');
        if (closeBtn) {
          closeBtn.addEventListener('click', () => {
            demoContainer.classList.add('hidden');
          });
        }

        demoContainer.addEventListener('click', e => {
          if (e.target === demoContainer) {
            demoContainer.classList.add('hidden');
          }
        });
      }
    });
  });
});
