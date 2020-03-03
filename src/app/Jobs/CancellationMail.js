import Mail from '../../lib/Mail';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

class CancellationMail {
    get key() {
        return 'CancellationMail';
    }

    async handle({ data }) {
        const { order } = data;

        console.log('A fila executou');

        await Mail.sendMail({
            to: `${order.deliveryMan.name} <${order.deliveryMan.email}>`,
            subject: 'Encomenda Cancelada',
            template: 'cancellation',
            context: {
                deliveryMan: order.deliveryMan.name,
                recipient: order.recipient.name,
                product: order.product,
            },
        });
    }
}

export default new CancellationMail();
