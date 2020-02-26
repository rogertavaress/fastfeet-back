import Recipient from '../models/Recipient';
import * as Yup from 'yup';

class RecipientController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            rua: Yup.string().required(),
            numero: Yup.string().required(),
            complemento: Yup.string(),
            estado: Yup.string().required(),
            cidade: Yup.string().required(),
            cep: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ message: 'Erro de validação!' });
        }

        const { name } = await Recipient.create(req.body);

        return res.json({
            message: 'Cadastrado com sucesso!',
            data: {
                name,
            },
        });
    }

    async update(req, res) {
        const { id } = req.params;

        const schema = Yup.object().shape({
            name: Yup.string(),
            rua: Yup.string(),
            numero: Yup.number(),
            complemento: Yup.string(),
            estado: Yup.string(),
            cidade: Yup.string(),
            cep: Yup.string(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ message: 'Erro de validação!' });
        }

        const recipient = await Recipient.findByPk(id);

        if (!recipient) {
            return res.status(400).json({
                message: 'Recipient não encontrado.',
            });
        }

        const recipientAtualizado = await recipient.update(req.body);

        return res.json({
            message: 'Atualizado com sucesso!',
            data: recipientAtualizado,
        });
    }
}

export default new RecipientController();
