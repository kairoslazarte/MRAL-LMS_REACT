import bcrypt from 'bcryptjs'

const admins = [
    {
        first_name: 'System',
        middle_name: 'DLS',
        last_name: 'ADMIN',
        email: 'dls_admin@dls.com',
        password: bcrypt.hashSync('test@123', 10),
        phone: '09063475153',
    },
]

export default admins