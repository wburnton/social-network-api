const { Schema, Types } = require('mongoose'); 

const userSchema = new Schema ( 
    { 
        username: { 
            type: String, 
            required: true,
            unique: true, 
            trim: true,
        }, 
        email: { 
            type: String, 
            required: true, 
            unique: true, 
            match: [ 

            ]
        }, 
        thoughts: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'Thought',
        },], 

        friends: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'User',
        },]
    }
) 

userSchema
    .virtual('friendCount')
    .get(function () { 
        return `${this.friends}`;
    })
    .set(function (v) { 

    }) 

const User = model('user', userSchema); 

module.exports = User;