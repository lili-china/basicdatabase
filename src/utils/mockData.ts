// Mock数据配置文件
// 用于在开发阶段提供测试数据，后期可以方便地切换为真实API

// ==================== ISP数据库Mock数据 ====================
export const mockISPs = [
  {
    id: 1,
    name: 'Comcast',
    location: 'Philadelphia, PA',
    serviceType: 'Cable',
    status: 'active',
    maxSpeed: '1.2 Gbps',
    coverage: '40 states',
    logo: 'https://via.placeholder.com/60x30/3b82f6/ffffff?text=Comcast',
    region: 'north-america',
    description: 'Leading cable internet provider in the United States',
    identityNo: 'COM001',
    phoneNum: '+1-800-934-6489',
    realName: 'John Smith',
    nationality: 'American',
    birthDate: '1990-01-15',
    address: '123 Main St, Philadelphia, PA 19103',
    registrationDate: '2020-01-01',
    expiryDate: '2025-01-01',
    photo: 'https://via.placeholder.com/100x100/3b82f6/ffffff?text=John',
    avatars: [
      'https://via.placeholder.com/100x100/3b82f6/ffffff?text=John',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1524504388940-b57c6c6f2df5?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face'
    ]
  },
  {
    id: 2,
    name: 'Verizon Fios',
    location: 'New York, NY',
    serviceType: 'Fiber',
    status: 'active',
    maxSpeed: '2 Gbps',
    coverage: '9 states',
    logo: 'https://via.placeholder.com/60x30/ef4444/ffffff?text=Verizon',
    region: 'north-america',
    description: 'High-speed fiber optic internet service',
    identityNo: 'VER002',
    phoneNum: '+1-800-922-0204',
    realName: 'Sarah Johnson',
    nationality: 'Canadian',
    birthDate: '1985-05-20',
    address: '456 Oak Ave, New York, NY 10001',
    registrationDate: '2021-02-15',
    expiryDate: '2026-02-15',
    photo: 'https://via.placeholder.com/100x100/ef4444/ffffff?text=Sarah',
    avatars: [
      'https://via.placeholder.com/100x100/ef4444/ffffff?text=Sarah',
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1524504388940-b57c6c6f2df5?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face'
    ]
  },
  {
    id: 3,
    name: 'AT&T',
    location: 'Dallas, TX',
    serviceType: 'Fiber',
    status: 'active',
    maxSpeed: '5 Gbps',
    coverage: '21 states',
    logo: 'https://via.placeholder.com/60x30/10b981/ffffff?text=AT&T',
    region: 'north-america',
    description: 'Advanced fiber internet with high speeds',
    identityNo: 'ATT003',
    phoneNum: '+1-800-288-2020',
    realName: 'Michael Brown',
    nationality: 'British',
    birthDate: '1978-11-10',
    address: '789 Pine Ln, Dallas, TX 75201',
    registrationDate: '2019-03-01',
    expiryDate: '2024-03-01',
    photo: 'https://via.placeholder.com/100x100/10b981/ffffff?text=Michael',
    avatars: [
      'https://via.placeholder.com/100x100/10b981/ffffff?text=Michael',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1524504388940-b57c6c6f2df5?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face'
    ]
  },
  {
    id: 4,
    name: 'Spectrum',
    location: 'Stamford, CT',
    serviceType: 'Cable',
    status: 'active',
    maxSpeed: '1 Gbps',
    coverage: '41 states',
    logo: 'https://via.placeholder.com/60x30/f59e0b/ffffff?text=Spectrum',
    region: 'north-america',
    description: 'Reliable cable internet service',
    identityNo: 'SPE004',
    phoneNum: '+1-855-757-7328',
    realName: 'Emily Davis',
    nationality: 'French',
    birthDate: '1992-07-25',
    address: '101 Cedar St, Stamford, CT 06902',
    registrationDate: '2022-04-10',
    expiryDate: '2027-04-10',
    photo: 'https://via.placeholder.com/100x100/f59e0b/ffffff?text=Emily',
    avatars: [
      'https://via.placeholder.com/100x100/f59e0b/ffffff?text=Emily',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1524504388940-b57c6c6f2df5?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face'
    ]
  },
  {
    id: 5,
    name: 'CenturyLink',
    location: 'Monroe, LA',
    serviceType: 'DSL',
    status: 'active',
    maxSpeed: '100 Mbps',
    coverage: '37 states',
    logo: 'https://via.placeholder.com/60x30/8b5cf6/ffffff?text=CenturyLink',
    region: 'north-america',
    description: 'DSL and fiber internet services',
    identityNo: 'CEN005',
    phoneNum: '+1-800-244-1111',
    realName: 'David Wilson',
    nationality: 'German',
    birthDate: '1980-09-05',
    address: '202 Maple Ave, Monroe, LA 71201',
    registrationDate: '2020-05-20',
    expiryDate: '2025-05-20',
    photo: 'https://via.placeholder.com/100x100/8b5cf6/ffffff?text=David',
    avatars: [
      'https://via.placeholder.com/100x100/8b5cf6/ffffff?text=David',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1524504388940-b57c6c6f2df5?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face'
    ]
  },
  {
    id: 6,
    name: 'Cox Communications',
    location: 'Atlanta, GA',
    serviceType: 'Cable',
    status: 'active',
    maxSpeed: '1 Gbps',
    coverage: '18 states',
    logo: 'https://via.placeholder.com/60x30/06b6d4/ffffff?text=Cox',
    region: 'north-america',
    description: 'Cable internet and digital services',
    identityNo: 'COX006',
    phoneNum: '+1-800-234-3993',
    realName: 'Lisa Anderson',
    nationality: 'Italian',
    birthDate: '1995-12-18',
    address: '303 Birch St, Atlanta, GA 30303',
    registrationDate: '2021-06-01',
    expiryDate: '2026-06-01',
    photo: 'https://via.placeholder.com/100x100/06b6d4/ffffff?text=Lisa',
    avatars: [
      'https://via.placeholder.com/100x100/06b6d4/ffffff?text=Lisa',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1524504388940-b57c6c6f2df5?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face'
    ]
  }
]

