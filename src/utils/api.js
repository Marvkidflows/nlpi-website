const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

console.log('API URL:', BASE_URL)

const fetchAPI = async (endpoint, options = {}) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.error(`API Error [${endpoint}]:`, err.message)
    return { success: false, message: err.message }
  }
}

export const api = {
  // Track visitor
  trackVisit: async (page = '/') => {
    try {
      await fetchAPI('/track', {
        method: 'POST',
        body: JSON.stringify({ page }),
      })
    } catch (_) {}
  },

  // Submit donation form
  submitDonation: async (data) => {
    return fetchAPI('/donations', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  // Submit partner form
  submitPartner: async (data) => {
    return fetchAPI('/partners', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  // Admin login
  adminLogin: async (username, password) => {
    return fetchAPI('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
  },

  // Admin: get stats
  getStats: async (token) => {
    return fetchAPI('/admin/stats', {
      headers: { Authorization: `Bearer ${token}` },
    })
  },

  // Admin: get all donations
  getDonations: async (token) => {
    return fetchAPI('/admin/donations', {
      headers: { Authorization: `Bearer ${token}` },
    })
  },

  // Admin: get all partners
  getPartners: async (token) => {
    return fetchAPI('/admin/partners', {
      headers: { Authorization: `Bearer ${token}` },
    })
  },

  // Admin: update donation
  updateDonation: async (token, id, data) => {
    return fetchAPI(`/admin/donations/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    })
  },

  // Admin: update partner
  updatePartner: async (token, id, data) => {
    return fetchAPI(`/admin/partners/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    })
  },

  // Admin: delete donation
  deleteDonation: async (token, id) => {
    return fetchAPI(`/admin/donations/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
  },

  // Admin: delete partner
  deletePartner: async (token, id) => {
    return fetchAPI(`/admin/partners/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
  },
}
