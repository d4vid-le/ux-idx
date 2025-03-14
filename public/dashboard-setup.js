// This script sets up a demo user in localStorage and redirects to the dashboard
function setupDemoUser() {
  // Create a demo user object
  const demoUser = {
    id: "demo-user-12345",
    email: "demo@idxsolution.com",
    name: "Demo User",
    avatar: null,
    lastLogin: new Date().toISOString()
  };

  // Store in localStorage
  localStorage.setItem("idx_user", JSON.stringify(demoUser));
  
  console.log("Demo user has been set up in localStorage.");
  console.log("You will be redirected to the dashboard or demo page.");
  
  // Check if we're in a Next.js environment or static HTML
  setTimeout(() => {
    // Try to redirect to dashboard-demo.html first (standalone demo)
    window.location.href = "/direct-dashboard.html";
  }, 1000);
}

// Execute setup immediately
setupDemoUser(); 