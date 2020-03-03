import DeliveryProblem from '../models/DeliveryProblem';
import Order from '../models/Order';
import * as Yup from 'yup';
import DeliveryMan from '../models/DeliveryMan';
import Mail from '../../lib/Mail';

class DeliveryProblemController {
    async index(req, res) {
        const { page = 1 } = req.query;
        const { id } = req.params;

        const deliveryProblems = await DeliveryProblem.findAll({
            order: [['id', 'DESC']],
            limit: 20,
            offset: (page - 1) * 20,
            include: [
                {
                    model: Order,
                    as: 'delivery',
                    where: {
                        id,
                    },
                },
            ],
        });

        return res.json(deliveryProblems);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            description: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Erro de validação' });
        }

        const { id } = req.params;

        const problem = await DeliveryProblem.create({
            delivery_id: id,
            description: req.body.description,
        });

        return res.json(problem);
    }

    async delete(req, res) {
        const { id } = req.params;

        const orderAntiga = await Order.findByPk(id, {
            include: [
                {
                    model: DeliveryMan,
                    as: 'deliveryMan',
                },
            ],
        });

        if (!orderAntiga) {
            return res
                .status(400)
                .json({ error: `Não existe encomenda com o id:${id}` });
        }

        await Order.destroy({
            where: {
                id,
            },
        });

        await Mail.sendMail({
            to: `${orderAntiga.deliveryMan.name} <${orderAntiga.deliveryMan.email}>`,
            subject: 'Encomenda Cancelada',
            template: 'cancellation',
            context: {
                // provider: appointment.provider.name,
                // user: appointment.user.name,
                // date: format(appointment.date, "dd 'de' MMMM', às' H:MM'h'", {
                //     locale: pt,
                // }),
            },
        });

        return res.json({ message: 'Removido com sucesso.' });
    }
}
export default new DeliveryProblemController();
