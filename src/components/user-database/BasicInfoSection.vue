<template>
  <div class="detail-section basic-info-section">
    <h3 class="section-title">Basic Information</h3>
    <div class="basic-info-content">
      <div class="user-avatar-section">
        <div class="avatar-carousel" v-if="user.identity && user.identity.length">
          <div 
            v-for="(item, index) in user.identity" 
            :key="item.id"
            class="avatar-item"
            :class="{ active: mainAvatar === item.avatar }"
            @click="updateMainAvatar(item.avatar)"
          >
            <img :src="item.avatar" alt="History Photo" class="avatar-image" />
            <div class="avatar-badge" v-if="index === 0">
              <span>Primary</span>
            </div>
            <div class="avatar-number">{{ index + 1 }}</div>
          </div>
        </div>
        <div class="main-avatar">
          <img :src="mainAvatar" alt="Avatar" class="main-avatar-image" />
          <div class="avatar-info" v-if="user.identity && user.identity.length">
            <span class="photo-count">{{ user.identity.length }} photos</span>
            <span class="current-photo">Photo {{ getCurrentPhotoIndex() + 1 }}</span>
          </div>
        </div>
      </div>
      <div class="basic-details">
        <div class="detail-section">
          <h4>Personal Information</h4>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">ID:</span>
              <span class="detail-value">{{ user.id }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Name:</span>
              <span class="detail-value">{{ user.name }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Gender:</span>
              <span class="detail-value">{{ user.gender }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Age:</span>
              <span class="detail-value">{{ user.age }} years old</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Birth Date:</span>
              <span class="detail-value">{{ user.birth }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Nationality:</span>
              <span class="detail-value">{{ user.nationality }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Phone:</span>
              <span class="detail-value">{{ user.phone }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Email:</span>
              <span class="detail-value">{{ user.email }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Address:</span>
              <span class="detail-value">{{ user.address }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Position:</span>
              <span class="detail-value">{{ user.position }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Department:</span>
              <span class="detail-value">{{ user.department }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Status:</span>
              <span class="detail-value">
                <span class="status-badge" :class="user.status.toLowerCase()">{{ user.status }}</span>
              </span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Registration Date:</span>
              <span class="detail-value">{{ user.reg }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Expiration Date:</span>
              <span class="detail-value" :class="{ 'expired': isExpired(user.exp) }">{{ user.exp }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface User {
  id: string
  avatar: string
  name: string
  gender: string
  age: number
  phone: string
  email: string
  nationality: string
  birth: string
  address: string
  position: string
  department: string
  status: string
  reg: string
  exp: string
  identity?: Array<{
    id: string
    avatar: string
    old: string
    new: string
    date: string
    type: string
    operator: string
    remark: string
  }>
}

interface Props {
  user: User
}

const props = defineProps<Props>()

const mainAvatar = ref(props.user.avatar)

watch(() => props.user, (newUser) => {
  mainAvatar.value = newUser.avatar
}, { deep: true })

const emit = defineEmits<{
  updateMainAvatar: [avatar: string]
}>()

function updateMainAvatar(avatar: string) {
  mainAvatar.value = avatar
  emit('updateMainAvatar', avatar)
}

function getCurrentPhotoIndex() {
  if (!props.user.identity) return 0
  const index = props.user.identity.findIndex(item => item.avatar === mainAvatar.value)
  return index >= 0 ? index : 0
}

function isExpired(date: string) {
  return new Date(date) < new Date()
}
</script>

<style scoped>
.basic-info-section {
  background: var(--bg-card);
  border-radius: 12px;
  padding: 2rem 2vw;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(59,130,246,0.06);
  border: 1px solid var(--border-card);
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1.5rem 0;
  border-bottom: 2px solid var(--accent-primary);
  padding-bottom: 0.5rem;
}

.basic-info-content {
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
}

.user-avatar-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex-shrink: 0;
}

.avatar-carousel {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  max-width: 300px;
  max-height: 200px;
  overflow-y: auto;
  padding: 0.5rem;
  background: var(--bg-primary);
  border-radius: 8px;
  border: 1px solid var(--border-card);
}

.avatar-item {
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.avatar-item:hover {
  border-color: var(--accent-primary);
  transform: scale(1.05);
}

.avatar-item.active {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 2px var(--accent-secondary);
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  object-fit: cover;
}

.main-avatar {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 16px;
  overflow: hidden;
  border: 4px solid var(--accent-secondary);
  box-shadow: var(--shadow-secondary);
}

.main-avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  object-fit: cover;
}

.avatar-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  font-size: 0.625rem;
  padding: 2px 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 2px;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.avatar-number {
  position: absolute;
  bottom: -2px;
  right: -2px;
  background: var(--bg-primary);
  color: var(--text-secondary);
  font-size: 0.625rem;
  padding: 1px 3px;
  border-radius: 3px;
  font-weight: 600;
  border: 1px solid var(--border-card);
}

.avatar-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  padding: 0.5rem;
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.photo-count {
  font-weight: 600;
}

.current-photo {
  opacity: 0.9;
  font-size: 0.625rem;
}

.basic-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-section {
  background: var(--bg-card);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--border-card);
  margin-bottom: 1.5rem;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.detail-section h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--accent-primary);
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--bg-primary);
  border-radius: 8px;
  border: 1px solid var(--border-card);
}

.detail-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.detail-value {
  font-size: 0.875rem;
  color: var(--text-primary);
  font-weight: 600;
  text-align: right;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.detail-value.expired {
  color: #ef4444;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.active {
  background: #10b981;
  color: white;
}

.status-badge.inactive {
  background: #ef4444;
  color: white;
}

.status-badge.pending {
  background: #f59e0b;
  color: white;
}

.status-badge.on-leave {
  background: #8b5cf6;
  color: white;
}

@media (max-width: 900px) {
  .basic-info-content {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .user-avatar-section {
    flex-direction: row;
    gap: 1.5rem;
    justify-content: flex-start;
  }
  
  .main-avatar {
    width: 100px;
    height: 100px;
  }
}
</style> 