// ==================== 车辆数据库Mock数据 ====================
export const generateMockVehicles = () => {
  const vehicleTypes = ['Company Car', 'Personal Vehicle', 'Motorcycle', 'Truck']
  const statuses = ['Active', 'Maintenance', 'Retired']
  const brands = ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Audi', 'Volkswagen', 'Nissan']
  const models = ['Camry', 'Accord', 'Focus', '3 Series', 'C-Class', 'A4', 'Golf', 'Altima']
  const colors = ['White', 'Black', 'Silver', 'Blue', 'Red', 'Gray', 'Green', 'Yellow']
  const owners = [
    'John Smith', 'Sarah Johnson', 'Michael Chen', 'Emily Rodriguez',
    'David Kim', 'Lisa Wang', 'Alex Thompson', 'Maria Garcia'
  ]
  
  const vehicles = []
  
  for (let i = 0; i < 30; i++) {
    const year = Math.floor(Math.random() * 10) + 2015 // 2015-2024
    const licensePlate = `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 9000) + 1000}`
    const brandIndex = i % brands.length
    const modelIndex = i % models.length
    
    vehicles.push({
      id: `VEH-2024-${String(i + 1).padStart(3, '0')}`,
      type: vehicleTypes[i % vehicleTypes.length],
      licensePlate: licensePlate,
      brand: brands[brandIndex],
      model: models[modelIndex],
      year: year,
      color: colors[i % colors.length],
      status: statuses[i % statuses.length],
      owner: owners[i % owners.length],
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop'
    })
  }
  
  return vehicles
}

