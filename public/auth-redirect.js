// This script helps with client-side redirections based on authentication state

// Check if the user is already logged in (has token in localStorage)
function checkAuthAndRedirect() {
  console.log("AUTH-REDIRECT: Running auth check");
  
  // Try to get user from localStorage
  const user = localStorage.getItem('idx_user');
  console.log("AUTH-REDIRECT: User in localStorage:", user ? "Found" : "Not found");
  
  // Get the current path
  const currentPath = window.location.pathname;
  console.log("AUTH-REDIRECT: Current path:", currentPath);
  
  // If user exists and trying to access login/signup page, redirect to dashboard
  if (user && (currentPath === '/login' || currentPath === '/signup')) {
    console.log("AUTH-REDIRECT: User logged in and on auth page, redirecting to dashboard");
    window.location.href = '/dashboard';
  }
  
  // If on dashboard pages and no user, redirect to login
  if (!user && currentPath.startsWith('/dashboard')) {
    console.log("AUTH-REDIRECT: User not logged in but trying to access dashboard, redirecting to login");
    window.location.href = '/login';
  }
}

// Run on page load
document.addEventListener('DOMContentLoaded', checkAuthAndRedirect);

// Also check when state might have changed
window.addEventListener('storage', function(e) {
  if (e.key === 'idx_user') {
    console.log("AUTH-REDIRECT: Storage event detected for idx_user, running auth check");
    checkAuthAndRedirect();
  }
}); 