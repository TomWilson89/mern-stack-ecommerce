import User from "./services/users/users.model";
import Product from "./services/products/products.model";
import { dummyProducts, dummyUsers } from "./data";

import "./config/database";

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    await User.create(dummyUsers);

    const admin = await User.findOne({ role: 2 });

    const products = dummyProducts.map((p) => {
      return {
        ...p,
        userId: admin._id,
      };
    });

    await Product.create(products);

    console.log("Data Imported");

    process.exit();
  } catch (e) {
    console.log("e", e);
    process.exit(1);
  }
};
const deleteData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data deleted");

    process.exit();
  } catch (e) {
    console.log("e", e);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  deleteData();
} else {
  importData();
}
