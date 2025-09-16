import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_TOKEN || 're_gLMoZMHZ_5ZCN9JdnNJem7ssnhHK8pc27')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, name, email, phone, message, talentName, position } = body

    // メールタイプに応じて件名を設定
    let subject = ''
    let category = ''
    
    if (type === 'talent') {
      subject = `【HPお問い合わせ】タレント: ${talentName} - ${name}様より`
      category = 'タレントお問い合わせ'
    } else if (type === 'recruit') {
      subject = `【HPお問い合わせ】採用応募: ${position} - ${name}様より`
      category = '採用応募'
    } else {
      subject = `【HPお問い合わせ】${name}様より`
      category = '一般お問い合わせ'
    }

    // HTMLメールテンプレート
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: 'Hiragino Kaku Gothic ProN', 'メイリオ', sans-serif;
            background-color: #f5f5f5;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
          }
          .header {
            background: linear-gradient(135deg, #2eb3bf 0%, #4ba3a3 100%);
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
            font-weight: 300;
            letter-spacing: 2px;
          }
          .category-badge {
            display: inline-block;
            background-color: rgba(255, 255, 255, 0.2);
            color: #ffffff;
            padding: 5px 15px;
            border-radius: 20px;
            margin-top: 10px;
            font-size: 14px;
          }
          .content {
            padding: 40px 30px;
          }
          .info-table {
            width: 100%;
            margin-bottom: 30px;
          }
          .info-row {
            border-bottom: 1px solid #e0e0e0;
          }
          .info-label {
            padding: 15px;
            background-color: #f8f8f8;
            font-weight: bold;
            color: #333;
            width: 30%;
            vertical-align: top;
          }
          .info-value {
            padding: 15px;
            color: #555;
            vertical-align: top;
          }
          .message-section {
            background-color: #f8f8f8;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
          }
          .message-title {
            color: #2eb3bf;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .message-content {
            color: #333;
            line-height: 1.8;
            white-space: pre-wrap;
          }
          .footer {
            background-color: #333;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            font-size: 12px;
          }
          .footer a {
            color: #2eb3bf;
            text-decoration: none;
          }
          .timestamp {
            color: #999;
            font-size: 12px;
            text-align: right;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>AURA TALENT</h1>
            <div class="category-badge">${category}</div>
          </div>
          
          <div class="content">
            <table class="info-table" cellpadding="0" cellspacing="0">
              <tr class="info-row">
                <td class="info-label">お名前</td>
                <td class="info-value">${name}</td>
              </tr>
              <tr class="info-row">
                <td class="info-label">メールアドレス</td>
                <td class="info-value">
                  <a href="mailto:${email}" style="color: #2eb3bf;">${email}</a>
                </td>
              </tr>
              ${phone ? `
              <tr class="info-row">
                <td class="info-label">電話番号</td>
                <td class="info-value">${phone}</td>
              </tr>
              ` : ''}
              ${talentName ? `
              <tr class="info-row">
                <td class="info-label">対象タレント</td>
                <td class="info-value">${talentName}</td>
              </tr>
              ` : ''}
              ${position ? `
              <tr class="info-row">
                <td class="info-label">応募職種</td>
                <td class="info-value">${position}</td>
              </tr>
              ` : ''}
            </table>
            
            <div class="message-section">
              <div class="message-title">お問い合わせ内容</div>
              <div class="message-content">${message || 'メッセージなし'}</div>
            </div>
            
            <div class="timestamp">
              送信日時: ${new Date().toLocaleString('ja-JP', { 
                timeZone: 'Asia/Tokyo',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
          
          <div class="footer">
            <p>このメールはAURA TALENTウェブサイトのお問い合わせフォームから自動送信されました。</p>
            <p>© AURA TALENT. All Rights Reserved.</p>
            <p><a href="https://aura-talent.com">https://aura-talent.com</a></p>
          </div>
        </div>
      </body>
      </html>
    `

    // 送信先をtypeによって分岐
    const toEmail = type === 'recruit' 
      ? 'recruit@rise-liver.com'
      : 'info@aura-talent.com'

    // メール送信
    const { data, error } = await resend.emails.send({
      from: 'AURA TALENT <noreply@cldv.jp>',
      to: [toEmail],
      subject: subject,
      html: htmlContent,
      replyTo: email,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'メール送信に失敗しました' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, id: data?.id },
      { status: 200 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    )
  }
}