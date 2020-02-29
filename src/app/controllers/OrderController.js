import Order from '../models/Order';
import DeliveryMan from '../models/DeliveryMan';
import Recipient from '../models/Recipient';
import File from '../models/File';
import * as Yup from 'yup';
import { getHours, startOfDay, endOfDay, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';
import { Op } from 'sequelize';

class OrderController {
    async index(req, res) {
        const { page = 1 } = req.query;

        const orders = await Order.findAll({
            order: ['recipient_id'],
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
                    model: DeliveryMan,
                    as: 'deliveryMan',
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

        const deliveryMan = await DeliveryMan.findByPk(req.body.deliveryman_id);

        if (!deliveryMan) {
            return res.status(400).json({
                error: 'Não existe entregador com o ID informado',
            });
        }

        const order = await Order.create(req.body);

        await Mail.sendMail({
            to: `${deliveryMan.name} <${deliveryMan.email}>`,
            subject: 'Produto Disponível',
            text: `Produto disponível: ${order.product}`,
        });

        return res.json({
            message: 'Cadastrado com sucesso',
            order,
        });
    }

    async update(req, res) {
        const { id } = req.params;

        const schema = Yup.object().shape({
            recipient_id: Yup.number(),
            deliveryman_id: Yup.number(),
            signature_id: Yup.number(),
            product: Yup.string(),
            canceled_at: Yup.date(),
            start_date: Yup.date(),
            end_date: Yup.date(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: 'Erro de validação',
            });
        }

        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(400).json({
                message: 'Order não encontrada.',
            });
        }

        if (req.body.recipient_id) {
            if (await Recipient.findByPk(req.body.recipient_id)) {
                return res.status(400).json({
                    error: 'Não existe destinatário com o ID informado',
                });
            }
        }

        if (req.body.deliveryman_id) {
            if (await DeliveryMan.findByPk(req.body.deliveryman_id)) {
                return res.status(400).json({
                    error: 'Não existe entregador com o ID informado',
                });
            }
        }

        if (req.body.start_date) {
            const ordersForDeliveryManDay = await Order.findAll({
                where: {
                    deliveryman_id: order.deliveryman_id,
                    start_date: {
                        [Op.between]: [
                            startOfDay(parseISO(req.body.start_date)),
                            endOfDay(parseISO(req.body.start_date)),
                        ],
                    },
                    id: {
                        [Op.ne]: id,
                    },
                },
            });

            if (ordersForDeliveryManDay.length >= 5) {
                return res
                    .status(400)
                    .json({
                        error:
                            '5 é o limite máximo de Encomendas para o mesmo dia',
                    });
            }
        }

        const orderAtualizada = await order.update(req.body);

        return res.json({
            message: 'Atualizado com sucesso!',
            data: orderAtualizada,
        });
    }

    async delete(req, res) {
        const { id } = req.params;

        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(400).json({
                error: 'Order não encontrada',
            });
        }

        await Order.destroy({
            where: {
                id,
            },
        });

        return res.json({
            message: 'Order removida',
        });
    }
}

export default new OrderController();
