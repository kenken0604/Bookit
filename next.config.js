module.exports = {
  reactStrictMode: true,
  env: {
    MONGO_DB_URI:
      'mongodb+srv://ken75319:Q8Y3qqN3kh4xIbVF@cluster0.gissy.mongodb.net/Bookit?retryWrites=true&w=majority',
    CLOUDINARY_CLUOD_NAME: 'kenkenproject',
    CLOUDINARY_API_KEY: '486872182263158',
    CLOUDINARY_API_SECRET: 'fUxYOl01XofWXGij8Dt7m4K_8W0',

    SMTP_HOST: 'smtp.mailtrap.io',
    SMTP_PORT: '2525',
    SMTP_USER: '05203e7c0a6179',
    SMTP_PASSWORD: '4f01184bea9347',
    SMTP_FROM_EMAIL: 'noreply@bookit.com',
    SMTP_FROM_NAME: 'Bookit',

    NEXTAUTH_URL: 'https://bookit.vercel.app',
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}
