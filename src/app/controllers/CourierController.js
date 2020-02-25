import Courier from '../models/Courier';
import * as Yup from 'yup';

class CourierController {
    async index(req, res) {
        const { page = 1 } = req.query;

        const couriers = await Courier.findAll({
            order: ['name'],
            limit: 20,
            offset: (page - 1) * 20,
        });

        return res.json(couriers);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Erro de validação' });
        }

        const { name, email } = await Courier.create(req.body);

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

        const courierAntigo = await Courier.findByPk(id);

        if (!courierAntigo) {
            return res
                .status(400)
                .json({ error: `Não existe entregador com o id:${id}` });
        }

        const courier = await Courier.update(req.body);

        return res.json(courier);
    }

    async delete(req, res) {
        const { id } = req.params;

        const courierAntigo = await Courier.findByPk(id);

        if (!courierAntigo) {
            return res
                .status(400)
                .json({ error: `Não existe entregador com o id:${id}` });
        }

        Courier.destroy({
            where: {
                id,
            },
        });
    }
}

export default new CourierController();
