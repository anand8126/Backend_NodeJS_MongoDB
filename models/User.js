import mongoose, {Schema } from "mongoose";

const UserSchema=mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
        },

        lastName:{
            type:String,
            required:true
        },
        userName:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true,
        },
        profileImage:{
            type:String,
            required:false,
            default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F403022%2Fbusiness_man_male_user_avatar_profile_person_man_icon&psig=AOvVaw0NZtkvzawd1cW1jl7_pZlH&ust=1696738710365000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCODn67KK44EDFQAAAAAdAAAAABAE"
        },
        isAdmin:{
            type:Boolean,
            default:false
        },
        roles:[{
            type:[Schema.Types.ObjectId],
            required:true,
            ref:"Role"
        }
        ]
    },
    {
        timestamps:true
    }
);


export default mongoose.model("User",UserSchema);