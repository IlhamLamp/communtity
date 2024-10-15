export const ProfileDefaultData = {
    user_id: 0,
    first_name: 'default',
    last_name: '',
    username: '',
    phone: 0,
    address: {
        street: '',
        city: '',
        state: '',
        zip_code: ''
    },
    profile_picture: '',
    profile_cover: '',
    role: '',
    tags: [],
    about: '',
    social_links: [],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
}