import nodemailer from 'nodemailer'

const testAccount = await nodemailer.createTestAccount()

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: testAccount.user, // generated ethereal user
    pass: testAccount.pass // generated ethereal password
  }
})

export default transporter