// ==================== 员工数据库Mock数据 ====================
export const generateMockUsers = () => {
  const names = [
    'John Smith', 'Sarah Johnson', 'Michael Chen', 'Emily Rodriguez',
    'David Kim', 'Lisa Wang', 'Alex Thompson', 'Maria Garcia',
    'James Wilson', 'Jennifer Lee', 'Robert Brown', 'Amanda Davis',
    'Christopher Miller', 'Jessica Taylor', 'Daniel Anderson', 'Ashley White',
    'Matthew Jackson', 'Nicole Martinez', 'Joshua Garcia', 'Stephanie Rodriguez',
    'Andrew Lopez', 'Rachel Gonzalez', 'Kevin Perez', 'Lauren Torres',
    'Brian Moore', 'Megan Lewis', 'Ryan Clark', 'Katherine Hall',
    'Steven Young', 'Victoria Allen', 'Timothy King', 'Samantha Wright',
    'Jeffrey Green', 'Hannah Scott', 'Gary Baker', 'Olivia Adams',
    'Ronald Nelson', 'Isabella Carter', 'Edward Mitchell', 'Sophia Roberts',
    'Kenneth Turner', 'Ava Phillips', 'Donald Campbell', 'Mia Parker',
    'Paul Evans', 'Chloe Edwards', 'Mark Collins', 'Grace Stewart',
    'George Morris', 'Zoe Rogers'
  ]
  
  const positions = [
    'Software Engineer', 'UI/UX Designer', 'Product Manager', 'Data Scientist',
    'DevOps Engineer', 'Frontend Developer', 'Backend Developer', 'QA Engineer',
    'System Administrator', 'Network Engineer', 'Security Analyst', 'Business Analyst',
    'Project Manager', 'Technical Lead', 'Architect', 'Database Administrator'
  ]
  
  const nationalities = [
    'American', 'Canadian', 'British', 'Australian', 'German', 'French',
    'Italian', 'Spanish', 'Dutch', 'Swedish', 'Norwegian', 'Danish',
    'Swiss', 'Austrian', 'Belgian', 'Irish', 'Scottish', 'Welsh'
  ]
  
  const genders = ['Male', 'Female']
  
  const avatars = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face'
  ]
  
  const users = []
  
  for (let i = 0; i < 50; i++) {
    const age = Math.floor(Math.random() * 25) + 22 // 22-46岁
    const phoneNumber = `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`
    const mainAvatar = avatars[i % avatars.length]
    
    // 为每个用户生成多张照片（10多张）
    const userAvatars = [
      mainAvatar,
      avatars[(i + 1) % avatars.length],
      avatars[(i + 2) % avatars.length],
      avatars[(i + 3) % avatars.length],
      avatars[(i + 4) % avatars.length],
      avatars[(i + 5) % avatars.length],
      avatars[(i + 6) % avatars.length],
      avatars[(i + 7) % avatars.length],
      avatars[(i + 8) % avatars.length],
      avatars[(i + 9) % avatars.length],
      avatars[(i + 10) % avatars.length],
      avatars[(i + 11) % avatars.length],
      avatars[(i + 12) % avatars.length]
    ]
    
    users.push({
      id: `EMP-2024-${String(i + 1).padStart(3, '0')}`,
      name: names[i % names.length],
      position: positions[i % positions.length],
      email: `${names[i % names.length].toLowerCase().replace(' ', '.')}@company.com`,
      avatar: mainAvatar,
      avatars: userAvatars,
      nationality: nationalities[i % nationalities.length],
      gender: genders[i % genders.length],
      age: age,
      phone: phoneNumber
    })
  }
  
  return users
}

