const Answer = require('../models/answer');

module.exports = {

    async store (request, response) {
        const { answerId } = request.params;
        try {
            if(!request.auth)
                return response.status(401).send({ success: false, message: 'Failed on authenticate', data: null });
            
            const answer = await Answer.findById( answerId );
            
            if(!answer)
                return response.status(400).send({ success: false, message: 'Answer not exists', data: null });
            
            if(answer.downVotes.includes( request.userId )){
                answer.downVotes.pop( request.userId );
                await answer.save();
            }

            answer.upVotes.push( request.userId );
            await answer.save();

            return response.status(200).send({ success: true, message: 'Service performed successfully', data: null });
        } catch (err) {
            return response.status(500).send({ success: false, message: 'Error upvoting answer', data: null });
        }
    },

    async delete (request, response) {
        const { answerId } = request.params;
        try {
            if(!request.auth)
                return response.status(401).send({ success: false, message: 'Failed on authenticate', data: null });
            
            const answer = await Answer.findById( answerId );
            
            if(!answer)
                return response.status(400).send({ success: false, message: 'Answer not exists', data: null });
            
            answer.upVotes.pop( request.userId );
            await answer.save();

            return response.status(200).send({ success: true, message: 'Service performed successfully', data: null });
        } catch (err) {
            return response.status(500).send({ success: false, message: 'Error upvoting answer', data: null });
        }
    },

};