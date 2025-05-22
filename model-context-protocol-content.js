const mcpContent = {
  render: function() {
    return `
            <h2 id="definition" class="text-2xl font-bold mb-6 text-gray-900">1. 核心定义与基本原理</h2>
            <p class="mb-4 text-gray-700">
                模型上下文协议（Model Context Protocol，MCP）或模型上下文管理，是一种对大型语言模型（LLM）的上下文信息进行规范化组织和管理的结构化框架。它为AI系统提供了统一的方式来处理和传递对话历史、用户信息、系统配置等上下文数据，确保模型能够获得必要的背景信息来生成连贯、准确且符合需求的回应。
            </p>

            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <p class="text-blue-700">
                    <strong>核心价值</strong>：MCP解决了大模型长对话管理、多轮交互中的上下文维护、用户身份识别等核心问题，使AI系统能够提供更连贯、更个性化的服务体验。
                </p>
            </div>

            <div class="mb-10 rounded-lg overflow-hidden shadow-lg">
                <img src="https://i-blog.csdnimg.cn/img_convert/e6f4f59425a691058022e2a4e12fa0de.jpeg"
                     alt="MCP工作流程图"
                     class="w-full">
                <div class="p-4 bg-gray-50">
                    <p class="text-sm text-gray-600 text-center">图1：MCP基本工作流程示意图</p>
                </div>
            </div>

            <p class="mb-6 text-gray-700">
                MCP的核心原理可以概括为以下几点：
            </p>

            <ol class="list-decimal pl-6 mb-6 text-gray-700 space-y-2">
                <li>
                    <strong>结构化上下文表示</strong>：将上下文信息组织为规范化的数据结构，通常包括系统指令、用户身份、对话历史、工具使用记录等部分。
                </li>
                <li>
                    <strong>上下文传递与管理</strong>：在整个对话过程中维护上下文的连续性，使每次模型调用都能获得必要的历史信息。
                </li>
                <li>
                    <strong>优先级与权重分配</strong>：为不同类型的上下文信息分配不同的重要性级别，确保模型关注最相关的内容。
                </li>
                <li>
                    <strong>记忆压缩与优化</strong>：在有限的上下文窗口中高效管理长对话，通过摘要、压缩等技术保留关键信息。
                </li>
                <li>
                    <strong>状态跟踪与更新</strong>：动态更新系统状态和用户状态，确保模型了解最新的交互情况。
                </li>
            </ol>

            <h2 id="importance" class="text-2xl font-bold mb-6 text-gray-900">2. 重要性与实现方式</h2>

            <h3 class="text-xl font-semibold mb-4 text-gray-900">2.1 MCP的重要性</h3>

            <p class="mb-4 text-gray-700">
                在大型语言模型应用中，MCP解决了以下关键挑战：
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div class="bg-white p-5 rounded-lg shadow-md">
                    <h4 class="font-semibold text-lg text-gray-900 mb-2">上下文窗口限制</h4>
                    <p class="text-gray-700">
                        LLM的上下文窗口大小有限（如8K-32K token），而长对话可能超出这一限制。MCP通过保存、压缩和优先级排序等策略，在有限窗口中维护最重要的上下文信息。
                    </p>
                </div>

                <div class="bg-white p-5 rounded-lg shadow-md">
                    <h4 class="font-semibold text-lg text-gray-900 mb-2">对话连贯性</h4>
                    <p class="text-gray-700">
                        保持多轮对话中的连贯性是AI系统的关键挑战。MCP通过结构化存储对话历史并有效管理引用，确保模型能理解前后对话关联，提供连贯回应。
                    </p>
                </div>

                <div class="bg-white p-5 rounded-lg shadow-md">
                    <h4 class="font-semibold text-lg text-gray-900 mb-2">个性化与一致性</h4>
                    <p class="text-gray-700">
                        用户期望AI记住他们的偏好和过往交互。MCP维护用户数据和交互历史摘要，确保在多轮对话中保持个性化体验和一致的行为风格。
                    </p>
                </div>

                <div class="bg-white p-5 rounded-lg shadow-md">
                    <h4 class="font-semibold text-lg text-gray-900 mb-2">复杂任务处理</h4>
                    <p class="text-gray-700">
                        需要多步骤完成的复杂任务要求系统记住当前进度和前序步骤。MCP提供结构化方式记录任务状态和步骤，支持长时间、多轮次的任务执行。
                    </p>
                </div>
            </div>

            <div class="mb-10 rounded-lg overflow-hidden shadow-lg">
                <img src="https://miro.medium.com/v2/resize:fit:1400/0*-3LZdJHp_gzfa_CF.jpg"
                     alt="MCP解决的主要问题"
                     class="w-full">
                <div class="p-4 bg-gray-50">
                    <p class="text-sm text-gray-600 text-center">图2：MCP解决大模型上下文维护的关键问题</p>
                </div>
            </div>

            <h3 class="text-xl font-semibold mb-4 text-gray-900">2.2 实现方式</h3>

            <p class="mb-4 text-gray-700">
                MCP的实现通常采用以下几种方式：
            </p>

            <div class="overflow-x-auto mb-8">
                <table class="min-w-full bg-white border border-gray-200 text-gray-700">
                    <thead>
                        <tr>
                            <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">实现方式</th>
                            <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">描述</th>
                            <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">适用场景</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200 font-medium">消息格式标准化</td>
                            <td class="py-2 px-4 border-b border-gray-200">
                                使用标准化的消息格式（如OpenAI Chat Completion API格式），区分系统指令、用户消息和助手回应
                            </td>
                            <td class="py-2 px-4 border-b border-gray-200">
                                基本对话系统、简单应用场景
                            </td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200 font-medium">会话状态管理</td>
                            <td class="py-2 px-4 border-b border-gray-200">
                                维护会话对象，存储当前状态、对话历史和用户信息，动态更新和传递
                            </td>
                            <td class="py-2 px-4 border-b border-gray-200">
                                多轮对话系统、需要状态跟踪的应用
                            </td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200 font-medium">结构化协议框架</td>
                            <td class="py-2 px-4 border-b border-gray-200">
                                设计专用协议框架（如Anthropic的Claude Protocol），规范化上下文数据结构和处理流程
                            </td>
                            <td class="py-2 px-4 border-b border-gray-200">
                                复杂应用、企业级系统、需要高标准化的场景
                            </td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200 font-medium">分布式记忆系统</td>
                            <td class="py-2 px-4 border-b border-gray-200">
                                将上下文拆分为短期记忆和长期记忆，使用外部数据库存储长期记忆，按需检索
                            </td>
                            <td class="py-2 px-4 border-b border-gray-200">
                                长期对话、知识密集型应用、个性化服务
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p class="mb-4 text-gray-700">
                在实际应用中，这些实现方式往往结合使用，形成适合特定需求的MCP解决方案。例如，一个客服AI系统可能同时使用标准化消息格式、会话状态管理和分布式记忆来提供连贯、个性化的服务体验。
            </p>

            <h2 id="components" class="text-2xl font-bold mb-6 text-gray-900">3. MCP的组成部分</h2>

            <p class="mb-4 text-gray-700">
                一个完整的MCP框架通常包含以下几个核心组成部分：
            </p>

            <div class="mb-10 rounded-lg overflow-hidden shadow-lg">
                <img src="https://i-blog.csdnimg.cn/img_convert/b5baf8fb6236c2e51abd1af5359ffe48.webp?x-oss-process=image/format,png"
                     alt="MCP主要组成部分"
                     class="w-full">
                <div class="p-4 bg-gray-50">
                    <p class="text-sm text-gray-600 text-center">图3：MCP的核心组成部分示意图</p>
                </div>
            </div>

            <h3 class="text-xl font-semibold mb-4 text-gray-900">3.1 系统指令层</h3>

            <p class="mb-4 text-gray-700">
                系统指令层定义模型的基本行为规则和角色设定，是MCP的基础部分：
            </p>

            <ul class="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>
                    <strong>角色定义</strong>：明确模型应扮演的角色（如客服专家、编程助手等）
                </li>
                <li>
                    <strong>行为准则</strong>：规定模型应遵循的行为规范和限制
                </li>
                <li>
                    <strong>输出格式</strong>：指定回答的结构、风格和格式要求
                </li>
                <li>
                    <strong>专业领域知识</strong>：提供特定领域的基础知识和术语解释
                </li>
            </ul>

            <div class="bg-gray-50 rounded-lg p-4 mb-6 overflow-x-auto">
                <pre><code class="text-sm text-gray-800">// 系统指令示例
{
  "role": "system",
  "content": "你是一名专业的客户服务代表，专注于解决用户的技术问题。请使用专业、友善的语气回答用户问题。
  遵循以下准则：
  1. 首先确认理解用户问题
  2. 提供清晰、步骤化的解决方案
  3. 如果无法解决问题，提供升级流程
  4. 不要分享公司内部信息或未公开的产品计划
  5. 回答格式应包含问题摘要、解决步骤和后续建议"
}</code></pre>
            </div>

            <h3 class="text-xl font-semibold mb-4 text-gray-900">3.2 用户身份层</h3>

            <p class="mb-4 text-gray-700">
                用户身份层维护与当前用户相关的信息，为模型提供个性化回答的依据：
            </p>

            <ul class="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>
                    <strong>用户基本信息</strong>：用户ID、名称、语言偏好等
                </li>
                <li>
                    <strong>用户历史摘要</strong>：过往交互的关键点总结
                </li>
                <li>
                    <strong>偏好设置</strong>：用户明确表达的偏好和设置
                </li>
                <li>
                    <strong>权限级别</strong>：用户可访问的功能和信息范围
                </li>
            </ul>

            <div class="bg-gray-50 rounded-lg p-4 mb-6 overflow-x-auto">
                <pre><code class="text-sm text-gray-800">// 用户身份信息示例
{
  "user_id": "u12345",
  "name": "张先生",
  "language": "zh-CN",
  "membership_level": "premium",
  "preferences": {
    "communication_style": "简洁直接",
    "technical_expertise": "高级",
    "product_interests": ["智能家居", "办公软件"]
  },
  "history_summary": "长期用户，主要咨询智能家居设备兼容性问题，
  上次交流中提到正在装修新家，计划全屋智能化"
}</code></pre>
            </div>

            <h3 class="text-xl font-semibold mb-4 text-gray-900">3.3 对话历史层</h3>

            <p class="mb-4 text-gray-700">
                对话历史层保存和管理当前会话中的消息交换记录：
            </p>

            <ul class="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>
                    <strong>消息序列</strong>：按时间顺序排列的用户和助手消息
                </li>
                <li>
                    <strong>上下文压缩</strong>：对长对话进行摘要或压缩的策略
                </li>
                <li>
                    <strong>重要信息标记</strong>：突出关键信息点的机制
                </li>
                <li>
                    <strong>引用和关联</strong>：建立消息之间关联的链接机制
                </li>
            </ul>

            <div class="bg-gray-50 rounded-lg p-4 mb-6 overflow-x-auto">
                <pre><code class="text-sm text-gray-800">// 对话历史示例
"messages": [
  {
    "role": "user",
    "content": "我的智能灯泡无法连接到手机App",
    "timestamp": "2023-11-10T15:23:45Z",
    "importance": "high"
  },
  {
    "role": "assistant",
    "content": "很抱歉听到您遇到连接问题。请告诉我以下信息，以便我更好地帮助您：
    1. 灯泡的品牌和型号
    2. 您使用的手机App名称和版本
    3. 您的手机操作系统(iOS/Android)和版本",
    "timestamp": "2023-11-10T15:24:10Z"
  },
  {
    "role": "user",
    "content": "是飞利浦Hue灯泡，App是Hue官方App v4.26.0，iPhone 14 Pro iOS 16.5",
    "timestamp": "2023-11-10T15:26:33Z"
  }
]</code></pre>
            </div>

            <h3 class="text-xl font-semibold mb-4 text-gray-900">3.4 工具使用记录层</h3>

            <p class="mb-4 text-gray-700">
                工具使用记录层跟踪和管理模型使用外部工具和API的情况：
            </p>

            <ul class="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>
                    <strong>函数调用历史</strong>：记录已经调用的函数及其参数和结果
                </li>
                <li>
                    <strong>工具状态</strong>：当前可用工具的状态和权限信息
                </li>
                <li>
                    <strong>数据查询记录</strong>：模型进行的数据库查询或API调用记录
                </li>
                <li>
                    <strong>操作结果</strong>：工具操作的成功状态和返回信息
                </li>
            </ul>

            <div class="bg-gray-50 rounded-lg p-4 mb-6 overflow-x-auto">
                <pre><code class="text-sm text-gray-800">// 工具使用记录示例
"tool_usage": [
  {
    "tool_name": "product_database_search",
    "timestamp": "2023-11-10T15:27:05Z",
    "parameters": {
      "product_type": "smart bulb",
      "brand": "Philips",
      "model": "Hue"
    },
    "result": {
      "status": "success",
      "data": {
        "latest_firmware": "1.65.11",
        "compatible_bridges": ["Hue Bridge v2", "Hue Bridge v3"],
        "connection_methods": ["Bluetooth", "Zigbee (via Bridge)"]
      }
    }
  },
  {
    "tool_name": "troubleshooting_guide",
    "timestamp": "2023-11-10T15:27:15Z",
    "parameters": {
      "device": "Philips Hue",
      "issue": "connection problem",
      "os": "iOS 16.5"
    },
    "result": {
      "status": "success",
      "guide_id": "TSG-HUE-2023-05"
    }
  }
]</code></pre>
            </div>

            <h3 class="text-xl font-semibold mb-4 text-gray-900">3.5 会话控制层</h3>

            <p class="mb-4 text-gray-700">
                会话控制层管理对话的整体状态和流程控制：
            </p>

            <ul class="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>
                    <strong>会话元数据</strong>：会话ID、开始时间、持续时长等基本信息
                </li>
                <li>
                    <strong>上下文管理策略</strong>：决定什么信息应保留、丢弃或压缩
                </li>
                <li>
                    <strong>状态机配置</strong>：定义对话可能的状态和转换规则
                </li>
                <li>
                    <strong>回退策略</strong>：处理模型无法响应或错误情况的策略
                </li>
            </ul>

            <div class="bg-gray-50 rounded-lg p-4 mb-6 overflow-x-auto">
                <pre><code class="text-sm text-gray-800">// 会话控制信息示例
"session_control": {
  "session_id": "sess-2023-11-10-152345",
  "start_time": "2023-11-10T15:23:45Z",
  "duration_seconds": 240,
  "current_state": "troubleshooting",
  "previous_states": ["greeting", "problem_identification"],
  "context_strategy": {
    "max_turns": 20,
    "summarize_after": 10,
    "priority_tokens": ["error", "不工作", "问题"],
    "compression_method": "semantic_summarization"
  },
  "next_actions": ["verify_solution", "offer_alternatives"],
  "fallback_contact": "tech_support@example.com"
}</code></pre>
            </div>

            <h2 id="benefits" class="text-2xl font-bold mb-6 text-gray-900">4. MCP带来的优势</h2>

            <p class="mb-4 text-gray-700">
                采用MCP为AI系统带来了一系列显著优势：
            </p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white p-5 rounded-lg shadow-md">
                    <h4 class="font-semibold text-lg text-gray-900 mb-2">1. 连贯性与记忆力</h4>
                    <p class="text-gray-700 mb-2">
                        MCP使AI系统能够在长对话中保持记忆力，理解上下文引用，提供连贯回答。
                    </p>
                    <p class="text-gray-600 text-sm">
                        <strong>例如</strong>：用户提到"上次我们讨论的那个问题"，系统能准确回忆并继续相关讨论。
                    </p>
                </div>

                <div class="bg-white p-5 rounded-lg shadow-md">
                    <h4 class="font-semibold text-lg text-gray-900 mb-2">2. 个性化与适应性</h4>
                    <p class="text-gray-700 mb-2">
                        通过保存用户偏好和历史交互，系统能提供更加个性化的回答和建议。
                    </p>
                    <p class="text-gray-600 text-sm">
                        <strong>例如</strong>：记住用户之前表达的兴趣，在后续交互中主动推荐相关内容。
                    </p>
                </div>

                <div class="bg-white p-5 rounded-lg shadow-md">
                    <h4 class="font-semibold text-lg text-gray-900 mb-2">3. 复杂任务管理</h4>
                    <p class="text-gray-700 mb-2">
                        支持跨越多轮对话的复杂任务执行，保持任务状态和进度。
                    </p>
                    <p class="text-gray-600 text-sm">
                        <strong>例如</strong>：在多步骤问题解决过程中，记住已完成的步骤和收集的信息。
                    </p>
                </div>

                <div class="bg-white p-5 rounded-lg shadow-md">
                    <h4 class="font-semibold text-lg text-gray-900 mb-2">4. 标准化与一致性</h4>
                    <p class="text-gray-700 mb-2">
                        为不同AI应用提供统一的上下文管理框架，保证行为一致性。
                    </p>
                    <p class="text-gray-600 text-sm">
                        <strong>例如</strong>：不同场景下的AI助手使用相同的对话管理规范，降低用户学习成本。
                    </p>
                </div>

                <div class="bg-white p-5 rounded-lg shadow-md">
                    <h4 class="font-semibold text-lg text-gray-900 mb-2">5. 资源优化</h4>
                    <p class="text-gray-700 mb-2">
                        通过智能管理上下文窗口，优化token使用，降低API成本。
                    </p>
                    <p class="text-gray-600 text-sm">
                        <strong>例如</strong>：自动摘要长历史，只保留关键信息，减少每次请求的token数量。
                    </p>
                </div>

                <div class="bg-white p-5 rounded-lg shadow-md">
                    <h4 class="font-semibold text-lg text-gray-900 mb-2">6. 安全性与隐私</h4>
                    <p class="text-gray-700 mb-2">
                        明确定义什么信息应当保留、传递或丢弃，增强数据隐私保护。
                    </p>
                    <p class="text-gray-600 text-sm">
                        <strong>例如</strong>：敏感信息自动从持久化储存中排除，只在必要时临时使用。
                    </p>
                </div>
            </div>

            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
                <p class="text-blue-700">
                    <strong>核心价值</strong>：MCP不仅仅是一种技术实现，更是一种范式转变，使AI系统从简单的"问答机器"转变为能够理解上下文、维护连续对话、执行复杂任务的智能助手，极大地提高了AI系统的实用性和用户体验。
                </p>
            </div>

            <h2 id="applications" class="text-2xl font-bold mb-6 text-gray-900">5. MCP应用场景</h2>

            <p class="mb-4 text-gray-700">
                MCP在多种AI应用场景中发挥着关键作用：
            </p>

            <div class="mb-10 rounded-lg overflow-hidden shadow-lg">
                <img src="https://pic1.zhimg.com/v2-291733d5779e237cf572f2df7afbcc58_1440w.jpg"
                     alt="MCP在不同场景中的应用"
                     class="w-full">
                <div class="p-4 bg-gray-50">
                    <p class="text-sm text-gray-600 text-center">图4：MCP在不同应用场景中的作用</p>
                </div>
            </div>

            <div class="overflow-x-auto mb-8">
                <table class="min-w-full bg-white border border-gray-200 text-gray-700">
                    <thead>
                        <tr>
                            <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">应用场景</th>
                            <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">MCP的关键作用</th>
                            <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">实例</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200 font-medium">客户服务</td>
                            <td class="py-2 px-4 border-b border-gray-200">
                                <ul class="list-disc pl-4">
                                    <li>记住客户问题和情况</li>
                                    <li>追踪问题解决进度</li>
                                    <li>统一多渠道对话体验</li>
                                </ul>
                            </td>
                            <td class="py-2 px-4 border-b border-gray-200">
                                用户在不同时间通过网站、App和电话咨询同一问题，系统能够识别这是同一问题的后续，继续之前的解决方案。
                            </td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200 font-medium">个人助理</td>
                            <td class="py-2 px-4 border-b border-gray-200">
                                <ul class="list-disc pl-4">
                                    <li>记住用户偏好和习惯</li>
                                    <li>维护长期交互记忆</li>
                                    <li>跟踪日常任务和提醒</li>
                                </ul>
                            </td>
                            <td class="py-2 px-4 border-b border-gray-200">
                                助理记得用户喜欢在晚上7点后收到新闻摘要，且对科技新闻特别感兴趣，自动调整内容推荐。
                            </td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200 font-medium">教育辅导</td>
                            <td class="py-2 px-4 border-b border-gray-200">
                                <ul class="list-disc pl-4">
                                    <li>记录学习进度和难点</li>
                                    <li>适应学生理解水平</li>
                                    <li>提供渐进式学习路径</li>
                                </ul>
                            </td>
                            <td class="py-2 px-4 border-b border-gray-200">
                                系统记住学生之前在哪些数学概念上遇到困难，在教授新概念时特别关注这些弱点，并提供针对性练习。
                            </td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200 font-medium">专业顾问</td>
                            <td class="py-2 px-4 border-b border-gray-200">
                                <ul class="list-disc pl-4">
                                    <li>管理专业知识库</li>
                                    <li>记录咨询背景和细节</li>
                                    <li>追踪建议执行情况</li>
                                </ul>
                            </td>
                            <td class="py-2 px-4 border-b border-gray-200">
                                法律顾问AI记住客户的案件细节、之前的咨询内容和收集的证据，提供连续性的法律建议。
                            </td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200 font-medium">协作工具</td>
                            <td class="py-2 px-4 border-b border-gray-200">
                                <ul class="list-disc pl-4">
                                    <li>跟踪项目状态和成员角色</li>
                                    <li>维护团队共享上下文</li>
                                    <li>协调多人任务分配</li>
                                </ul>
                            </td>
                            <td class="py-2 px-4 border-b border-gray-200">
                                项目管理助手了解每个团队成员的专长和当前任务，能够协调工作分配并回答关于项目状态的问题。
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-8">
                <h4 class="font-semibold text-yellow-800 mb-2">案例：医疗咨询中的MCP应用</h4>
                <p class="text-yellow-700">
                    考虑一个医疗AI助手场景：
                    <br>• 系统指令层：定义医疗咨询助手角色，规定医疗建议的提供方式和免责声明
                    <br>• 用户身份层：记录患者基本健康信息、过往症状和治疗史
                    <br>• 对话历史层：保存当前咨询中描述的症状、医学术语解释请求等
                    <br>• 工具使用记录：记录查询医学数据库的结果、症状检查器的输出等
                    <br>• 会话控制层：管理从症状描述、初步分析、建议提供到随访规划的流程

                    <br><br>当患者提到"昨天我们讨论的那个药物副作用怎么处理"时，系统能通过MCP检索相关历史，理解上下文，并继续之前的讨论，而不需要患者重复之前的所有信息。
                </p>
            </div>

            <h2 id="demo" class="text-2xl font-bold mb-6 text-gray-900">6. 演示案例</h2>

            <p class="mb-6 text-gray-700">
                以下是一个展示MCP实际应用价值的智能客服对话管理案例：
            </p>

            <div class="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
                <div class="p-6">
                    <h3 class="text-xl font-bold mb-4 text-gray-900">案例：智能客服对话管理</h3>

                    <p class="mb-4 text-gray-700">
                        <strong>背景</strong>：一家电子产品公司实现了基于MCP的智能客服系统，用于处理客户的技术支持和服务请求。
                    </p>

                    <h4 class="text-lg font-semibold mb-3 text-gray-900">MCP配置</h4>

                    <div class="bg-gray-50 rounded-lg p-4 mb-6 overflow-x-auto">
                        <pre><code class="text-sm text-gray-800">// MCP基本配置
{
  "system": {
    "role": "智能客服专员",
    "behavior_guidelines": [
      "专业、友善地回应客户问题",
      "遵循技术支持标准流程",
      "保持解决方案的可操作性",
      "在无法解决时妥善升级问题"
    ],
    "knowledge_areas": ["产品规格", "故障排除", "保修政策", "退换货流程"],
    "output_formats": {
      "greeting": "问候 + 身份确认",
      "troubleshooting": "问题确认 + 步骤建议 + 验证问题",
      "resolution": "解决方案概述 + 详细步骤 + 确认满意度"
    }
  },

  "user_profile": {
    "retrieval_strategy": "实时检索客户CRM数据",
    "key_attributes": ["购买历史", "技术熟练度", "之前的服务请求", "偏好联系方式"],
    "personalization_rules": [
      "技术熟练度高的客户可提供更详细技术步骤",
      "有多次服务记录的重点客户优先处理",
      "根据历史偏好调整回复详细程度"
    ]
  },

  "conversation_management": {
    "history_depth": 20,
    "summarization_trigger": "对话超过10轮或30分钟",
    "important_elements": ["产品型号", "错误代码", "已尝试的解决方案", "客户反馈"],
    "topic_tracking": true,
    "thread_maintenance": "跨会话保持同一问题的解决连续性"
  },

  "tools_integration": {
    "available_tools": ["产品数据库", "故障诊断工具", "订单系统", "升级流程管理"],
    "authentication_required": ["订单历史", "保修状态查询"],
    "result_integration": "自动将工具结果融入对话脉络"
  },

  "session_control": {
    "state_machine": {
      "states": ["问题识别", "信息收集", "故障诊断", "解决方案提供", "满意度确认", "升级处理"],
      "transitions": {
        "问题识别→信息收集": "识别到产品类别后",
        "信息收集→故障诊断": "收集足够信息后",
        // 更多状态转换规则...
      }
    },
    "timeout_handling": "未活动15分钟后发送验证消息",
    "escalation_criteria": "尝试3种解决方案仍未解决问题时升级"
  }
}</code></pre>
                    </div>

                    <h4 class="text-lg font-semibold mb-3 text-gray-900">对话示例（跨会话技术支持）</h4>

                    <div class="mb-6">
                        <div class="border-b pb-2 mb-4">
                            <p class="text-gray-500 text-sm">第一天 - 初次交流</p>
                        </div>

                        <div class="bg-gray-100 p-5 rounded-lg mb-6">
                            <div class="flex mb-4">
                                <div class="flex-shrink-0 mr-3">
                                    <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">客</div>
                                </div>
                                <div>
                                    <p class="text-gray-800">你好，我的XPS 15笔记本电脑最近充电很慢，而且电池续航时间比以前短了很多。</p>
                                </div>
                            </div>

                            <div class="flex mb-4">
                                <div class="flex-shrink-0 mr-3">
                                    <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">AI</div>
                                </div>
                                <div>
                                    <p class="text-gray-800 italic text-sm mb-1">[系统: 检索用户资料]</p>
                                    <div class="bg-gray-200 p-2 rounded text-xs font-mono mb-2 overflow-x-auto">
                                        MCP更新: 用户李先生，高级会员，购买记录包含XPS 15 9560型号，购买日期2021-06-15
                                    </div>

                                    <p class="text-gray-800">您好李先生，很高兴为您服务。关于您的XPS 15充电和电池问题，我可以帮您诊断一下。首先，您能告诉我：
                                    <br>1. 您的电脑大约使用了多久？
                                    <br>2. 充电速度变慢是突然发生的还是逐渐出现的？
                                    <br>3. 您最近是否安装了新的软件或系统更新？</p>
                                </div>
                            </div>

                            <div class="flex mb-4">
                                <div class="flex-shrink-0 mr-3">
                                    <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">客</div>
                                </div>
                                <div>
                                    <p class="text-gray-800">我的电脑买了快3年了，充电问题是最近两三周才注意到的，好像是装了最新的Windows更新后出现的。现在充满电大概需要3小时，以前只要1.5小时左右。</p>
                                </div>
                            </div>

                            <div class="flex mb-4">
                                <div class="flex-shrink-0 mr-3">
                                    <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">AI</div>
                                </div>
                                <div>
                                    <p class="text-gray-800 italic text-sm mb-1">[系统: 查询产品数据库]</p>
                                    <div class="bg-gray-200 p-2 rounded text-xs font-mono mb-2 overflow-x-auto">
                                        MCP更新: 工具调用 - 查询XPS 15 9560电池规格和常见问题
                                    </div>

                                    <p class="text-gray-800">谢谢您提供的信息。根据您描述的情况，问题可能有几个原因：

                                    <br><br>1. 电池老化：3年的使用时间可能导致电池容量自然衰减
                                    <br>2. 系统更新问题：最新的Windows更新可能改变了电源管理设置
                                    <br>3. 后台进程：更新后可能有新的后台进程占用资源

                                    <br><br>我建议您先尝试以下步骤：

                                    <br><br>A. 运行电池诊断：
                                    <br>• 按Win+X，选择"PowerShell(管理员)"
                                    <br>• 输入命令: powercfg /batteryreport /output "C:\battery_report.html"
                                    <br>• 在C盘根目录找到生成的报告并查看

                                    <br><br>B. 检查电源计划：
                                    <br>• 进入控制面板 > 电源选项
                                    <br>• 确认您使用的是"平衡"或"高性能"计划
                                    <br>• 点击"更改计划设置" > "更改高级电源设置"检查配置

                                    <br><br>您能先试试这些步骤吗？完成后请告诉我结果，我们继续排查。</p>
                                </div>
                            </div>

                            <div class="flex">
                                <div class="flex-shrink-0 mr-3">
                                    <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">客</div>
                                </div>
                                <div>
                                    <p class="text-gray-800">好的，我需要一点时间来尝试这些步骤。我先去试试，晚点再联系你。</p>
                                </div>
                            </div>
                        </div>

                        <div class="border-b pb-2 mb-4 mt-8">
                            <p class="text-gray-500 text-sm">第二天 - 后续跟进</p>
                        </div>

                        <div class="bg-gray-100 p-5 rounded-lg">
                            <div class="flex mb-4">
                                <div class="flex-shrink-0 mr-3">
                                    <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">客</div>
                                </div>
                                <div>
                                    <p class="text-gray-800">你好，关于昨天的电池问题，我运行了你建议的诊断。报告显示我的电池最大容量只有原始容量的62%了。另外，我注意到有个叫"Windows Update服务"的进程经常在后台运行，占用不少资源。</p>
                                </div>
                            </div>

                            <div class="flex mb-4">
                                <div class="flex-shrink-0 mr-3">
                                    <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">AI</div>
                                </div>
                                <div>
                                    <p class="text-gray-800 italic text-sm mb-1">[系统: 检索对话历史]</p>
                                    <div class="bg-gray-200 p-2 rounded text-xs font-mono mb-2 overflow-x-auto">
                                        MCP更新: 识别为昨日XPS 15电池问题的后续，用户已执行诊断步骤，报告电池容量62%，发现Windows Update服务占用资源
                                    </div>

                                    <p class="text-gray-800 italic text-sm mb-1">[系统: 更新问题状态]</p>
                                    <div class="bg-gray-200 p-2 rounded text-xs font-mono mb-2 overflow-x-auto">
                                        MCP更新: 会话状态从"信息收集"转为"故障诊断"，确认主要问题点：1)电池容量减少 2)Windows Update服务异常
                                    </div>

                                    <p class="text-gray-800">您好李先生，感谢您回来并分享诊断结果。根据您的反馈，我们发现了两个主要问题：

                                    <br><br>1. 电池健康度下降：62%的容量确实说明电池已经有明显老化，这是导致续航时间缩短的主要原因。XPS 15电池的设计寿命约为300-500个充放电周期，3年的使用很可能已超过这个范围。

                                    <br><br>2. Windows更新服务异常：这很可能是导致充电慢的原因之一，因为系统资源被占用。

                                    <br><br>针对这两个问题，我建议：

                                    <br><br>对于电池问题：
                                    <br>• 考虑更换电池 - 您的设备仍在设计使用年限内，但电池已达到更换时机
                                    <br>• 作为临时措施，您可以优化电池使用：降低屏幕亮度，关闭不必要的服务

                                    <br><br>对于Windows Update问题：
                                    <br>• 打开服务管理器(Win+R，输入services.msc)
                                    <br>• 找到"Windows Update"服务
                                    <br>• 右键点击，选择"属性"
                                    <br>• 将启动类型修改为"手动"
                                    <br>• 点击"停止"按钮停止当前运行的服务
                                    <br>• 点击"应用"和"确定"

                                    <br><br>您希望了解更多关于电池更换选项，还是想先尝试修复Windows Update问题？</p>
                                </div>
                            </div>

                            <div class="flex mb-4">
                                <div class="flex-shrink-0 mr-3">
                                    <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">客</div>
                                </div>
                                <div>
                                    <p class="text-gray-800">我先尝试修复Windows Update的问题。另外，关于更换电池，你们可以提供这项服务吗？大概多少钱？</p>
                                </div>
                            </div>

                            <div class="flex">
                                <div class="flex-shrink-0 mr-3">
                                    <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">AI</div>
                                </div>
                                <div>
                                    <p class="text-gray-800 italic text-sm mb-1">[系统: 查询服务选项]</p>
                                    <div class="bg-gray-200 p-2 rounded text-xs font-mono mb-2 overflow-x-auto">
                                        MCP更新: 工具调用 - 查询XPS 15 9560电池更换服务和价格
                                    </div>

                                    <p class="text-gray-800 italic text-sm mb-1">[系统: 更新用户偏好]</p>
                                    <div class="bg-gray-200 p-2 rounded text-xs font-mono mb-2 overflow-x-auto">
                                        MCP更新: 记录用户对电池更换服务的兴趣，保存为后续跟进项目
                                    </div>

                                    <p class="text-gray-800">好的，请先按照前面的步骤修复Windows Update服务问题。这应该能帮助解决充电速度慢的问题。

                                    <br><br>关于电池更换服务：
                                    <br>• 是的，我们提供官方电池更换服务
                                    <br>• XPS 15 9560型号的原装电池更换费用为880元，包含电池成本和人工费
                                    <br>• 服务方式有两种：
                                      <br>  1. 送修到授权服务中心，通常1-2个工作日完成
                                      <br>  2. 上门服务(仅限部分城市)，需额外支付150元上门费
                                    <br>• 更换后电池享有6个月保修

                                    <br><br>如果您有兴趣，我可以帮您查询您所在地区的最近服务中心或预约上门服务。您住在哪个城市？</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h4 class="text-lg font-semibold mb-3 text-gray-900">关键MCP特性分析</h4>

                    <div class="overflow-x-auto mb-6">
                        <table class="min-w-full bg-white border border-gray-200 text-gray-700">
                            <thead>
                                <tr>
                                    <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">MCP特性</th>
                                    <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">对话中的体现</th>
                                    <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">价值展示</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="py-2 px-4 border-b border-gray-200 font-medium">跨会话记忆</td>
                                    <td class="py-2 px-4 border-b border-gray-200">
                                        系统在第二天立即识别上下文，无需用户重复问题
                                    </td>
                                    <td class="py-2 px-4 border-b border-gray-200">
                                        提供连贯体验，节省用户时间，增强专业感
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-2 px-4 border-b border-gray-200 font-medium">用户信息整合</td>
                                    <td class="py-2 px-4 border-b border-gray-200">
                                        记住用户名字、设备型号、购买日期等关键信息
                                    </td>
                                    <td class="py-2 px-4 border-b border-gray-200">
                                        个性化服务体验，精准问题诊断
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-2 px-4 border-b border-gray-200 font-medium">状态管理</td>
                                    <td class="py-2 px-4 border-b border-gray-200">
                                        从"信息收集"转变为"故障诊断"，适应对话进展
                                    </td>
                                    <td class="py-2 px-4 border-b border-gray-200">
                                        确保对话流程符合支持标准，不遗漏关键步骤
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-2 px-4 border-b border-gray-200 font-medium">工具集成</td>
                                    <td class="py-2 px-4 border-b border-gray-200">
                                        无缝查询产品数据库、服务选项和价格信息
                                    </td>
                                    <td class="py-2 px-4 border-b border-gray-200">
                                        提供精确实时信息，增强回答可靠性
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-2 px-4 border-b border-gray-200 font-medium">优先级管理</td>
                                    <td class="py-2 px-4 border-b border-gray-200">
                                        识别并跟进两个主要问题点，按逻辑顺序处理
                                    </td>
                                    <td class="py-2 px-4 border-b border-gray-200">
                                        结构化问题解决流程，确保高效服务
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h4 class="text-lg font-semibold mb-3 text-gray-900">MCP带来的关键优势</h4>
                    <ul class="list-disc pl-6 mb-4 text-gray-700 space-y-1">
                        <li><strong>业务连续性</strong>：即使对话跨越多天，系统也能维持问题上下文，提供连贯服务</li>
                        <li><strong>个性化体验</strong>：根据用户资料和历史行为调整回应，增强用户满意度</li>
                        <li><strong>问题解决效率</strong>：不需要重复收集信息，直接继续上次的诊断流程</li>
                        <li><strong>客户关系管理</strong>：记录用户偏好和兴趣点，为后续跟进和销售提供机会</li>
                        <li><strong>服务质量标准化</strong>：确保每次交互都遵循预设的服务流程和专业标准</li>
                    </ul>
                </div>
            </div>

            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
                <p class="text-blue-700">
                    <strong>总结</strong>：MCP不仅是一种技术实现，更是增强AI系统连续性、记忆力和适应性的关键框架。通过结构化管理上下文信息，MCP使AI系统能够提供更像人类的服务体验 - 记住过往交谈、理解用户需求的演变、在复杂任务中保持连贯性。这种能力在客服、教育、个人助理等领域尤为重要，从根本上改变了用户与AI系统的互动方式。
                </p>
            </div>

            <div class="mt-12 text-center">
                <button class="demo-trigger bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-colors"
                        data-demo="mcp-demo">
                    体验互动演示
                </button>
                <p class="text-sm text-gray-600 mt-2">点击按钮体验MCP在智能客服场景中的应用</p>
            </div>
        `;
  }
};