// ==================== 企业数据库Mock数据 ====================
export const generateMockEnterprises = () => {
  const companyTypes = ['Technology', 'Manufacturing', 'Finance', 'Healthcare', 'Education', 'Retail', 'Consulting']
  const statuses = ['Active', 'Inactive', 'Suspended', 'Dissolved']
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose']
  const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'FL', 'OH', 'GA', 'NC']
  
  const enterprises = []
  
  for (let i = 1; i <= 100; i++) {
    const companyType = companyTypes[Math.floor(Math.random() * companyTypes.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const cityIndex = Math.floor(Math.random() * cities.length)
    const foundedYear = Math.floor(Math.random() * 30) + 1990
    const capital = Math.floor(Math.random() * 1000000000) + 100000
    
    const enterprise = {
      id: `ENT${i.toString().padStart(3, '0')}`,
      companyName: `${companyType} Corp ${i}`,
      registrationNumber: `REG${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
      companyType,
      registeredCapital: `$${(capital / 1000000).toFixed(1)}M`,
      foundedYear: foundedYear.toString(),
      legalRepresentative: `Legal Rep ${i}`,
      phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      email: `contact@${companyType.toLowerCase()}corp${i}.com`,
      website: `https://www.${companyType.toLowerCase()}corp${i}.com`,
      address: `${Math.floor(Math.random() * 9999) + 1} ${['Main', 'Oak', 'Pine', 'Elm', 'Maple'][Math.floor(Math.random() * 5)]} St, ${cities[cityIndex]}, ${states[cityIndex]} ${Math.floor(Math.random() * 90000) + 10000}`,
      status,
      businessScope: `${companyType} services and solutions for enterprise clients. Specializing in innovative technologies and customer-focused solutions.`,
      employees: Math.floor(Math.random() * 10000) + 10,
      revenue: `$${(Math.floor(Math.random() * 1000000000) / 1000000).toFixed(1)}M`,
      industry: companyType,
      taxId: `TAX${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
      registrationDate: `${foundedYear}-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`,
      lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]
    }
    
    enterprises.push(enterprise)
  }
  
  return enterprises
}

// ==================== ISP最近通话Mock数据 ====================
export const mockCallRecords = [
  {
    userId: 'COM001', // John Smith
    contacts: [
      { name: 'Sarah Johnson', phone: '+1-800-922-0204', direction: '呼出', time: '2024-06-01 10:00' },
      { name: 'Michael Brown', phone: '+1-800-288-2020', direction: '呼入', time: '2024-05-31 16:20' },
      { name: 'Emily Davis', phone: '+1-800-555-1234', direction: '呼出', time: '2024-05-30 14:10' },
      { name: 'David Wilson', phone: '+1-800-555-5678', direction: '呼入', time: '2024-05-29 09:45' },
      { name: 'Sophia Lee', phone: '+1-800-555-8765', direction: '呼出', time: '2024-05-28 11:30' },
      { name: 'James Miller', phone: '+1-800-555-4321', direction: '呼入', time: '2024-05-27 17:05' },
      { name: 'Olivia Martinez', phone: '+1-800-555-2468', direction: '呼出', time: '2024-05-26 13:15' },
      { name: 'William Anderson', phone: '+1-800-555-1357', direction: '呼入', time: '2024-05-25 08:50' },
      { name: 'Ava Thomas', phone: '+1-800-555-9753', direction: '呼出', time: '2024-05-24 19:40' },
      { name: 'Benjamin Taylor', phone: '+1-800-555-8642', direction: '呼入', time: '2024-05-23 15:25' },
      { name: 'Mia Harris', phone: '+1-800-555-7531', direction: '呼出', time: '2024-05-22 10:55' },
      { name: 'Lucas Clark', phone: '+1-800-555-6420', direction: '呼入', time: '2024-05-21 12:35' },
      { name: 'Charlotte Lewis', phone: '+1-800-555-5319', direction: '呼出', time: '2024-05-20 14:20' },
      { name: 'Henry Walker', phone: '+1-800-555-4208', direction: '呼入', time: '2024-05-19 16:10' },
      { name: 'Amelia Hall', phone: '+1-800-555-3197', direction: '呼出', time: '2024-05-18 18:00' },
      { name: 'Jack Allen', phone: '+1-800-555-2086', direction: '呼入', time: '2024-05-17 20:45' },
      { name: 'Harper Young', phone: '+1-800-555-1975', direction: '呼出', time: '2024-05-16 22:30' },
      { name: 'Evelyn King', phone: '+1-800-555-0864', direction: '呼入', time: '2024-05-15 09:15' },
      { name: 'Alexander Wright', phone: '+1-800-555-9753', direction: '呼出', time: '2024-05-14 11:05' },
      { name: 'Ella Scott', phone: '+1-800-555-8642', direction: '呼入', time: '2024-05-13 13:50' }
    ]
  },
  {
    userId: 'VER002', // Sarah Johnson
    contacts: [
      { name: 'John Smith', phone: '+1-800-934-6489', direction: '呼入', time: '2024-06-01 10:00' },
      { name: 'Michael Brown', phone: '+1-800-288-2020', direction: '呼出', time: '2024-05-31 15:00' },
      { name: 'Emily Davis', phone: '+1-800-555-1234', direction: '呼入', time: '2024-05-30 13:00' },
      { name: 'David Wilson', phone: '+1-800-555-5678', direction: '呼出', time: '2024-05-29 12:00' },
      { name: 'Sophia Lee', phone: '+1-800-555-8765', direction: '呼入', time: '2024-05-28 11:00' },
      { name: 'James Miller', phone: '+1-800-555-4321', direction: '呼出', time: '2024-05-27 10:00' },
      { name: 'Olivia Martinez', phone: '+1-800-555-2468', direction: '呼入', time: '2024-05-26 09:00' },
      { name: 'William Anderson', phone: '+1-800-555-1357', direction: '呼出', time: '2024-05-25 08:00' },
      { name: 'Ava Thomas', phone: '+1-800-555-9753', direction: '呼入', time: '2024-05-24 07:00' },
      { name: 'Benjamin Taylor', phone: '+1-800-555-8642', direction: '呼出', time: '2024-05-23 06:00' }
    ]
  },
  // 可继续添加其他用户的通话记录
];

// ==================== Mock数据API接口 ====================
// 这些函数模拟真实的API调用，后期可以替换为真实的API

export const mockAPI = {
  // ISP相关API
  getISPs: () => Promise.resolve(mockISPs),
  getISPById: (id: number) => Promise.resolve(mockISPs.find(isp => isp.id === id)),
  
  // 车辆相关API
  getVehicles: () => Promise.resolve(generateMockVehicles()),
  getVehicleById: (id: string) => {
    const vehicles = generateMockVehicles()
    return Promise.resolve(vehicles.find(vehicle => vehicle.id === id))
  },
  
  // 员工相关API
  getUsers: () => Promise.resolve(generateMockUsers()),
  getUserById: (id: string) => {
    const users = generateMockUsers()
    return Promise.resolve(users.find(user => user.id === id))
  }
}

// ==================== 配置开关 ====================
// 通过这个开关可以控制是否使用mock数据
export const USE_MOCK_DATA = true

// 导出默认的mock数据获取函数
export const getMockData = {
  isps: () => USE_MOCK_DATA ? mockISPs : [],
  vehicles: () => USE_MOCK_DATA ? generateMockVehicles() : [],
  users: () => USE_MOCK_DATA ? generateMockUsers() : []
} 