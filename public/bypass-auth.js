// This script sets a demo user in localStorage to bypass authentication
function setDemoUser() {
  // First, clear any existing tokens or auth data
  localStorage.removeItem('idx_user');
  sessionStorage.removeItem('idx_user');
  
  // Create a comprehensive demo user object
  const demoUser = {
    id: 'demo-user-12345',
    email: 'demo@idxsolution.com',
    name: 'Demo User',
    avatar: null,
    role: 'user',
    lastLogin: new Date().toISOString(),
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    preferences: {
      notifications: true,
      darkMode: false
    },
    token: 'demo-token-' + Math.random().toString(36).substring(2, 15)
  };
  
  // Store in localStorage
  localStorage.setItem('idx_user', JSON.stringify(demoUser));
  
  console.log('✅ Demo user set in localStorage');
  console.log('📋 User details:', demoUser);
  console.log('🔄 Redirecting to dashboard...');
  
  // Redirect to dashboard with a short delay to ensure localStorage is set
  setTimeout(() => {
    window.location.href = '/dashboard';
  }, 500);
}

// Run the function immediately
setDemoUser(); 