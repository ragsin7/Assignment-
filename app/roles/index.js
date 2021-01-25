const mongoose = require('mongoose');
const RoleSchema = new mongoose.Schema({

	name: { type: String, required: true },
	access: {
		path: { type: Array, },
	},

	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now }
});


const RoleModel = mongoose.model('mst_role', RoleSchema);
module.exports = RoleModel;
