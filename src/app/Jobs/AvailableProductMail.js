import Mail from '../../lib/Mail';

class AvailableProductMail {
    get key() {
        return 'AvailableProductMail';
    }

    async handle({ data }) {
        const { order, deliveryMan, recipient } = data;

        await Mail.sendMail({
            to: `${deliveryMan.name} <${deliveryMan.email}>`,
            subject: 'Produto Disponível',
            template: 'availableproduct',
            context: {
                deliveryMan: deliveryMan.name,
                recipient: recipient.name,
                product: order.product,
                url: process.env.APP_URL,
            },
        });
    }
}

export default new AvailableProductMail();
