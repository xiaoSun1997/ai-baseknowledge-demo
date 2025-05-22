const ragContent = {
  render: function() {
    return `
            <h2 id="definition" class="text-2xl font-bold mb-6 text-gray-900">1. 核心定义与基本原理</h2>
            <p class="mb-4 text-gray-700">
                检索增强生成（Retrieval-Augmented Generation，RAG）是一种结合信息检索（Retrieval）和大型语言模型（LLM）文本生成（Generation）的技术框架。它使LLM能够在生成回应时，引用其训练数据之外的<strong>外部、权威、最新的知识</strong>，从而克服LLM训练数据静态、知识有截止日期以及可能产生虚假信息（幻觉）的局限性。
            </p>

            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <p class="text-blue-700">
                    <strong>RAG的核心价值</strong>：允许AI模型访问和利用那些不在其训练数据中的信息，使其能生成基于最新、最相关外部知识的回答。
                </p>
            </div>

            <p class="mb-6 text-gray-700">
                RAG的工作原理基于一个简单而强大的流程：<strong>在LLM生成答案前，先从一个外部知识库中检索出与用户查询最相关的片段，然后将这些检索结果作为额外的上下文信息与原始查询一起输入给LLM</strong>，指导LLM生成更准确、更丰富、更具时效性的回答。
            </p>

            <div class="mb-10 rounded-lg overflow-hidden shadow-lg">
                <img src="https://www.nvidia.cn/content/nvidiaGDC/cn/zh_CN/glossary/retrieval-augmented-generation/_jcr_content/root/responsivegrid/nv_container_6840787/nv_image.coreimg.100.1070.png/1725282254025/rag-diagram-1920x1080.png"
                     alt="RAG基本原理示意图"
                     class="w-full">
                <div class="p-4 bg-gray-50">
                    <p class="text-sm text-gray-600 text-center">图1：RAG系统的基本工作流程，包括索引、检索和生成三个主要阶段</p>
                </div>
            </div>

            <p class="mb-4 text-gray-700">
                RAG技术的核心流程通常包含三个主要阶段：
            </p>

            <ol class="list-decimal pl-6 mb-6 text-gray-700 space-y-2">
                <li><strong>索引（Indexing）</strong>：将外部知识源（如文档、网页、数据库）处理成可检索的形式，通常涉及文本分块、生成向量嵌入，并存储在向量数据库中。</li>
                <li><strong>检索（Retrieval）</strong>：当用户提出问题时，系统将问题转换成查询向量，从索引中检索出最相关的知识片段。</li>
                <li><strong>生成（Generation）</strong>：将检索到的相关知识片段与原始问题一起提供给LLM，由LLM生成最终回答。</li>
            </ol>

            <h2 id="naive-rag" class="text-2xl font-bold mb-6 text-gray-900">2. 朴素RAG</h2>
            <p class="mb-4 text-gray-700">
                朴素RAG（Naive RAG）是2020年首次提出的最基础RAG实现方式，代表了RAG技术的初始阶段。它严格按照"索引 -> 检索 -> 生成"的三阶段顺序执行，实现相对直接，但也面临一些明显的局限性。
            </p>

            <div class="mb-10 rounded-lg overflow-hidden shadow-lg">
                <img src="https://pic4.zhimg.com/v2-71f7e2391c461cf243f7e6fdebfae0a5_1440w.jpg"
                     alt="朴素RAG流程图"
                     class="w-full">
                <div class="p-4 bg-gray-50">
                    <p class="text-sm text-gray-600 text-center">图2：朴素RAG的简化流程及存在的问题</p>
                </div>
            </div>

            <h3 class="text-xl font-semibold mb-4 text-gray-900">2.1 朴素RAG的工作流程</h3>
            <ol class="list-decimal pl-6 mb-6 text-gray-700 space-y-2">
                <li>
                    <strong>索引阶段</strong>：
                    <ul class="list-disc pl-6 mt-2 space-y-1">
                        <li>将原始文档简单地分割成固定大小的块（chunks）</li>
                        <li>对每个文本块生成向量嵌入（通常使用通用嵌入模型如OpenAI的text-embedding-ada-002）</li>
                        <li>将这些向量存储在向量数据库中（如Pinecone、Milvus等）</li>
                    </ul>
                </li>
                <li>
                    <strong>检索阶段</strong>：
                    <ul class="list-disc pl-6 mt-2 space-y-1">
                        <li>将用户查询转换为向量表示</li>
                        <li>通过向量相似度搜索找到最相似的Top-K个文本块</li>
                        <li>直接返回这些文本块，不做进一步处理</li>
                    </ul>
                </li>
                <li>
                    <strong>生成阶段</strong>：
                    <ul class="list-disc pl-6 mt-2 space-y-1">
                        <li>将检索到的文本块连同原始查询一起发送给LLM</li>
                        <li>LLM基于提供的上下文生成答案</li>
                    </ul>
                </li>
            </ol>

            <h3 class="text-xl font-semibold mb-4 text-gray-900">2.2 朴素RAG的局限性</h3>
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <p class="text-yellow-700 mb-2">
                    <strong>朴素RAG面临的主要问题：</strong>
                </p>
                <ul class="list-disc pl-6 text-yellow-700 space-y-1">
                    <li><strong>噪声干扰</strong>：检索结果中可能包含与查询相关性不高的信息，干扰LLM的理解</li>
                    <li><strong>检索冗余</strong>：多个检索结果可能包含重复信息，浪费有限的上下文窗口</li>
                    <li><strong>复杂查询理解不足</strong>：对于复杂或含糊的查询，直接检索往往效果不佳</li>
                    <li><strong>召回率有限</strong>：如果关键信息分散在多个文档中，简单检索可能遗漏重要内容</li>
                    <li><strong>上下文窗口限制</strong>：LLM的上下文窗口有限，无法容纳过多检索结果</li>
                </ul>
            </div>

            <p class="mb-6 text-gray-700">
                尽管存在这些局限性，朴素RAG作为一种基础实现，已经能够显著提升LLM回答特定领域问题的能力，尤其是在处理那些超出模型训练数据范围的问题时。然而，为了解决上述问题并进一步提高性能，RAG技术随后进化出了更加高级和复杂的形式。
            </p>

            <h2 id="advanced-rag" class="text-2xl font-bold mb-6 text-gray-900">3. 高级RAG</h2>
            <p class="mb-4 text-gray-700">
                高级RAG（Advanced RAG）是对朴素RAG的全面优化升级，通过在RAG流程的各个环节引入专门的优化技术，显著提升了检索质量和生成效果。高级RAG不再是简单的线性流程，而是在每个阶段都融入了更复杂、更智能的处理策略。
            </p>

            <div class="mb-10 rounded-lg overflow-hidden shadow-lg">
                <img src="https://baoyu.io/images/rag/advanced-rag-techniques-an-illustrated-overview/0_Gr_JqzdpHu7enWG9.webp"
                     alt="高级RAG优化示意图"
                     class="w-full">
                <div class="p-4 bg-gray-50">
                    <p class="text-sm text-gray-600 text-center">图3：高级RAG引入了多种优化技术，涵盖预检索、检索和后检索阶段</p>
                </div>
            </div>

            <h3 class="text-xl font-semibold mb-4 text-gray-900">3.1 高级RAG的优化策略</h3>

            <h4 class="text-lg font-medium mb-3 text-gray-900">3.1.1 预检索优化</h4>
            <ul class="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>
                    <strong>查询重写（Query Rewriting）</strong>
                    <p class="mt-1 text-gray-600">使用LLM对原始查询进行改写，生成多个语义相似但表达不同的变体，增加检索到相关内容的概率。例如，将"股票市场今天怎么样？"改写为"今日股市表现如何？"和"最新的股票市场指数是多少？"</p>
                </li>
                <li>
                    <strong>查询分解（Query Decomposition）</strong>
                    <p class="mt-1 text-gray-600">将复杂查询分解为多个简单子查询，分别检索后再整合结果。例如，"比较特斯拉和比亚迪的电池技术和市场份额"可分解为分别关于电池技术和市场份额的子查询。</p>
                </li>
                <li>
                    <strong>智能索引优化</strong>
                    <p class="mt-1 text-gray-600">使用更先进的文档分块策略（如语义分块而非固定大小分块），为文档添加元数据标签，使用领域适应的嵌入模型等，提高索引质量。</p>
                </li>
            </ul>

            <h4 class="text-lg font-medium mb-3 text-gray-900">3.1.2 检索过程优化</h4>
            <ul class="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>
                    <strong>混合检索（Hybrid Search）</strong>
                    <p class="mt-1 text-gray-600">结合稠密检索（向量相似度）和稀疏检索（关键词匹配，如BM25算法），平衡语义理解和关键词精确匹配的优势。</p>
                </li>
                <li>
                    <strong>多查询检索（Multi-Query Retrieval）</strong>
                    <p class="mt-1 text-gray-600">使用不同的查询变体并行检索，然后合并结果，提高查全率。</p>
                </li>
                <li>
                    <strong>元数据过滤（Metadata Filtering）</strong>
                    <p class="mt-1 text-gray-600">基于文档的元数据（如时间、来源、主题分类等）进行检索范围限定，提高检索效率和相关性。</p>
                </li>
            </ul>

            <div class="mb-10 rounded-lg overflow-hidden shadow-lg">
                <img src="https://baoyu.io/images/rag/advanced-rag-techniques-an-illustrated-overview/0_9cxhMMkUf8veRnRB.webp"
                     alt="高级RAG检索阶段优化"
                     class="w-full">
                <div class="p-4 bg-gray-50">
                    <p class="text-sm text-gray-600 text-center">图4：高级RAG的检索优化技术示意图</p>
                </div>
            </div>

            <h4 class="text-lg font-medium mb-3 text-gray-900">3.1.3 后检索优化</h4>
            <ul class="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>
                    <strong>重排序（Reranking）</strong>
                    <p class="mt-1 text-gray-600">使用更复杂的模型对初步检索结果进行二次评分和排序，将最相关的内容排在前面。例如，使用交叉编码器（Cross-encoder）模型评估查询与每个检索结果的精确匹配度。</p>
                </li>
                <li>
                    <strong>冗余过滤（Redundancy Filtering）</strong>
                    <p class="mt-1 text-gray-600">检测并移除检索结果中的重复信息，优化上下文窗口利用。</p>
                </li>
                <li>
                    <strong>提示压缩（Prompt Compression）</strong>
                    <p class="mt-1 text-gray-600">使用LLM提取检索结果的核心信息，生成更紧凑的摘要，以便在有限的上下文窗口中包含更多信息。</p>
                </li>
                <li>
                    <strong>信息过滤与整合（Filtering and Synthesis）</strong>
                    <p class="mt-1 text-gray-600">根据相关性和重要性筛选信息，并将分散的信息整合成连贯的背景知识。</p>
                </li>
            </ul>

            <h3 class="text-xl font-semibold mb-4 text-gray-900">3.2 高级RAG的优势</h3>
            <p class="mb-4 text-gray-700">
                高级RAG通过上述优化策略，成功解决了朴素RAG面临的主要问题，带来了一系列显著的性能提升：
            </p>
            <ul class="list-disc pl-6 mb-6 text-gray-700 space-y-1">
                <li>更高的检索精度和召回率，确保找到最相关的信息</li>
                <li>更有效利用有限的上下文窗口，避免浪费在冗余或不相关内容上</li>
                <li>更好地理解复杂查询意图，提供更全面、准确的回答</li>
                <li>能够处理多步推理问题，即使所需知识分散在多个文档中</li>
                <li>生成更连贯、更相关、更准确的回答</li>
            </ul>

            <div class="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                <p class="text-green-700">
                    <strong>关键改进</strong>：高级RAG不再是简单的"检索然后生成"模式，而是在每个环节都引入了智能处理和优化。这种多层次的优化策略极大地提升了RAG系统的整体性能，使其能够处理更复杂的查询并提供更高质量的回答。
                </p>
            </div>

            <h2 id="modular-rag" class="text-2xl font-bold mb-6 text-gray-900">4. 模块化RAG</h2>
            <p class="mb-4 text-gray-700">
                模块化RAG（Modular RAG）代表了RAG技术的最新演进方向，是一种高度灵活、可重构的框架设计理念。与高级RAG专注于具体优化技术不同，模块化RAG关注的是系统架构本身，目标是构建一个能够适应各种场景需求、支持功能快速迭代的可扩展框架。
            </p>

            <div class="mb-10 rounded-lg overflow-hidden shadow-lg">
                <img src="https://hustyichi.github.io/img/in-post/module-rag/modular.png"
                     alt="模块化RAG框架图"
                     class="w-full">
                <div class="p-4 bg-gray-50">
                    <p class="text-sm text-gray-600 text-center">图5：模块化RAG框架设计，将RAG系统分解为可独立优化和组合的功能模块</p>
                </div>
            </div>

            <h3 class="text-xl font-semibold mb-4 text-gray-900">4.1 模块化RAG的核心理念</h3>
            <p class="mb-4 text-gray-700">
                模块化RAG的核心理念是将RAG的流程分解为多个独立的功能模块，每个模块专注于特定的功能，可以独立开发、测试和优化，再通过编排层（Orchestrator）灵活组合成完整的工作流：
            </p>

            <ul class="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>
                    <strong>组件解耦与标准化</strong>
                    <p class="mt-1 text-gray-600">将RAG流程分解为具有明确边界和标准接口的独立组件，每个组件可以被单独替换或升级。</p>
                </li>
                <li>
                    <strong>可配置的流程编排</strong>
                    <p class="mt-1 text-gray-600">使用专门的编排层来定义和管理组件之间的数据流和控制流，支持非线性、条件分支和循环等复杂流程。</p>
                </li>
                <li>
                    <strong>插件化扩展机制</strong>
                    <p class="mt-1 text-gray-600">提供统一的扩展接口，允许轻松集成第三方功能，如新的向量数据库、嵌入模型或特殊处理算法。</p>
                </li>
            </ul>

            <h3 class="text-xl font-semibold mb-4 text-gray-900">4.2 模块化RAG的典型模块</h3>
            <div class="overflow-x-auto mb-8">
                <table class="min-w-full bg-white border border-gray-200 text-gray-700">
                    <thead>
                        <tr>
                            <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">模块类型</th>
                            <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">功能描述</th>
                            <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">示例技术/算法</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200 font-medium">索引模块</td>
                            <td class="py-2 px-4 border-b border-gray-200">管理文档的加载、预处理、分块和向量化</td>
                            <td class="py-2 px-4 border-b border-gray-200">语义分块、递归分块、嵌入模型选择与微调</td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200 font-medium">预检索模块</td>
                            <td class="py-2 px-4 border-b border-gray-200">处理查询意图理解、查询重写和分解</td>
                            <td class="py-2 px-4 border-b border-gray-200">HyDE、多查询扩展、查询路由</td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200 font-medium">检索模块</td>
                            <td class="py-2 px-4 border-b border-gray-200">执行实际检索操作，获取相关文档</td>
                            <td class="py-2 px-4 border-b border-gray-200">向量检索、关键词检索、混合检索、多级检索</td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200 font-medium">后检索模块</td>
                            <td class="py-2 px-4 border-b border-gray-200">优化检索结果，提高质量</td>
                            <td class="py-2 px-4 border-b border-gray-200">重排序、结果融合、去重、摘要生成</td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200 font-medium">生成模块</td>
                            <td class="py-2 px-4 border-b border-gray-200">构建提示、调用LLM生成回答</td>
                            <td class="py-2 px-4 border-b border-gray-200">提示工程、多轮生成、自我批评与修正</td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200 font-medium">编排模块</td>
                            <td class="py-2 px-4 border-b border-gray-200">协调各模块工作，控制流程执行</td>
                            <td class="py-2 px-4 border-b border-gray-200">工作流引擎、条件路由、循环控制</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="mb-10 rounded-lg overflow-hidden shadow-lg">
                <img src="https://www.shxcj.com/wp-content/uploads/2024/11/45265f14-d12e-4758-80a2-deffa1bf78a6.png"
                     alt="模块化RAG六大核心模块示意图"
                     class="w-full">
                <div class="p-4 bg-gray-50">
                    <p class="text-sm text-gray-600 text-center">图6：模块化RAG的六大核心模块及其关系</p>
                </div>
            </div>

            <h3 class="text-xl font-semibold mb-4 text-gray-900">4.3 模块化RAG的高级应用场景</h3>
            <p class="mb-4 text-gray-700">
                模块化RAG的灵活架构使其能够支持一系列复杂应用场景，这些场景通常难以用传统RAG方式有效处理：
            </p>

            <ul class="list-disc pl-6 mb-6 text-gray-700 space-y-3">
                <li>
                    <strong>多源异构数据融合</strong>
                    <p class="mt-1 text-gray-600">可以同时接入文档库、关系型数据库、知识图谱、API等多种信息源，构建全面的知识检索网络，并根据查询特点动态选择最合适的数据源。</p>
                </li>
                <li>
                    <strong>层次化检索（Hierarchical Retrieval）</strong>
                    <p class="mt-1 text-gray-600">先进行粗粒度检索确定相关领域或文档，再进行细粒度检索获取具体内容，提高检索效率和准确性，特别适合处理超大规模知识库。</p>
                </li>
                <li>
                    <strong>迭代深化检索（Iterative Retrieval）</strong>
                    <p class="mt-1 text-gray-600">基于初步检索结果和用户反馈进行多轮检索，逐步聚焦和扩展相关信息。例如，先检索基础概念，再基于理解深入检索更专业的内容。</p>
                </li>
                <li>
                    <strong>知识推理与整合</strong>
                    <p class="mt-1 text-gray-600">不仅检索已有事实，还能基于检索到的多项事实进行逻辑推导，回答文档中没有直接给出但可以推理得出的问题。</p>
                </li>
            </ul>

            <h3 class="text-xl font-semibold mb-4 text-gray-900">4.4 模块化RAG的优势</h3>
            <div class="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
                <p class="text-purple-700 mb-2">
                    <strong>模块化RAG相比传统RAG的核心优势：</strong>
                </p>
                <ul class="list-disc pl-6 text-purple-700 space-y-1">
                    <li><strong>极高的灵活性</strong>：能够根据不同任务需求快速配置最合适的模块组合</li>
                    <li><strong>可扩展性</strong>：轻松集成新技术和算法，无需重构整个系统</li>
                    <li><strong>持续迭代优化</strong>：可以针对特定模块进行独立优化，然后无缝替换</li>
                    <li><strong>更好的可维护性</strong>：模块化设计使系统更易于理解、调试和维护</li>
                    <li><strong>支持复杂流程</strong>：能够实现条件分支、循环等非线性流程，满足复杂业务需求</li>
                </ul>
            </div>

            <h2 id="evolution" class="text-2xl font-bold mb-6 text-gray-900">5. RAG演化路径总结</h2>
            <p class="mb-6 text-gray-700">
                从2020年首次提出至今，RAG技术经历了从简单到复杂，从固定流程到灵活架构的显著演化。这一演化路径反映了AI技术社区对提高LLM与外部知识结合能力的持续探索：
            </p>

            <div class="overflow-x-auto mb-8">
                <table class="min-w-full bg-white border border-gray-200 text-gray-700">
                    <thead>
                        <tr>
                            <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">阶段</th>
                            <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">核心特点</th>
                            <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">主要局限</th>
                            <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">技术突破</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200 font-medium">朴素RAG<br>(2020年)</td>
                            <td class="py-2 px-4 border-b border-gray-200">简单线性流程，直接检索后生成</td>
                            <td class="py-2 px-4 border-b border-gray-200">检索噪声，冗余，理解不足</td>
                            <td class="py-2 px-4 border-b border-gray-200">将检索与生成结合的基本框架</td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200 font-medium">高级RAG<br>(2021-2022年)</td>
                            <td class="py-2 px-4 border-b border-gray-200">各阶段增加优化策略，提高质量</td>
                            <td class="py-2 px-4 border-b border-gray-200">架构灵活性不足，难以适应多样场景</td>
                            <td class="py-2 px-4 border-b border-gray-200">查询重写，混合检索，重排序等技术</td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200 font-medium">模块化RAG<br>(2023年至今)</td>
                            <td class="py-2 px-4 border-b border-gray-200">解耦组件，可重构，灵活编排</td>
                            <td class="py-2 px-4 border-b border-gray-200">实现复杂度高，需要更多工程投入</td>
                            <td class="py-2 px-4 border-b border-gray-200">模块化架构，工作流编排，多源数据融合</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="mb-10 rounded-lg overflow-hidden shadow-lg">
                <img src="https://image.woshipm.com/wp-files/2024/08/4WImUSkwnwvrCOucOae8.png"
                     alt="RAG演化路径示意图"
                     class="w-full">
                <div class="p-4 bg-gray-50">
                    <p class="text-sm text-gray-600 text-center">图7：RAG技术从朴素到高级再到模块化的演化历程</p>
                </div>
            </div>

            <p class="mb-4 text-gray-700">
                RAG技术的演化反映了AI系统与外部知识结合的几个重要趋势：
            </p>
            <ul class="list-disc pl-6 mb-6 text-gray-700 space-y-1">
                <li><strong>从固定流程到灵活架构</strong>：越来越倾向于可配置、可扩展的系统设计</li>
                <li><strong>从通用解决方案到场景化定制</strong>：针对不同应用领域和需求优化检索策略</li>
                <li><strong>从单一模式到混合方法</strong>：结合多种技术和算法，取长补短</li>
                <li><strong>从静态检索到动态交互</strong>：支持多轮对话和迭代深化的信息获取</li>
                <li><strong>从单一知识源到知识网络</strong>：整合多种格式、来源的知识，构建更全面的知识体系</li>
            </ul>

            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <p class="text-blue-700">
                    <strong>发展趋势</strong>：RAG技术正朝着更加智能、灵活和场景化的方向发展。未来的RAG系统将能够更好地理解用户意图，主动寻找和整合相关信息，提供更具洞察力的回答，成为知识密集型AI应用的核心基础架构。
                </p>
            </div>

            <h2 id="demo" class="text-2xl font-bold mb-6 text-gray-900">6. 演示案例</h2>
            <p class="mb-6 text-gray-700">
                下面通过一个具体案例，展示RAG技术在实际应用中的工作方式和价值。本案例以企业内部知识问答系统为背景，分别展示朴素RAG、高级RAG和模块化RAG的处理方式与效果差异。
            </p>

            <div class="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
                <div class="p-6">
                    <h3 class="text-xl font-bold mb-4 text-gray-900">案例：企业内部知识问答系统</h3>

                    <p class="mb-4 text-gray-700">
                        <strong>背景</strong>：一家大型企业拥有大量内部文档（产品手册、技术规范、政策文件、会议记录等），员工需要快速查询这些文档中的信息。
                    </p>

                    <p class="mb-4 text-gray-700">
                        <strong>用户查询</strong>：<em>"公司最新的差旅报销政策有哪些更新？特别是对于国际差旅的规定。"</em>
                    </p>

                    <div class="mt-8">
                        <h4 class="text-lg font-semibold mb-4 text-gray-900 border-b pb-2">朴素RAG方案处理流程</h4>
                        <ol class="list-decimal pl-6 mb-4 text-gray-700 space-y-2">
                            <li><strong>索引阶段</strong>：将所有内部文档按固定大小（如1000字符）分块，生成向量嵌入，存储在向量数据库中。</li>
                            <li><strong>检索阶段</strong>：将用户问题向量化，检索出最相似的5个文档块。</li>
                            <li><strong>生成阶段</strong>：将这5个文档块与问题一起交给LLM生成回答。</li>
                        </ol>

                        <p class="text-red-600 mb-2"><strong>潜在问题</strong>：</p>
                        <ul class="list-disc pl-6 mb-4 text-gray-700 space-y-1">
                            <li>检索可能同时返回新旧版本的差旅政策文档，造成混淆</li>
                            <li>国际差旅规定可能分散在多个文档中，单次检索难以全部获取</li>
                            <li>检索结果可能包含无关的会议记录（仅因提及了"差旅政策"）</li>
                        </ul>

                        <div class="bg-gray-100 p-4 rounded-lg mb-4">
                            <p class="text-gray-800 font-medium">朴素RAG回答：</p>
                            <p class="text-gray-700 italic mt-2">
                                根据提供的上下文，公司最新的差旅报销政策有一些更新。文档提到了差旅报销相关内容，但具体更新内容不完全清晰。关于国际差旅，提到需要提前申请批准，但具体规定细节在提供的文档段落中未完全覆盖。建议查阅完整的差旅政策文档获取更详细信息。
                            </p>
                        </div>
                    </div>

                    <div class="mt-8">
                        <h4 class="text-lg font-semibold mb-4 text-gray-900 border-b pb-2">高级RAG方案处理流程</h4>
                        <ol class="list-decimal pl-6 mb-4 text-gray-700 space-y-2">
                            <li>
                                <strong>预检索优化</strong>：
                                <ul class="list-disc pl-6 mt-1 text-gray-600">
                                    <li>查询分解：将问题分解为两部分 - "最新差旅报销政策更新"和"国际差旅规定"</li>
                                    <li>添加元数据约束：限定文档类型为"政策文件"，时间范围为"过去3个月"</li>
                                </ul>
                            </li>
                            <li>
                                <strong>检索阶段</strong>：
                                <ul class="list-disc pl-6 mt-1 text-gray-600">
                                    <li>对分解的两个子问题分别进行检索</li>
                                    <li>使用混合检索（结合向量检索和关键词匹配）提高准确度</li>
                                </ul>
                            </li>
                            <li>
                                <strong>后检索处理</strong>：
                                <ul class="list-disc pl-6 mt-1 text-gray-600">
                                    <li>对结果进行重排序，确保最新版本的政策排在前面</li>
                                    <li>过滤掉重复信息和低相关度的文档片段</li>
                                </ul>
                            </li>
                            <li><strong>生成阶段</strong>：将优化后的检索结果提供给LLM，并指导它关注政策更新和国际差旅部分。</li>
                        </ol>

                        <div class="bg-gray-100 p-4 rounded-lg mb-4">
                            <p class="text-gray-800 font-medium">高级RAG回答：</p>
                            <p class="text-gray-700 italic mt-2">
                                公司最新的差旅报销政策（更新于上个月）有以下几点重要更新：
                                <br><br>1. 国内差旅标准：住宿费上限提高10%，餐饮补贴保持不变。
                                <br>2. 报销流程简化：引入电子发票快速通道，处理时间从7个工作日缩短至3个工作日。
                                <br><br>针对国际差旅的新规定：
                                <br>1. 所有国际出差必须提前15个工作日（原先为10天）提交申请并获得部门总监批准。
                                <br>2. 疫情后新增：前往部分国家需提供额外健康证明和保险证明。
                                <br>3. 国际差旅住宿标准按目的地分为三个级别，详细标准可查阅政策附录A。
                                <br>4. 外币报销汇率以出发日汇率为准，不再是报销日汇率。
                                <br><br>详细内容可在公司内网"政策文件-人事行政-差旅管理"栏目查阅完整文档。
                            </p>
                        </div>
                    </div>

                    <div class="mt-8">
                        <h4 class="text-lg font-semibold mb-4 text-gray-900 border-b pb-2">模块化RAG方案处理流程</h4>
                        <p class="mb-4 text-gray-700">
                            模块化RAG可以根据问题特点动态构建最合适的处理流程：
                        </p>
                        <ol class="list-decimal pl-6 mb-4 text-gray-700 space-y-2">
                            <li>
                                <strong>用户意图理解模块</strong>：
                                <ul class="list-disc pl-6 mt-1 text-gray-600">
                                    <li>识别出用户关心两个方面：政策更新概况和国际差旅具体规定</li>
                                    <li>判断这是一个需要多源信息整合的复杂查询</li>
                                </ul>
                            </li>
                            <li>
                                <strong>检索策略选择模块</strong>：
                                <ul class="list-disc pl-6 mt-1 text-gray-600">
                                    <li>选择"分阶段检索"策略：先确定最新政策文档，再深入检索相关内容</li>
                                    <li>启用多源检索：同时查询政策库、会议记录库（可能包含政策讨论）和知识库</li>
                                </ul>
                            </li>
                            <li>
                                <strong>层次化检索执行</strong>：
                                <ul class="list-disc pl-6 mt-1 text-gray-600">
                                    <li>第一层：检索"差旅政策"相关文档，筛选出最新版本</li>
                                    <li>第二层：在最新版本中定向检索"政策更新"和"国际差旅"部分</li>
                                    <li>第三层：补充检索近期关于差旅政策的会议记录，获取背景信息</li>
                                </ul>
                            </li>
                            <li>
                                <strong>知识整合模块</strong>：
                                <ul class="list-disc pl-6 mt-1 text-gray-600">
                                    <li>整合政策文档和会议记录中的信息</li>
                                    <li>提取核心变化点，形成结构化的对比信息</li>
                                </ul>
                            </li>
                            <li>
                                <strong>回答生成与个性化</strong>：
                                <ul class="list-disc pl-6 mt-1 text-gray-600">
                                    <li>根据用户角色（如：是否为管理层）定制回答详细程度</li>
                                    <li>添加针对用户部门的特定提示（如：研发部出差有特殊规定）</li>
                                </ul>
                            </li>
                        </ol>

                        <div class="bg-gray-100 p-4 rounded-lg">
                            <p class="text-gray-800 font-medium">模块化RAG回答：</p>
                            <p class="text-gray-700 italic mt-2">
                                根据2024年5月15日更新的《公司差旅管理规定V4.2》，差旅政策有以下重要更新：

                                <br><br><strong>一、主要政策更新点</strong>（相比上一版V4.1）：
                                <br>1. 国内差旅：
                                   <br>• 住宿标准上调：一线城市上限增至800元/晚（原750元）
                                   <br>• 交通报销：新增商务舱使用条件（连续飞行超8小时）
                                   <br>• 简化审批：总监以下级别差旅预算3000元以内免预审批

                                <br>2. 报销流程优化：
                                   <br>• 引入移动端报销，支持拍照上传
                                   <br>• 报销时限延长至差旅结束后30天（原为15天）
                                   <br>• 电子发票快速通道，3个工作日内完成审核

                                <br><br><strong>二、国际差旅专项规定</strong>：
                                <br>1. 申请与审批：
                                   <br>• 提前申请时间延长：15个工作日（原10天）
                                   <br>• 审批流程新增风险评估环节（安全、合规、健康）

                                <br>2. 住宿与补贴标准：
                                   <br>• 国家分级调整：按商务成本指数重新划分为A/B/C三类
                                   <br>• C类国家（如您所在研发部常去的新加坡、日本）住宿标准上调20%
                                   <br>• 新增时差倒时区补贴：跨5个及以上时区有1天调整假

                                <br>3. 财务与报销规定：
                                   <br>• 外币报销采用出发日汇率（旧政策为报销日汇率）
                                   <br>• 国际信用卡额度由5000美元提升至8000美元
                                   <br>• 取消手续费报销上限，改为实报实销

                                <br><br>补充信息：根据上周管理层会议记录，此次政策调整主要考虑到业务全球化发展需求和旅行成本上涨因素。特别提醒研发部同事，前往海外研发中心的长期差旅（>30天）适用特殊政策，请咨询部门专员获取详情。

                                <br><br>完整政策文档路径：内网>政策制度>行政人事>差旅管理V4.2
                                <br>如有疑问，可联系差旅管理员张经理（分机8025）。
                            </p>
                        </div>
                    </div>

                    <div class="mt-8">
                        <h4 class="text-lg font-semibold mb-4 text-gray-900 border-b pb-2">效果对比</h4>
                        <div class="overflow-x-auto">
                            <table class="min-w-full bg-white border border-gray-200 text-gray-700">
                                <thead>
                                    <tr>
                                        <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">方案</th>
                                        <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">信息完整性</th>
                                        <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">相关性</th>
                                        <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">结构化程度</th>
                                        <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">个性化程度</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="py-2 px-4 border-b border-gray-200 font-medium">朴素RAG</td>
                                        <td class="py-2 px-4 border-b border-gray-200">低</td>
                                        <td class="py-2 px-4 border-b border-gray-200">中低</td>
                                        <td class="py-2 px-4 border-b border-gray-200">低</td>
                                        <td class="py-2 px-4 border-b border-gray-200">无</td>
                                    </tr>
                                    <tr>
                                        <td class="py-2 px-4 border-b border-gray-200 font-medium">高级RAG</td>
                                        <td class="py-2 px-4 border-b border-gray-200">中高</td>
                                        <td class="py-2 px-4 border-b border-gray-200">高</td>
                                        <td class="py-2 px-4 border-b border-gray-200">中</td>
                                        <td class="py-2 px-4 border-b border-gray-200">低</td>
                                    </tr>
                                    <tr>
                                        <td class="py-2 px-4 border-b border-gray-200 font-medium">模块化RAG</td>
                                        <td class="py-2 px-4 border-b border-gray-200">高</td>
                                        <td class="py-2 px-4 border-b border-gray-200">高</td>
                                        <td class="py-2 px-4 border-b border-gray-200">高</td>
                                        <td class="py-2 px-4 border-b border-gray-200">高</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <p class="text-blue-700 mb-2">
                    <strong>案例总结</strong>
                </p>
                <p class="text-blue-700">
                    通过企业知识问答系统的案例，我们可以清晰看到RAG技术演化的价值：从朴素RAG的基础检索生成能力，到高级RAG的多环节优化，再到模块化RAG的智能策略选择和灵活流程编排。随着RAG技术的发展，AI系统能够提供越来越精确、全面、个性化的知识服务，真正成为人类知识工作的有力助手。
                </p>
            </div>

            <div class="mt-12 text-center">
                <button class="demo-trigger bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-colors"
                        data-demo="rag-demo">
                    体验互动演示
                </button>
                <p class="text-sm text-gray-600 mt-2">点击按钮体验RAG系统在企业知识库场景中的应用</p>
            </div>
        `;
  }
};
