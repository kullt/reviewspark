import { google } from 'googleapis'
import { getValidAccessToken } from './google-auth'
import { supabaseAdmin } from '@/lib/supabase'

// My Business Account Management API
export async function getBusinessAccounts(googleAccountId: string) {
  const accessToken = await getValidAccessToken(googleAccountId)
  
  const auth = new google.auth.OAuth2()
  auth.setCredentials({ access_token: accessToken })

  const mybusiness = google.mybusinessaccountmanagement({ version: 'v1', auth })
  
  const { data } = await mybusiness.accounts.list()
  
  return data.accounts || []
}

// Get locations for a business account
export async function getBusinessLocations(
  googleAccountId: string, 
  businessAccountId: string
) {
  const accessToken = await getValidAccessToken(googleAccountId)
  
  const auth = new google.auth.OAuth2()
  auth.setCredentials({ access_token: accessToken })

  // Use the Business Information API to get locations
  const mybusiness = google.mybusinessbusinessinformation({ version: 'v1', auth })
  
  // The name format is: accounts/{account_id}/locations
  const parent = businessAccountId.startsWith('accounts/') 
    ? businessAccountId 
    : `accounts/${businessAccountId}`

  const { data } = await mybusiness.accounts.locations.list({
    parent,
    readMask: 'name,title,storeCode,websiteUri,regularHours,phoneNumbers,labels,metadata,profile,serviceArea',
  })
  
  return data.locations || []
}

// Get all locations across all accounts (flattened)
export async function getAllBusinessLocations(googleAccountId: string) {
  const accounts = await getBusinessAccounts(googleAccountId)
  
  const allLocations: Array<{
    id: string
    businessAccountId: string
    businessAccountName: string
    name: string
    address?: string
    phone?: string
    website?: string
    placeId?: string
  }> = []

  for (const account of accounts) {
    if (!account.name) continue

    try {
      const locations = await getBusinessLocations(googleAccountId, account.name)
      
      for (const location of locations) {
        if (!location.name) continue

        allLocations.push({
          id: location.name,
          businessAccountId: account.name!,
          businessAccountName: account.accountName || account.name!,
          name: location.title || 'Unknown Business',
          address: formatAddress(location.storeCode ?? undefined),
          phone: location.phoneNumbers?.primaryPhone ?? undefined,
          website: location.websiteUri ?? undefined,
          placeId: location.metadata?.placeId ?? undefined,
        })
      }
    } catch (err) {
      console.warn(`Failed to fetch locations for account ${account.name}:`, err)
    }
  }

  return allLocations
}

// Save business profile to database
export async function saveBusinessProfile(
  userId: string,
  googleAccountId: string,
  location: {
    id: string
    businessAccountId: string
    name: string
    address?: string
    phone?: string
    website?: string
    placeId?: string
  }
) {
  // Extract location ID from the full name (format: accounts/xxx/locations/yyy)
  const locationIdMatch = location.id.match(/locations\/(.+)$/)
  const locationId = locationIdMatch ? locationIdMatch[1] : location.id

  const { data, error } = await supabaseAdmin
    .from('business_profiles')
    .upsert({
      user_id: userId,
      google_account_id: googleAccountId,
      google_business_account_id: location.businessAccountId,
      location_id: locationId,
      business_name: location.name,
      address: location.address,
      phone: location.phone,
      website: location.website,
      place_id: location.placeId,
      is_active: true,
      auto_sync_enabled: true,
      auto_generate_enabled: true,
    }, {
      onConflict: 'google_account_id,location_id',
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to save business profile: ${error.message}`)
  }

  return data
}

// Get user's connected business profiles
export async function getUserBusinessProfiles(userId: string) {
  const { data, error } = await supabaseAdmin
    .from('business_profiles')
    .select(`
      *,
      google_accounts:google_account_id(google_email)
    `)
    .eq('user_id', userId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch business profiles: ${error.message}`)
  }

  return data || []
}

// Update business profile settings
export async function updateBusinessProfileSettings(
  userId: string,
  profileId: string,
  settings: {
    autoSyncEnabled?: boolean
    autoGenerateEnabled?: boolean
  }
) {
  const { data, error } = await supabaseAdmin
    .from('business_profiles')
    .update({
      auto_sync_enabled: settings.autoSyncEnabled,
      auto_generate_enabled: settings.autoGenerateEnabled,
      updated_at: new Date().toISOString(),
    })
    .eq('id', profileId)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update settings: ${error.message}`)
  }

  return data
}

// Format address helper
function formatAddress(storeCode: string | undefined): string | undefined {
  if (!storeCode) return undefined
  
  // storeCode might contain address info, or we might need to fetch it separately
  // For now, return as-is
  return storeCode
}