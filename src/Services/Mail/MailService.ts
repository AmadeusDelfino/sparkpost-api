const SparkPost = require('sparkpost')
//Create an env var as SPARKPOST_API_KEY
const client = new SparkPost('7b1a01a318113cefbbe542da6b8b602eeb3f80ca')
console.log(process.env.SPARKPOST_API_KEY)
class MailService {
    // @ts-ignore
    send({to, subject, message}): Promise<any> {
        const sandbox = process.env.SPARKPOST_SANDBOX || true
        return client.transmissions.send({
            options: {
                sandbox: sandbox
            },
            content: {
                from: process.env.MAIL_FROM || 'amadeus@telep.com.br',
                subject: subject,
                html: message,
            },
            recipients: [
                {address: to}
            ]
        })
    }
}

export default MailService