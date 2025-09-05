# 🎯 MPCPCT Web App

A comprehensive exam practice platform for CPCT, RSCIT, and CCC exams with bilingual support (Hindi/English), subscription-based content access, and admin panel for content management.

## ✨ Features

### 🎓 Exam System
- **Multi-Exam Support**: CPCT, RSCIT, CCC exams
- **Bilingual Interface**: Hindi and English language support
- **Real-time Results**: Instant scoring and performance analytics
- **PDF Downloads**: Download exam results as PDF
- **Topic-wise Practice**: Section-based question practice
- **Timer Functionality**: Real-time exam timing

### 💳 Subscription System
- **Free Trial**: One free lesson/exam per category
- **Flexible Plans**: Basic, Premium, and Lifetime subscriptions
- **Payment Integration**: Razorpay payment gateway
- **Email Notifications**: Subscription confirmations
- **Access Control**: Content gating based on subscription status

### 👨‍💼 Admin Panel
- **Content Management**: Add/edit exams, sections, and questions
- **Learning Management**: Manage learning sections and lessons
- **Subscription Monitoring**: View active subscriptions
- **User Management**: Admin access control
- **Analytics**: Track subscription metrics

### 🔧 Technical Features
- **Modern Stack**: Next.js 15, React 19, MongoDB
- **Responsive Design**: Mobile-first approach
- **SEO Optimized**: Meta tags, sitemap, robots.txt
- **Performance**: Optimized builds and caching
- **Security**: JWT authentication, bcrypt password hashing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas or local MongoDB
- Razorpay account (for payments)
- Email service (Gmail SMTP recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mpcpctwebapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Seed admin user**
   ```bash
   # Visit: http://localhost:3000/api/seed-admin
   # Admin credentials: 7869654042 / Admin@1234
   ```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── admin/         # Admin panel APIs
│   │   ├── payments/      # Payment processing
│   │   ├── subscriptions/ # Subscription management
│   │   └── webhooks/      # Payment webhooks
│   ├── components/        # Reusable components
│   ├── exam/              # Exam-related pages
│   ├── exam_mode/         # Main exam interface
│   ├── admin/             # Admin panel
│   ├── price/             # Pricing page
│   └── payment/           # Payment processing
├── data/                  # JSON data files
│   ├── examQuestions.json
│   ├── examQuestions_rscit.json
│   └── examQuestions_ccc.json
├── lib/                   # Utility libraries
│   ├── models/            # MongoDB models
│   ├── auth.js            # Authentication utilities
│   ├── access.js          # Access control
│   └── email.js           # Email utilities
└── styles/                # CSS files
```

## 🔧 Configuration

### Environment Variables

See `env.example` for all required environment variables:

- **Database**: MongoDB connection string
- **Authentication**: JWT secret
- **Site**: Public URL and Google Analytics ID
- **Email**: SMTP configuration
- **Payments**: Razorpay API keys
- **Admin**: Default admin credentials

### Database Models

- **User**: User accounts and authentication
- **Exam**: Exam configurations
- **Section**: Exam sections/chapters
- **Question**: Individual questions with bilingual support
- **Lesson**: Learning content
- **Subscription**: User subscriptions
- **Payment**: Payment records

## 🎯 Usage

### For Students
1. **Register/Login**: Create account or login
2. **Browse Content**: Explore free and paid content
3. **Take Exams**: Practice with real exam questions
4. **View Results**: Get detailed performance analytics
5. **Subscribe**: Access premium content

### For Admins
1. **Login**: Use admin credentials (7869654042 / Admin@1234)
2. **Manage Content**: Add/edit exams, questions, lessons
3. **Monitor Subscriptions**: View active subscriptions
4. **Analytics**: Track user engagement and revenue

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel
1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy automatically

## 📊 SEO Features

- ✅ Dynamic sitemap generation
- ✅ Robots.txt configuration
- ✅ Meta tags and Open Graph
- ✅ Google Analytics integration
- ✅ Structured data markup
- ✅ Mobile-responsive design

## 🔒 Security

- JWT-based authentication
- Bcrypt password hashing
- Environment variable protection
- CORS configuration
- Input validation
- SQL injection prevention

## 📱 Mobile Support

- Responsive design
- Touch-friendly interface
- Mobile-optimized exam interface
- Progressive Web App features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the [DEPLOYMENT.md](./DEPLOYMENT.md) guide
- Review the troubleshooting section
- Contact the development team

## 🎉 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for database support
- Razorpay for payment processing
- All contributors and testers

---

**Ready to deploy?** Check out the [DEPLOYMENT.md](./DEPLOYMENT.md) guide for production setup!