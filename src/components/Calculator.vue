<script setup lang="ts">
import { ref } from 'vue';
import { SUBNET_MASKS } from '../constants';
import { isIpValid, getNetworkAddress, getAddressesCount } from '../utils/ipUtils';

const isShowResult = ref(false);
const ip = ref("");
const mask = ref(SUBNET_MASKS[0]);

function showResult() {
  isShowResult.value = true;
}
</script>

<template>
  <form @submit.prevent="showResult" class="calculator-form">
    <h2 class="calculator-title">✨ Калькулятор IP-сети ✨</h2>
    <div class="calculator-container">
      <input
        v-model="ip"
        placeholder="Введите IP-адрес (например: 192.168.1.1)"
        class="calculator-input"
      />
      <select v-model="mask" class="calculator-select">
        <option v-for="option in SUBNET_MASKS" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
      <button
        type="submit"
        :disabled="!isIpValid(ip)"
        class="calculator-button"
      >
        РАССЧИТАТЬ
      </button>
    </div>

    <div v-if="isShowResult && isIpValid(ip)" class="calculator-result">
      <div class="result-item">
        <span class="label">IP-адрес:</span>
        <span class="value">{{ ip }}</span>
      </div>
      <div class="result-item">
        <span class="label">Маска подсети:</span>
        <span class="value">{{ mask }}</span>
      </div>
      <div class="result-item">
        <span class="label">Адрес сети:</span>
        <span class="value">{{ getNetworkAddress(ip, mask) }}</span>
      </div>
      <div class="result-item">
        <span class="label">Количество адресов:</span>
        <span class="value">{{ getAddressesCount(mask) }}</span>
      </div>
    </div>
  </form>
</template>

<style scoped>
.calculator-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.calculator-title {
  text-align: center;
  color: var(--primary-color);
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.calculator-container {
  display: flex;
  gap: 10px;
  align-items: center;
}

.calculator-input,
.calculator-select {
  padding: 10px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  flex: 1;
}

.calculator-input:focus,
.calculator-select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 5px var(--primary-color);
}

.calculator-button {
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease;
}

.calculator-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.calculator-button:disabled {
  background: var(--disabled-bg);
  cursor: not-allowed;
  transform: none;
}

.calculator-result {
  margin-top: 20px;
  padding: 15px;
  background: var(--result-bg);
  border: 2px dashed var(--border-color);
  border-radius: 10px;
}

.result-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid var(--divider-color);
}

.result-item:last-child {
  border-bottom: none;
}

.label {
  font-weight: bold;
  color: var(--primary-color);
}

.value {
  color: var(--secondary-color);
  font-weight: bold;
  background: white;
  padding: 4px 8px;
  border-radius: 5px;
  border: 1px solid var(--border-color);
}
</style>