import DeliveryMan from '../models/DeliveryMan';
import Order from '../models/Order';

class DeliveriesController {
    async index(req, res) {
        const { id } = req.params;

        const deliveryMan = DeliveryMan.findByPk(id);

        if (!deliveryMan) {
            return res.status(400).json({
                error: 'DeliveryMan não existe',
            });
        }

        const deliveries = Order.findAll({
            where: {
                deliveryman_id: id,
                canceled_at: null,
                end_date: !null,
            },
        });

        return res.json(deliveries);
    }
}

export default new DeliveriesController();
