<template>
  <div :class="['main-container', { 'sidebar-collapsed': isSidebarCollapsed }]">
    <!-- 添加侧边栏 -->
    <div class="sidebar" :class="{ collapsed: isSidebarCollapsed }">
      <button class="toggle-btn" @click="toggleSidebar">☰</button>
      <button class="new-topic-btn" @click="createNewTopic">新建话题</button>
      <div class="topic-list">
        <div
          v-for="topic in topics"
          :key="topic.id"
          :class="['topic-item', { active: currentTopicId === topic.id }]"
          @click="switchTopic(topic.id)"
        >
          {{ topic.message_name }}
        </div>
      </div>
    </div>

    <!-- 主聊天区域 -->
    <div class="chat-container">
      <div class="chat-log">
        <div v-for="(msg, index) in chatLog" :key="index" :class="msg.role">
          <strong>{{ msg.role === 'user' ? '用户' : '助手' }}：</strong>
          <span>{{ msg.content }}</span>
        </div>
      </div>
      <div class="chat-input">
        <textarea
          v-model="userInput"
          placeholder="请输入您的问题"
          :disabled="!currentTopicId"
        ></textarea>
        <button
          @click="sendMessage"
          :disabled="loading || !currentTopicId"
        >发送</button>
      </div>
      <div v-if="loading" class="loading">等待回复中...</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      userInput: '',
      chatLog: [],
      loading: false,
      topics: [], // 所有话题列表
      currentTopicId: null, // 当前选中的话题ID
      isSidebarCollapsed: false // 控制侧边栏的展开与折叠
    }
  },
  methods: {
    // 获取所有话题
    async fetchTopics() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/chat/')
        this.topics = response.data
      } catch (error) {
        console.error('获取话题列表失败：', error)
      }
    },

    // 创建新话题
    async createNewTopic() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/chat/new_topic/')
        this.topics.push(response.data)
        this.switchTopic(response.data.id)
      } catch (error) {
        console.error('创建新话题失败：', error)
      }
    },

    // 切换话题
    async switchTopic(topicId) {
      this.currentTopicId = topicId
      const topic = this.topics.find(t => t.id === topicId)
      this.chatLog = topic.message_content || []
    },

    // 发送消息
    async sendMessage() {
      if (!this.userInput.trim() || this.loading || !this.currentTopicId) return

      this.loading = true
      try {
        const formData = new FormData()
        formData.append('message', this.userInput)
        formData.append('topic_id', this.currentTopicId)

        const response = await axios.post('http://127.0.0.1:8000/api/chat/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        if (response.data.message && response.data.message.message_content) {
          this.chatLog = response.data.message.message_content
          // 更新topics中对应话题的内容
          const topicIndex = this.topics.findIndex(t => t.id === this.currentTopicId)
          if (topicIndex !== -1) {
            this.topics[topicIndex].message_content = response.data.message.message_content
          }
        }

        this.userInput = ''
      } catch (error) {
        console.error('发送消息失败：', error)
      } finally {
        this.loading = false
      }
    },

    // 切换侧边栏的展开与折叠
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed
    }
  },
  mounted() {
    this.fetchTopics()
  }
}
</script>

<style scoped>
.main-container {
  display: flex;
  gap: 20px;
  width: calc(100% - 200px); /* 假设侧边栏宽度为200px */
  height: calc(100vh - 20px);
  transition: margin-left 0.3s ease;
}

.main-container.sidebar-collapsed {
  width: calc(100% - 40px); /* 当侧边栏折叠时调整 */
}

.sidebar {
  width: 200px;
  border-right: 1px solid #eee;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: #f7f7f7;
  transition: width 0.3s ease, padding 0.3s ease;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar.collapsed {
  width: 40px;
  padding: 10px 5px;
}

.sidebar.collapsed .new-topic-btn,
.sidebar.collapsed .topic-item {
  display: none;
}

.new-topic-btn {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.toggle-btn {
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 20px;
  margin-bottom: 10px;
}

.topic-list {
  flex: 1;
  overflow-y: auto;
}

.topic-item {
  padding: 10px;
  margin: 5px 0;
  cursor: pointer;
  border-radius: 4px;
}

.topic-item:hover {
  background-color: #f0f0f0;
}

.topic-item.active {
  background-color: #e3f2fd;
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 300px;
  padding: 0 15px;
}

.chat-log {
  border: 1px solid #eee;
  padding: 15px;
  height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
  border-radius: 4px;
  background-color: #ffffff;
}

.chat-log .user,
.chat-log .assistant {
  margin: 10px 0;
  padding: 10px;
  border-radius: 4px;
}

.chat-log .user {
  background-color: #e3f2fd;
  margin-left: 20%;
}

.chat-log .assistant {
  background-color: #f5f5f5;
  margin-right: 20%;
}

.chat-input {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chat-input textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none;
}

.chat-input button {
  padding: 10px 20px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-end;
}

.chat-input button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.loading {
  text-align: center;
  color: #666;
  margin-top: 10px;
}
</style>
