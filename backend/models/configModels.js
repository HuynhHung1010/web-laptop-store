import mongoose from "mongoose";

const ConfigSchema = new mongoose.Schema({
    CPU: {
        version: { type: String, required: true },
        cpuTech: { type: String, required: true },
        cpuType: { type: String, required: true },
        cpuSpeed: { type: String, required: true },
        busSpeed: { type: String, required: true },
    },
    RAM: {
        ramCapacity: { type: String, required: true },
        ramType: { type: String, required: true },
        ramSpeed: { type: String, required: true },
        ramSlot: { type: String, required: true },
        ramMax: { type: String, required: true },
    },
    Screen: {
        screenSize: { type: String, required: true },
        screenType: { type: String, required: true },
        resolution: { type: String, required: true },
        sweepFrequency: { type: String, required: true },
        bgPanels: { type: String, required: true },
        screenTech: { type: String, required: true }
    },
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },

}, {
    timestamps: true,
}
)

const Configs = mongoose.model('configs', ConfigSchema);

export default Configs;