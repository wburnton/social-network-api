const { Schema, Types } = require('mongoose');  


const reactionSchema = new Schema ( 
    { 
        reactionId: { 

        }, 
        reactionBody: { 
            type: String, 
            required: true, 
            maxLength: 280
        }, 
        username: { 
            type: String, 
            required: true,
        }, 
        createdAt: { 
            type: Date,
            default: Date.now,
        }
    }
)

const thoughtSchema = new Schema ( 
    { 
        thoughtText: { 
            type: String, 
            required: true,
            minLength: 1, 
            maxLength: 280

        }, 
        createdAt: {
            type: Date,
            default: Date.now,
        }, 
        username: { 
            type: String, 
            required: true,
        }, 
        reactions: [reactionSchema],
    }, 
    {
        toJSON: {
          getters: true,
        },
    }

) 

thoughtSchema 
    .virtual('thoughtCount')
    .get(function () { 
        return `${this.reactions}`
    }) 
    .set(function (v) { 

    }) 

const Thought = model('thought', thoughtSchema); 

module.exports = Thought;