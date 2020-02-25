import Order from '../models/Order';
import Courier from '../models/Courier';
import Recipient from '../models/Recipient';
import File from '../models/File';
import * as Yup from 'yup';
import { getHours } from 'date-fns';
import Mail from '../../lib/Mail';

class OrderController {
    async index(req, res) {
        const { page = 1 } = req.query;

        const orders = await Order.findAll({
            order: ['start_date', 'recipient_id'],
            attributes: [
                'id',
                'product',
                'canceled_at',
                'start_date',
                'end_date',
            ],
            limit: 20,
            offset: (page - 1) * 20,
            include: [
                {
                    model: Recipient,
                    as: 'recipient',
                    attributes: ['id', 'name'],
                },
                {
                    model: Courier,
                    as: 'courier',
                    attributes: ['id', 'name', 'email'],
                },
                {
                    model: File,
                    as: 'signature',
                    attributes: ['id', 'path'],
                },
            ],
        });

        return res.json(orders);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            recipient_id: Yup.number().required(),
            deliveryman_id: Yup.number().required(),
            signature_id: Yup.number().required(),
            product: Yup.string().required(),
            canceled_at: Yup.date(),
            start_date: Yup.date(),
            end_date: Yup.date(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: 'Erro de validação',
            });
        }

        const hora = getHours(req.body.start_date);
        if (hora < 8 || hora > 18) {
            return res.status(400).json({
                error: 'Horário não permitido',
            });
        }

        const recipient = await Recipient.findByPk(req.body.recipient_id);

        if (!recipient) {
            return res.status(400).json({
                error: 'Não existe destinatário com o ID informado',
            });
        }

        const courier = await Courier.findByPk(req.body.deliveryman_id);

        if (!courier) {
            return res.status(400).json({
                error: 'Não existe entregador com o ID informado',
            });
        }

        const order = await Order.create(req.body);

        await Mail.sendMail({
            to: `${courier.name} <${courier.email}>`,
            subject: 'Produto Disponível',
            text: `Produto disponível: ${order.product}`,
        });

        return res.json({
            message: 'Cadastrado com sucesso',
            order,
        });
    }
}

export default new OrderController();
