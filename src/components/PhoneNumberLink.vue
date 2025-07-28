<template>
  <span 
    class="phone-number-link" 
    @click="handleClick"
    :title="`Click to view ISP details for ${phoneNumber}`"
  >
    {{ phoneNumber }}
  </span>
</template>

<script setup lang="ts">
import { handlePhoneClick } from '@/utils/phoneClickHandler'
import { useRouter } from 'vue-router'

const props = defineProps<{
  phoneNumber: string
}>()

const router = useRouter()

function handleClick() {
  handlePhoneClick(props.phoneNumber, router)
}
</script>

<style scoped>
.phone-number-link {
  color: var(--accent-primary);
  text-decoration: underline;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.phone-number-link:hover {
  opacity: 0.8;
  color: var(--accent-secondary);
}

.phone-number-link:active {
  transform: scale(0.98);
}
</style> 