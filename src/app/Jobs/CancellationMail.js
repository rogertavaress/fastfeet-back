import Mail from '../../lib/Mail';

class CancellationMail {
    get key() {
        return 'CancellationMail';
    }

    async handle({ data }) {
        const { order } = data;

        await Mail.sendMail({
            to: `${order.deliveryMan.name} <${order.deliveryMan.email}>`,
            subject: 'Encomenda Cancelada',
            template: 'cancellation',
            context: {
                deliveryMan: order.deliveryMan.name,
                recipient: order.recipient.name,
                product: order.product,
                url: process.env.APP_URL,
            },
        });
    }
}

export default new CancellationMail();
