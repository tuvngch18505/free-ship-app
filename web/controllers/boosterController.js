import Booster from '../models/booster.js';

export const createBooster = async (req, res) => {

    try {

        const {
            boosterName,
            status,
            goal,
            message,
            progressMessage,
            goalReachedMessage,
            position,
            template,
            backgroundImage,
            backgroundColor,
            font,
            fontSize,
            messageColor } = req.body;

        const booster = new Booster({
            boosterName: boosterName,
            status: status,
            content: {
                goal: goal,
                message: message,
                progressMessage: progressMessage,
                goalReachedMessage: goalReachedMessage,
            },
            design: {
                position: position,
                template: template,
                backgroundColor: backgroundColor,
                backgroundImage: backgroundImage,
                font: font,
                fontSize: fontSize,
                messageColor: messageColor,
            },
            
        });

        const saveBooster = await booster.save();
        res.json(saveBooster);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }

}

export const getAllBoosters = async (req, res) => {
    try {
        const boosters = await Booster.find();
        res.json(boosters);
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error');
    }
};

export const getBoosterById = async (req, res) => {
    try {
        const booster = await Booster.findById(req.params.id);
        res.json(booster);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

export const updateBooster = async (req, res) => {
    try {
        const id = req.params.id;
        const {
            boosterName,
            status,
            goal,
            message,
            progressMessage,
            goalReachedMessage,
            position,
            template,
            backgroundImage,
            backgroundColor,
            font,
            fontSize,
            messageColor,
        } = req.body;

        const booster = await Booster.findByIdAndUpdate(id,
            {
                boosterName,
                status,
                content: {
                    goal: goal,
                    message: message,
                    progressMessage: progressMessage,
                    goalReachedMessage: goalReachedMessage,
                },
                design: {
                    position: position,
                    template: template,
                    backgroundImage: backgroundImage,
                    backgroundColor: backgroundColor,
                    font: font,
                    fontSize: fontSize,
                    messageColor: messageColor,
                }
            }, { new: true });

        res.json(booster);
    } catch (error) {
        console.error(error);
    }

}

export const deleteBooster = async (req, res) => {

    try {
        const { id } = req.params
        const booster = await Booster.findByIdAndDelete(id);

        if (!booster) {
            return res.status(404).send("Booster not found")
        }

        res.status(200).send("Booster deleted successfully")
    } catch (error) {
        console.error(error)
    }
}