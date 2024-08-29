import sequelize from "sequelize";
import db from "../repository/db.js";
import { getNewId } from "../utils/id.util.js";

const Image = db.define("Image", {
	measure_uuid: {
		type: sequelize.STRING,
		primaryKey: true,
	},
  image: {
    type: sequelize.TEXT,
    allowNull: false
  },
  measure_value: {
    type: sequelize.INTEGER,
    allowNull: false
  },
  image_url: {
    type: sequelize.STRING,
    allowNull: true
  },
  customer_code: {
    type: sequelize.STRING,
    allowNull: false
  },
  measure_datetime: {
    type: sequelize.STRING,
    allowNull: false
  },
  measure_type: {
    type: sequelize.STRING,
    allowNull: false
  },
  has_confirmed: {
    type: sequelize.BOOLEAN,
    defaultValue: false
  },
}, { underscore: true });

Image.beforeCreate((image, options) => {
  image.measure_uuid = getNewId(),
  image.image_url = `http://localhost:${process.env.PORT}/image/${image.measure_uuid}`
})

export default Image