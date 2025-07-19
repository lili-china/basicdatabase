<template>
  <div class="info-section">
    <h3>Basic Information</h3>
    <div class="basic-info">
      <div class="user-avatar-section">
        <div class="avatar-carousel">
          <div 
            v-for="(avatar, index) in user.avatars" 
            :key="index"
            class="avatar-item"
            :class="{ active: currentAvatarIndex === index }"
            @click="setCurrentAvatar(index)"
          >
            <el-image 
              :src="avatar" 
              :alt="`${user.name} photo ${index + 1}`"
              fit="cover"
              :preview-src-list="user.avatars"
              :initial-index="index"
              preview-teleported
              class="avatar-image"
            />
            <div class="avatar-badge" v-if="index === 0">
              <el-icon><Star /></el-icon>
              <span>Primary</span>
            </div>
            <div class="avatar-number">{{ index + 1 }}</div>
          </div>
        </div>
        <div class="main-avatar">
          <el-image 
            :src="currentAvatar" 
            :alt="user.name"
            fit="cover"
            :preview-src-list="user.avatars"
            :initial-index="currentAvatarIndex"
            preview-teleported
            class="main-avatar-image"
          />
          <div class="avatar-info">
            <span class="photo-count">{{ user.avatars.length }} photos</span>
            <span class="current-photo">Photo {{ currentAvatarIndex + 1 }}</span>
          </div>
        </div>
      </div>
      <div class="basic-details">
        <!-- 基本信息 -->
        <div class="detail-group">
          <h4 class="group-title">Personal Information</h4>
          <div class="detail-row">
            <span class="label">ID:</span>
            <span class="value">{{ user.id }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Name:</span>
            <span class="value">{{ user.name }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Gender:</span>
            <span class="value">{{ user.gender }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Age:</span>
            <span class="value">{{ user.age }} years old</span>
          </div>
          <div class="detail-row">
            <span class="label">Birth Date:</span>
            <span class="value">{{ user.birthDate }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Nationality:</span>
            <span class="value">{{ user.nationality }}</span>
          </div>
          <div class="detail-row">
            <span class="label">ID Card Number:</span>
            <span class="value">{{ user.idCardNumber }}</span>
          </div>
        </div>

        <!-- 联系信息 -->
        <div class="detail-group">
          <h4 class="group-title">Contact Information</h4>
          <div class="detail-row">
            <span class="label">Email:</span>
            <span class="value">{{ user.email }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Phone:</span>
            <span class="value">{{ user.phone }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Emergency Contact:</span>
            <span class="value">{{ user.emergencyContact }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Emergency Phone:</span>
            <span class="value">{{ user.emergencyPhone }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Address:</span>
            <span class="value">{{ user.address }}</span>
          </div>
        </div>

        <!-- 工作信息 -->
        <div class="detail-group">
          <h4 class="group-title">Work Information</h4>
          <div class="detail-row">
            <span class="label">Position:</span>
            <span class="value">{{ user.position }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Department:</span>
            <span class="value">{{ user.department }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Employee Status:</span>
            <span class="value status-badge" :class="user.status">{{ user.status }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Hire Date:</span>
            <span class="value">{{ user.hireDate }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Work Years:</span>
            <span class="value">{{ user.workYears }} years</span>
          </div>
          <div class="detail-row">
            <span class="label">Manager:</span>
            <span class="value">{{ user.manager }}</span>
          </div>
        </div>

        <!-- 其他信息 -->
        <div class="detail-group">
          <h4 class="group-title">Additional Information</h4>
          <div class="detail-row">
            <span class="label">Blood Type:</span>
            <span class="value">{{ user.bloodType }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Marital Status:</span>
            <span class="value">{{ user.maritalStatus }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Education Level:</span>
            <span class="value">{{ user.educationLevel }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Skills:</span>
            <span class="value">{{ user.skills }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Star } from '@element-plus/icons-vue'

interface User {
  id: string
  name: string
  position: string
  email: string
  phone: string
  gender: string
  age: number
  nationality: string
  avatar: string
  avatars: string[]
  birthDate: string
  idCardNumber: string
  emergencyContact: string
  emergencyPhone: string
  address: string
  department: string
  status: string
  hireDate: string
  workYears: number
  manager: string
  bloodType: string
  maritalStatus: string
  educationLevel: string
  skills: string
}

interface Props {
  user: User
}

const props = defineProps<Props>()

const currentAvatarIndex = ref(0)

const currentAvatar = computed(() => {
  return props.user.avatars?.[currentAvatarIndex.value] || props.user.avatar
})

const setCurrentAvatar = (index: number) => {
  currentAvatarIndex.value = index
}
</script>

<style scoped>
.info-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--bg-tertiary);
  border-radius: 12px;
  border: 1px solid var(--border-primary);
}

.info-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
  border-bottom: 2px solid var(--accent-secondary);
  padding-bottom: 0.5rem;
}

.basic-info {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.user-avatar-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  background: var(--bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--border-primary);
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
  z-index: 2;
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
  border: 1px solid var(--border-primary);
  z-index: 2;
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.detail-group {
  background: var(--bg-secondary);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--border-primary);
}

.group-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.75rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-primary);
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-row .label {
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
}

.detail-row .value {
  color: var(--text-primary);
  font-size: 0.875rem;
  font-weight: 600;
  text-align: right;
  max-width: 60%;
  word-break: break-word;
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

/* 自定义Element Plus图片预览样式 */
:deep(.el-image-viewer__wrapper) {
  z-index: 99999;
}

:deep(.el-image-viewer__btn) {
  color: white;
  background: rgba(0, 0, 0, 0.5);
}

:deep(.el-image-viewer__btn:hover) {
  background: rgba(0, 0, 0, 0.8);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .basic-info {
    flex-direction: column;
    gap: 1rem;
  }
  
  .avatar-carousel {
    max-width: 100%;
    justify-content: center;
    max-height: 150px;
  }
  
  .main-avatar {
    width: 100px;
    height: 100px;
    align-self: center;
  }
  
  .basic-details {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .detail-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  
  .detail-row .value {
    text-align: left;
    max-width: 100%;
  }
}

/* 滚动条样式 */
.avatar-carousel::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.avatar-carousel::-webkit-scrollbar-track {
  background: var(--bg-primary);
  border-radius: 3px;
}

.avatar-carousel::-webkit-scrollbar-thumb {
  background: var(--border-primary);
  border-radius: 3px;
}

.avatar-carousel::-webkit-scrollbar-thumb:hover {
  background: var(--accent-primary);
}
</style> 