import Recipient from '../models/Recipient';
import * as Yup from 'yup';

class RecipientController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            rua: Yup.string(),
            numero: Yup.string(),
            complemento: Yup.string(),
            estado: Yup.string(),
            cidade: Yup.string(),
            cep: Yup.string(),
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
        const schema = Yup.object().shape({
            id: Yup.number().required(),
            name: Yup.string(),
            rua: Yup.string(),
            numero: Yup.string(),
            complemento: Yup.string(),
            estado: Yup.string(),
            cidade: Yup.string(),
            CEP: Yup.string(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ message: 'Erro de validação!' });
        }

        const recipient = await Recipient.findByPk(req.body.id);

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
