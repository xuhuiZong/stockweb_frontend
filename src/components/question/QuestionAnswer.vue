<template>
  <div>
    <h1>Ask the Model</h1>
    <input v-model="question" placeholder="Ask a question" />
    <button @click="askQuestion">Ask</button>
    <p v-if="answer">Answer: {{ answer }}</p>
    <p v-if="error" style="color: red;">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      question: '',
      answer: '',
      error: ''
    }
  },
  methods: {
    async askQuestion() {
      if (!this.question) {
        this.error = 'Please enter a question.'
        return
      }

      this.error = '' // Clear any previous errors

      try {
        const response = await axios.post('http://localhost:8000/api/ask/', {
          question: this.question
        })
        this.answer = response.data.answer
      } catch (error) {
        this.error = 'An error occurred while fetching the answer.'
      }
    }
  }
}
</script>
