import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jilhqlznhnchvmmvumxd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppbGhxbHpuaG5jaHZtbXZ1bXhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMDQ2ODEsImV4cCI6MjA5MDg4MDY4MX0.1F8UAxddLFyKM5nd4Han8n7L11AeKdqQoINLs45TSH4'

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
})

async function testLogin() {
  console.log('Testing ReviewSpark Login')
  console.log('==========================')
  
  const email = 'liam.phipps@gmail.com'
  const password = 'pabvak-zaChic-4duxpi'
  
  console.log(`\nTesting: ${email}`)
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) {
      console.log(`FAILED: ${error.message}`)
      return false
    }
    
    console.log('SUCCESS')
    console.log(`User: ${data.user.email}`)
    console.log(`Session active: ${data.session ? 'Yes' : 'No'}`)
    return true
    
  } catch (err) {
    console.log(`ERROR: ${err.message}`)
    return false
  }
}

testLogin()