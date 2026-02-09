import mongoose from "mongoose";


const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        maxLength: [100, "Subscription name cannot exceed 100 characters"],
        minLength: [2, "Subscription name must be at least 2 characters"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"]
    },
    currency: {
        type: String,
        enum: ["USD", "EUR", "GBP", "INR", "JPY", "CNY"], // Add more currencies as needed
        default: "INR"
    },
    frequency: {
        type: String,
        enum: ["monthly", "yearly", "weekly", "daily"]
    },
    category: {
        type: String,
        enum: ["entertainment", "productivity", "education", "health", "other"],
        required: [true, "Category is required"]
    },
    paymentMethod: {
        type: String,
        required: [true, "Payment method is required"],
        trim: true
    },
    status: {
        type: String,
        enum: ["active",  "cancelled","expired"],
        default: "active"
    },
    startDate: {
        type: Date,
        required: [true, "Start date is required"],
        validate: {
            validator: (value) => value <= new Date(),
            message: "Start date cannot be in the future"
        }
    },
    renewalDate: {  
        type: Date,
        validate: {
            validator: function(value) {
                return  value > this.startDate;   
            },
            message: "Renewal date must be after start date",
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User reference is required"],
        index: true
    }
               

}, { timestamps: true });


subscriptionSchema.pre("save", async function() {
    if(!this.renewalDate){
        const renewalperiods = {
            "daily": 1,
            "weekly": 7,
            "monthly": 30,
            "yearly": 365
        };
        
            this.renewalDate = new Date(this.startDate);
            this.renewalDate.setDate(this.renewalDate.getDate() + renewalperiods[this.frequency]);
        if(this.renewalDate < new Date()){
            this.status = "expired";
        }
    }
});



const Subscription = mongoose.model("Subscription", subscriptionSchema);    

export default Subscription;