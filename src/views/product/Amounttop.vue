<template>
  <div class="dynamic-container">
    <div class="table-container">
      <h1 class="title">{{ title }}</h1>
      <div class="date-picker">
        <label for="date">选择日期：</label>
        <input type="date" id="date-picker" v-model="selectedDate">
        <button @click="fetchStockData" class="btn">查询</button>
      </div>
      <table class="stocks-table">
        <thead>
          <tr>
            <th>股票名称</th>
            <th>代码</th>
            <th>成交额</th>
            <th>涨跌幅</th>
            <th>换手率</th>
            <th>总市值</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="stock in stocks" :key="stock.code">
            <td>{{ stock.code_name }}</td>
            <td>{{ stock.code }}</td>
            <td>{{ stock.amount }} 亿</td>
            <td>{{ stock.pctChg }}%</td>
            <td>{{ stock.turn }}%</td>
            <td>{{ stock.total_mv }} 亿</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '当日成交额前30的股票',
      selectedDate: '',
      stocks: []
    }
  },
  async mounted() {
    try {
      const dateResponse = await fetch('http://45.249.247.254:5000/api/latest-date')
      const dateData = await dateResponse.json()
      if (dateData && dateData.latestDate) {
        this.selectedDate = dateData.latestDate
        this.fetchStockData()
      }
    } catch (error) {
      console.error('Error fetching latest date:', error)
    }
  },
  methods: {
    async fetchStockData() {
      if (!this.selectedDate) {
        alert('请选择一个日期！')
        return
      }

      try {
        const response = await fetch(`http://45.249.247.254:5000/api/stocks?date=${this.selectedDate}`)
        const stocksData = await response.json()
        this.stocks = stocksData.map(stock => ({
          ...stock,
          amount: (stock.amount / 100000000).toFixed(2),
          pctChg: stock.pctChg.toFixed(2),
          turn: stock.turn.toFixed(2),
          total_mv: stock.total_mv.toFixed(2)
        }))
      } catch (error) {
        console.error('Error fetching stock data:', error)
        alert('获取股票数据时出错，请稍后再试。')
      }
    }
  }
}
</script>

<style scoped>
/* 整体容器 */
.dynamic-container {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 20px auto;
  transition: all 0.3s ease;
}

/* 表格容器 */
.table-container {
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* 标题 */
.title {
  font-size: 30px;
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

/* 日期选择器样式 */
.date-picker {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
}

.date-picker label {
  font-size: 16px;
  color: #333;
}

.date-picker input {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 180px;
  transition: border-color 0.3s;
}

.date-picker input:focus {
  border-color: #007aff;
  outline: none;
}

.btn {
  padding: 8px 16px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #005bb5;
}

/* 表格样式 */
.stocks-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.stocks-table th {
  background-color: #f5f5f7;
  color: #333;
  padding: 12px;
  text-align: center;
  font-weight: bold;
}

.stocks-table td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #e0e0e5;
}

.stocks-table tr:nth-child(even) {
  background-color: #f9f9fb;
}

.stocks-table tr:hover {
  background-color: #f0f0f5;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .date-picker {
    flex-direction: column;
    align-items: center;
  }

  .stocks-table th, .stocks-table td {
    font-size: 14px;
    padding: 8px;
  }

  .dynamic-container {
    padding: 10px;
  }

  .table-container {
    padding: 15px;
  }
}
</style>
