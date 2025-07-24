'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen pt-32 pb-20 text-white">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-light tracking-widest">CONTACT</h1>
          <div className="mt-4 w-20 h-0.5 bg-white mx-auto" />
        </motion.div>

        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-light mb-8">お問い合わせ</h2>
              <p className="text-white/80 mb-8 leading-relaxed">
                AURAに関するご質問、タレントへのお仕事のご依頼、オーディションについてなど、
                お気軽にお問い合わせください。
              </p>

              <div className="space-y-6">
                <motion.div
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-white flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">メールアドレス</h3>
                    <a 
                      href="mailto:info@aura-talent.com" 
                      className="text-white hover:text-white/80 transition-colors"
                    >
                      info@aura-talent.com
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-white flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">電話番号</h3>
                    <a 
                      href="tel:03-1234-5678" 
                      className="text-white hover:text-white/80 transition-colors"
                    >
                      03-1234-5678
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-white flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">住所</h3>
                    <p className="text-white/90">
                      〒150-0001<br />
                      東京都渋谷区神宮前1-1-1<br />
                      AURAビル 5F
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-white flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">営業時間</h3>
                    <p className="text-white/90">
                      平日 10:00 - 18:00<br />
                      土日祝日 休業
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/20"
            >
              <h3 className="text-2xl font-light mb-6 text-white">メッセージを送る</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-colors text-white placeholder-white/50 backdrop-blur-sm"
                    placeholder="山田太郎"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-colors text-white placeholder-white/50 backdrop-blur-sm"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                    件名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-colors text-white placeholder-white/50 backdrop-blur-sm"
                    placeholder="お問い合わせの件名"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                    メッセージ <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-colors text-white placeholder-white/50 backdrop-blur-sm resize-none"
                    placeholder="お問い合わせ内容をご記入ください"
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-white text-[#2eb3bf] py-3 px-6 rounded-lg font-medium hover:bg-white/90 transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  送信する
                </motion.button>
              </form>

              <p className="mt-4 text-sm text-white/60">
                お問い合わせいただいた内容については、通常2-3営業日以内にご返信いたします。
              </p>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <motion.div
            className="absolute rounded-full"
            style={{
              left: '15%',
              top: '20%',
              width: 200,
              height: 200,
              background: 'radial-gradient(circle, rgba(75, 163, 163, 0.1) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              right: '10%',
              bottom: '20%',
              width: 150,
              height: 150,
              background: 'radial-gradient(circle, rgba(75, 163, 163, 0.08) 0%, transparent 70%)',
              filter: 'blur(30px)',
            }}
            animate={{
              y: [0, 25, 0],
              x: [0, -20, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 5,
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  )
}