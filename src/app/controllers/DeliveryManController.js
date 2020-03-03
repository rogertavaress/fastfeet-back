import DeliveryMan from '../models/DeliveryMan';
import * as Yup from 'yup';

class DeliveryManController {
    async index(req, res) {
        const { page = 1 } = req.query;

        const deliveryMan = await DeliveryMan.findAll({
            order: ['name'],
            limit: 20,
            offset: (page - 1) * 20,
        });

        return res.json(deliveryMan);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Erro de validação' });
        }

        const { name, email } = await DeliveryMan.create(req.body);

        return res.json({ name, email });
    }

    async update(req, res) {
        const { id } = req.params;

        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string(),
            avatar_id: Yup.number(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Erro de validação' });
        }

        const deliveryManAntigo = await DeliveryMan.findByPk(id);

        if (!deliveryManAntigo) {
            return res
                .status(400)
                .json({ error: `Não existe entregador com o id:${id}` });
        }

        const deliveryMan = await DeliveryMan.update(req.body);

        return res.json(deliveryMan);
    }

    async delete(req, res) {
        const { id } = req.params;

        const deliveryManAntigo = await DeliveryMan.findByPk(id);

        if (!deliveryManAntigo) {
            return res
                .status(400)
                .json({ error: `Não existe entregador com o id:${id}` });
        }

        await DeliveryMan.destroy({
            where: {
                id,
            },
        });

        return res.json({ message: 'Removido com sucesso.' });
    }
}

export default new DeliveryManController();
