# User Database Components

用户数据库相关组件，包含用户详情页面和各个数据表格组件。

## 组件列表

- `UserDetailPage.vue` - 用户详情主页面
- `BasicInfoSection.vue` - 基础信息展示组件
- `IdentityRecordsTable.vue` - 身份变更记录表格
- `FamilyMembersTable.vue` - 家庭成员表格
- `PhoneRecordsTable.vue` - 手机注册信息表格
- `BroadbandRecordsTable.vue` - 宽带注册信息表格
- `VehicleRecordsTable.vue` - 车辆登记信息表格

## 使用方式

```vue
<template>
  <UserDetailPage />
</template>

<script setup>
import { UserDetailPage } from '@/components/user-database'
</script>
```

## 数据结构

所有组件使用统一的用户数据结构，包含：
- 基础信息（姓名、年龄、性别等）
- 身份变更记录
- 家庭成员信息
- 手机注册记录
- 宽带注册记录
- 车辆登记记录 