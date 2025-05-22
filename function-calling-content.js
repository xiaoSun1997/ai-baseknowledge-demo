const functionCallingContent = {
  render: function() {
    return `
            <h2 id="definition" class="text-2xl font-bold mb-6 text-gray-900">1. 核心定义与基本原理</h2>
            <p class="mb-4 text-gray-700">
                函数调用（Function Calling）是一种使大型语言模型（LLM）能够识别何时应该调用外部函数并生成符合函数要求的参数的技术能力。这项技术允许模型与外部工具、API和服务进行交互，实质上是搭建了AI模型与现实世界系统之间的桥梁。
            </p>

            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <p class="text-blue-700">
                    <strong>核心价值</strong>：函数调用使LLM从"只会说话"变为"能够行动"，通过调用外部函数实现数据查询、计算、控制外部系统等无法通过纯语言生成完成的任务。
                </p>
            </div>

            <div class="mb-10 rounded-lg overflow-hidden shadow-lg">
                <img src="https://default-1251581354.cos.ap-beijing.myqcloud.com/temp/THZ-IT/llm/function-calling.png"
                     alt="Function Calling执行流程图"
                     class="w-full">
                <div class="p-4 bg-gray-50">
                    <p class="text-sm text-gray-600 text-center">图1：Function Calling的基本执行流程和消息结构</p>
                </div>
            </div>

            <p class="mb-6 text-gray-700">
                函数调用的核心原理基于以下关键机制：
            </p>

            <ol class="list-decimal pl-6 mb-6 text-gray-700 space-y-2">
                <li>
                    <strong>函数描述</strong>：向模型提供可用函数的详细描述，包括函数名称、参数类型、功能说明等。这些描述使模型能够"理解"每个函数的用途和所需参数。
                </li>
                <li>
                    <strong>意图识别</strong>：模型分析用户输入，判断是否需要调用某个函数来满足用户需求，以及应该调用哪个函数。
                </li>
                <li>
                    <strong>参数生成</strong>：模型根据用户输入和函数要求，生成结构化的函数参数，通常以JSON格式输出。
                </li>
                <li>
                    <strong>函数执行</strong>：应用程序接收模型生成的函数调用请求，执行实际函数，获取结果。
                </li>
                <li>
                    <strong>结果整合</strong>：函数执行结果被返回给模型，模型将其整合到对话中，以自然语言形式呈现给用户。
                </li>
            </ol>

            <h2 id="workflow" class="text-2xl font-bold mb-6 text-gray-900">2. 工作流程与应用场景</h2>

            <h3 class="text-xl font-semibold mb-4 text-gray-900">2.1 详细工作流程</h3>

            <p class="mb-4 text-gray-700">
                Function Calling的工作流程可分为准备阶段和运行阶段两个主要部分：
            </p>

            <h4 class="text-lg font-medium mb-3 text-gray-900">准备阶段：</h4>
            <ol class="list-decimal pl-6 mb-6 text-gray-700 space-y-2">
                <li>
                    <strong>函数注册</strong>：开发者定义并注册可供模型调用的函数，每个函数需包含：
                    <ul class="list-disc pl-6 mt-2 space-y-1">
                        <li><strong>函数名</strong>：清晰表达函数功能的唯一标识符</li>
                        <li><strong>函数描述</strong>：简洁说明函数的用途和时机</li>
                        <li><strong>参数架构</strong>：详尽定义每个参数的名称、类型、是否必需、可能的枚举值等</li>
                    </ul>
                </li>
                <li>
                    <strong>函数实现</strong>：开发实际执行函数调用的代码逻辑
                </li>
            </ol>

            <div class="bg-gray-50 rounded-lg p-4 mb-6 overflow-x-auto">
                <pre><code class="text-sm text-gray-800">// 函数定义示例 (JSON Schema格式)
{
  "name": "get_weather",
  "description": "获取指定城市和日期的天气信息",
  "parameters": {
    "type": "object",
    "properties": {
      "city": {
        "type": "string",
        "description": "城市名称，如北京、上海"
      },
      "date": {
        "type": "string",
        "description": "日期，格式为YYYY-MM-DD，如不提供则默认为今天"
      }
    },
    "required": ["city"]
  }
}</code></pre>
            </div>

            <div class="mb-8 rounded-lg overflow-hidden shadow-lg">
                <img src="https://www.luxiangdong.com/images/func-call/1.png"
                     alt="Function Calling设计示例"
                     class="w-full">
                <div class="p-4 bg-gray-50">
                    <p class="text-sm text-gray-600 text-center">图2：典型的Function Calling函数设计示例</p>
                </div>
            </div>

            <h4 class="text-lg font-medium mb-3 text-gray-900">运行阶段：</h4>
            <ol class="list-decimal pl-6 mb-6 text-gray-700 space-y-2">
                <li>
                    <strong>用户输入分析</strong>：用户提交自然语言请求，模型分析是否需要调用函数
                </li>
                <li>
                    <strong>函数选择与参数提取</strong>：
                    <ul class="list-disc pl-6 mt-2 space-y-1">
                        <li>如果需要调用函数，模型选择最合适的函数</li>
                        <li>从用户输入中提取必要信息，构造符合函数参数要求的JSON对象</li>
                    </ul>
                </li>
                <li>
                    <strong>返回函数调用请求</strong>：模型不直接执行函数，而是返回函数名称和参数</li>
                <li>
                    <strong>实际函数执行</strong>：应用程序接收调用请求，执行相应函数并获取结果
                </li>
                <li>
                    <strong>结果回传与整合</strong>：
                    <ul class="list-disc pl-6 mt-2 space-y-1">
                        <li>函数执行结果作为新的上下文信息返回给模型</li>
                        <li>模型将结果整合到回答中，创建连贯的对话体验</li>
                    </ul>
                </li>
            </ol>

            <div class="mb-10 rounded-lg overflow-hidden shadow-lg">
                <img src="https://camo.githubusercontent.com/162509f96d6faf70cdcecdd8509abd18893ed4fd7efd6cd6f6d38989543297cf/68747470733a2f2f63646e2e7468656e6577737461636b2e696f2f6d656469612f323032342f30352f35303236636666612d7261675f66756e6374696f6e5f63616c6c2d31303234783833352e6a706567"
                     alt="Function Calling工作流程示例"
                     class="w-full">
                <div class="p-4 bg-gray-50">
                    <p class="text-sm text-gray-600 text-center">图3：Function Calling的完整工作流程示例</p>
                </div>
            </div>

            <h3 class="text-xl font-semibold mb-4 text-gray-900">2.2 应用场景</h3>

            <p class="mb-4 text-gray-700">
                函数调用技术为LLM开辟了广阔的应用空间，以下是几个典型场景：
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div class="bg-white p-5 rounded-lg shadow-md">
                    <h4 class="font-semibold text-lg text-gray-900 mb-2">数据查询与检索</h4>
                    <ul class="list-disc pl-5 text-gray-700 space-y-1">
                        <li>查询实时股票价格和市场数据</li>
                        <li>搜索企业内部知识库或文档</li>
                        <li>检索产品信息、价格和库存状态</li>
                    </ul>
                </div>

                <div class="bg-white p-5 rounded-lg shadow-md">
                    <h4 class="font-semibold text-lg text-gray-900 mb-2">个人助理功能</h4>
                    <ul class="list-disc pl-5 text-gray-700 space-y-1">
                        <li>创建日历事件或提醒</li>
                        <li>发送电子邮件或消息</li>
                        <li>设置闹钟或计时器</li>
                    </ul>
                </div>

                <div class="bg-white p-5 rounded-lg shadow-md">
                    <h4 class="font-semibold text-lg text-gray-900 mb-2">智能服务集成</h4>
                    <ul class="list-disc pl-5 text-gray-700 space-y-1">
                        <li>预订机票、酒店或餐厅</li>
                        <li>下单购买商品</li>
                        <li>控制智能家居设备</li>
                    </ul>
                </div>

                <div class="bg-white p-5 rounded-lg shadow-md">
                    <h4 class="font-semibold text-lg text-gray-900 mb-2">高级计算与分析</h4>
                    <ul class="list-disc pl-5 text-gray-700 space-y-1">
                        <li>数据分析和可视化</li>
                        <li>复杂数学计算或统计分析</li>
                        <li>代码生成和执行</li>
                    </ul>
                </div>
            </div>

            <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-8">
                <h4 class="font-semibold text-yellow-800 mb-2">实例：多功能旅游助手</h4>
                <p class="text-yellow-700">
                    通过函数调用，一个旅游助手应用可以实现：
                    <br>• 用户提问"下周去北京三天，推荐行程安排"
                    <br>• LLM调用<code>check_weather</code>函数获取目的地天气预报
                    <br>• 调用<code>search_attractions</code>函数获取热门景点信息
                    <br>• 调用<code>check_hotel_availability</code>函数检查酒店空房情况
                    <br>• 综合所有信息，生成一份考虑天气和开放时间的个性化行程建议
                </p>
            </div>

            <h2 id="advantages" class="text-2xl font-bold mb-6 text-gray-900">3. 函数调用的优势</h2>

            <p class="mb-4 text-gray-700">
                函数调用为AI系统带来了几项关键优势，显著扩展了大语言模型的能力边界：
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div class="bg-gray-50 p-5 rounded-lg">
                    <h4 class="font-semibold text-lg text-gray-900 mb-2">1. 实时数据访问</h4>
                    <p class="text-gray-700">
                        突破模型训练数据截止日期的限制，获取最新信息。无论是股票价格、天气预报还是实时新闻，函数调用都能确保模型访问最新数据，避免过时信息问题。
                    </p>
                </div>

                <div class="bg-gray-50 p-5 rounded-lg">
                    <h4 class="font-semibold text-lg text-gray-900 mb-2">2. 执行能力扩展</h4>
                    <p class="text-gray-700">
                        让模型具备执行实际操作的能力，如发送邮件、预订服务或控制设备。这将AI从纯信息提供者转变为能够代表用户执行任务的助手。
                    </p>
                </div>

                <div class="bg-gray-50 p-5 rounded-lg">
                    <h4 class="font-semibold text-lg text-gray-900 mb-2">3. 结构化输出</h4>
                    <p class="text-gray-700">
                        通过函数参数格式约束，强制模型生成结构化、可靠的输出。这确保了数据格式的一致性，减少了非结构化文本可能带来的歧义和解析难度。
                    </p>
                </div>

                <div class="bg-gray-50 p-5 rounded-lg">
                    <h4 class="font-semibold text-lg text-gray-900 mb-2">4. 安全与控制</h4>
                    <p class="text-gray-700">
                        提供明确的权限边界和行为约束。模型只能调用预先定义的函数，且必须按照规定格式提供参数，从而减少潜在风险。
                    </p>
                </div>

                <div class="bg-gray-50 p-5 rounded-lg">
                    <h4 class="font-semibold text-lg text-gray-900 mb-2">5. 系统集成简化</h4>
                    <p class="text-gray-700">
                        提供标准化接口连接AI与现有系统。开发者只需定义函数接口并处理函数调用结果，无需复杂的自然语言解析逻辑。
                    </p>
                </div>

                <div class="bg-gray-50 p-5 rounded-lg">
                    <h4 class="font-semibold text-lg text-gray-900 mb-2">6. 复杂任务处理</h4>
                    <p class="text-gray-700">
                        通过函数组合处理多步骤任务。模型可以根据任务需求调用一系列函数，将各函数结果整合，完成复杂流程。
                    </p>
                </div>
            </div>

            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
                <p class="text-blue-700">
                    <strong>关键价值</strong>：函数调用技术使大语言模型从"只懂语言"发展为"能够行动"，从仅能提供信息的工具变为能够理解需求并执行操作的助手，显著扩展了AI系统的实用性和适用范围。
                </p>
            </div>

            <h2 id="implementation" class="text-2xl font-bold mb-6 text-gray-900">4. 实现方式与技术细节</h2>

            <h3 class="text-xl font-semibold mb-4 text-gray-900">4.1 函数定义规范</h3>

            <p class="mb-4 text-gray-700">
                函数定义是Function Calling的基础，一个良好定义的函数应包含以下核心元素：
            </p>

            <div class="overflow-x-auto mb-6">
                <table class="min-w-full bg-white border border-gray-200 text-gray-700">
                    <thead>
                        <tr>
                            <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">元素</th>
                            <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">描述</th>
                            <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">最佳实践</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200 font-medium">name</td>
                            <td class="py-2 px-4 border-b border-gray-200">函数的唯一标识符</td>
                            <td class="py-2 px-4 border-b border-gray-200">使用描述性名称，遵循snake_case或camelCase命名规范</td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200 font-medium">description</td>
                            <td class="py-2 px-4 border-b border-gray-200">函数的详细说明</td>
                            <td class="py-2 px-4 border-b border-gray-200">简洁明了地描述函数用途，包含何时应使用此函数</td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200 font-medium">parameters</td>
                            <td class="py-2 px-4 border-b border-gray-200">函数参数架构，通常采用JSON Schema格式</td>
                            <td class="py-2 px-4 border-b border-gray-200">清晰定义每个参数的类型、格式要求和约束条件</td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200 font-medium">required</td>
                            <td class="py-2 px-4 border-b border-gray-200">必需参数列表</td>
                            <td class="py-2 px-4 border-b border-gray-200">仅将真正必要的参数标记为必需</td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200 font-medium">enum</td>
                            <td class="py-2 px-4 border-b border-gray-200">参数可能的枚举值</td>
                            <td class="py-2 px-4 border-b border-gray-200">当参数有固定选择范围时使用，帮助模型生成有效值</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="mb-8 rounded-lg overflow-hidden shadow-lg">
                <img src="https://img-blog.csdnimg.cn/blog_migrate/112bd9c6863879af6c32b9b7404ef588.png"
                     alt="Function Calling参数定义示例"
                     class="w-full">
                <div class="p-4 bg-gray-50">
                    <p class="text-sm text-gray-600 text-center">图4：典型的Function Calling参数架构示例</p>
                </div>
            </div>

            <h3 class="text-xl font-semibold mb-4 text-gray-900">4.2 实现策略</h3>

            <p class="mb-4 text-gray-700">
                实现Function Calling功能时，通常采用以下三种策略之一：
            </p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white p-5 rounded-lg shadow-md">
                    <h4 class="font-semibold text-lg text-gray-900 mb-2">使用支持Function Calling的LLM API</h4>
                    <p class="text-gray-700 mb-2">
                        直接使用已内置Function Calling支持的模型API服务，如OpenAI GPT-4、Claude等。
                    </p>
                    <p class="text-gray-600 text-sm">
                        <strong>优势</strong>：简单直接，开发成本低<br>
                        <strong>局限</strong>：依赖第三方服务，功能受API提供方限制
                    </p>
                </div>

                <div class="bg-white p-5 rounded-lg shadow-md">
                    <h4 class="font-semibold text-lg text-gray-900 mb-2">提示工程模拟Function Calling</h4>
                    <p class="text-gray-700 mb-2">
                        通过精心设计的提示模板和指令，引导模型输出特定格式的响应，模拟函数调用过程。
                    </p>
                    <p class="text-gray-600 text-sm">
                        <strong>优势</strong>：适用于任何LLM，不依赖特定API<br>
                        <strong>局限</strong>：稳定性较差，可能需要大量提示工程调优
                    </p>
                </div>

                <div class="bg-white p-5 rounded-lg shadow-md">
                    <h4 class="font-semibold text-lg text-gray-900 mb-2">自定义模型微调</h4>
                    <p class="text-gray-700 mb-2">
                        通过特定数据集微调开源模型，使其具备理解和生成函数调用格式的能力。
                    </p>
                    <p class="text-gray-600 text-sm">
                        <strong>优势</strong>：完全自主控制，可定制化程度高<br>
                        <strong>局限</strong>：技术门槛高，需要专业知识和计算资源
                    </p>
                </div>
            </div>

            <h3 class="text-xl font-semibold mb-4 text-gray-900">4.3 高级实现技巧</h3>

            <ul class="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>
                    <strong>函数链接（Function Chaining）</strong>
                    <p class="mt-1 text-gray-600">
                        设计允许一次对话中连续调用多个相关函数的流程，使模型能够基于前一个函数的结果决定下一步操作。例如，先调用搜索函数获取信息，再调用分析函数处理搜索结果。
                    </p>
                </li>
                <li>
                    <strong>参数增强（Parameter Augmentation）</strong>
                    <p class="mt-1 text-gray-600">
                        对模型生成的函数参数进行自动补全或修正，增加缺失字段的默认值，或修正格式错误，提高调用成功率。
                    </p>
                </li>
                <li>
                    <strong>动态函数注册（Dynamic Function Registration）</strong>
                    <p class="mt-1 text-gray-600">
                        根据用户需求或会话上下文动态调整可用函数集，而非一次性提供所有函数。例如，在讨论旅游时才提供旅行相关函数。
                    </p>
                </li>
                <li>
                    <strong>错误处理与重试（Error Handling and Retry）</strong>
                    <p class="mt-1 text-gray-600">
                        设计健壮的错误处理机制，当函数调用失败时，将错误信息返回给模型并引导其修正参数或尝试替代方案。
                    </p>
                </li>
            </ul>

            <div class="mb-10 rounded-lg overflow-hidden shadow-lg">
                <img src="https://img2024.cnblogs.com/blog/2082880/202405/2082880-20240527214155089-2140283131.png"
                     alt="Function Calling高级应用场景"
                     class="w-full">
                <div class="p-4 bg-gray-50">
                    <p class="text-sm text-gray-600 text-center">图5：Function Calling在复杂工作流中的应用</p>
                </div>
            </div>

            <h2 id="challenges" class="text-2xl font-bold mb-6 text-gray-900">5. 挑战与解决方案</h2>

            <p class="mb-4 text-gray-700">
                尽管Function Calling带来了巨大价值，但实际应用中仍面临一些重要挑战：
            </p>

            <div class="overflow-x-auto mb-8">
                <table class="min-w-full bg-white border border-gray-200 text-gray-700">
                    <thead>
                        <tr>
                            <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">挑战</th>
                            <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">问题描述</th>
                            <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">解决方案</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200 font-medium">参数准确性</td>
                            <td class="py-2 px-4 border-b border-gray-200">
                                模型可能生成不符合要求的参数格式或遗漏必要参数
                            </td>
                            <td class="py-2 px-4 border-b border-gray-200">
                                <ul class="list-disc pl-4 space-y-1">
                                    <li>提供清晰详尽的参数描述</li>
                                    <li>实施参数验证与自动修正</li>
                                    <li>错误提示与模型引导</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200 font-medium">函数选择</td>
                            <td class="py-2 px-4 border-b border-gray-200">
                                当有多个相似函数时，模型可能选择不最优的函数
                            </td>
                            <td class="py-2 px-4 border-b border-gray-200">
                                <ul class="list-disc pl-4 space-y-1">
                                    <li>精确区分函数职责边界</li>
                                    <li>添加使用场景描述</li>
                                    <li>实现函数推荐机制</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200 font-medium">上下文长度限制</td>
                            <td class="py-2 px-4 border-b border-gray-200">
                                大量函数描述会占用宝贵的上下文窗口
                            </td>
                            <td class="py-2 px-4 border-b border-gray-200">
                                <ul class="list-disc pl-4 space-y-1">
                                    <li>按对话内容动态提供相关函数</li>
                                    <li>简化函数描述，保留核心信息</li>
                                    <li>使用函数分类与分层组织</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200 font-medium">安全隐患</td>
                            <td class="py-2 px-4 border-b border-gray-200">
                                函数可能被滥用执行未授权操作
                            </td>
                            <td class="py-2 px-4 border-b border-gray-200">
                                <ul class="list-disc pl-4 space-y-1">
                                    <li>实施严格的权限控制</li>
                                    <li>关键操作增加用户确认步骤</li>
                                    <li>记录和审计所有函数调用</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200 font-medium">结果整合</td>
                            <td class="py-2 px-4 border-b border-gray-200">
                                模型可能无法理想地将函数结果整合到回答中
                            </td>
                            <td class="py-2 px-4 border-b border-gray-200">
                                <ul class="list-disc pl-4 space-y-1">
                                    <li>为结果提供结构化格式和说明</li>
                                    <li>添加结果处理示例</li>
                                    <li>使用多轮对话优化结果呈现</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="bg-green-50 border-l-4 border-green-500 p-4 mb-8">
                <p class="text-green-700 mb-2">
                    <strong>最佳实践总结：</strong>
                </p>
                <ul class="list-disc pl-6 text-green-700 space-y-1">
                    <li><strong>精确函数设计</strong>：每个函数职责单一明确，参数定义详尽</li>
                    <li><strong>渐进式交互</strong>：复杂任务分解为多个简单函数调用，而非一次性完成</li>
                    <li><strong>优雅错误处理</strong>：函数调用失败时提供清晰反馈，引导模型修正</li>
                    <li><strong>动态函数集</strong>：根据对话内容和用户需求调整可用函数</li>
                    <li><strong>用户体验优先</strong>：确保函数调用过程对用户透明，结果呈现自然</li>
                </ul>
            </div>

            <h2 id="demo" class="text-2xl font-bold mb-6 text-gray-900">6. 演示案例</h2>

            <p class="mb-6 text-gray-700">
                以下是一个实际应用Function Calling技术的智能旅游助手示例，展示了如何通过函数调用增强AI对话能力：
            </p>

            <div class="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
                <div class="p-6">
                    <h3 class="text-xl font-bold mb-4 text-gray-900">案例：智能旅游助手</h3>

                    <p class="mb-4 text-gray-700">
                        <strong>目标</strong>：创建一个能帮助用户规划旅行的智能助手，能够查询目的地信息、天气、酒店、景点并生成行程建议。
                    </p>

                    <h4 class="text-lg font-semibold mb-3 text-gray-900">步骤1: 定义关键函数</h4>
                    <div class="bg-gray-50 rounded-lg p-4 mb-6 overflow-x-auto">
                        <pre><code class="text-sm text-gray-800">// 函数1: 查询城市天气
{
  "name": "get_weather_forecast",
  "description": "获取指定城市未来几天的天气预报",
  "parameters": {
    "type": "object",
    "properties": {
      "city": {
        "type": "string",
        "description": "城市名称"
      },
      "days": {
        "type": "integer",
        "description": "预报天数，范围1-7",
        "minimum": 1,
        "maximum": 7
      }
    },
    "required": ["city"]
  }
}

// 函数2: 查询景点信息
{
  "name": "search_attractions",
  "description": "搜索特定城市的旅游景点信息",
  "parameters": {
    "type": "object",
    "properties": {
      "city": {
        "type": "string",
        "description": "城市名称"
      },
      "category": {
        "type": "string",
        "description": "景点类别",
        "enum": ["历史古迹", "自然风光", "博物馆", "主题公园", "购物中心", "all"]
      },
      "max_results": {
        "type": "integer",
        "description": "返回结果数量",
        "default": 5
      }
    },
    "required": ["city"]
  }
}

// 函数3: 搜索酒店
{
  "name": "search_hotels",
  "description": "查询指定城市的酒店信息",
  "parameters": {
    "type": "object",
    "properties": {
      "city": {
        "type": "string",
        "description": "城市名称"
      },
      "check_in_date": {
        "type": "string",
        "description": "入住日期 (YYYY-MM-DD格式)"
      },
      "check_out_date": {
        "type": "string",
        "description": "退房日期 (YYYY-MM-DD格式)"
      },
      "price_range": {
        "type": "string",
        "description": "价格范围",
        "enum": ["经济", "中档", "高档", "豪华"]
      }
    },
    "required": ["city", "check_in_date", "check_out_date"]
  }
}

// 函数4: 生成行程建议
{
  "name": "generate_itinerary",
  "description": "基于天气、景点和用户偏好生成行程安排",
  "parameters": {
    "type": "object",
    "properties": {
      "city": {
        "type": "string",
        "description": "目的地城市"
      },
      "start_date": {
        "type": "string",
        "description": "开始日期 (YYYY-MM-DD格式)"
      },
      "end_date": {
        "type": "string",
        "description": "结束日期 (YYYY-MM-DD格式)"
      },
      "interests": {
        "type": "array",
        "description": "旅行兴趣",
        "items": {
          "type": "string"
        }
      },
      "pace": {
        "type": "string",
        "description": "旅行节奏",
        "enum": ["轻松", "适中", "紧凑"]
      }
    },
    "required": ["city", "start_date", "end_date"]
  }
}</code></pre>
                    </div>

                    <h4 class="text-lg font-semibold mb-3 text-gray-900">步骤2: 对话示例</h4>
                    <div class="bg-gray-100 p-5 rounded-lg mb-6">
                        <div class="flex mb-4">
                            <div class="flex-shrink-0 mr-3">
                                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">用</div>
                            </div>
                            <div>
                                <p class="text-gray-800">我下个月想去西安玩3天，有什么推荐吗？</p>
                            </div>
                        </div>

                        <div class="flex mb-4">
                            <div class="flex-shrink-0 mr-3">
                                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">AI</div>
                            </div>
                            <div>
                                <p class="text-gray-800 italic text-sm mb-1">[系统: AI正在调用函数获取西安下个月的天气]</p>
                                <div class="bg-gray-200 p-2 rounded text-xs font-mono mb-2 overflow-x-auto">
                                    Function call: get_weather_forecast<br>
                                    Params: {"city": "西安", "days": 7}
                                </div>
                                <p class="text-gray-800 italic text-sm mb-1">[系统: 接收到天气数据显示下个月西安天气晴好，温度适宜]</p>

                                <p class="text-gray-800 italic text-sm mb-1">[系统: AI正在调用函数搜索西安景点]</p>
                                <div class="bg-gray-200 p-2 rounded text-xs font-mono mb-2 overflow-x-auto">
                                    Function call: search_attractions<br>
                                    Params: {"city": "西安", "category": "all", "max_results": 8}
                                </div>
                                <p class="text-gray-800 italic text-sm mb-1">[系统: 接收到西安热门景点数据]</p>

                                <p class="text-gray-800">
                                    我很高兴帮你规划西安之旅！下个月西安的天气非常适合游览，平均温度在15-25°C之间，多为晴好天气。

                                    西安作为中国历史文化名城，有丰富的景点可以游览。考虑到你有3天时间，我推荐以下行程安排：

                                    <strong>第一天：兵马俑一日游</strong>
                                    - 上午参观秦始皇兵马俑博物馆（需3-4小时）
                                    - 下午游览华清宫
                                    - 晚上可以去回民街品尝各种西安特色小吃

                                    <strong>第二天：古城墙与市中心</strong>
                                    - 上午游览西安古城墙（推荐骑行一圈，需1.5-2小时）
                                    - 中午在钟楼、鼓楼附近用餐
                                    - 下午参观陕西历史博物馆
                                    - 晚上观看大唐不夜城灯光秀

                                    <strong>第三天：大雁塔与周边</strong>
                                    - 上午游览大雁塔和大慈恩寺
                                    - 中午在大雁塔北广场享用午餐
                                    - 下午游览小雁塔和西安博物院
                                    - 如有时间可以去大唐芙蓉园

                                    需要了解酒店信息或更具体的行程安排吗？
                                </p>
                            </div>
                        </div>

                        <div class="flex mb-4">
                            <div class="flex-shrink-0 mr-3">
                                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">用</div>
                            </div>
                            <div>
                                <p class="text-gray-800">听起来不错。我特别喜欢历史，能推荐一些性价比高的酒店吗？想住在市中心附近，预算每晚300-500元。</p>
                            </div>
                        </div>

                        <div class="flex">
                            <div class="flex-shrink-0 mr-3">
                                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">AI</div>
                            </div>
                            <div>
                                <p class="text-gray-800 italic text-sm mb-1">[系统: AI调用函数搜索西安酒店]</p>
                                <div class="bg-gray-200 p-2 rounded text-xs font-mono mb-2 overflow-x-auto">
                                    Function call: search_hotels<br>
                                    Params: {<br>
                                      "city": "西安",<br>
                                      "price_range": "经济",<br>
                                      "check_in_date": "[下个月推算日期]",<br>
                                      "check_out_date": "[入住日期+3天]"<br>
                                    }
                                </div>
                                <p class="text-gray-800 italic text-sm mb-1">[系统: 接收到酒店搜索结果]</p>

                                <p class="text-gray-800 italic text-sm mb-1">[系统: AI调用函数生成个性化行程]</p>
                                <div class="bg-gray-200 p-2 rounded text-xs font-mono mb-2 overflow-x-auto">
                                    Function call: generate_itinerary<br>
                                    Params: {<br>
                                      "city": "西安",<br>
                                      "start_date": "[下个月推算日期]",<br>
                                      "end_date": "[开始日期+3天]",<br>
                                      "interests": ["历史", "文化", "古迹"],<br>
                                      "pace": "适中"<br>
                                    }
                                </div>
                                <p class="text-gray-800 italic text-sm mb-1">[系统: 接收到定制行程建议]</p>

                                <p class="text-gray-800">
                                    既然你对历史特别感兴趣，我为你找到了几家位于市中心且性价比高的酒店，价格在300-500元/晚：

                                    1. 西安钟楼青年旅舍 - ¥328起/晚
                                       - 位置：南大街，距离钟鼓楼仅200米
                                       - 优势：临近回民街，交通便利，历史建筑改造

                                    2. 西安古城驿站精品酒店 - ¥458起/晚
                                       - 位置：东大街，靠近城墙南门
                                       - 优势：传统四合院风格，有免费历史讲座

                                    3. 西安文化主题酒店 - ¥488起/晚
                                       - 位置：碑林区，靠近陕西历史博物馆
                                       - 优势：每个房间有唐代艺术主题，免费提供博物馆讲解

                                    针对你的历史兴趣，我调整了行程建议，增加了更多历史景点：

                                    <strong>第一天：秦朝历史探索</strong>
                                    - 秦始皇兵马俑博物馆（深度游，建议租讲解器）
                                    - 秦始皇陵遗址公园（兵马俑附近，常被忽略的景点）
                                    - 华清宫（重点参观考古展示区）

                                    <strong>第二天：唐朝盛世文化</strong>
                                    - 早上游览大唐西市博物馆（了解唐朝商业文化）
                                    - 古城墙（推荐东南角登城，有专门的历史展示区）
                                    - 下午参观陕西历史博物馆（可预约专业讲解员）
                                    - 晚上大唐不夜城感受唐文化复兴

                                    <strong>第三天：宗教与学术</strong>
                                    - 上午游览大雁塔和大慈恩寺（唐玄奘取经故事）
                                    - 西安碑林博物馆（中国书法艺术宝库，历史学者必访）
                                    - 半坡博物馆（新石器时代遗址，了解中国早期文明）

                                    这个行程充分考虑了历史发展脉络，从史前到秦、唐，呈现中国历史的重要阶段，同时行程安排也很合理，不会太赶。
                                </p>
                            </div>
                        </div>
                    </div>

                    <h4 class="text-lg font-semibold mb-3 text-gray-900">步骤3: 技术剖析</h4>
                    <p class="mb-4 text-gray-700">
                        在上面的对话中，我们可以看到函数调用如何增强AI助手的能力：
                    </p>
                    <ol class="list-decimal pl-6 mb-4 text-gray-700 space-y-1">
                        <li>AI正确识别用户需要西安旅游信息，调用多个相关函数获取数据</li>
                        <li>每次函数调用都提供准确的参数（城市、日期、类别等）</li>
                        <li>AI能将函数返回的技术数据转化为自然、友好的对话</li>
                        <li>当用户表达新需求（历史兴趣、酒店预算）时，AI能调整函数调用策略</li>
                        <li>最终生成的建议结合了多个函数调用结果，形成连贯、个性化的回答</li>
                    </ol>

                    <h4 class="text-lg font-semibold mb-3 text-gray-900">优势展示</h4>
                    <ul class="list-disc pl-6 mb-4 text-gray-700 space-y-1">
                        <li><strong>实时信息获取</strong>：旅游助手能获取最新天气、酒店价格等实时数据</li>
                        <li><strong>复杂逻辑处理</strong>：根据天气情况、开放时间、交通状况优化行程安排</li>
                        <li><strong>个性化服务</strong>：根据用户的历史兴趣定制行程，推荐相关景点</li>
                        <li><strong>多轮对话优化</strong>：每轮对话都能根据新信息调整推荐内容</li>
                    </ul>
                </div>
            </div>

            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
                <p class="text-blue-700">
                    <strong>总结</strong>：函数调用技术使AI助手能够动态获取和处理实时信息，大幅提升了回答的准确性、实用性和个性化程度。对于像旅游规划这样需要多种实时数据和复杂逻辑处理的场景，函数调用成为实现真正实用AI助手的关键技术。
                </p>
            </div>

            <div class="mt-12 text-center">
                <button class="demo-trigger bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-colors"
                        data-demo="function-demo">
                    体验互动演示
                </button>
                <p class="text-sm text-gray-600 mt-2">点击按钮体验智能旅游助手的函数调用功能</p>
            </div>
        `;
  }
};
