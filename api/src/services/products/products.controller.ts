import { Request, Response, NextFunction } from "express";

import { async } from "../../middlewares/async";
import Product from "./products.model";

class ProductControllerClass {
  public list = async(
    async (req: Request, res: Response, next: NextFunction) => {
      const products = await Product.find();
      res.json(products);
    }
  );

  public show = async(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      const product = await Product.findById(id);

      res.json(product);
    }
  );
}

export const ProductController = new ProductControllerClass();

export default ProductController;
